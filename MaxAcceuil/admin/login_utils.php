<?php
/*****************************************************************************
 *                                                                           *
 *                     Fichier de fonctions de connexion                     *
 *                                                                           *
 *****************************************************************************/

function mergePasswordAndSalt($password, $salt) {
	if (empty($salt)) {
		return $password;
	}
	if (false !== strrpos($salt, '{') || false !== strrpos($salt, '}')) {

	}
	return $password.'{'.$salt.'}';
}

function encodePassword($raw, $salt) {
	$salted = mergePasswordAndSalt($raw, $salt);
	$digest = hash('sha512', $salted, true);
	// "stretch" hash
	for ($i = 1; $i < 5000; $i++) {
		$digest = hash('sha512', $digest.$salted, true);
	}
	return base64_encode($digest);
}

function generateSalt() {
	return MD5(time());
}

// Récupérer l'ID d'un utilisateur à partir de l'email
function getUserIdFromEmail($email) {
	// Fichier de configuration
	include 'config.php';
	// Fichier de connexion à la base de données
	include_once 'db_connexion.php';

	$bdd = dbConnexion();

	$req = 'SELECT Id FROM Telethon_Contacts WHERE Email = ?';
	$result = $bdd->prepare($req);
	$result->execute(array($email));
	$data = $result->fetch();
	if ($result->rowCount() == 0) {
		header("Location: ../".$std_login_per_url."&emailErr");
		exit;
	}
	else {
		return $data['Id'];
	}
	$result->closeCursor();
}

// Suppression du reset du mot de passe d'un utilisateur
function deleteReset($userId) {
	// Fichier de configuration
	include 'config.php';
	// Fichier de connexion à la base de données
	include_once 'db_connexion.php';

	$bdd = dbConnexion();

	$result = $bdd->prepare('DELETE FROM Telethon_Contacts_Reset WHERE user_id = ?');
	return $result->execute(array($userId));
}

// Suppression du reset du mot de passe si la date de validité est dépassée
function deleteOldReset() {
	// Fichier de configuration
	include 'config.php';
	// Fichier de connexion à la base de données
	include_once 'db_connexion.php';

	$bdd = dbConnexion();
	$result = $bdd->exec('DELETE FROM Telethon_Contacts_Reset WHERE validite < NOW()');
}

// Ajout d'un reset du mot de passe
function newReset($userId) {
	// Fichier de configuration
	include 'config.php';
	// Fichier de connexion à la base de données
	include_once 'db_connexion.php';

	$bdd = dbConnexion();

	$validite = mktime(date("H"), date("i"), date("s"), date("m"), date("d")+1, date("Y"));
	$validite = date ('Y-m-d H:i:s', $validite);
	$token = MD5(getdate().'{'.$validite.'}');
	$result = $bdd->prepare('INSERT INTO Telethon_Contacts_Reset (token, user_id, validite) VALUES (?, ?, ?)');
	$passed = $result->execute(array($token, $userId, $validite));
	if ($passed) {
		return $token;
	}
	else {
		return 0;
	}
}

// Initialisation du processus de reset du mot de passe
function resetPassword($email) {
	// Fichier de configuration
	include 'config.php';

	$userId = getUserIdFromEmail($email);
	deleteReset($userId);
	deleteOldReset();
	$token = newReset($userId);

	// Envoi de l'email
	mb_internal_encoding('UTF-8');
	$subject  = "Réinitialisation de votre mot de passe";
	$subject  = mb_encode_mimeheader($subject);
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
	$headers .= 'To: '.$email. "\r\n";
	$headers .= 'From: Force-T <'.$std_site_email.'>' . "\r\n";
	$message = '
	<html>
	<head>
		<title>Réinitialisation de votre mot de passe</title>
	</head>
	<body>
		<p>Bonjour,<br><br>
		Une demande de r&eacute;initialisation de mot de passe a &eacute;t&eacute; faite pour votre compte.<br>
		Cliquez <a href="'.$std_site_url.'/'.$std_login_new_url.'&t='.$token.'">ici</a> pour r&eacute;initialiser votre mot de passe (lien valide 24h).<br>&nbsp;<br>
		<b>L\'&eacute;quipe du site www.force-t.fr</b><br>&nbsp;<i><br><b>Note :</b> Si vous n\'avez pas effectu&eacute; cette demande, merci d\'ignorer cet email.</i></p>
	</body>
	</html>
	';

	mail($Email, $subject, $message, $headers);

	header("Location: ../".$std_login_per_url."&emailOk");
}

// Vérification du token
function verifToken($token) {
	// Fichier de configuration
	include 'config.php';
	// Fichier de connexion à la base de données
	include_once 'db_connexion.php';

	$bdd = dbConnexion();

	$result = $bdd->prepare('SELECT * FROM Telethon_Contacts_Reset WHERE token = ? AND validite > NOW()');
	$result->execute(array($token));
	$row = $result->fetch();
	if($result->rowCount() == 0) {
		header("Location: ../".$std_login_new_url."&t=".$token."&tokenErr");
		exit;
	}
	else {
		return $row['user_id'];
	}
	$result->closeCursor();
}

// Sauvegarde du nouveau mot de passe
function newPassword($userId, $pwd, $token) {
	// Fichier de configuration
	include 'config.php';
	// Fichier de connexion à la base de données
	include_once 'db_connexion.php';

	$bdd = dbConnexion();

	$salt = generateSalt();
	$password = encodePassword($pwd, $salt);
	$result = $bdd->prepare('UPDATE Telethon_Contacts SET Login_Salt = ?, Login_Pwd = ? WHERE Id = ?');
	$passed = $result->execute(array($salt, $password, $userId));
	if($passed) { 
		// C'est Ok !
		deleteReset($userId);
		header("Location: ../".$std_login_url."&newPwdOk=1");
		exit;
	}
	else {
		header("Location: ../".$std_login_new_url."&t=".$token."&newPwdKo=1");
		exit;
	}
}

// Générer ID de session
function generateID() {
	$taille = 40;
	$lettres = "abcdefghijklmnopqrstuvwxyz0123456789";
	srand(time());
	for ($i=0; $i < $taille; $i++) { 
		$lid .= substr($lettres, (rand()%(strlen($lettres))), 1);
	}
	return $lid;
}

// Connexion d'un utilisateur
function login($email, $pwd) {
	// Fichier de connexion à la base de données
	include_once '../db_connexion.php';

	// Récupération des informations de l'utilisateur
	$result = $bdd->prepare('SELECT * FROM users WHERE email = ?');
	$result->execute(array($email));
	$row = $result->fetch();
	if ($result->rowCount() > 0) {
		// Vérifions le mot de passe
		if ($row['password'] == encodePassword($pwd, $row['salt'])) {
			// Session
			session_start();
			$_SESSION['id'] = $row['id'];
			$_SESSION['username'] = $row['username'];
			$_SESSION['email'] = $row['email'];
			$_SESSION['role'] = $row['role'];
			header("Location: index.php");
			exit;
		}
		else {
			header("Location: login.php?erreur");
			exit;
		}
	}
	else {
		header("Location: login.php?erreur");
	}
	$result->closeCursor();
}
?>