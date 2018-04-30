package common

import (
	"fmt"
	"net/http"
)

func SetError(w http.ResponseWriter, statusCode int, errorCode int, message string) {
	w.WriteHeader(statusCode)
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	fmt.Fprintf(w, "{\"status\":%v,\"errorCode\":%v\"message\":\"%v\"}", statusCode, errorCode, message)
}