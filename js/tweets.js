/* tweets object and functions */

function Tweets(user, map) {

    this.queue = []; //list of tweets
    this.maxId = 0; //store the maxId of tweet to later get tweets with id more than this or new tweets
    this.text = ""; //combined text of all tweets
    this.htmlElem = ""; //tweets DOM element
    this.connection = {};

    this.showTweetsOnMap = function(conn, ts) {
        this.sendRequestToTwitter(conn, ts);
    }
   
    this.deleteOldTweets = function() {
        
        this.queue = [];
        this.maxId = 0;
        this.text = "";
    }

    this.sendRequestToTwitter = function(connection, ts) {
        
        $.ajax({
            type: connection.getRequestType(),
            url: connection.getURL(user, this.maxId),

            success: function(data) {
                ts.processTweets(data);
            },
            error: function() {
                utilities.showMessage("No data received from Twitter.");
            }
        });
    }

    //check if tweet is within user location
    //twitter sends some tweets which are outside even if we specify geocode with "1mi" parameter
    this.isTweetWithinUserArea = function(lat1, lng1, lat2, lng2) {
    
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lng1 - lng2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1)*Math.sin(radlat2) + Math.cos(radlat1)*Math.cos(radlat2)*Math.cos(radtheta);

        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;

        if(dist <= 1) return true; //1 mile
        else return false;
    }

    this.processTweets = function(data) {
    
        var parsed_data = JSON.parse(data);
        var ts = parsed_data.statuses;

        var numTweets = ts.length;

        for(var i=0;i<numTweets;i++) {
            var tweet = {};

            if(ts[i].coordinates) { 
                tweet.lng = ts[i].coordinates.coordinates[0];
                tweet.lat = ts[i].coordinates.coordinates[1];
            } else continue; //reject tweets with no coordinates

            if(!this.isTweetWithinUserArea(user.lat, user.lng, tweet.lat, tweet.lng)) continue;

            tweet = this.addTweetInfo(tweet, ts[i]);

            if(tweet.id>this.maxId) this.maxId = tweet.id;//get max tweet id

            this.queue.push(tweet);//add tweet to list of tweets
        }

        //twitter sends the same tweet for given since_id if there is no data
        //though since_id is not inclusive
        this.queue = this.removeDuplicateTweets(this.queue); 
        
        this.sortTweetsByTimeInDesc(this.queue); //show tweets in descending order
        this.keepOnly100Tweets(this.queue); //show atmost 100 tweets
        this.showTweets(this.queue);
    }

    this.addTweetInfo = function(tweet, t) {

        var imgSrc = "./img/red-dot.png";
        tweet.id = t.id;
        tweet.username = t.user.screen_name;
        tweet.text = t.text;
        tweet.latLng = map.createGoogleLatLng(tweet.lat, tweet.lng);
        tweet.marker = map.createGoogleMarker(tweet.latLng, imgSrc,tweet.text);

        return tweet;
    }

    this.removeDuplicateTweets = function(ts) {

        var new_arr = [];
        var lookup  = {};

        for (var i in ts) {
            lookup[ts[i]["id"]] = ts[i];
        }   

        //overwriting duplicate tweets
        for (i in lookup) {
            new_arr.push(lookup[i]);
        }

        return new_arr;
    }

    this.sortTweetsByTimeInDesc = function(ts) {
        ts.sort(function(a, b) {
            return parseInt(b.id) - parseInt(a.id);
        });
    }

    this.keepOnly100Tweets = function(ts) {
        if(ts.length>100) {
            for(i=100;i<ts.length;i++) ts.splice(i, 1);
        }
    }

    this.showTweets = function(ts) {

        this.htmlElem = document.getElementById("tweets");

        var color = utilities.getRandomColor();//get random color for tweets' text

        this.text = "";
        for(var i=0;i<ts.length;i++) {
            this.text +=  "<font color=\"" + color + "\">" + ts[i].marker.title + "</font><br/><br/>";
        }

        for(i=0;i<ts.length;i++) ts[i].marker.setVisible(true);//show tweets' markers

        this.htmlElem.innerHTML = "<b>Nearby tweets </b><br/><br/>" + this.text;
    }

    this.hideOldTweets = function() {

        for(var i=0;i<this.queue.length;i++) {
            this.queue[i].marker.setVisible(false);
            this.queue[i].marker.setMap(null);
        }
    }
}
