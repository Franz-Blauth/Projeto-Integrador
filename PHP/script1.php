<?php
session_start();
$_SESSION['nome'] = "Beraldo";
//echo "<a href=\"script2.php\">Link</a>";
$d = date("D");
if($d == "Thu"){
    echo "Have a nice weekend!";
} else{
    echo "Have a nice day!";
}
$myObjToken[0]="catatau 01";
$myObjToken[1]="catatau 01";
$myObjToken[2]="catatau 02";
$myObjToken[3]="catatau 03";
$myObjToken[4]="catatau 04";

echo json_encode($myObjToken) . "<br/>";
?>
