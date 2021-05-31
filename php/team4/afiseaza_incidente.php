<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers "origin, x-requested-with, content-type"');
    header('Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"');
    include '../libs/conn.php';

    $sql = "
        SELECT TOP 100 [INCIDENT_NUMBER],[STATUS],[SUBMIT_DATE],[PRIORITY],[RESPONDED_DATE],[INCIDENT_LAST_MODIFIED_DATE],[ASSIGNED_GROUP],[CAT_TIER_1],[PRODUCT_CAT_TIER_1],[RESOLUTION_CATEGORY],[ID] FROM [TEST].[INCIDENTS]
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