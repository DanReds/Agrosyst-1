function comprar(){
  num_fact=$('#num_fact').val();
  if(num_fact != ""){
    factura=num_fact.split(':');
  }
  num_fact=factura[1];
  fec_con=$('#date').val();
  hor_com=$('#time').val();
  proveedor=$('#proveedor').val();
  comprador=$('#cod_ter_soc').val();
  cos_tot=$('#cos_tot').val();
  productos=$('#informacion').val();
  cultivo=$('#cod_cul').val();

  cadena="num_fact="+ num_fact +
  "&fec_con="+ fec_con +
  "&hor_com="+ hor_com +
  "&proveedor="+ proveedor +
  "&comprador="+ comprador+
  "&cos_tot="+ cos_tot;
    // alert(cadena);

    if(num_fact == "" || fec_con == "" || hor_com == "" || proveedor == null
     || comprador == null || cos_tot == "" || productos == "" || cultivo == null){

      toastr.error('Algunos campos están incompletos','',{
       "positionClass": "toast-top-center",
       "closeButton": true,
       "progressBar":true
     });

  }else{
    $.ajax({
      type:"post",
      url:"../php/crud/compras/crear_compras.php",
      data:cadena,
      success:function(r){
        if(r=='Resource id #6'){
          //alert("Crear compras:" + r);
          //Insertar el comprador y el vendedor
          $.ajax({
            type:"post",
            url:"../php/crud/compras/crear_comprar.php",
            data:cadena,
            success:function(r){
             //alert("Crear comprar:" + r);
           }
         });


           //Llenar en el stock
           arreglo=$('#informacion').val();

           insumos=arreglo.split('+');
           for (i=0; i< ((insumos.length)-1);i++) {


             productos=insumos[i].split(',');

             cantiad=parseInt(productos[2]);
             insumo=parseInt(productos[1]);
             precio=parseInt(productos[3]);

             datos="num_fact="+ num_fact +
             "&fec_con="+ fec_con +
             "&hor_com="+ hor_com +
             "&insumo="+ insumo +
             "&socio="+ comprador +
             "&cantiad="+ cantiad +
             "&precio="+ precio;

             // alert(datos);

             $.ajax({
               type:"post",
               url:"../php/crud/compras/llenar_stock.php",
               data:datos,
               success:function(r){
                 //alert("Llenar stock:" + r);
               }
             });

             swal("Compra realizada!"," ", "success");
             window.location="compras.php";
           }
         }
       }
     })
  }
}

function objetoAjax(){
  var xmlhttp= false;
  try {
    xmlhttp = new  ActiveXObject("MsxmL2.XMLHTTP");
  }catch(e){
    try{
      xmlhttp = new  ActiveXObject("Microsoft.XMLHTTP");
    }catch(E){
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

function cargar_socios(){
  cultivo =  $('#cod_cul').val();
  ajax = objetoAjax();
  ajax.open("POST","../php/componentes/componentes_compras/opc_socios.php", true);
  ajax.onreadystatechange=function(){
    if ( ajax.readyState==4 ) {
      document.getElementById("soc_opc").innerHTML=ajax.responseText;
    }
  }
  ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  ajax.send("cod_cul="+cultivo);
}


$(document).ready(function(){

 toastr.info('Por favor, mientras ingrese los productos de la compra no recargue la pagina','',{
   "positionClass": "toast-bottom-right",
   "closeButton": true,
   "progressBar":true
 });
 jQuery('#ver2').hide();
 $('#date-hour').load('../php/componentes/menu/date-hour.php');
 $('#actions-lg-scr').load('../php/componentes/menu/actions-lg-scr.php');
 $('#actions-sm-scr').load('../php/componentes/menu/actions-sm-scr.php');
 $('#menu').load('../php/componentes/menu/menu.php');

 $('#cos_uni').keyup(function(){

  can_sto=parseInt($('#can_sto').val());
  cos_uni=parseInt($('#cos_uni').val());
  if($('#can_sto').val() != ""){
    total=((can_sto)*(cos_uni));
    $('#cos_mul').val(total);
  }
});
 $('#can_sto').keyup(function(){

  can_sto=parseInt($('#can_sto').val());
  cos_uni=parseInt($('#cos_uni').val());
  if($('#cos_uni').val() != ""){
    total=((can_sto)*(cos_uni));
    $('#cos_mul').val(total);
  }
});

 $('#tip_ins').change(function(){
   document.getElementById("tempo").style.display = "none";
   escoger_insumo();     
 });

 $('#cod_cul').change(function(){
  cargar_socios();
});

 $('#socio').change(function(){
 });
});


function escoger_insumo(){
  tip_ins=$('#tip_ins').val();
  $.ajax({
    type:"post",
    url:"../php/componentes/componentes_compras/tipo_insumo.php",
    data:"tip_ins="+tip_ins,
    success:function(r){
     document.getElementById("ins_esc").style = "";
     $('#ins_esc').html(r);
   }
 });
}
