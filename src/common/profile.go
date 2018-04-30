package common

import (
	"os"
	"fmt"
)
/******************************************************************
 DIRECTORY
 ******************************************************************/
var BasePath string = os.Getenv("GOPATH")
var Staging string = os.Getenv("STAGING")

/******************************************************************
 LOG CONFIGURATION
 ******************************************************************/
const LogFileName string = "app.log"
var LogPath string = fmt.Sprintf("%v/var/log/%v", BasePath, LogFileName)

/******************************************************************
 SERVER CONFIGURATION
 ******************************************************************/
const HttpPort int = 81 // default 80
const HttpsPort int = 444 // default 443

/******************************************************************
 MARIADB CONFIGURATION
 ******************************************************************/
var DatabaseAddr string = os.Getenv("DATABASE_ADDR")
var DatabaseID string = os.Getenv("DATABASE_ID")
var DatabasePW string = os.Getenv("DATABASE_PW")
const DatabasePort int = 3306 // default 3306, share
const DatabaseName string = "cpwp"
