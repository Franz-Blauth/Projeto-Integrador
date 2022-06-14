<?php
//Get the file
//$content = file_get_contents("testetamanho.jpghttp://example.com/image.jpg");
$content = file_get_contents("testetamanho.jpg");

//Store in the filesystem.
$fp = fopen("vamosnessacatatau.jpg", "w");
fwrite($fp, $content);
fclose($fp);
?>
