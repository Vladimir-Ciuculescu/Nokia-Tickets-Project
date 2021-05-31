<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers "origin, x-requested-with, content-type"');
    header('Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"');
    include '../libs/conn.php';

    $id = 1; // VA FI SESSION['ID'] 

        $sql = "
            INSERT INTO [TEST].[USER_TO_NOTIFICATIONS] ([USER_ID],[NOTIFICATION_ID]) 
            VALUES (:ID, 4), (:ID, 5)
        ";
        $params = array(
            ':ID' => $id
        );
        try{
            $stmt = $conn->prepare($sql);
            $stmt -> execute($params);
        }catch(Exception $e){
            echo 'Failure';
        }
?>