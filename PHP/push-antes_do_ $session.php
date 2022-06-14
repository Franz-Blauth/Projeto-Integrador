<?php
define('API_ACCESS_KEY','AIzaSyCu_ozI-Bk9_-yEwHxBuZNRIQduYTrEr5o');
 $fcmUrl = 'https://fcm.googleapis.com/fcm/send';
 $token='fOMghiSDXWE:APA91bEV3bkwMg9fHiA6BVxUHrXvaJkNfjddToAFnnAClibNb3CnHbN8FWViWhxSWE7aO9HV8fGqTE_YqPh5XfzUUSLxiSUFKyRSdLGISzLi4FdGV51qSSgW7zzdKCpdc35Czb68p7V0';
 $tokenList =["eFDDnV7E93Y:APA91bGIlSh7pm5fQ1MjH0BzfZQmmNaDL6tGkjzoKC3bxIPq_4bD2y7cb7helPgqf2EjlGMKb2Gq7QzkSrWXuzezkiHORhi3_y8_r97nmOhExKkNxbiNLykPKBgTc1RSFj4YRjX_kYO4","d1f6pNaf3m0:APA91bEcsvKANanCR-M2nwiA-jq9VIA5DXLu9Ls8ROK6MI7Gc11c1mglquBbQyFcFL_UPV9s6tv3ujJBCEgu663sHVJaRxIWh3xQ9eTA4htlSNk0Bjdi9-8qpFXsFirmaCk8EQPu8Dcp","e6zYQp-XFA4:APA91bGsHT3A-02CzuIa9LwCrexAZt63ZrI3k15Nm7-M0LCPmwS3bEB8tPFJH7V0is3_NL5BAud20awTmsYzxM83EcO-sHc6w7RiFOFbqCkvx-7b2ellufJRjz-XJGmquk9cRL4Cc5lv"];

     $notification = [
            'title' =>'PHP-Wolppi',
            'body'  => 'You are invited!'
        ];
        $extraNotificationData = ["message" => $notification,"moredata" =>'dd'];

        $fcmNotification = [
            'registration_ids' => $tokenList, //multple token array
//            'to'        => $token, //single token
            'notification' => $notification,
            'data' => $extraNotificationData
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


        echo $result;
