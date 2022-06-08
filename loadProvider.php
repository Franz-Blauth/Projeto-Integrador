<?php
  error_reporting(E_ERROR | E_PARSE);

  include '../Configuration/db.php';

  $_SESSION['login']  = $login;
  $_SESSION['passwd'] = $passwd;

  $data = json_decode(file_get_contents('php://input'));
  $obj = [$data];

  $id = $obj[0]->id_User;
  $i = 0;

  $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
    or die('Could not connect to the database server' . mysqli_connect_error());

  $queryProvider  = "SELECT * FROM Provider WHERE id='$id' LIMIT 1";
  $resultProvider = mysqli_query($con, $queryProvider);

  mysqli_set_charset($con, "utf8");

  $myObj[$i]->id_User = "";
  $myObj[$i]->id = $row['id'];
  $myObj[$i]->name = "";
  $myObj[$i]->email = "";
  $myObj[$i]->phone = "";
  $myObj[$i]->cellPhone = "";
  $myObj[$i]->contactPerson = "";
  $myObj[$i]->operation = "delete";

  $myJSON = json_encode($myObj, JSON_UNESCAPED_UNICODE);
  echo $myJSON;
?>