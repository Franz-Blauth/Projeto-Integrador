<?php
    header('Access-Control-Allow-Origin: *');

    include 'db.php';

    $uniqid  = "5bc9051754c869.27661297";

    $query="SELECT * FROM users WHERE uniqid == $uniqid";

    $result=mysqli_query($conexao , $query);
    $row= \mysqli_fetch_row($result);

    echo $row.email;

    // $new_image_name = urldecode($_FILES["file"]["name"]);
    // move_uploaded_file($_FILES["file"]["tmp_name"], "upload/".$new_image_name);
    //
    //
    //
    // mysqli_set_charset($con,"utf8");
    //
    // include '/var/www/html/json/WideImage/lib/WideImage.php';
    //
    // $image = WideImage::load("upload/".$new_image_name);
    // echo "0002  ". $new_image_name;
    //
    // $resized = $image->resize(290, 300);
    // echo "0003". "<br>";
    //
    // $base64E = base64_encode($resized);
    //
    // $query="UPDATE users SET photoprofile='$base64E' WHERE uniqid=='$uniqid'";
    //
    // $save = mysqli_query($con, $query);
    //
    // echo "file_get_contents";

?>
