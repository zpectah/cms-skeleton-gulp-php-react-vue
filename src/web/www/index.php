<?php
const PATH_PFX = '../../';
require '../../core/index.php';
?>
<!doctype html>
<html lang="<?=(VIEW['WEB']['meta']['lang']) ?>">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="<?=(VIEW['WEB']['styles'] . '?v=' . TIMESTAMP) ?>">

	<title><?=(VIEW['WEB']['meta']['title']) ?></title>
	<meta name="description" content="<?=(VIEW['WEB']['meta']['description']) ?>">
	<meta name="keywords" content="<?=(VIEW['WEB']['meta']['keywords']) ?>">
	<meta name="robots" content="<?=(VIEW['WEB']['meta']['robots']) ?>">
	<meta name="og:url" content="<?=(VIEW['WEB']['url']) ?>">
	<meta name="author" content="<?=(VIEW['WEB']['meta']['author']) ?>">

	<script>
		window.$app = {
			build: {
				env: '<?=(ENV)?>',
				timestamp: '<?=(TIMESTAMP)?>'
			}
		};
	</script>

</head>
<body class="page">

<div class="app" id="App">

	App preloader ...

</div>

<script src="<?=(VIEW['WEB']['scripts'] . '?v=' . TIMESTAMP) ?>"></script>

</body>
</html>
