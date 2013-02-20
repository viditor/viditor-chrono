<?php
$result = json_decode($_GET['data']);

$account = 'andrew';

$rendering = "";

for($num = 0; $num < count($result); $num++)
{
	if($num > 0) {$rendering .= '|';}
	$rendering .= $account . '/' . $result[$num]->filename . '.mpg';
}

$rendered = $account . '/' . date("mdYhis") . '.mpg';
exec('ffmpeg -i concat:"' . $rendering . '" ' . $rendered);

echo $rendered;
?>