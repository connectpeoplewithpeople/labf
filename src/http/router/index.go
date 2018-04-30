package router

import (
	"net/http"
	"fmt"
	"common"
)

func GetIndex(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/prod/", http.StatusSeeOther)
}

func GetFavicon(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, fmt.Sprintf("%v/angular/prod/favicon.ico", common.BasePath))
}