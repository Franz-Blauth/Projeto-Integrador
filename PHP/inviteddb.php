<?php
session_start();
ini_set('default_charset','UTF-8');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$_SESSION['login']  = $login;
$_SESSION['passwd'] = $passwd;

$obj = json_decode($_POST["x"], false);

$idapp = 0;
$uniqidevent = "";
$useridinvited = "";
$invitedname = "";
$codarea = "";
$phone = "";
$invitedphoto = "";
$datelist = "";
$dateinvited = "";
$dateconfirmation = "";
$invitedtowolppi = "";
$createevent = "";
$baseok = 0;
$eraseok = 0;
$datecreate = date('d/m/Y');
$hourcreate = date('H:i');
$codarea_control = "";
$phone_control = "";
$k = 0;

$count = count($obj);

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
       or die ('Could not connect to the database server' . mysqli_connect_error());

mysqli_set_charset($con,"utf8");

for($i = 0; $i < $count; $i++){

  $uniqidevent      = $obj[$i]->uniqidevent;
  $codarea          = $obj[$i]->codarea;
  $phone            = $obj[$i]->phone;

  $query  = "SELECT * FROM invited WHERE uniqidevent='$uniqidevent' AND codarea='$codarea' AND phone='$phone'";
  $result = mysqli_query($con , $query);
  $numrowscheckinvited=mysqli_num_rows($result);

  if($numrowscheckinvited == 0){

    $query  = "SELECT * FROM invited WHERE uniqidevent='$uniqidevent'";
    $resultinvitedcheck = mysqli_query($con , $query);

    while ($rowsinvited = mysqli_fetch_assoc($resultinvitedcheck)) {
      $idapp            = $rowsinvited['idapp'];
      $uniqidevent      = $rowsinvited['uniqidevent'];
      $useridinvited    = $rowsinvited['useridinvited'];
      $invitedname      = $rowsinvited['invitedname'];
      $codarea          = $rowsinvited['codarea'];
      $phone            = $rowsinvited['phone'];
      $invitedphoto     = "";
      $datelist         = $rowsinvited['datelist'];
      $dateinvited      = $rowsinvited['dateinvited'];
      $dateconfirmation = $rowsinvited['dateconfirmation'];
      $invitedtowolppi  = $rowsinvited['invitedtowolppi'];
      $createevent      = $rowsinvited['createevent'];
      $baseok           = $rowsinvited['baseok'];
      $eraseok          = $rowsinvited['eraseok'];
      $datecreate       = date('d/m/Y');
      $hourcreate       = date('H:i');
      $codarea_control  = $obj[$i]->codarea;
      $phone_control    = $obj[$i]->phone;

      $query="INSERT INTO invitedupdate (idapp, uniqidevent, useridinvited, invitedname, codarea, phone, invitedphoto, datelist, dateinvited, dateconfirmation, invitedtowolppi, createevent, baseok, eraseok, datecreate, hourcreate, codareacontrol, phonecontrol) VALUES('$idapp', '$uniqidevent', '$useridinvited', '$invitedname', '$codarea', '$phone', '$invitedphoto', '$datelist', '$dateinvited', '$dateconfirmation', '$invitedtowolppi', '$createevent', '$baseok', '$eraseok', '$datecreate', '$hourcreate', '$codarea_control', '$phone_control')";
      $save = mysqli_query($con, $query);
    }
  }
}

