CREATE TABLE IF NOT EXISTS `instantiated` (
	`instantiationidnum` bigint(20) NOT NULL,
	`uploadedidnum` bigint(20) NOT NULL,
	`horizposition` int(11) NOT NULL,
	`verticposition` int(11) NOT NULL
)

CREATE TABLE IF NOT EXISTS `uploaded` (
	`uploadedidnum` bigint(20) NOT NULL,
	`filename` varchar(64) NOT NULL,
	`filetype` varchar(3) NOT NULL,
	`filelength` int(11) NOT NULL
)

INSERT INTO `instantiated` (`instantiationidnum`, `uploadedidnum`, `horizposition`, `verticposition`) VALUES
(1384011388034, 1377511316407, 2, 0),
(1384011389897, 1377511319918, 10, 0);

INSERT INTO `uploaded` (`uploadedidnum`, `filename`, `filetype`, `filelength`) VALUES
(1377511313691, 'thumbsup', 'mp4', 5),
(1377511316407, 'frontstreet', 'mp4', 3),
(1377511319918, 'backyard', 'mp4', 4);