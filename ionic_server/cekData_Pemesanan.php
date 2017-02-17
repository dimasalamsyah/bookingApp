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
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }


    //http://stackoverflow.com/questions/15485354/angular-http-post-to-php-and-undefined
    $postdata = file_get_contents("php://input");
	if (isset($postdata)) {
		$request = json_decode($postdata);
		$getTgl = $request->setTgl;
		$getKelas = $request->setKelas;
		$setJam = $request->setJam;

		include 'koneksi.php';

		$sql = "SELECT id from pemesanan where tanggal='$getTgl' and id_kelas='$getKelas' and id_jam='$setJam' ";
		$stmt = $db->prepare($sql);
		$stmt->execute();
		$count = $stmt->rowCount();
		$cek = json_encode($count);

		if($cek==0){
			$sql_no = "SELECT max(id) as id from pemesanan";
			$stmt_no = $db->prepare($sql_no);
			$stmt_no->execute();
			$row = $stmt_no->fetch(PDO::FETCH_ASSOC);
			$angka = $row['id'] + 1;

			$sql_save = "INSERT into pemesanan values($angka, 'Dimas', 'Dosen', '$getTgl', '$getKelas', '$setJam') ";
			$stmt_save = $db->prepare($sql_save);
			$stmt_save->execute();
			$result = "success";
		}else{
			$result = "failed";
		}
		echo $result;
	}
	else {
		echo "Failed";
	}
?>