for($i = 0; $i < $count; $i++){

  $uniqidevent      = $obj[$i]->uniqidevent;
  $codarea          = $obj[$i]->codarea;
  $phone            = $obj[$i]->phone;

  $query="SELECT * FROM users WHERE codarea='$codarea' AND phone='$phone'";
  $resultuser=mysqli_query($con , $query);
  $numrowsuser=mysqli_num_rows($resultuser);

  if($numrowsuser !=0){
    $rowsuser=mysqli_fetch_assoc($resultuser);
    $useridinvited = $rowsuser['uniqid'];
  }else{
    $useridinvited = $obj[$i]->useridinvited;
  }

  $idapp            = $obj[$i]->idapp;
  $uniqidevent      = $obj[$i]->uniqidevent;
  $invitedname      = $obj[$i]->invitedname;
  $codarea          = $obj[$i]->codarea;
  $phone            = $obj[$i]->phone;
  $invitedphoto     = "";
  $datelist         = $obj[$i]->datelist;
  $dateinvited      = $obj[$i]->dateinvited;
  $dateconfirmation = $obj[$i]->dateconfirmation;
  $invitedtowolppi  = $obj[$i]->invitedtowolppi;
  $createevent      = $obj[$i]->createevent;
  $baseok           = $obj[$i]->baseok;
  $eraseok          = $obj[$i]->eraseok;
  $datecreate       = date('d/m/Y');
  $hourcreate       = date('H:i');

  $query="INSERT INTO invited (idapp, uniqidevent, useridinvited, invitedname, codarea, phone, invitedphoto, datelist, dateinvited, dateconfirmation, invitedtowolppi, createevent, baseok, eraseok, datecreate, hourcreate) VALUES('$idapp', '$uniqidevent', '$useridinvited', '$invitedname', '$codarea', '$phone', '$invitedphoto', '$datelist', '$dateinvited', '$dateconfirmation', '$invitedtowolppi', '$createevent', '$baseok', '$eraseok', '$datecreate', '$hourcreate')";
  $save = mysqli_query($con, $query);

  $myObj[$i]->idapp         = $idapp;
  $myObj[$i]->useridinvited = $useridinvited;
}

$query = "SELECT * FROM invited WHERE uniqidevent='$uniqidevent'";
$invitedresult = mysqli_query($con , $query);

while ($invitedrows = mysqli_fetch_assoc($invitedresult)) {

  for($i = 0; $i < $count; $i++){

    $codarea          = $obj[$i]->codarea;
    $phone            = $obj[$i]->phone;

    $query="SELECT * FROM users WHERE codarea='$codarea' AND phone='$phone'";
    $resultuser=mysqli_query($con , $query);
    $numrowsuser=mysqli_num_rows($resultuser);

    if($numrowsuser !=0){
      $rowsuser=mysqli_fetch_assoc($resultuser);
      $useridinvited = $rowsuser['uniqid'];
    }else{
      $useridinvited = $obj[$i]->useridinvited;
    }

    $idapp            = $obj[$i]->idapp;
    $uniqidevent      = $obj[$i]->uniqidevent;
    $invitedname      = $obj[$i]->invitedname;
    $invitedphoto     = "";
    $datelist         = $obj[$i]->datelist;
    $dateinvited      = $obj[$i]->dateinvited;
    $dateconfirmation = $obj[$i]->dateconfirmation;
    $invitedtowolppi  = $obj[$i]->invitedtowolppi;
    $createevent      = $obj[$i]->createevent;
    $baseok           = $obj[$i]->baseok;
    $eraseok          = $obj[$i]->eraseok;
    $datecreate       = date('d/m/Y');
    $hourcreate       = date('H:i');
    $codarea_control  = $invitedrows['codarea'];
    $phone_control    = $invitedrows['phone'];

    $query="INSERT INTO invitedupdate (idapp, uniqidevent, useridinvited, invitedname, codarea, phone, invitedphoto, datelist, dateinvited, dateconfirmation, invitedtowolppi, createevent, baseok, eraseok, datecreate, hourcreate, codareacontrol, phonecontrol) VALUES('$idapp', '$uniqidevent', '$useridinvited', '$invitedname', '$codarea', '$phone', '$invitedphoto', '$datelist', '$dateinvited', '$dateconfirmation', '$invitedtowolppi', '$createevent', '$baseok', '$eraseok', '$datecreate', '$hourcreate', '$codarea_control', '$phone_control')";
    $save = mysqli_query($con, $query);
  }
}
$myJSON = json_encode($myObj);
echo $myJSON;
?>
