<?php
error_reporting(E_ERROR | E_PARSE);

include '../Configuration/db.php';

$_SESSION['login']  = $login;
$_SESSION['passwd'] = $passwd;

$data = json_decode(file_get_contents('php://input'));
$obj = [$data];
$count = count($obj);

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
        or die('Could not connect to the database server' . mysqli_connect_error());

mysqli_set_charset($con, "utf8");

for ($i = 0; $i < $count; $i++) {

    $id             = $obj[$i]->id;
    $id_User        = $obj[$i]->id_User;
    $name           = $obj[$i]->name;
    $email          = $obj[$i]->email;
    $phone          = $obj[$i]->phone;
    $cellPhone      = $obj[$i]->cellPhone;
    $contactPerson  = $obj[$i]->contactPerson;

    $dt = new DateTime($date, new DateTimeZone('UTC'));
    $dt->setTimezone(new DateTimeZone('America/Sao_Paulo'));
    $dt = $dt->format('Y-m-d H:i:s');
    
    $query =  "INSERT INTO Provider (id, name, email, phone, cellPhone, contactPerson) VALUES ('$id', '$name', '$email', '$phone', '$cellPhone', '$contactPerson')";

    $save = mysqli_query($con, $query);
    
    $myObj[$i]->id = $id;

}
$myJSON = json_encode($myObj, JSON_UNESCAPED_UNICODE);
echo $myJSON;
?>
