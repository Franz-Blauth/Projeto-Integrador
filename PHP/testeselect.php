<?php

  include 'db.php';

  $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
         or die ('Could not connect to the database server' . mysqli_connect_error());


  $numrow= "";
  $row= "";
  $query="SELECT * FROM grpusers";
  $result=mysqli_query($con , $query);
  $numrow=mysqli_num_rows($result);
  $row=mysqli_fetch_assoc($result);
  do {
    echo $row['name'] . "<br/>";
  }while($row = mysqli_fetch_assoc($result));

?>
