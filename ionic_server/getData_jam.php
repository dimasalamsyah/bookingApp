<?php
include 'koneksi.php';

$sql = "SELECT distinct id, nama_jam from jam order by nama_jam asc";
$stmt = $db->prepare($sql);
$stmt->execute();
//echo $json=json_encode($stmt);

$arrData = array();
$items = array();
$arrNo = 0;

while($row = $stmt->fetch(PDO::FETCH_OBJ)){
	array_push($items, $row);
	//$items[$rowno]->brg = $kd;
	$arrNo++;
}
echo json_encode($items);

?>
