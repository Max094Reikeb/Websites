<?php

    // On récupère les infos que l'utilisateur a entré dans le formulaire.
    $user_name = $_POST['inputName']; // Nom / Pseudo.
    $from = $_POST['inputEmail']; // Email.
    $user_message = $_POST['inputMessage']; // Message.
    //=========

    // Déclaration de l'adresse de destination.
    $to = 'maxencebekier@gmail.com';
    //=========

    // Création du header de l'e-mail.
    $header = "From: \"$user_name\" $from" . "\n";
    $header .= "MIME-Version: 1.0" . "\n";
    //==========

    // Définition du sujet.
    $sujet = "[Maxence.it] Nouveau Contact";
    //=========

    // Création du message.
    $msg = $user_message;
    //==========

    // Envoi de l'e-mail.
    mail($to, $sujet, $msg, $header);
    //==========

    // On attend 2 secondes...
    sleep(2);
    //==========

    // On redirige vers la page de remerciements.
    header('Location: https://maxence.it');
    //==========

?>