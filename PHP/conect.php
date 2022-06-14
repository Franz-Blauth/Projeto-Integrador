<?php
function conect_db()
{

  $login  = 'root';
  $passwd = 'fb36271809';

  $_SESSION['login']  = $login;
  $_SESSION['passwd'] = $passwd;

  $conexao = mysqli_connect("localhost", $_SESSION['login'], $_SESSION['passwd']) or die("Não pude conectar:" . mysqli_error());

  mysqli_select_db($conexao, "wolkki" ) or die ("Não pude selecionar o banco de dados");

  return($conexao);

}
