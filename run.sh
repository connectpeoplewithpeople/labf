#!/bin/bash

##################################################################
# DEFAULT PATH
##################################################################
PACKAGE_PATH=/root/env/package
GOROOT=${PACKAGE_PATH}/go
GOPATH=$(cd "$(dirname "$0")" && pwd)
GOBIN=${GOPATH}/bin
DOWNLOAD_PATH=${GOPATH}/var/download
PATH=$PATH:${GOROOT}/bin

STAGING=real

DATABASE_ADDR=labf.co.kr
DATABASE_ID=labf
DATABASE_PW=q2w3e4!@#
export GOROOT GOPATH PATH STAGING DATABASE_ADDR DATABASE_ID DATABASE_PW

##################################################################
# DIRECTORY
##################################################################
mkdir -p ${PACKAGE_PATH} ${GOPATH}/var/log ${GOPATH}/var/db ${GOPATH}/var/cert ${GOPATH}/pkg ${GOPATH}/bin

##################################################################
# COMMANDS
# [!} Local : ng serve
##################################################################
case $1 in
    compose)
        rm -rf ${DOWNLOAD_PATH}
        mkdir -p ${DOWNLOAD_PATH}
        cd ${DOWNLOAD_PATH}

        # npm
        yum update -y openssl
        yum install -y epel-release
        yum install -y npm

        # mariadb
        wget -O /etc/yum.repos.d/MariaDB.repo http://mariadb.if-not-true-then-false.com/rhel/$(rpm -E %rhel)/$(uname -i)/10_1
        yum install -y mariadb mariadb-server
        rm -rf /etc/yum.repos.d/MariaDB.repo
        echo "[mariadb]" > /etc/yum.repos.d/MariaDB.repo
        echo "name = MariaDB" >> /etc/yum.repos.d/MariaDB.repo
        echo "baseurl = http://yum.mariadb.org/10.1/rhel7-amd64" >> /etc/yum.repos.d/MariaDB.repo
        echo "gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB" >> /etc/yum.repos.d/MariaDB.repo
        echo "gpgcheck=1" >> /etc/yum.repos.d/MariaDB.repo
        yum install -y mariadb mariadb-server

        # go
        wget https://dl.google.com/go/go1.9.2.linux-amd64.tar.gz
        tar xvfz go1.9.2.linux-amd64.tar.gz
        rm -rf ${PACKAGE_PATH}/go
        mv go ${PACKAGE_PATH}

        # go package
        cd ${GOPATH}

        go get -u github.com/robfig/cron
        go get -u github.com/gorilla/mux
        go get -u github.com/google/uuid
        go get -u github.com/gorilla/websocket
        go get -u github.com/go-sql-driver/mysql
        go get -u github.com/natefinch/lumberjack
        go get -u golang.org/x/crypto/acme/autocert

        # angular cli
        npm install -g @angular/cli

        # angular third party
        cd ${GOPATH}/angular
        npm install
    ;;
    build)
        cd ${GOPATH}/src
        go build labf.go
        rm -rf ${GOPATH}/bin/labf
        mv ${GOPATH}/src/labf ${GOPATH}/bin

        cd ${GOPATH}/angular
        ng build --prod --aot --base-href /prod/ --output-path=prod_
        rm -rf prod
        mv prod_ prod
        #ng build --base-href /prod/ --output-path=prod
    ;;
    build-go)
        cd ${GOPATH}/src
        go build labf.go
        rm -rf ${GOPATH}/bin/labf
        mv ${GOPATH}/src/labf ${GOPATH}/bin
    ;;
    build-angular)
        cd ${GOPATH}/angular
        ng build --prod --aot --base-href /prod/ --output-path=prod_
        rm -rf prod
        mv prod_ prod
        #ng build --base-href /prod/ --output-path=prod
    ;;
    start)
        nohup ${GOPATH}/bin/labf > /dev/null &
    ;;
    stop)
        kill -9 $(ps aux | grep -v grep | grep labf | awk '{print $2;}')
    ;;
    db-start)
        systemctl start mariadb
    ;;
    db-stop)
        systemctl stop mariadb
    ;;
    *)
        echo './run.sh { compose | build | start | stop | db-start | db-stop | build | build-go | build-angular }'
    ;;
esac