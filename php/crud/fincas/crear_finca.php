<?php 
session_start();
require_once '../../conexion.php';     
$cod_fin = $_SESSION['idusuario'].$_POST['cod_fin'];	 
$nom_fin = $_POST['nom_fin'];
$det_fin = $_POST['det_fin'];
$cod_dep = $_POST['dep_fin'];
$cod_mun = $_POST['mun_dep'];
$ide_ter = $_POST['due_fin'];
$cod_unm = $_POST['uni_med'];
$med_fin = $_POST['med_fin']; 

$nomi=$_FILES['foto_fin']['name'];
$ruta=$_FILES['foto_fin']['tmp_name'];

$folder='../../../imagenes/fincas';
move_uploaded_file($ruta, $folder.'/'.$nomi);

$img = "fincas/".$nomi;

$sql="INSERT INTO public.fincas(
cod_fin, nom_fin, det_fin, cod_dep, cod_mun, ide_ter, cod_unm, med_fin,fot_fin)
VALUES ('$cod_fin','$nom_fin', '$det_fin', '$cod_dep','$cod_mun','$ide_ter','$cod_unm', '$med_fin','$img')";		 
echo $result=pg_query($conexion,$sql); 
?>
