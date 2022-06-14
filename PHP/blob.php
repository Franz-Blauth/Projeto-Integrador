<?php
header('Access-Control-Allow-Origin: *');
move_uploaded_file($_FILES['file']['tmp_name'], "upload/" . $_FILES['file']['name']);
?>
