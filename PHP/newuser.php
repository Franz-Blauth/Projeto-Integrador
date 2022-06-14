<?php
session_start();
ini_set('default_charset','UTF-8');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$_SESSION['login']  = $login;
$_SESSION['passwd'] = $passwd;

$obj = json_decode($_POST["x"], false);

$sms_n    = "N";
$sms_y    = "Y";
$uniqid   = "";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
       or die ('Could not connect to the database server' . mysqli_connect_error());
mysqli_set_charset($con,"utf8");

$query="SELECT * FROM users WHERE sms='$sms_n' LIMIT 1";
$result=mysqli_query($con , $query);
$row=mysqli_fetch_assoc($result);

$uniqid = $row['uniqid'];

$myObj[0]->codarea     = $row['codarea'];
$myObj[0]->phone       = $row['phone'];
$myObj[0]->codactivate = $row['codactivate'];
$myJSON = json_encode($myObj);

$query="UPDATE users SET sms='$sms_y' WHERE uniqid='$uniqid'";
$result=mysqli_query($con , $query);

echo $myJSON;
?>
