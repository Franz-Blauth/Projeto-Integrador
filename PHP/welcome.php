
<?php
header("Access-Control-Allow-Origin: *");

$location = '/var/www/html/json/upload/';

if (isset($_FILES['file'])) {
    $name = $_FILES['file']['name'];
    $tmp_name = $_FILES['file']['tmp_name'];

    $error = $_FILES['file']['error'];
    if ($error !== UPLOAD_ERR_OK) {
        echo 'Erro ao fazer o upload:', $error;
    } elseif (move_uploaded_file($tmp_name, $location . $name.".jpeg")) {
        echo 'Uploaded';
        echo $_FILES['file']['name'];
        echo $_FILES['file']['type'];
        echo $_FILES['file']['size'];
        echo $_FILES['file']['tmp_name'];
        echo $_FILES['file']['error'];

    }
} else {
    echo 'Selecione um arquivo para fazer upload';
}
