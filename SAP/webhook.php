<?php
// clé API du Bot à modifier
define('TOKEN', '539227844:AAGDjL3EZurVybT4tIdLVIHjEnQJ7kgdHXU');

// récupération des données envoyées par Telegram
$content = file_get_contents('php://input');
$update = json_decode($content, true);

// l'utilisateur contacte le bot
if(preg_match('/^\/start/', $update['message']['text'])) {
    sendMessage($update['message']['chat']['id'], 'Bonjour '.$update['message']['from']['username'].' !');
    }

// l'utilisateur envoie la commande : /gps Paris
else if(preg_match('/^\/gps/', $update['message']['text'])) {
    $ville = preg_replace('/^\/gps /', '', $update['message']['text']);
    $jsonOSM = file_get_contents('http://nominatim.openstreetmap.org/search?format=json&q='.urlencode($ville));
    $jsonOSM = json_decode($jsonOSM, true);
    $gps = $jsonOSM[0]['display_name'].' : '.$jsonOSM[0]['lat'].','.$jsonOSM[0]['lon'];
    sendMessage($update['message']['chat']['id'], $gps);
    }

// l'utilisateur envoie n'importe nawak
else {
    sendMessage($update['message']['chat']['id'], 'Je n\'ai pas compris. Ecris-moi une commande que je comprends.');
    }

// fonction qui envoie un message à l'utilisateur
function sendMessage($chat_id, $text) {
    $q = http_build_query([
        'chat_id' => $chat_id,
        'text' => $text
        ]);
    file_get_contents('https://api.telegram.org/bot'.TOKEN.'/sendMessage?'.$q);
    }

?>