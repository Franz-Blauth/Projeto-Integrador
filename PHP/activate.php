<?php
session_start();
ini_set('default_charset','UTF-8');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$_SESSION['login']  = $login;
$_SESSION['passwd'] = $passwd;

$obj = json_decode($_POST["x"], false);

$uniqid      = "";
$codarea     = "";
$phone       = "";
$codactivate = "";

$uniqid      = $obj[0]->uniqid;
$codarea     = $obj[0]->codarea;
$phone       = $obj[0]->phone;
$codactivate = $obj[0]->codactivate;

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
       or die ('Could not connect to the database server' . mysqli_connect_error());
mysqli_set_charset($con,"utf8");

$query   ="SELECT * FROM users WHERE uniqid='$uniqid' AND codarea='$codarea' AND phone='$phone'";
$result  = mysqli_query($con , $query);
$row_cnt = mysqli_num_rows($result);
$row=mysqli_fetch_assoc($result);

if($codactivate == $row['codactivate']){
  $myObj[0]->codactivate = "YES";
}else{
  $myObj[0]->codactivate = "NO";
}

if($row_cnt == 0){
  $myObj[0]->codactivate = "NO";
}

$myJSON = json_encode($myObj);

echo $myJSON;
?>
