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
		$hari_id = $request->hari_id;
		$kelas_id = $request->kelas_id;
		$jam_id = $request->jam_id;

		include 'koneksi.php';

		$sql_no = "SELECT max(id) as id from pemesanan";
		$stmt_no = $db->prepare($sql_no);
		$stmt_no->execute();
		$row = $stmt_no->fetch(PDO::FETCH_ASSOC);
		$angka = $row['id'] + 1;


		$sql = "INSERT into pemesanan values($angka, 'Dimas', 'Dosen', '$hari_id', '$kelas_id', '$jam_id') ";
		$stmt = $db->prepare($sql);
		$stmt->execute();
		
		/*if( $stmt->execute() ){
			echo json_encode("success");
		}else{
			echo json_encode($stmt->error);
		}*/
	}
	else {
		echo "Not called properly with username parameter!";
	}
?>

