<?php
  session_start();
  ini_set('default_charset','UTF-8');
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

  include 'db.php';

  $_SESSION['login']  = $login;
  $_SESSION['passwd'] = $passwd;

  $obj = json_decode($_POST["x"], false);

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
  $lastgroup = 0;
  $lasteve = 0;
  $passwd = "";
  $passwdhash = "";
  $model = "";
  $serial = "";
  $uuid = "";
  $baseok = "";
  $eraseok = "";
  $dateoff = "";
  $photoprofile = "nophoto.png";

  $codarea     = $obj[0]->codarea;
  $phone       = $obj[0]->phone;
  $passwd      = $obj[0]->passwd;
  $email       = $obj[0]->email;
  $phonemodel  = $obj[0]->model;
  $phoneserial = $obj[0]->serial;
  $phoneuuid   = $obj[0]->uuid;
  $codactivate = $obj[0]->codactivate;
  $firekey     = $obj[0]->firekey;
  $country     = 55;
  $passwdhash  = password_hash($obj[0]->passwd, PASSWORD_DEFAULT);
  $uniqid      = uniqid(NULL, true);
  $enila       = "daughter";
  $rotiv       = "son";
  $sms         = "N";

  $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
         or die ('Could not connect to the database server' . mysqli_connect_error());
  mysqli_set_charset($con,"utf8");

  $chkphone = "";
  $chkemail = "";
  $opendoor = "";

  $row= "";
  $query="SELECT * FROM users WHERE email = '$email'";
  $result=mysqli_query($con , $query);
  $row=mysqli_num_rows($result);

  $opendoor = $row['$opendoor'];

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
     $query="INSERT INTO users(uniqid, name, nickname, email, country, codarea, phone, gender, status, firekey, countimg, countmsg, hourcreate, datecreate, lastgroup, lasteve, passwd, passwdhash, phonemodel, phoneserial, phoneuuid, baseok, eraseok, dateoff, photoprofile, sms, codactivate) VALUES('$uniqid','$name', '$nickname', '$email', '$country', '$codarea', '$phone', '$gender', '$status', '$firekey', $countimg, $countmsg, '$hourcreate', '$datecreate', $lastgroup, $lasteve, '$passwd', '$passwdhash', '$phonemodel', '$phoneserial', '$phoneuuid', '$baseok', '$eraseok', '$dateoff','$photoprofile', '$sms', '$codactivate' )";
  }

  $uniqid2  = "upload/" . $uniqid . ".jpg";
  $content = file_get_contents("upload/perfil.jpg");
  $fp = fopen($uniqid2, "w");
  fwrite($fp, $content);
  fclose($fp);

  $save = mysqli_query($con, $query);

  if ($save){
      $myObj[0]->uniqid     = $uniqid;
      $myObj[0]->codarea    = $codarea;
      $myObj[0]->phone      = $phone;
      $myObj[0]->passwd     = $passwd;
      $myObj[0]->passwdhash = $passwdhash;
      $myObj[0]->country    = $country;
      $myObj[0]->chkemail   = $chkemail;
      $myObj[0]->chkphone   = $chkphone;
      $myObj[0]->opendoor   = $opendoor;

      $myJSON = json_encode($myObj);

      echo $myJSON;
  }

?>
