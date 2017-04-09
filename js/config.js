function Constants() {   
    
    this.ONE_MILE_IN_KM = 1609;
    this.DEF_LAT = 28.6139;
    this.DEF_LNG = 77.2090;
    this.TWEETS_UPDATE_INTERVAL = 30000;
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
        this.url = "./src/ConnectToTwitter.php?lat=" + user.lat + "&lng=" + user.lng + "&since_id=" + id;
    }
}
