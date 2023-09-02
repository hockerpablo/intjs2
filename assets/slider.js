let imagenes=[
    "assets/img/slideshow/1.png",
    "assets/img/slideshow/2.png",
    "assets/img/slideshow/3.png",
    "assets/img/slideshow/4.png",
];

document.imagen.src = imagenes[0];

let sliderderecha = document.querySelector('.slider-derecha');
let sliderizquierdo = document.querySelector('.slider-izquierda');
let contador = 0;

function moverDerecha(){
    contador++;
    if (contador> imagenes.length - 1){
        contador = 0;
    }
    document.imagen.src = imagenes[contador];
}
let intervalo = setInterval(moverDerecha, 4000);
sliderderecha.addEventListener("click", function()
{
    clearInterval(intervalo);
    moverDerecha();
    intervalo = setInterval(moverDerecha, 4000)
})

function moverIzquierda(){
    contador--;
    if(contador< 0){
        contador=imagenes.length -1;
    }
    document.imagen.src = imagenes[contador];
}
sliderizquierdo.addEventListener("click", function(){
    clearInterval(intervalo);
    moverIzquierda();
    intervalo = setInterval(moverIzquierda, 4000)
})




/// slider de productos 



// const asusRtx4090 = [
//     "assets/img/products/asus rog strix 4090/1.jpg",
// ];

// const asusTufF15 = [
//     "assets/img/products/asus tuf f15/1.jpeg",
//     "assets/img/products/asus tuf f15/2.jpeg",
//     "assets/img/products/asus tuf f15/3.jpg",
//     "assets/img/products/asus tuf f15/4.jpg",
// ];

// const asusRtx4070Ti = [
//     "assets/img/products/asus rtx4070ti/1.jpg",
//     "assets/img/products/asus rtx4070ti/2.jpg",
//     "assets/img/products/asus rtx4070ti/3.jpg",
// ];

// function moverSlide1(){
//     contador++;
//     if (contador> asusTufF15.length - 1){
//         contador = 0;
//     }
//     document.product_slide_1.src = asusTufF15[contador];
// }

// let intervalo1 = setInterval(moverSlide1, 3000);

// function moverSlide2(){
//     contador++;
//     if (contador> asusRtx4090.length - 1){
//         contador = 0;
//     }
//     document.product_slide_2.src = asusRtx4090[contador];
// }

// let intervalo2 = setInterval(moverSlide2, 2000);

// function moverSlide3(){
//     contador++;
//     if (contador> asusRtx4070Ti.length - 1){
//         contador = 0;
//     }
//     document.product_slide_3.src = asusRtx4070Ti[contador];
// }
// let intervalo3 = setInterval(moverSlide3, 3000);