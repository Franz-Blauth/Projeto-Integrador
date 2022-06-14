<?php
  header("Access-Control-Allow-Origin: *");

  include 'db.php';

  $obj = json_decode($_POST["x"], false);

  $uniqid  = "";
  $codarea = "";
  $phone   = "";

  $uniqid  = $obj[0]->uniqid;

  $con =  new mysqli($host, $user, $password, $dbname, $port, $socket)
          or die ('Could not connect to the database server' . mysqli_connect_error());

  $query  = "SELECT * FROM users WHERE uniqid='$uniqid'";
  $result = mysqli_query($con , $query);
  $row    = mysqli_num_rows($result);
  echo $row;
?>
