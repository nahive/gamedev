<?PHP

	
	if(isset($_POST['action'])) {
	    $action = $_POST['action'];
	    if (isset($_POST['name'])) {
	    $nick = $_POST['name'];
		}
		if (isset($_POST['pass'])) {
	    $pass = $_POST['pass'];
		}
	    switch($action) {
	        case 'check' : connect(); check($nick, $pass); break;
	        case 'getwins' : connect(); getWins($nick); break;
	        case 'getlooses' :  connect(); getLooses($nick); break;
	        case 'checkSession' : checkSession(); break;
	        case 'killMe' : killMe(); break;
	        case 'findPlayer' : connect(); findPlayer(); break;
	        case 'setOnline' : connect(); setOnline(); break;
	        case 'setOffline' : connect(); setOffline(); break;
	        case 'setBusy' : connect(); setBusy(); break;
	        case 'setNotBusy' : connect(); setNotBusy(); break;
	        case 'setWaiting' : connect(); setWaiting(); break;
	        case 'setNotWaiting' : connect(); setNotWaiting(); break;
	        case 'setWins' : connect(); setWins(); break;
	        case 'setLooses' : connect(); setLooses(); break;
	    }
		}		

	function connect() {
	$user_name = "root";
	$password = "";
	$database = "game";
	$server = "127.0.0.1";

	$db_handle = mysql_connect($server, $user_name, $password);
	$db_found = mysql_select_db($database, $db_handle);


	}

	function check($nick, $pass) {
		$SQL = "SELECT login, password FROM players";
		$result = mysql_query($SQL);
		$found = false;

			while ( $db_field = mysql_fetch_assoc($result) ) {

				if ($nick == $db_field['login']) {
					if ($pass == $db_field['password']) {

						session_start();				        
				        $_SESSION['login'] = $db_field['login'];
				        
						echo 'valid';
					} else {
						echo 'invalid';				
					}
					$found = true;
				}		
				
			}
			if ($found == false) {
				echo 'notfound';

				session_start();
 
		        if(!isset($_SESSION['login'])) 
		        {
		                $_SESSION['login'] = $nick;
		        }

				insert($nick, $pass);
			}
	}

	function insert($nick, $pass) {	
		$SQL = "INSERT INTO players (login, password, wins, looses, score) VALUES ('$nick', '$pass', '0', '0', '0')";
		mysql_query($SQL);
		

	}

	function getWins($nick) {
		$SQL = "SELECT wins FROM players WHERE login = '$nick'";
		$result = mysql_query($SQL);
		$db_field = mysql_fetch_assoc($result);
		echo $db_field['wins'];
	}

	function getLooses($nick) {
		$SQL = "SELECT looses FROM players WHERE login = '$nick'";
		$result = mysql_query($SQL);
		$db_field = mysql_fetch_assoc($result);
		echo $db_field['looses'];
	}

	function checkSession() {
		session_start();

		if(isset($_SESSION['login']))
	        {
	        	echo $_SESSION['login'];	            
	        } else {
	        	echo 'notlogged';
	        } 
	}

	function killMe() {
		echo 'killed';
		connect();
		setNotBusy();
		setOffline();
		setNotWaiting();
		session_start();		
		session_destroy();
	}

	function findPlayer() {
		session_start();
		$SQL = "SELECT login, busy, waiting FROM players";
		$result = mysql_query($SQL);
		$found = false;

			while ( $db_field = mysql_fetch_assoc($result) ) {
				if ($db_field['waiting'] == 1 && $db_field['busy'] == 0 && $db_field['login'] != $_SESSION['login']) {					
					echo $db_field['login'];
					$found = true;
					break;
					} 				
				}
				if ($found == false) {
					echo 'notfound';
				}					
			
	}

	function setOnline() {
		session_start();
		$login = $_SESSION['login'];
		$SQL = "UPDATE players SET online = '1' WHERE login = '$login'";
		mysql_query($SQL);
	}

	function setOffline() {
		session_start();
		$login = $_SESSION['login'];
		$SQL = "UPDATE players SET online = '0' WHERE login = '$login'";
		mysql_query($SQL);
	}

	function setBusy() {
		session_start();
		$login = $_SESSION['login'];
		$SQL = "UPDATE players SET busy = '1' WHERE login = '$login'";
		mysql_query($SQL);
	}

	function setNotBusy() {
		session_start();
		$login = $_SESSION['login'];
		$SQL = "UPDATE players SET busy = '0' WHERE login = '$login'";
		mysql_query($SQL);
	}

	function setWaiting() {
		session_start();
		$login = $_SESSION['login'];
		$SQL = "UPDATE players SET waiting = '1' WHERE login = '$login'";
		mysql_query($SQL);
	}

	function setNotWaiting() {
		session_start();
		$login = $_SESSION['login'];
		$SQL = "UPDATE players SET waiting = '0' WHERE login = '$login'";
		mysql_query($SQL);
	}	

	function setWins() {
		session_start();
		$login = $_SESSION['login'];
		$SQL = "SELECT wins FROM players WHERE login = '$login'";
		$result = mysql_query($SQL);
		$db_field = mysql_fetch_assoc($result);
		$wins = $db_field['wins'];
		$wins++;
		$SQL = "UPDATE players SET wins = '$wins' WHERE login = '$login'";
		mysql_query($SQL);
		echo $wins;
	}

	function setLooses() {
		session_start();
		$login = $_SESSION['login'];
		$SQL = "SELECT looses FROM players WHERE login = '$login'";
		$result = mysql_query($SQL);
		$db_field = mysql_fetch_assoc($result);
		$looses = $db_field['looses'];
		$looses++;
		$SQL = "UPDATE players SET looses = '$looses' WHERE login = '$login'";
		mysql_query($SQL);
		echo $looses;
	}

?>