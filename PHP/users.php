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
  $name     = "";
  $nickname = "";
  $baseok   = "";
  $sms      = "Y";

  $uniqid    = $obj[0]->field;
  $name      = $obj[1]->field;
  $nickname  = $obj[2]->field;
  $baseok    = "S";

  $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
         or die ('Could not connect to the database server' . mysqli_connect_error());

  mysqli_set_charset($con,"utf8");

  $query="UPDATE users SET name='$name', nickname='$nickname', baseok='$baseok', sms='$sms' WHERE uniqid='$uniqid'";

  $save = mysqli_query($con, $query);

  if ($save){
      $myObj[0]->baseok = $baseok;
      $myJSON = json_encode($myObj);
      echo $myJSON;
  }

?>
