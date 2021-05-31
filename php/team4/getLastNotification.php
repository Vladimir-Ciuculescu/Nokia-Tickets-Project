<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers "origin, x-requested-with, content-type"');
    header('Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"');
    include '../libs/conn.php';


$sql = "
     SELECT PRIORITY, DATEDIFF(second, [DATA_CREAT], GETDATE()) AS DIF FROM [TEST].[NOTIFICARI] WHERE DATEDIFF(second, [DATA_CREAT], GETDATE()) < 10
";


try{
    $stmt = $conn->prepare($sql);
	$stmt -> execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

   

   //$time = strtotime($result[0]['DATA_CREAT']);

	//echo time() - $time;

    //echo $result[0]['DATA_CREAT'];

    //echo((time()-(60*60*24)) < strtotime($result[0]['DATA_CREAT']));

    //echo time();

    //$val1 = strtotime($result[0]['DATA_CREAT']);
    //$val2 = strtotime(time());

    //echo $val2;
    //$val3 = intval($val1/10);

   
    $array = array(
        "diferenta" => $result[0]['DIF'],
        "priority" => $result[0]['PRIORITY'],
    );

        //echo $result[0]['DIF'];
    
    $show = $array['diferenta'];
    $show=$show * 10 + $array['priority'];

    echo $show;

    //echo $result[0]['DIF'];
    
   

}catch(Exeption $e){
	echo "Fail";
}

?>