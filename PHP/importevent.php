<?php
  session_start();
  ini_set('default_charset','UTF-8');
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

  include 'db.php';

  $_SESSION['login']  = $login;
  $_SESSION['passwd'] = $passwd;

  $obj = json_decode($_POST["x"], false);

  $uniqid  = $obj[0]->uniqid;
  $codarea = $obj[0]->codarea;
  $phone   = $obj[0]->phone;

  $objevent = [];
  $i = 0;
  $row = "";
  $eventafter = "";

  $con =  new mysqli($host, $user, $password, $dbname, $port, $socket)
          or die ('Could not connect to the database server' . mysqli_connect_error());
          mysqli_set_charset($con, "utf8");

  $query  = "SELECT * FROM invitedupdate WHERE codareacontrol='$codarea' AND phonecontrol='$phone' AND dateinvited<>''";
  $result = mysqli_query($con , $query);

  while ($row = mysqli_fetch_assoc($result)) {

    $uniqid_event = $row['uniqidevent'];

    $query_users  = "SELECT * FROM event WHERE uniqid='$uniqid_event'";
    $result_users = mysqli_query($con , $query_users);
    $rowusers     = mysqli_fetch_assoc($result_users);

    if ($rowusers['uniqid'] != null && $eventafter != $rowusers['uniqid']){
        $objevent[$i]->uniqid           = $rowusers['uniqid'];
        $objevent[$i]->name             = $rowusers['name'];
        $objevent[$i]->datestart        = $rowusers['datestart'];
        $objevent[$i]->timestart        = $rowusers['timestart'];
        $objevent[$i]->datefinish       = $rowusers['datefinish'];
        $objevent[$i]->timefinish       = $rowusers['timefinish'];
        $objevent[$i]->datelimite       = $rowusers['datelimite'];
        $objevent[$i]->timelimite       = $rowusers['timelimite'];
        $objevent[$i]->local            = $rowusers['local'];
        $objevent[$i]->info             = $rowusers['info'];
        $objevent[$i]->userid           = $rowusers['userid'];
        $objevent[$i]->usernickname     = $rowusers['usernickname'];
        $objevent[$i]->datecreate       = $rowusers['datecreate'];
        $objevent[$i]->hourcreate       = $rowusers['hourcreate'];
        $objevent[$i]->numinvited       = $rowusers['numinvited'];
        $objevent[$i]->nunconfirm       = $rowusers['nunconfirm'];
        $objevent[$i]->baseok           = $rowusers['baseok'];
        $objevent[$i]->eraseok          = $rowusers['eraseok'];
        $objevent[$i]->activity         = $rowusers['activity'];
        $i++;
        $eventafter = $rowusers['uniqid'];
    }
  }

  $myJSON = json_encode($objevent, JSON_UNESCAPED_UNICODE);
  echo $myJSON;

?>
