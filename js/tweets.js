function Tweets(user, map) {

    this.queue = []; 
    this.maxId = 0; 
    this.text = ""; 
    this.htmlElem = "";
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
            } else continue;

            if(!this.isTweetWithinUserArea(user.lat, user.lng, tweet.lat, tweet.lng)) continue;

            tweet = this.addTweetInfo(tweet, ts[i]);

            if(tweet.id>this.maxId) this.maxId = tweet.id;

            this.queue.push(tweet);
        }

        this.queue = this.removeDuplicateTweets(this.queue);
        this.sortTweetsByTimeInDesc(this.queue);
        this.keepOnly100Tweets(this.queue);
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

        var color = utilities.getRandomColor();

        this.text = "";
        for(var i=0;i<ts.length;i++) {
            this.text +=  "<font color=\"" + color + "\">" + ts[i].marker.title + "</font><br/><br/>";
        }

        for(i=0;i<ts.length;i++) ts[i].marker.setVisible(true);

        this.htmlElem.innerHTML = "<b>Nearby tweets </b><br/><br/>" + this.text;
    }

    this.hideOldTweets = function() {

        for(var i=0;i<this.queue.length;i++) {
            this.queue[i].marker.setVisible(false);
            this.queue[i].marker.setMap(null);
        }
    }
}
