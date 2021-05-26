<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers "origin, x-requested-with, content-type"');
    header('Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"');
include 'conn.php';
/*

if (isset($_SERVER['HTTP_ORIGIN'])) {
// Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
// you want to allow, and if so:
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 1000');
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
// may also be using PUT, PATCH, HEAD etc
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
}



if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
}
exit(0);
}
*/

//input fields
$username = $_POST['username'];
$password = $_POST['password'];
//$username = 'maria';
//$password = 'maria';

$sql = "
		 SELECT TOP 1 * FROM [USER].[LOG] WHERE USERNAME = :USERNAME
";

$param = array(
                'USERNAME' => $username
                );
try{
    $stmt = $conn->prepare($sql);
	$stmt -> execute($param);
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //print_r($result);

    //$new_ps =  hash('sha256', $password.$result[0]['SALT']);
   // print_r($new_ps);

	if($result[0]['PASSWORD'] == hash('sha256', $password.$result[0]['SALT'])){
		echo $result[0]['NUME'];
       
	}else{
		echo "Wrong credentials";
	}

}catch(Exeption $e){
	echo "Fail";
}