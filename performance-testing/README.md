Stopgap method for performance testing the census-atlas prototype.
Usage:
- navigate to local instance of census-atlas web app
- once app has loaded, open dev tools, copy contents of `crawl-atlas-protoype-load-all-indicators.js` into the console, and hit enter
- wait for a long time while the script iterates through all the indicator radio buttons
- right-click on the console and hit 'save as', then save the log as a .log file
- run log_dump_to_csv.sh with the name of your logfile as an argument to convert the .log to .csv
(NB - WIP, Dans websocket reciever to go here)
