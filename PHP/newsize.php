<?php
echo "v a m o s n e s s a c a t a t a u". "<br>";

include '/var/www/html/json/WideImage/lib/WideImage.php';

echo "001" . "<br>";

$image = WideImage::load("/var/www/html/json/IMG_20180728_020901.jpg");
echo "002". "<br>";

$resized = $image->resize(290, 300);
echo "003". "<br>";

$resized->saveToFile("testetamanho.jpg");

echo "vamosnessacatatau";
?>
