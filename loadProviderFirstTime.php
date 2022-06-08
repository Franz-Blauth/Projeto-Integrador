<?php
error_reporting(E_ERROR | E_PARSE);

include '../Configuration/db.php';

$_SESSION['login']  = $login;
$_SESSION['passwd'] = $passwd;

$data = json_decode(file_get_contents('php://input'));

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die('Could not connect to the database server' . mysqli_connect_error());

$queryContacts  = "SELECT * FROM Provider";
$resultContacts = mysqli_query($con, $queryContacts);

mysqli_set_charset($con, "utf8");

while ($row = mysqli_fetch_array($resultContacts)){

    $myObj[$i]->id_User = "";
    $myObj[$i]->id = $row['id'];
    $myObj[$i]->name = $row['name'];
    $myObj[$i]->email = $row['email'];
    $myObj[$i]->phone = $row['phone'];
    $myObj[$i]->cellPhone = $row['cellPhone'];
    $myObj[$i]->contactPerson = $row['contactPerson'];
    $myObj[$i]->operation = "insert";
}

$myJSON = json_encode($myObj, JSON_UNESCAPED_UNICODE);

echo $myJSON;

?>