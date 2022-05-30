#!/bin/sh

# This is a bash script to increase the inotify file limit from 8192 default in MX Linux
# to 500000+ limit, in order to work on some projects with a lot of dependencies and files
# (such as React or Node.js projects)

# This is only temporary, will last until reboot

sudo sysctl fs.inotify.max_user_watches=524288
sudo sysctl -p
