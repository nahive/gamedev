<!DOCTYPE html>
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
	<script src="scripts/jquery.min.js"></script>
	<script src="scripts/jquery-ui.min.js"></script>
	<script type="text/javascript" src="scripts/script.js"></script>
	<script src="http://localhost:8000/socket.io/socket.io.js"></script>
	<script src="js_game/requestAnimationFrame.js"></script>
	<script src="js_game/Keys.js"></script>
	<script src="js_game/Player.js"></script>
	<script src="js_game/game.js"></script>	

</head>
<body>
	<div id="main" role="main">
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
			<input type="button" id='killer'>
				<p id="myName"></p>

				

			</header>
			<input id="playMe" type="button" value="Play">
			<div id="scores">
				<div id="wins" rel="tooltip"><p>wins</p></div>
				<div id="looses" rel="tooltip"><p>looses</p></div>
			</div>
		</div>
		<div id="game">
			<canvas id="gameCanvas"></canvas>
		</div>
	</div>
	<div id="footer">

	</div>
</body>
</html>