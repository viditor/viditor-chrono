<?php
$result = json_decode($_GET['data']);

$rendering = "";

for($num = 0; $num < count($result); $num++)
{
	$rendering = $rendering . "assets/" . $result[$num]->filename . ".mpg ";
}

$rendered = 'assets/' . date("mdYhis") . '.mpg';
exec('cat ' . $rendering . '| ffmpeg -i - ' . $rendered);

echo $rendered;
?>