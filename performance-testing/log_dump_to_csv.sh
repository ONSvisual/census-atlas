#!/bin/bash

logfile=$1
csvfile=$(echo $logfile | cut -f1 -d'.').csv
echo "data_file, load_and_process_time_ms" > "$csvfile"
cat "$logfile" | grep 'performance:' | sed 's/.*performance://' | sed 's/:/,/' >> "$csvfile"
