<?php
/*header("Access-Control-Allow-Origin: *");

$db = new PDO('pgsql:dbname=sita; host=localhost;', 'postgres', 'dimas12');
*/

include 'koneksi.php';

$sql = "SELECT distinct brg_codebarang, nama_barang from master_barang limit 10";
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
