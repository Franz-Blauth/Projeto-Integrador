<?php
session_start();
ini_set('default_charset','UTF-8');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$_SESSION['login']  = $login;
$_SESSION['passwd'] = $passwd;

$obj = json_decode($_POST["x"], false);

$id          = 0;
$uniqidevent = "";
$codarea     = "";
$phone       = "";

$count = count($obj);

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
       or die ('Could not connect to the database server' . mysqli_connect_error());

mysqli_set_charset($con,"utf8");

for($i = 0; $i < $count; $i++){

  $id          = $obj[$i]->id;
  $uniqidevent = $obj[$i]->uniqidevent;
  $codarea     = $obj[$i]->codarea;
  $phone       = $obj[$i]->phone;

  $query="DELETE FROM invited       WHERE uniqidevent='$uniqidevent' AND idapp='$id' AND codarea='$codarea' AND phone='$phone'";
  $save = mysqli_query($con, $query);

  if($save){
    $myObj[$i]->id = $id;
  }

  $query="DELETE FROM invitedupdate WHERE uniqidevent='$uniqidevent' AND idapp='$id' AND codarea='$codarea' AND phone='$phone'";
  $save = mysqli_query($con, $query);

}

$myJSON = json_encode($myObj);
echo $myJSON;

?>
