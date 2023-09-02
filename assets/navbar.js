


    const iconoMenu = document.querySelector('.icono_menu_desplegable');
    const lineaUno = document.querySelector(".desplegable_linea_uno");
    const lineados = document.querySelector(".desplegable_linea_dos");
    const lineaTres = document.querySelector(".desplegable_linea_tres");
    const overlay = document.querySelector(".overlay");
    const menuDesplegable = document.querySelector(".contenedor_paginas");
    const iconoCarrito = document.querySelector('.icono_carrito');
    const carritoDesplegar =document.querySelector(".carrito");
   
const desplegar_menu = () => {
  menuDesplegable.classList.toggle("desplegar_menu");
  lineaUno.classList.toggle("rotar_linea_uno");
  lineados.classList.toggle("eliminar_linea_dos");
  lineaTres.classList.toggle("rotar_linea_tres");
  if(carritoDesplegar.classList.contains('desplegar_carrito')){
    carritoDesplegar.classList.remove("desplegar_carrito");
    return;
  }
    overlay.classList.toggle("ver_overlay");
}



const desplegarcarrito = ()=>{
  carritoDesplegar.classList.toggle("desplegar_carrito");
  if(menuDesplegable.classList.contains("desplegar_menu")){
    menuDesplegable.classList.remove("desplegar_menu");
    lineaUno.classList.remove("rotar_linea_uno");
    lineados.classList.remove("eliminar_linea_dos");
    lineaTres.classList.remove("rotar_linea_tres");
   return;
  }
  overlay.classList.toggle("ver_overlay");
}
 
const cerrarConClick = (e) =>{
  if(!e.target.classList.contains("pagina"))
  return;
  menuDesplegable.classList.remove('desplegar_menu');
  overlay.classList.remove('ver_overlay');
}

const cerrarConScroll = () =>{
  if(!menuDesplegable.classList.contains('desplegar_menu')&& 
  !carritoDesplegar.classList.contains('desplegar_carrito'))
  return;

  menuDesplegable.classList.remove('desplegar_menu');
  carritoDesplegar.classList.remove('desplegar_carrito');
  overlay.classList.remove('ver_overlay');
}

const clickEnELOverlay = () =>{
  menuDesplegable.classList.remove('desplegar_menu');
  carritoDesplegar.classList.remove('desplegar_carrito');
  overlay.classList.remove('ver_overlay');
}


iconoCarrito.addEventListener("click", desplegarcarrito);
iconoMenu.addEventListener("click", desplegar_menu);
menuDesplegable.addEventListener('click', cerrarConClick);
window.addEventListener('scroll', cerrarConScroll);
overlay.addEventListener('click', clickEnELOverlay);
