<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require '../team4/PHPMailer/src/Exception.php';
require '../team4/PHPMailer/src/PHPMailer.php';
require '../team4/PHPMailer/src/SMTP.php';

$adresa_1 = $_POST['mail'];

$adresa = "taviamv@gmail.com"; // adresa la care se trimite

function trimite_mail($adresa)
{
    $mail = new PHPMailer; 
    $mail->isSMTP();                     
    $mail->Host = 'smtp.gmail.com';    
    $mail->SMTPAuth = true;            
    $mail->Username = 'nokiatavi@gmail.com'; //adresa de la contul de unde se trimit mailuri
    $mail->Password = 'nokia2021!'; //parola de la contul de unde se trimit mailuri
    $mail->SMTPSecure = 'tls';           
    $mail->Port = 587;                   
     
    $mail->setFrom('nokiatavi@gmail.com', 'Nokia'); // va aparea in titlul mailului
    $mail->addReplyTo('nokiatavi@gmail.com', 'Nokia'); 
     
    $mail->addAddress($adresa); // adresa la care se trimite
     
    $mail->isHTML(true); 
     
    $mail->Subject = $_POST['subject']; //titlul

    $bodyContent = $_POST['content'];
     
   // $bodyContent = '<h1>Cineva a incercat sa se conecteze la contul tau!</h1>'; //mesajul
   // $bodyContent .= '<p>Schimba parola!</p>'; 
    $mail->Body    = $bodyContent; 
     
    if(!$mail->send()) { 
        echo 'Message could not be sent. Mailer Error: '.$mail->ErrorInfo; 
    } else { 
        echo 'Message has been sent.'; 
    } 
}

trimite_mail($adresa_1); //apelarea functiei
 
?>