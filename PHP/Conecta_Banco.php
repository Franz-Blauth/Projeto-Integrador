<html>

	<head>

	<title>Como criar tabelas com PHP</title>

	</head>

	<body>

	<?php
	$host="127.0.0.1";
	$port=3306;
	$socket="";
	$user="root";
	$password="fb36271809";
	$dbname="wolkki";

	$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
		or die ('Could not connect to the database server' . mysqli_connect_error());
	//* substitua as variáveis abaixo pelas que se adequam ao seu caso */

	$sqlcriatabela = "CREATE TABLE contatos (nome VARCHAR(50), telefone VARCHAR(25));";

	$criatabela = mysqli_query( $con, $sqlcriatabela);

	// inicia a conexao ao servidor de banco de dados

	if(! $con )

	{

	  die("<br />Nao foi possivel conectar: " . mysqli_error());

	}

	echo "<br />Conexao realizada!";



	// seleciona o banco de dados no qual a tabela vai ser criada


	// finalmente, cria a tabela

	if(! $criatabela )

	{

	  die("<br />Nao foi possivel criar a tabela: " . mysqli_error());

	}

	echo "<br />A tabela foi criada!";



	// encerra a conexão

	mysqli_close($con);

	?>

	</body>

	</html>
