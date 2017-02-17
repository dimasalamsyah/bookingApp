<?php
include 'koneksi.php';

header("Access-Control-Allow-Origin: *");

$sql = "SELECT distinct id, nama_kelas from kelas order by nama_kelas asc";
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
//print_r($items);

?>
