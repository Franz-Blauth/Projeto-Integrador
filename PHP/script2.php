<?php
session_start();
echo "Olá, " . $_SESSION['nome'];
/* sair.php
session_start();
session_destroy();
header("Location: inde.php");
/*
?>
