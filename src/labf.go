package main

import (
	"fmt"
	"sync"
	"common"
	"runtime"
	"net/http"
	"crypto/tls"
	"http/router"
	"http/router/api"
	"http/middleware"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/acme/autocert"
	"storage"
	"os"
)

func main() {
	defer common.Logger.Print("[Server] Stop")

	// set core
	runtime.GOMAXPROCS(runtime.NumCPU())

	// log
	common.InitalizeLogger()
	common.Logger.Printf("[Server Initialization] Number of cores to use : %v", runtime.GOMAXPROCS(0))
	waitSignal := &sync.WaitGroup{}

	// mariaDB
	var err error
	storage.CpwpDB, err = sql.Open("mysql", fmt.Sprintf("%v:%v@tcp(%v:%v)/%v", common.DatabaseID, common.DatabasePW, common.DatabaseAddr, common.DatabasePort, common.DatabaseName))
	if err != nil {
		common.Logger.Fatalf("[MariaDB Client Initialization] Error : %v", err)
		os.Exit(1)
	}
	defer storage.CpwpDB.Close()
	cpwpDBInfo := fmt.Sprintf("%v:%v/%v", common.DatabaseAddr, common.DatabasePort, common.DatabaseName)
	var checkVersion string
	storage.CpwpDB.QueryRow("SELECT VERSION()").Scan(&checkVersion)
	if checkVersion == "" {
		common.Logger.Fatalf("[MariaDB Client Initialization] Unable To Connect Maria Database : %v", cpwpDBInfo)
		os.Exit(1)
	}
	common.Logger.Printf("[MariaDB Client Initialization] Success To Connect Maria Database : %v(%v)", cpwpDBInfo, checkVersion)

	// http
	waitSignal.Add(1)
	go func(){
		/******************************************************************
		 ROUTER INITIALIZATION
		 ******************************************************************/
		r := mux.NewRouter()

		// Index - Redirect To Prod
		r.Handle("/", http.HandlerFunc(router.GetIndex)).Methods("GET")
		// Favicon
		r.Handle("/favicon.ico", http.HandlerFunc(router.GetFavicon)).Methods("GET")
		// Static
		r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir(fmt.Sprintf("%v/static/", common.BasePath))))).Methods("GET")
		// Angular Prod
		r.PathPrefix("/prod/").Handler(http.StripPrefix("/prod/", http.FileServer(http.Dir(fmt.Sprintf("%v/angular/prod/", common.BasePath))))).Methods("GET")

		/******************************************************************
		 API
		 ******************************************************************/
		// Status
		r.Handle("/api/status", http.HandlerFunc(api.GetStatus)).Methods("GET")

		/******************************************************************
		 ERROR
		 ******************************************************************/
		// Not Found
		r.NotFoundHandler = http.HandlerFunc(router.NotFound)

		/******************************************************************
		 Middleware
		 ******************************************************************/
		r.Use(middleware.SetDefaultHeaderMiddleware)

		/******************************************************************
		 SERVE by STAGING
		 ******************************************************************/
		common.Logger.Printf("[Server STAGING] %v", common.Staging)
		if common.Staging == "real"{
			// SSL/TLS
			certManager := autocert.Manager{
				Prompt: autocert.AcceptTOS,
				Cache:  autocert.DirCache("var/cert"),
			}
			server := &http.Server{
				Addr: fmt.Sprintf(":%v", common.HttpsPort),
				Handler: r,
				TLSConfig: &tls.Config{
					GetCertificate: certManager.GetCertificate,
				},
			}
			go http.ListenAndServe(fmt.Sprintf(":%v", common.HttpPort), certManager.HTTPHandler(nil))
			common.Logger.Fatal(server.ListenAndServeTLS("", ""))
		} else {
			server := &http.Server{
				Addr: fmt.Sprintf(":%v", common.HttpPort),
				Handler: r,
			}
			common.Logger.Fatal(server.ListenAndServe())
		}
		waitSignal.Done()
	}()
	waitSignal.Wait()
}