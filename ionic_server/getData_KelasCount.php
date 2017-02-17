<?php
	//http://stackoverflow.com/questions/18382740/cors-not-working-php
	if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }


    //http://stackoverflow.com/questions/15485354/angular-http-post-to-php-and-undefined
    $postdata = file_get_contents("php://input");
	if (isset($postdata)) {
		$request = json_decode($postdata);
		$kelas_id = trim($request->kelas_id);

		include 'koneksi.php';


		$sql = "SELECT count(id_kelas) as count, id_kelas from pemesanan where id_kelas='$kelas_id' group by id_kelas order by id_kelas asc ";
		$stmt = $db->prepare($sql);
		$stmt->execute();
		$row = $stmt->fetch(PDO::FETCH_OBJ) ?: {['count': 0]};

		echo json_encode($row);//$count = $row['count'];
	}
	else {
		echo "Not called properly with username parameter!";
	}
?>

