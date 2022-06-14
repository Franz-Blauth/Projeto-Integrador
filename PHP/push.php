<?php
session_start();
define('API_ACCESS_KEY','AIzaSyD76ojS-ybBvuFPxma9QJ98l_f93UGkgvg');
$fcmUrl = 'https://fcm.googleapis.com/fcm/send';
$tokenList = $_SESSION['token'];

  $notification = [
                  'title' =>'Wolppi',
                  'body'  =>'Você foi convidado!',
                  'sound' =>'default'
                  ];

  $fcmNotification = [
                  'registration_ids' => $tokenList,
                  'notification' => $notification
                  ];

  $headers = [
                  'Authorization: key=' . API_ACCESS_KEY,
                  'Content-Type: application/json'
             ];

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL,$fcmUrl);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fcmNotification));
  $result = curl_exec($ch);
  curl_close($ch);

// TEM QUE TRATAR O RETORNO DAS MENSAGENGENS COM $RETURN PÁRA SABER SE PUSH FORAM ENVIADOS COM SUCESSO
//  echo json_encode($tokenList);

echo $_SESSION['jsoninvited'];  // incluir arquivo de controle para envio/recebimento de menssagens no php
