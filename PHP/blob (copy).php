<?php
  session_start();
  ini_set('default_charset','UTF-8');
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

  include 'db.php';

  $_SESSION['login']  = $login;
  $_SESSION['passwd'] = $passwd;

  $obj = json_decode($_POST["x"], false);
  $field   = $obj[0]->field;
  $type    = $obj[1]->field;
  $userid  = $obj[2]->field;

  $myObj->field     = $field;
  $myObj->type      = $type;
  $myObj->userid    = $userid;

  $myJSON = json_encode($myObj);

  $id = 324;

  $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
         or die ('Could not connect to the database server' . mysqli_connect_error());
  mysqli_set_charset($con,"utf8");

  $query="UPDATE users SET  photoprofile='$field', lasteve=345 WHERE id=324";

  $save = mysqli_query($con, $query);

  echo $myJSON;
?>
