<?php

if (!isset($_SESSION['next_url'])) {
	session_start();
}

if (isset($_GET['page'])) {
	$page = $_GET['page'];
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
if (isset($_SESSION['next_url'])) {
	curl_setopt($ch, CURLOPT_URL,'https:' . $_SESSION['next_url']);
} else {
	curl_setopt($ch, CURLOPT_URL,'https://photorankapi-a.akamaihd.net/streams/1708220103/media/recent?auth_token=60c46087c1065c0abb21c53f30d373046f4dacf4d5f67ccb1b3161267db1bdc1&version=v2.2&count=50');
}
$content = curl_exec($ch);
$decoded = json_decode($content, true);
$medias = $decoded["data"]["_embedded"]["media"];
$count = count($medias);
$_SESSION['next_url'] = $decoded["data"]["_links"]["next"]["href"];

for ($x = 0; $x < $count; $x++) { ?>
<script>console.log("<?php echo $_SESSION['next_url']?>")</script>
	<div class="tile">
		<a class="tile-inner" href="<?php echo $decoded["data"]["_embedded"]["media"][$x]["images"]["original"] ?>">
			<img class="item" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="<?php echo $decoded["data"]["_embedded"]["media"][$x]["images"]["original"] ?>" />
		</a>
	</div>

<?php } ?>