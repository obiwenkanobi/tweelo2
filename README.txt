Description
===========
The code here is a web application. 
It captures the user's location from the browser and tries to display atmost 100 tweets in the nearby 1 mile radius. 
It displays those tweets alongside. 
The user can see tweets around other places by entering the location in the search box.


Files
=====

<filename> - <contains>

./css/jquery-ui.css - css for the custom dialog box
./css/style.css - css for the map, tweets and search box

./img/blue-dot.png - blue marker
./img/red-dot.png - red marker
./img/tweet.webp - gif of tweet bird

./index.php - main file to show map, show user on map, show tweets and get more tweets after fixed interval

./js/config.js - constants and connection parameters
./js/jquery.js - jquery library
./js/jquery-ui.js - jquery ui library
./js/map.js - map object and functions
./js/tweets.js - tweets object and functions
./js/user.js - user object and functions 
./js/utilities.js - miscellaneous functions

./lib/config.php - twitter credentials
./lib/TwitterAPIExchange.php - wrapper to talk with twitter api

./README.txt - that's me!

./src/ConnectToTwitter.php - gets request from user and talks with twitter API to get data which is passed back

