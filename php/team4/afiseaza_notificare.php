<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers "origin, x-requested-with, content-type"');
    header('Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"');
    include '../libs/conn.php';

    $sql = "
        SELECT [MESAJ], FORMAT([DATA_CREAT],'dd/MM/yyyy hh:mm tt') AS [DATA_CREAT] FROM [TEST].[USER_TO_NOTIFICATIONS] utn
        left join [TEST].[NOTIFICATIONS_INDEX] notif
        on utn.NOTIFICATION_ID = notif.[PRIORITY]
        left join [TEST].[NOTIFICARI] inc
        on notif.[PRIORITY] = inc.[PRIORITY]
        ORDER BY [DATA_CREAT] DESC
    ";
    try{
        $stmt = $conn->prepare($sql);
        $stmt -> execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
    }catch(Exception $e){
        echo 'Failure';
    }
?>