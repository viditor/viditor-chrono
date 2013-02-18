<?php
$result = json_decode($_GET['data']);

$rendering = "";

for($num = 0; $num < count($result); $num++)
{
	$rendering = $rendering . $result[$num]->filename;
}

echo $rendering;
?>