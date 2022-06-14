<?php
    header('Access-Control-Allow-Origin: *');

    include 'db.php';

    $new_image_name = urldecode($_FILES["file"]["name"]);
    move_uploaded_file($_FILES["file"]["tmp_name"], "upload/".$new_image_name);

    $ximagem  = $_FILES['file']['tmp_name'];
    $xtamanho = $_FILES['file']['size'];
    $xtipo    = $_FILES['file']['type'];
    $xnome    = $_FILES['file']['name'];

    $fp = fopen("upload/".$new_image_name, "rb");
    $conteudo = fread($fp, $xtamanho);
    $conteudo = addslashes($conteudo);
    fclose($fp);

    $uniqid2  = "upload/" . $new_image_name . ".jpg";


    $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
           or die ('Could not connect to the database server' . mysqli_connect_error());

    mysqli_set_charset($con,"utf8");

    include '/var/www/html/json/WideImage/lib/WideImage.php';

    $image = WideImage::load("upload/".$new_image_name);

    $resized = $image->resize(190, 200);

    $resized->saveToFile($uniqid2);

    $baseok = "B";

    $query="UPDATE users SET photoprofile='$conteudo', baseok='$baseok' WHERE uniqid='$new_image_name'";

    $save = mysqli_query($con, $query);

?>
