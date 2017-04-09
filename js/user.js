/* user object and functions */

function User() {

    this.lat = constants.DEF_LAT;
    this.lng = constants.DEF_LNG;
    this.latLng = new google.maps.LatLng(this.lat, this.lng);
    this.marker = {}; //marker for user
    this.area = {}; //area around user
    this.tweets = new Tweets(); //user's location corresponding tweets
    
    this.getLatLng = function() {
        return this.latLng;
    }
    
    this.setLatLng = function(lat, lng) {

        this.lat = lat;
        this.lng = lng;
        this.latLng = new google.maps.LatLng(this.lat, this.lng);
    }

    this.showUserOnMap = function(map) {
        this.showUserMarker(map);
        this.showUserArea(map);
    }

    this.showUserMarker = function(map) {

        var imgSrc = "./img/blue-dot.png";
        var title = "You are here";
        this.marker = map.createGoogleMarker(this.latLng, imgSrc, title);
    }

    this.showUserArea = function(map) {
        this.area = map.createGoogleCircle(this.latLng, map);
    }

    //get user location from browser
    this.getUserPositionFromBrowser = function() {

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.updateUserLatLngFromBrowser, utilities.showErrorOnNoPositionFromBrowser);
        } else {
            utilities.showMessage("Geolocation is not supported by this browser. Assigning default values.");
        }
    }
    
    this.repositionUser = function(posn) {

        this.repositionUserMarker(posn);
        this.repositionUserArea(posn);
        this.updateUserLatLng(posn);
    }
    
    this.repositionUserMarker = function(posn) {
        this.marker.setPosition(posn);
    }
    
    this.repositionUserArea = function(posn) {
        this.area.setCenter(posn);
    }
    
    this.updateUserLatLng = function(posn) {
        this.setLatLng(posn.lat(), posn.lng());
    }
    
    this.updateUserLatLngFromBrowser = function(posn) {
        this.setLatLng(posn.coords.latitude, posn.coords.longitude);
    }
}
