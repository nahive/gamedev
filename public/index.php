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
	<script src="js_game/Vec.js"></script>
    <script type="text/javascript" src="scripts/jquery.timer.js"></script>
	

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
		<div id="endGameWon">
			<h1 id="winner">You Won!</h1>
		</div>
		<div id="endGameLost">
			<h1 id="looser">You Lost.</h1>
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
			<div id="headerGame">
				<span id="timer">00:00:00</span>
			</div>
			<div id="gameContent">
				<canvas id="gameCanvas"></canvas>
			</div>			
		</div>		
	</div>
	<div id="footer">
		 <div id="grass1"></div>
		 <div id="grass2"></div>
		 <div id="grass3"></div>
	</div>
</body>
</html>