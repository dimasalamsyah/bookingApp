<?php
header("Access-Control-Allow-Origin: *");

//$db = new PDO('pgsql:dbname=sita; host=localhost;', 'postgres', 'dimas12');

//include 'ionic.css';
include 'koneksi.php';

$sql = "SELECT tanggal from pemesanan group by tanggal order by tanggal asc";
$stmt = $db->prepare($sql);
$stmt->execute();
//echo $json=json_encode($stmt);

$arrData = array();
$items = array();
$arrNo = 0;

$content = "<div class='list'>";

while($row = $stmt->fetch(PDO::FETCH_NUM)){
	/*array_push($items, $row);
	*/
	$tgl = trim($row[0]);

	$content .= "<div class='item item-divider'>
				  ".$tgl."
				</div>";

				$sql_ex = "SELECT id_kelas, id_jam from pemesanan where tanggal='$tgl' order by id_kelas asc, id_jam asc";
				$stmt_ex = $db->prepare($sql_ex);
				$stmt_ex->execute();

				while ($row_ex = $stmt_ex->fetch(PDO::FETCH_NUM)) {
					$kelas = trim($row_ex[0]);
					$jam = trim($row_ex[1]);
					$content .= "<div class='item item-button-right'>
								  ".$kelas." - ".$jam."
								  <button class='button button-assertive' ng-click='del_booking($tgl, $kelas, $jam)'>
								    <i class='icon ion-close-round'></i>
								  </button>
								</div>";
				}
	//$arrNo++;
}
$content .= "</div>";

echo $content;
?>
