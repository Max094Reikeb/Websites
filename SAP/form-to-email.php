<?php

$email = $_POST['email'];

$expediteur = 'sapwebsite@website.com';

$destinataire = 'maxencebekier@gmail.com';

//=====Création du header de l'e-mail
$header  = "From: \"SAP Website\" <".$expediteur."> \r\n";
$header .= "MIME-Version: 1.0 \r\n";
$header .= "Content-Type: multipart/alternative;\r\n boundary=\"".$boundary."\" \r\n";
//==========

//=====Déclaration du contenu de l'email
$sujet = "New Form submission";
$msg = "Hi! My adress is ".$email."\nPlease, e-mail me when your website will be ready!";
//==========

//=====Création de la boundary
$boundary = "-----=".md5(rand());
//=========

mail($expediteur,$sujet,$msg,$header);

header('Location: wip.html');

?>