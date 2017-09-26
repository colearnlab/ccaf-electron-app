#!/bin/bash

TABLETNUM=1
STREAMURL=https://csteps.education.illinois.edu:8090

start() {
    ffmpeg -f dshow -i audio="Microphone Array (Realtek High Definition Audio(SST))" ${STREAMURL}/feed${TABLETNUM}.ffm 1>/dev/null 2>&1 &
}

stop() {
    for pid in $(ps -s | grep ffmpeg | awk '{print $1;}'); do
        kill -2 $pid ;
    done
}

# run start or stop
$1

