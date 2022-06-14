<?php
session_start();
ini_set('default_charset','UTF-8');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$_SESSION['login']  = $login;
$_SESSION['passwd'] = $passwd;

$obj = json_decode($_POST["x"], false);

$uniqid   = "";
$codarea  = "";
$phone    = "";
$opendoor = "opendoor";

$uniqid  = $obj[0]->uniqid;
$codarea = $obj[0]->codarea;
$phone   = $obj[0]->phone;

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
       or die ('Could not connect to the database server' . mysqli_connect_error());

$query="UPDATE invited SET useridinvited='$uniqid' WHERE codarea='$codarea' AND phone='$phone'";
$result=mysqli_query($con , $query);

$query="UPDATE invitedupdate SET useridinvited='$uniqid' WHERE codarea='$codarea' AND phone='$phone'";
$result=mysqli_query($con , $query);

$query="UPDATE users SET opendoor='$opendoor' WHERE codarea='$codarea' AND phone='$phone'";
$result=mysqli_query($con , $query);

echo "Vamos Nessa Catatau ";
?>
