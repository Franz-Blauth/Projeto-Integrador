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
$userid = "";
$name = "";
$datecreate = date('d/m/Y');
$hourcreate = date('H:i');
$baseok = "";
$eraseok = "";

$count = count($obj);

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
       or die ('Could not connect to the database server' . mysqli_connect_error());

mysqli_set_charset($con,"utf8");

for($i = 0; $i < $count; $i++){

    $uniqid       = $obj[$i]->uniqid;
    $userid       = $obj[$i]->userid;
    $name         = $obj[$i]->name;

    $query="INSERT INTO groups(uniqid, name, userid, datecreate, hourcreate, baseok, eraseok) VALUES ('$uniqid', '$name', '$userid', '$datecreate', '$hourcreate', '$baseok', '$eraseok')";

    $save = mysqli_query($con, $query);

    $myObj[$i]->uniqid = $uniqid;
}
$myJSON = json_encode($myObj);
echo $myJSON;
?>
