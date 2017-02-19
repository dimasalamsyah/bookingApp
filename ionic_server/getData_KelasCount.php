<?php
include 'koneksi.php';

//header("Content-Type: plain/text");
header("Access-Control-Allow-Origin: *");

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

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$kelas_id = @$request->kelas_id; //'205';//

$sql = "SELECT count(a.id_kelas) as count, b.nama_kelas from kelas b
				left join pemesanan a on b.nama_kelas=a.id_kelas 
				group by b.nama_kelas order by b.nama_kelas asc";
$stmt = $db->prepare($sql);
$stmt->execute();
//echo $json=json_encode($stmt);

$arrData = array();
$items = array();
$arrNo = 0;

while($row = $stmt->fetch(PDO::FETCH_OBJ)){
	array_push($items, $row);
	//$items[] = $row[1];
}
echo json_encode($items);

/*$hari_arr = array("monday" => "Senin", "tuesday" => "Selasa", "wednesday" => "Rabu", 
						"thursday" => "Kamis", "friday" => "Jumat", "saturday" => "Sabtu", "sunday" => "Minggu");

echo $hari_arr['sunday'];*/
?>
