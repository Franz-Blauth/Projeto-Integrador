<?php

header("Access-Control-Allow-Origin: *");

$myObj[0]['name']   = "John";
$myObj[0]['idade']  = 30;
$myObj[0]['cidade'] = "New York";

$myObj[1]['name']   = "Franz Blauth Ximenes";
$myObj[1]['idade']  = 50;
$myObj[1]['cidade'] = "Rio de Janeiro";

$nome = 'Patricia Pubel Chieppe';
$idade = 44;
$cidade = 'Vitoria';

$myObj[2]['name']   = $nome;
$myObj[2]['idade']  = $idade;
$myObj[2]['cidade'] = $cidade;

$myJSON = json_encode($myObj);

echo $myJSON . '<br>';
echo 'vamosnessacatat';

// unlink('karai.json'); APAGA O AQUIVO

file_put_contents("karai.json",$myJSON);


?>
