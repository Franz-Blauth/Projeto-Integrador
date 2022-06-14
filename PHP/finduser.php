<?php
  session_start();
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

  include 'db.php';

  $_SESSION['login']  = $login;
  $_SESSION['passwd'] = $passwd;

  $obj = json_decode($_POST["x"], false);

  $codarea    = $obj[0]->field;
  $phone      = $obj[1]->field;
  $email      = $obj[3]->field;

  $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
         or die ('Could not connect to the database server' . mysqli_connect_error());

  $chkphone = "";
  $chkemail = "";

  $row= "";
  $query="SELECT * FROM users WHERE email = '$email'";
  $result=mysqli_query($con , $query);
  $row=mysqli_num_rows($result);

  if ($row != 0){
     $chkemail = "email";
  }
   $row= "";
   $query="SELECT * FROM users WHERE codarea = '$codarea' AND phone = '$phone'";
   $result=mysqli_query($con , $query);
   $row= mysqli_num_rows($result);

   if ($row != 0){
      $chkphone = "phone";
    }

  if ($result){
      $myObj->uniqid     = $uniqid;
      $myObj->codarea    = $codarea;
      $myObj->phone      = $phone;
      $myObj->passwd     = $passwd;
      $myObj->passwdhash = $passwdhash;
      $myObj->country    = $country;
      $myObj->chkphone   = $chkphone;
      $myObj->chkemail   = $chkemail;

      $myJSON = json_encode($myObj);

      echo $myJSON;
  }
  else{
    echo 'Não foi possivel checar Informações';
  }

?>
