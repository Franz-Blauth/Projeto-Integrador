<?php
  session_start();
  ini_set('default_charset','UTF-8');
  header("Access-Control-Allow-Origin: *");

  include 'db.php';

  $_SESSION['login']  = $users;
  $_SESSION['passwd'] = $passwd;

  $obj = $_POST["x"], false);

  $uniqid = "";
  $name = "";
  $nickname = "";
  $email = "";
  $country = "";
  $codarea = "";
  $phone = "";
  $gender = "";
  $status = "";
  $firekey = "";
  $countimg = 0;
  $countmsg =0;
  $hourcreate = date('H:i');
  $datecreate = date('d/m/Y');
  $fotoprofile = "";
  $lastgroup = 0;
  $lasteve = 0;
  $passwd = "";
  $passwdhash = "";
  $model = "";
  $serial = "";
  $uuid = "";
  $baseok = "";

  $codarea    = $obj[0]->field;
  $phone      = $obj[1]->field;
  $passwd     = $obj[2]->field;
  $email      = $obj[3]->field;
  $phonemodel = $obj[4]->field;
  $phoneserial= $obj[5]->field;
  $phoneuuid  = $obj[6]->field;
  $country    = 55;
  $passwdhash = password_hash($obj[2]->field, PASSWORD_DEFAULT);
  $uniqid     = uniqid(NULL, true);

  $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
         or die ('Could not connect to the database server' . mysqli_connect_error());
  mysqli_set_charset($con,"utf8");

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

  if ($row == 0){
     $query="INSERT INTO users(uniqid, name, nickname, email, country, codarea, phone, gender, status, firekey, countimg, countmsg, hourcreate, datecreate, fotoprofile, lastgroup, lasteve, passwd, passwdhash, phonemodel, phoneserial, phoneuuid, baseok) VALUES('$uniqid','$name', '$nickname', '$email', '$country', '$codarea', '$phone', '$gender', '$status', '$firekey', $countimg, $countmsg, '$hourcreate', '$datecreate', '$fotoprofile', $lastgroup, $lasteve, '$passwd', '$passwdhash', '$phonemodel', '$phoneserial', '$phoneuuid', '$baseok')";
  }

  $save = mysqli_query($con, $query);

  if ($save){
      $myObj->uniqid     = $uniqid;
      $myObj->codarea    = $codarea;
      $myObj->phone      = $phone;
      $myObj->passwd     = $passwd;
      $myObj->passwdhash = $passwdhash;
      $myObj->country    = $country;
      $myObj->chkemail   = $chkemail;
      $myObj->chkphone   = $chkphone;

      $myJSON = json_encode($myObj);

      echo $myJSON;
  }
  else{
    echo $query;
  }

?>
