<?php
header("Access-Control-Allow-Origin: *");

include 'koneksi.php';

$sql = "SELECT tanggal, id_kelas, id_jam from pemesanan order by tanggal asc, id_kelas asc, id_jam asc";
$stmt = $db->prepare($sql);
$stmt->execute();
//echo $json=json_encode($stmt);

$arrData = array();
$items = array();
$arrNo = 0;

while($row = $stmt->fetch(PDO::FETCH_OBJ)){
	array_push($items, $row);
}

echo json_encode($items);

?>
