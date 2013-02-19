<?php
$result = json_decode($_GET['data']);

$rendering = "";

for($num = 0; $num < count($result); $num++)
{
	if($num > 0) {$rendering .= '|';}
	$rendering .= 'assets/' . $result[$num]->filename . '.mpg';
}

$rendered = 'assets/' . date("mdYhis") . '.mpg';
exec('ffmpeg -i concat:"' . $rendering . '" ' . $rendered);

echo $rendered;
?>