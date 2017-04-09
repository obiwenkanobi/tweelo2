function Map() {
    
    this.mapOptions = { IS_SCALE: true, 
                        ZOOM_LEVEL: 14
    };

    this.gMap = {};
    
    this.addSearchPlacesWidget = function(user) {

        var m = this;

        var boxHtmlElem = document.getElementById("searchPlacesBox");
        this.gMap.controls[google.maps.ControlPosition.TOP_LEFT].push(boxHtmlElem);

        var autocomplete = new google.maps.places.Autocomplete(boxHtmlElem);
        autocomplete.addListener('place_changed', function() {

            user.tweets.hideOldTweets();

            var place = autocomplete.getPlace();

            if(!place.geometry) {
                utilities.showMessage("Autocomplete's returned place contains no geometry");
                return;
            }

            var newPosn = place.geometry.location;

            m.repositionMap(newPosn);
            user.repositionUser(newPosn);

            user.tweets.deleteOldTweets();
            user.tweets.showTweetsOnMap(user.tweets.connection, user.tweets);
        });
    }
    
    this.createGoogleCircle = function(latLng, map) {
        
        var circle = new google.maps.Circle({

            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 0.05,
            fillColor: "#FF0000",
            fillOpacity: 0.07,
            map: map.gMap,
            center: latLng,
            radius: constants.ONE_MILE_IN_KM
        });
        return circle;
    }

    this.createGoogleLatLng = function(lat, lng) {
        return new google.maps.LatLng(lat, lng);
    }
    
    this.createGoogleMarker = function(posn, imgSrc, title) {
        var marker = new google.maps.Marker({
            position: posn,
            map: this.gMap,
            icon: imgSrc,
            title: title,
            visible: true
        });

        return marker;
    }

    this.repositionMap = function(position) {
        this.gMap.setCenter(position);
    }            

    this.showMap = function(user) {

        var mapSettings = {
            zoom: this.mapOptions.ZOOM_LEVEL,
            center: user.latLng,
            scaleControl: this.mapOptions.IS_SCALE
        }

        this.gMap = new google.maps.Map(document.getElementById("map"), mapSettings);

        this.addSearchPlacesWidget(user);
    }			
}
