<?php
if ($_GET['user'] == "profesor")
	echo "existe";
else if ($_GET['user'] == "")
	echo "vacio";
else
	echo "disponible";
?>