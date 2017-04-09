/* constants and  configuration variables to be used by other functions */

function Constants() {   
    
    this.ONE_MILE_IN_KM = 1609;
    this.DEF_LAT = 28.6139; //default latitude - Rajpath, New Delhi, India
    this.DEF_LNG = 77.2090; // default longitude 
    this.TWEETS_UPDATE_INTERVAL = 30000; //update tweets after 30000 milliseconds
}

function Connection() {
 
    this.requestType = "GET";
    this.url = "";

    this.getRequestType = function() {
        return this.requestType;
    }

    this.getURL = function(user, id) {
        this.setURL(user, id);
        return this.url;
    }
    
    this.setURL = function(user, id) {
        //url to send data from ajax to twitter api via php
        this.url = "./src/ConnectToTwitter.php?lat=" + user.lat + "&lng=" + user.lng + "&since_id=" + id;
    }
}
