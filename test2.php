<?php
    $uniqueValue = hash('sha256', uniqid(rand(), true));
    $tmp = fopen("./tmp/".$uniqueValue, "w") or die("Unable to open file!");
    $sessionData = [];
    $sessionData["username"] = "zort";
    $sessionData["isLogged"] = true;
    $zort = serialize( $sessionData );
    fwrite($tmp, $zort);
    fclose($tmp);



    $tmp = fopen("./tmp/".$uniqueValue, "r") or die("Unable to open file!");
    $serialized = fread($tmp,filesize("./tmp/".$uniqueValue));
    $unserialized = unserialize( $serialized );
    echo $unserialized["username"];
?>