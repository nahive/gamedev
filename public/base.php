<?PHP
	if(isset($_POST['action'])) {
	    $action = $_POST['action'];
	    $nick = $_POST['name'];
	    $pass = $_POST['pass'];
	    switch($action) {
	        case 'check' : connect(); check($nick, $pass); break;
	        case 'getwins' : connect(); getWins($nick); break;
	        case 'getlooses' :  connect(); getLooses($nick); break;
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
						echo 'valid';
					} else {
						echo 'invalid';				
					}
					$found = true;
				}		
				
			}
			if ($found == false) {
				echo 'notfound';
				insert($nick, $pass);
			}
	}

	function insert($nick, $pass) {
		$SQL = "INSERT INTO players (login, password, wins, looses, scores) VALUES ('$nick', '$pass', '0', '0', '0')";
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

?>