<?php

    require_once("../lib/TwitterAPIExchange.php"); //wrapper to talk with twitter api
    require_once("../lib/config.php"); //stores twitter authentication keys

    $conn_settings = array(
        "oauth_access_token" => $OAUTH_ACCESS_TOKEN,
        "oauth_access_token_secret" => $OAUTH_ACCESS_TOKEN_SECRET,
        "consumer_key" => $CONSUMER_KEY,
        "consumer_secret" => $CONSUMER_SECRET
    );

    $url = "https://api.twitter.com/1.1/search/tweets.json";
    $request_method = "GET";

    //getting params from the ajax call
    $lat = $_GET["lat"];
    $lng = $_GET["lng"];
    $since_id = $_GET["since_id"];

    //setting params to default values if they are not set
    if($lat==0 || !isset($lat)) $lat = 28.6139;
    if($lng==0 || !isset($lng)) $lng = 77.2090;
    if(!isset($since_id)) $since_id = 0;

    $params = "?q=&geocode=" . $lat . "," . $lng . ",1mi" .
                        "&since_id=" . $since_id . 
                        "&count=100" . 
                        "&result_type=recent";

    $twitter_conn = new TwitterAPIExchange($conn_settings);

    $data = $twitter_conn->setGetfield($params)
                           ->buildOauth($url, $request_method)
                             ->performRequest();

    //sending back data to ajax success function
    echo $data;
?>
