<?php
/*This script gets the address from the post variable, adds the API key to it, grabs the data from the open weather API and returns it to the calling script. This could all be done on the front end, but by doing it on the server it should protect the API key from being seen, while still enabling access to the data */
$address=$_POST['addyval'];

$weatherData = file_get_contents($address.="YOUR+API+KEY");

echo $weatherData;


?>

