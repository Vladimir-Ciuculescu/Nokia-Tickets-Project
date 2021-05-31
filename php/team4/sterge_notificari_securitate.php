<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers "origin, x-requested-with, content-type"');
    header('Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"');
    include '../libs/conn.php';

    $id = 1; // VA FI SESSION['ID'] 

        $sql = "
            DELETE FROM [TEST].[USER_TO_NOTIFICATIONS]
            WHERE USER_ID = $id AND NOTIFICATION_ID >= 4 AND NOTIFICATION_ID <=5 
        ";
        try{
            $stmt = $conn->prepare($sql);
            $stmt -> execute();
        }catch(Exception $e){
            echo 'Failure';
        }
?>