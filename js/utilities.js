/*miscellaneous functions */

function Utilities() {

    //generate random colour
    this.getRandomColor = function() {
        var color = "rgb(" + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + ")";
        return color;
    } 

    this.showErrorOnNoLatLngFromBrowser = function(error) {

        switch(error.code) {

            case error.PERMISSION_DENIED:
                this.showMessage("User denied the request for Geolocation");
                break;
            case error.POSITION_UNAVAILABLE:
                this.showMessage("User location information is unavailable.");
                break;
            case error.TIMEOUT:
                this.showMessage("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                this.showMessage("An unknown error occurred.");
                break;
        }
    }

    //custom dialog box
    this.showMessage = function(msg) {
        $("<div></div>").html(msg).dialog({
            buttons: {
                "Ok": function() {
                    $(this).dialog("close");
                }
            }
        });
    }

    //daemon to update tweets
    this.runJobContinuously = function(fn, timeInterval) {
        setInterval(fn, timeInterval);
    }
}
