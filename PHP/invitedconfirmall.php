<?php
session_start();
ini_set('default_charset','UTF-8');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$_SESSION['login']  = $login;
$_SESSION['passwd'] = $passwd;

$obj = json_decode($_POST["x"], false);

$uniqidevent = $obj[0]->uniqidevent;
$objevent = [];
$i = 0;

$con =  new mysqli($host, $user, $password, $dbname, $port, $socket)
        or die ('Could not connect to the database server' . mysqli_connect_error());
        mysqli_set_charset($conecta, "utf8");

$important = "V&A";

$query  = "SELECT * FROM invited WHERE uniqidevent='$uniqidevent'";
$result = mysqli_query($con , $query);

while ($row = mysqli_fetch_assoc($result)) {

  $objevent[$i]->uniqidevent      = $row['uniqidevent'];
  $objevent[$i]->useridinvited    = $row['useridinvited'];
  $objevent[$i]->dateconfirmation = $row['dateconfirmation'];

  $i++;
}

$myJSON = json_encode($objevent, JSON_UNESCAPED_UNICODE);
echo $myJSON;
?>
