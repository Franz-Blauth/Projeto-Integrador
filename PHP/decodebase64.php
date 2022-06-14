<?php
  session_start();
  ini_set('default_charset','UTF-8');
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

  include 'db.php';

  define('UPLOAD_DIR', '/var/www/html/json/');

  $img = str_replace(' ', '+', $field);

  $data = base64_decode(str_replace(' ', '+', $field));

  echo "data" . $data;

  $file = UPLOAD_DIR . uniqid() . '.jpg';

  $success = file_put_contents($file, $data);

  print $success ? $file : 'Unable to save the file.';

  $myJSON = json_encode($myObj);

  $id = 324;

  $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
         or die ('Could not connect to the database server' . mysqli_connect_error());
  mysqli_set_charset($con,"utf8");

  $query="UPDATE users SET  photoprofile='$field', lasteve=345 WHERE id=324";

  $save = mysqli_query($con, $query);

//  echo $myJSON;
?>
