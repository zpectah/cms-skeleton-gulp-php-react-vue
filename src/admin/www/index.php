<?php
const PATH_PFX = '../../';
require '../../core/index.php';
$ss = new \core\service\SessionService;
?>
<!doctype html>
<html lang="<?=(VIEW['ADMIN']['meta']['lang']) ?>">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<?php if (VIEW['ADMIN']['using_external_css']) echo('<link rel="stylesheet" href="' . VIEW['ADMIN']['styles'] . '?v=' . TIMESTAMP . '">'); ?>
	<title><?=(VIEW['ADMIN']['meta']['title']) ?></title>
	<meta name="description" content="<?=(VIEW['ADMIN']['meta']['description']) ?>">
	<meta name="keywords" content="<?=(VIEW['ADMIN']['meta']['keywords']) ?>">
	<meta name="robots" content="<?=(VIEW['ADMIN']['meta']['robots']) ?>">
	<meta name="og:url" content="<?=(VIEW['ADMIN']['url']) ?>">
	<meta name="author" content="<?=(VIEW['@']['author_meta']) ?>">

	<script>
		window.WARP_ENVIRONMENT = window.WARP_ENVIRONMENT || '<?=(ENV)?>';
		window.WARP_TIMESTAMP = window.WARP_TIMESTAMP || '<?=(TIMESTAMP)?>';
		window.CMS_TOKEN = window.CMS_TOKEN || '<?=($ss -> get_token())?>';
	</script>

</head>
<body class="page">

<div class="app" id="App">

	<div style="width: 100%;height: 100%;margin: 0;padding: 0;position: fixed;top: 0;left: 0;z-index: 999;background-color: rgb(238,238,238);display: flex; align-items: center; justify-content: center;">
		<div style="width: 100px;height: 100px;">
			<svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
				<circle fill="rgb(25,25,25)" stroke="none" cx="6" cy="50" r="6">
					<animate
						attributeName="opacity"
						dur="1s"
						values="0;1;0"
						repeatCount="indefinite"
						begin="0.1" />
				</circle>
				<circle fill="rgb(25,25,25)" stroke="none" cx="26" cy="50" r="6">
					<animate
						attributeName="opacity"
						dur="1s"
						values="0;1;0"
						repeatCount="indefinite"
						begin="0.2" />
				</circle>
				<circle fill="rgb(25,25,25)" stroke="none" cx="46" cy="50" r="6">
					<animate
						attributeName="opacity"
						dur="1s"
						values="0;1;0"
						repeatCount="indefinite"
						begin="0.3" />
				</circle>
		</svg>
		</div>
	</div>

</div>

<script src="<?=(VIEW['ADMIN']['scripts'] . '?v=' . TIMESTAMP) ?>"></script>

</body>
</html>
