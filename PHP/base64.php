<?php
echo "v a m o s n e s s a c a t a t a u". "<br>";

include '/var/www/html/json/WideImage/lib/WideImage.php';

// echo "001" . "<br>";
//
$image = WideImage::load("/var/www/html/json/IMG_20180728_001311.jpg");
echo "002". "<br>";

$resized = $image->resize(290, 300);
echo "003". "<br>";

$resized->saveToFile("downsize.jpg");

echo "vamosnessacatatau";

define('UPLOAD_DIR', '/var/www/html/json/');


$file = UPLOAD_DIR . uniqid() . '.png';

$imagedata = file_get_contents("http://192.168.1.109/json/upload/1539967933740.jpg");

$base64E = base64_encode($imagedata);

echo $base64E . "<br>";

$base64D = base64_decode($base64E);

$success = file_put_contents($file, $base64D);

//echo $base64D;


?>
