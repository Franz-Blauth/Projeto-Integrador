<?php
session_start();
ini_set('default_charset','UTF-8');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$_SESSION['login']  = $login;
$_SESSION['passwd'] = $passwd;
$_SESSION['token'] = "";
$_SESSION['jsoninvited'] = "";

$obj = json_decode($_POST["x"], false);

$id     = 0;
$indkey = 0;
$uniqidevent  = "";
$codarea      = "";
$phone        = "";
$dateinvited  = date('d/m/Y');
$count = count($obj);

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
       or die ('Could not connect to the database server' . mysqli_connect_error());

mysqli_set_charset($con,"utf8");

for($i = 0; $i < $count; $i++){

  $id           = $obj[$i]->id;
  $uniqidevent  = $obj[$i]->uniqidevent;
  $codarea      = $obj[$i]->codarea;
  $phone        = $obj[$i]->phone;

  $query="UPDATE invited SET dateinvited='$dateinvited' WHERE uniqidevent='$uniqidevent' AND codarea='$codarea' AND phone='$phone'";
  $save = mysqli_query($con, $query);

  $query="UPDATE invitedupdate SET dateinvited='$dateinvited' WHERE  uniqidevent='$uniqidevent' AND codarea='$codarea' AND phone='$phone'";
  $save = mysqli_query($con, $query);

  $numrow= "";
  $row= "";
  $uniqid="";
  $firekey="";
  $invitedwolppi="";

  $query="SELECT * FROM users WHERE codarea='$codarea' AND phone='$phone'";
  $result=mysqli_query($con , $query);
  $row=mysqli_fetch_assoc($result);

  if (count($row) > 0 and strlen($row['firekey']) > 15){
    $uniqid              = $row['uniqid'];
    $firekey             = $row['firekey'];
    $myObjtoken[$indkey] = $firekey;
    $invitedwolppi       = "N";
    $indkey              = $indkey + 1;
  }else{
    $uniqid              = $row['uniqid'];
    $invitedwolppi = "Y";
  }

  $myObj[$i]->idapp         = $id;
  $myObj[$i]->dateinvited   = $dateinvited;
  $myObj[$i]->uniqid        = $uniqid;
  $myObj[$i]->invitedwolppi = $invitedwolppi;
  $myObj[$i]->firekey       = $firekey;  //retirar depois somente para testes

}

$myJSON = json_encode($myObj);

$_SESSION['jsoninvited']=$myJSON;

//echo $myJSON;

if (count($myObjtoken) > 0){
  $_SESSION['token'] =$myObjtoken;
  header("Location: push.php");
}else{
  echo $_SESSION['jsoninvited'];
}

?>
