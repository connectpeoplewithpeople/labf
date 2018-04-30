package api

import (
	"fmt"
	"net/http"
)

func GetStatus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	fmt.Fprintf(w, "{\"status\":\"OK\"}")
}