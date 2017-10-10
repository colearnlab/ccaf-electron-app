#!/bin/bash

TABLETNUM=1
STREAMURL=http://csteps.education.illinois.edu:8090

start() {
    ./ffmpeg.exe -f dshow -i audio="Microphone Array (Realtek High Definition Audio(SST))" ${STREAMURL}/feed${TABLETNUM}.ffm 
}

stop() {
    for pid in $(ps -s | grep ffmpeg | awk '{print $1;}'); do
        kill -2 $pid ;
    done
}

# run start or stop
$1

