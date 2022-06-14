<?php
//Allow Headers
header('Access-Control-Allow-Origin: *');
//print_r(json_encode($_FILES));
//$new_image_name = urldecode($_FILES["file"]["name"]).".jpg";
include 'db.php';

$new_image_name =$_FILES["file"]["name"].".jpg";
//Move your files into upload folder
move_uploaded_file($_FILES["file"]["tmp_name"], "upload/".uniqid($new_image_name).".jpg");

$uniqid  = "5bc78e7ff1e9d8.75156481";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
       or die ('Could not connect to the database server' . mysqli_connect_error());

mysqli_set_charset($con,"utf8");

include '/var/www/html/json/WideImage/lib/WideImage.php';

$image = WideImage::load("/var/www/html/json/escudoflu.png");
echo "0002". "<br>";

$resized = $image->resize(290, 300);
echo "0003". "<br>";

$base64E = base64_encode($resized);

$query="UPDATE users SET photoprofile='$base64E' WHERE uniqid='$uniqid'";

$save = mysqli_query($con, $query);

echo "file_get_contents";
?>
