<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="./css/jquery-ui.css">
        <link rel="stylesheet" type="text/css" href="./css/style.css">
        <script type="text/javascript" src="./js/config.js"></script>
        <script type="text/javascript" src="./js/jquery.js"></script>
        <script type="text/javascript" src="./js/jquery-ui.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyACh2jGc1p42W7rt57RLLg7uImPZd0mC7w&libraries=places"></script>
        <script type="text/javascript" src="./js/utilities.js"></script>
        <script type="text/javascript" src="./js/map.js"></script>
        <script type="text/javascript" src="./js/tweets.js"></script>
        <script type="text/javascript" src="./js/user.js"></script>
        <script>
            var constants = new Constants();
            var utilities = new Utilities();
            
            $(document).ready(function() {
                main();
            });

            function main() {

                var user = new User();

                //when page loads first time, it gets user location from browser        
                user.getUserPositionFromBrowser();

                var map = new Map();
                map.showMap(user); //load google map

                user.showUserOnMap(map); //show user and 1 mile circle on map

                user.tweets = new Tweets(user, map);
                
                user.tweets.connection = new Connection();
                user.tweets.showTweetsOnMap(user.tweets.connection, user.tweets); // fetch tweets and display them on map

                //fetch tweets after a fixed interval
                utilities.runJobContinuously(function() {user.tweets.showTweetsOnMap(user.tweets.connection, user.tweets);}, 
                                                    constants.TWEETS_UPDATE_INTERVAL);
            }
		</script>
	</head>
    <body>
        <b style="font-size=100px">Tweets on map</b>
        <img src="./img/tweet.webp" height="40" width="40"/>
        <br/> 
        <br/> 
        <div style="width:100%;">
            <input id="searchPlacesBox" class="controls" type="text" placeholder="Enter a location">
		    <div id="map"></div>
            
            <div id="tweets"></div>
        </div>
	</body>
</html>
