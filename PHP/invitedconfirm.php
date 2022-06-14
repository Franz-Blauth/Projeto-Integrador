<?php
session_start();
ini_set('default_charset','UTF-8');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$_SESSION['login']  = $login;
$_SESSION['passwd'] = $passwd;

$obj = json_decode($_POST["x"], false);

$uniqidevent      = "";
$useridinvited    = "";

$count = count($obj);

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
       or die ('Could not connect to the database server' . mysqli_connect_error());

mysqli_set_charset($con,"utf8");

$uniqidevent      = $obj[0]->uniqidevent;
$useridinvited    = $obj[0]->useridinvited;
$yesorno          = $obj[0]->yesorno;
$dateconfirmation = "";

if($yesorno == "yes"){
  $dateconfirmation = date('d/m/Y');
}

$query="UPDATE invited SET dateconfirmation='$dateconfirmation' WHERE uniqidevent='$uniqidevent' AND useridinvited='$useridinvited'";
$save = mysqli_query($con, $query);

if($save){
  $myObj[0]->uniqidevent      = $uniqidevent;
  $myObj[0]->useridinvited    = $useridinvited;
  $myObj[0]->yesorno          = $yesorno;
}

$myJSON = json_encode($myObj);
echo $myJSON;
?>
