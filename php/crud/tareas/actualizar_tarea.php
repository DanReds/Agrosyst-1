<?php 
require_once '../../conexion.php';     
$cod_tar_up = $_POST['cod_tar_up'];
$descipcion = $_POST['descipcion'];
$fin_tar = $_POST['fin_tar'];

$sql="UPDATE public.tarea
SET ffi_tar='$fin_tar', des_tar='$descipcion'
WHERE cod_tar='$cod_tar_up'";
echo $result=pg_query($conexion,$sql);
?>