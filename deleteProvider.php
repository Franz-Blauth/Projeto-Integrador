<?php
  error_reporting(E_ERROR | E_PARSE);

  include '../Configuration/db.php';

  $_SESSION['login']  = $login;
  $_SESSION['passwd'] = $passwd;

  $data = json_decode(file_get_contents('php://input'));
  $obj = [$data];

  $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
  or die('Could not connect to the database server' . mysqli_connect_error());

  mysqli_set_charset($con, "utf8");

  $id = $obj[$i]->id;

  $query = "DELETE FROM Provider WHERE id='$id' LIMIT 1";
  $save  = mysqli_query($con, $query);

  $myObj[$i]->id = $id;

  $myJSON = json_encode($myObj, JSON_UNESCAPED_UNICODE);
  echo $myJSON;

?>
