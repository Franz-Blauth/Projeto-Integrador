<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_GET["x"], false);
$times = $obj[0]->times;

 for( $i = 0; $i < $times; $i++){
   $uniqid = uniqid(NULL, true);
   $str = "ui" . (string)$i;
   $myObj->$str = $uniqid;
 }
   $myJSON = json_encode($myObj);
   echo $myJSON;

?>
