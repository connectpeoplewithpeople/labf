package common

import (
	"github.com/natefinch/lumberjack"
	"os"
	"log"
	"fmt"
	"io"
)

/******************************************************************
 LOGGING INITIALIZATION
 ******************************************************************/
var Logger *log.Logger

func InitalizeLogger() {
	os.MkdirAll(fmt.Sprintf("%v/var/log", BasePath), 0666)
	logFile, err := os.OpenFile(LogPath, os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmt.Printf("[Error] Opening log file: %v", err)
		os.Exit(1)
	}
	Logger = log.New(logFile, "", log.Ldate|log.Ltime|log.Lshortfile)
	fileLog := &lumberjack.Logger{
		Filename:   LogPath,
		MaxSize:    10, // megabytes after which new file is created
		MaxBackups: 14, // number of backups
		MaxAge:     7, //days
	}
	multiWriter := io.MultiWriter(fileLog, os.Stderr)
	Logger.SetOutput(multiWriter)
}