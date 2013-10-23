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
		$SQL = "INSERT INTO players (login, password, wins, losses, score) VALUES ('$nick', '$pass', '0', '0', '0')";
		mysql_query($SQL);
		echo mysql_error();

	}

	function getWins($nick) {
		$SQL = "SELECT wins FROM players WHERE login = '$nick'";
		$result = mysql_query($SQL);
		$db_field = mysql_fetch_assoc($result);
		echo $db_field['wins'];
	}

	function getLooses($nick) {
		$SQL = "SELECT losses FROM players WHERE login = '$nick'";
		$result = mysql_query($SQL);
		$db_field = mysql_fetch_assoc($result);
		echo $db_field['losses'];
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
		session_start();
		session_destroy();
	}

?>