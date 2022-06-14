<?php
  session_start();
  ini_set('default_charset','UTF-8');
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

  include 'db.php';

  $_SESSION['login']  = $login;
  $_SESSION['passwd'] = $passwd;

  $obj = json_decode($_POST["x"], false);

  $uniqid      = $obj[0]->uniqidevent;
  $name        = "";
  $datestart   = "";
  $timestart   = "";
  $datefinish  = "";
  $timefinish  = "";
  $local       = "";
  $info        = "";
  $activity    = "";

  $objevent = [];
  $rowusers = "";

  $con =  new mysqli($host, $user, $password, $dbname, $port, $socket)
          or die ('Could not connect to the database server' . mysqli_connect_error());
          mysqli_set_charset($con, "utf8");


  $query_users  = "SELECT * FROM event WHERE uniqid='$uniqid'";
  $result_users = mysqli_query($con , $query_users);
  $rowusers     = mysqli_fetch_assoc($result_users);

    $objevent[0]->uniqid     = $rowusers['uniqid'];
    $objevent[0]->name       = $rowusers['name'];
    $objevent[0]->datestart  = $rowusers['datestart'];
    $objevent[0]->timestart  = $rowusers['timestart'];
    $objevent[0]->datefinish = $rowusers['datefinish'];
    $objevent[0]->timefinish = $rowusers['timefinish'];
    $objevent[0]->local      = $rowusers['local'];
    $objevent[0]->info       = $rowusers['info'];
    $objevent[0]->activity   = $rowusers['activity'];

  $myJSON = json_encode($objevent, JSON_UNESCAPED_UNICODE);
  echo $myJSON;

?>
