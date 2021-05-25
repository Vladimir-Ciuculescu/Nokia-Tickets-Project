<?php

include 'conn.php';

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

//inputs

$name = $_POST['name'];
$surname = $_POST['surname'];
$email = $_POST['email'];
$telephone = $_POST['telephone'];
$address = $_POST['address'];
$username = $_POST['username'];
$password = $_POST['password'];
$birth = $_POST['birth'];
$gender = $_POST['gender'];


function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

$salt = generateRandomString(10);

//encoding password
$password = hash('sha256', $password.$salt);


        $sql = "
                INSERT INTO [USER].[LOG]
                    ([NUME],[EMAIL],[PASSWORD],[SALT],[DATE],[PRENUME],[TELEFON],[ADRESA],[USERNAME],[DATANASTERE],[GEN])
                values(
                    :NUME,
                    :EMAIL,
                    :PASSWORD,
                    :SALT,
                    GETDATE(),
                    :PRENUME,
                    :TELEFON,
                    :ADRESA,
                    :USERNAME,
                    :DATANASTERE,
                    :GEN
                )";


$param = array(
		'NUME' => $name,
		'EMAIL' => $email,
		'PASSWORD' => $password,
		'SALT' => $salt,
		'PRENUME' => $surname,
		'TELEFON' => $telephone,
		'ADRESA' => $address,
		'USERNAME' => $username,
		'DATANASTERE' => $birth,
		'GEN' => $gender
);

$stmt = $conn->prepare($sql);

try{

	$stmt->execute($param);

	echo "Inserted succesfully";

} catch (Exception $e){
	echo "Insertion Failed";
}
