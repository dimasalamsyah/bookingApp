<?php
include 'koneksi.php';

header("Access-Control-Allow-Origin: *");

$sql = "SELECT hari, count(hari) from pemesanan group by hari order by hari asc";
		
$stmt = $db->prepare($sql);
$stmt->execute();

$arrData = array();
$items = array();
$arrNo = 0;

while($row = $stmt->fetch(PDO::FETCH_OBJ)){
	array_push($items, $row);
}
echo json_encode($items);
?>
