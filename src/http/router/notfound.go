package router

import (
	"fmt"
	"io/ioutil"
	"common"
	"net/http"
)

func NotFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusNotFound)

	body, err := ioutil.ReadFile(fmt.Sprintf("%v/static/common/error/page-not-found.html", common.BasePath))
	if err != nil {
		body = []byte("404 NotFound")
	}
	fmt.Fprintf(w, "%s", body)
}