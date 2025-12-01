#!/bin/bash
cd /home/lepetit/private/app
/usr/local/bin/php.cli artisan schedule:run >> /home/lepetit/private/app/storage/logs/schedule.log 2>&1