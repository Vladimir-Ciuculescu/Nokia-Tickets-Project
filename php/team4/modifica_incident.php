<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers "origin, x-requested-with, content-type"');
    header('Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"');
    include '../libs/conn.php';

    $initialData = $_POST['initial'];
    //$data = $_POST['Data'];
    

    $sql = "
    UPDATE [TEST].[INCIDENTS] SET [INCIDENT_NUMBER] = 'marian' WHERE [INCIDENT_NUMBER] = ([INITIAL])
    ";

    $params = array(
        ':INITIAL' => $initialData
    );

    try{
        $stmt = $conn->prepare($sql);
        $stmt -> execute($params);
        //$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //echo json_encode($data);
    }catch(Exception $e){
        echo 'Failure';
    }

    //INC000015708991
?>

