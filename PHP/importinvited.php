<?php
session_start();
ini_set('default_charset','UTF-8');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$_SESSION['login']  = $login;
$_SESSION['passwd'] = $passwd;

$obj   = json_decode($_POST["x"], false);
$count = count($obj);
$k           = 0;
$objevent    = [];

$con =   new mysqli($host, $user, $password, $dbname, $port, $socket)
      or die ('Could not connect to the database server' . mysqli_connect_error());
         mysqli_set_charset($conecta, "utf8");

for ($i = 0; $i < $count; $i ++){
  $uniqidevent = $obj[$i]->uniqidevent;
  $codarea     = $obj[$i]->codarea;
  $phone       = $obj[$i]->phone;

  $query  = "SELECT * FROM invitedupdate WHERE uniqidevent='$uniqidevent' AND codareacontrol='$codarea' AND phonecontrol='$phone'";
  $result = mysqli_query($con , $query);

  while ($row = mysqli_fetch_assoc($result)){

    $objevent[$k]->uniqidevent      = $row['uniqidevent'];
    $objevent[$k]->useridinvited    = $row['useridinvited'];
    $objevent[$k]->invitedname      = $row['invitedname'];
    $objevent[$k]->codarea          = $row['codarea'];
    $objevent[$k]->phone            = $row['phone'];
    $objevent[$k]->invitedphoto     = $row['invitedphoto'];
    $objevent[$k]->datelist         = $row['datelist'];
    $objevent[$k]->dateinvited      = $row['dateinvited'];
    $objevent[$k]->dateconfirmation = $row['dateconfirmation'];
    $objevent[$k]->invitedtowolppi  = $row['invitedtowolppi'];
    $objevent[$k]->createevent      = $row['createevent'];
    $objevent[$k]->baseok           = $row['baseok'];
    $objevent[$k]->eraseok          = $row['eraseok'];
    $objevent[$k]->datecreate       = $row['datecreate'];
    $objevent[$k]->hourcreate       = $row['hourcreate'];
    $objevent[$k]->codareacontrol   = $row['codareacontrol'];
    $objevent[$k]->phonecontrol     = $row['phonecontrol'];
    $k++;
  }
}

$myJSON = json_encode($objevent, JSON_UNESCAPED_UNICODE);
echo $myJSON;

?>
