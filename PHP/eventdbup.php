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
$datestart = "";
$timestart = "";
$datefinish = "";
$timefinish = "";
$datelimite = "";
$timelimite = "";
$local = "";
$info = "";
$activity = "";
$userid = "";
$usernickname = "";
$datecreate = date('d/m/Y');
$hourcreate = date('H:i');
$numinvited = 0;
$nunconfirm = 0;
$baseok = "";
$eraseok = "";

$count = count($obj);

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
       or die ('Could not connect to the database server' . mysqli_connect_error());

mysqli_set_charset($con,"utf8");

for($i = 0; $i < $count; $i++){

    $uniqid       = $obj[$i]->uniqid;
    $name         = $obj[$i]->name;
    $datestart    = $obj[$i]->datestart;
    $timestart    = $obj[$i]->timestart;
    $datefinish   = $obj[$i]->datefinish;
    $timefinish   = $obj[$i]->timefinish;
    $datelimite   = $obj[$i]->datelimite;
    $timelimite   = $obj[$i]->timelimite;
    $local        = $obj[$i]->local;
    $info         = $obj[$i]->info;
    $activity     = $obj[$i]->activity;

    $query="UPDATE event       SET name='$name', datestart='$datestart', timestart='$timestart', datefinish='$datefinish', timefinish='$timefinish', datelimite='$datelimite', timelimite='$timelimite', local='$local', info='$info', activity='$activity' WHERE uniqid='$uniqid'";
    $save = mysqli_query($con, $query);

    $myObj[$i]->uniqid = $uniqid;
}
$myJSON = json_encode($myObj);
echo $myJSON;
?>
