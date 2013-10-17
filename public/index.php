﻿<!DOCTYPE html>
<html>
<head>
	<!-- CREATED BY SZYMON MASLANKA and ADAM MATEJA-->
	

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>WebGameDev</title>
	<meta name="description" content="webdev game">
	<meta name="author" content="Szymon Maslanka">

	<link type="text/css" rel="stylesheet" href="css/animate.min.css"/>
	<link type="text/css" rel="stylesheet" href="css/stylesheet.css"/>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="scripts/jquery-ui.min.js"></script>
	<script type="text/javascript" src="scripts/script.js"></script>	

</head>
<body>


	<div id="main" role="main">
		<!-- <canvas id="gameCanvas"></canvas>
				<script src="http://localhost:8000/socket.io/socket.io.js"></script>
				<script src="scripts/requestAnimationFrame.js"></script>
				<script src="scripts/Keys.js"></script>
				<script src="scripts/Player.js"></script>
				<script src="scripts/game.js"></script>
				<script>
					// Initialise the game
					init();
					animate();
				</script> -->

		<div class="log-center">
				<form id="log" method="post">
						<input type="text" id="login" name="login" placeholder="nick" required>
						<input type="password" id="pass" name="pass" placeholder="password" required>
						<input type="button" id="logMe" value="Ok">
				</form>

				<div id="search">
					<p> Please wait <br/> Looking for players </p>
					<img src="images/loader.gif">
				</div>
		</div>
		<div id="profil"> 
			<header id="head">
				<p id="myName">					
				</p>
			</header>
			<input id="playMe" type="button" value="Play">
			<div id="scores">
				<div id="wins" rel="tooltip">wins</div>
				<div id="looses" rel="tooltip">looses</div>
			</div>
		</div>
	</div>
	<div id="footer">

	</div>
</body>
</html>