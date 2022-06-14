<?php
session_start();
ini_set('default_charset','UTF-8');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$_SESSION['login']  = $login;
$_SESSION['passwd'] = $passwd;

$obj = json_decode($_POST["x"], false);

$idgroups = "";
$uiusers = "";

$count = count($obj);

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
       or die ('Could not connect to the database server' . mysqli_connect_error());

mysqli_set_charset($con,"utf8");

for($i = 0; $i < $count; $i++){

    $idgroups    = $obj[$i]->id;
    $uiusers     = $obj[$i]->uiusers;

    $query="DELETE FROM grpusers WHERE  idgroups='$idgroups' AND uiusers='$uiusers'";

    $save = mysqli_query($con, $query);

    $myObj[$i]->id = $idgroups;
}
$myJSON = json_encode($myObj);
echo $myJSON;
?>
