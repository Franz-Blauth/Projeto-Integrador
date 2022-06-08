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

  $id             = $obj[$i]->id;
  $id_User        = $obj[$i]->id_User;
  $name           = $obj[$i]->name;
  $email          = $obj[$i]->email;
  $phone          = $obj[$i]->phone;
  $cellPhone      = $obj[$i]->cellPhone;
  $contactPerson  = $obj[$i]->contactPerson;

  $queryUpdateBase = "UPDATE Provider SET name='$name', email='$email', phone='$phone', cellPhone='$cellPhone', contactPerson='$contactPerson' WHERE id='$id'";
  $saveUpdatebase = mysqli_query($con, $queryUpdateBase);

  $myObj[$i]->id = $id;

  $myJSON = json_encode($myObj, JSON_UNESCAPED_UNICODE);
  echo $myJSON;
?>