const productosCont = document.querySelector('.contenedor_productos')
const productosCarrito = document.querySelector('.carrito_contenedor')
const total = document.querySelector('.carrito_total')
const botonVerMas = document.querySelector('.boton_cargar')
const botonComprar = document.querySelector('.boton_comprar')
const botonBorrar = document.querySelector('.boton_borrar')
const carritoBubble = document.querySelector('.carrito_bubble')
const addModal = document.querySelector('.add_modal')


// seteamos el carrito
 let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
 

 const createProductTemplate = (productos) =>{
    const {id, name, value, cardImg, category} = productos;
    return `
    <div class="products">
              <img src='${cardImg}' alt="">
              <h3>${name}</h3>
              <span>PRECIO: </span>
              <span>${value}</span>
              <button class="boton_comprar" 
              data-category="${category}"
              data-id="${id}" 
              data-name="${name}" 
              data-value="${value}" 
              data-img="${cardImg}">Comprar</button>
            </div>`;
 };
// aca estamos trabajando dentro del products container
 const renderProducts = (productsList) =>{productosCont.innerHTML += productsList.map(createProductTemplate) .join('');
 };


 // ver mas
 
const isLastIndexOf = () =>{
    
    return appState.currentProductsIndex === appState.productsLimit -1;
};

const verMasProductos = () =>{
   
    appState.currentProductsIndex += 1; 
    let{products, currentProductsIndex}  = appState;
    renderProducts(products[currentProductsIndex]);
   
    if(isLastIndexOf()){
        botonVerMas.classList.add("hidden")
    }
}

const setShowMoreVisibility = () =>{
    
    if (!appState.activeFilter){
        botonVerMas.classList.remove("hidden")
        return;
    }
    botonVerMas.classList.add("hidden")
}

// logica del carrito

const createCartProductTemplate = (productosCarrito) =>{
    const {id, name, value, img, quantity} = productosCarrito;
    return`<div class="item_carrito">
    <img src='${img}' alt="carrito" />
    <div class="item-info">
      <h3 class="item-titulo">${name}</h3>
      <p class="item-bid">el precio es</p>
      <span class="item-precio"> $ ${value} </span>
    </div>
    <div class="item-handler">
      <span class="quantity-handler down" data-id=${id}>-</span>
      <span class="item-quantity">${quantity}</span>
      <span class="quantity-handler up" data-id=${id}>+</span>
      
    </div>
  </div>`;
}
//render

const renderCart = () => {
    
    if (!carrito.length){
        productosCarrito.innerHTML = `<p class="empty_msg">No hay productos en el carrito.</p>`;
        return;
    }
    productosCarrito.innerHTML = carrito.map(createCartProductTemplate).join("")

}

const totalDeLacompra = () =>{
    
    return carrito.reduce((cantidad, valor ) => 
    cantidad + Number(valor.value) * valor.quantity, 0)
}

const mostrarTotal = () =>{
    total.innerHTML = `${totalDeLacompra().toFixed(2)} Pesos`
}

const renderCartBubble = () =>{
    carritoBubble.textContent = carrito.reduce((cantidad, valor) => cantidad + valor.quantity, 0)
}



const disableBtn = (boton) =>{
    
    if(!carrito.length){
        boton.classList.add("disabled")
    } else{
        boton.classList.remove("disabled")
    }
}



const guardarCarrito = () =>{
    localStorage.setItem ("carrito", JSON.stringify(carrito))
}

const updateCartState = () =>{
    guardarCarrito()
    renderCart()
    mostrarTotal()
    disableBtn(botonComprar)
    disableBtn(botonBorrar)
    renderCartBubble()
}




const createProductData = ({id, name, value, img}) => { //revisar esto la proxima
    
    return{id, name, value, img};
};


const isExistingCartProduct = (product) =>{
    
    return carrito.find((item) => item.id === product.id)
} 



const agregarUnidad = (product) =>{
    carrito = carrito.map((cartproduct) => cartproduct.id === product.id ?
       { ...cartproduct, quantity: cartproduct.quantity + 1 }
    : cartproduct);
    };

const createCartPorduct = (product) => {
    carrito=[...carrito, {...product, quantity :1 }]
}


const mostrarModal = (mensaje) =>{
    addModal.classList.add('activar_modal');
    addModal.textContent = mensaje
    setTimeout(() =>{
        addModal.classList.remove(('activar_modal'))
    }, 1500)
}

const agregarAlCarrito = (e) =>{
    
    if (!e.target.classList.contains("boton_comprar"))return;
    const product = createProductData(e.target.dataset);

    
    if(isExistingCartProduct(product)){
        agregarUnidad(product)
        mostrarModal("se a agregado una unidad ")
    
    }else{
    
        createCartPorduct(product)
        mostrarModal('el producto se a agregado')
    }
    updateCartState()
};


const handlePlusBtnEvent = (id) =>{
    const existeArticuloEnElcarrito= carrito.find((item) => item.id === id)
    agregarUnidad(existeArticuloEnElcarrito)
}



const handleMinusBtnEvent = (id) =>{ 
    
    const existeArticuloEnElcarrito = carrito.find ((item) => item.id === id)
    
    if (existeArticuloEnElcarrito.quantity === 1){
    
        if (window.confirm("desea eliminar producto??")){
            removerProductoDelCarrito(existeArticuloEnElcarrito)
        }
    
        return;
    }
    restarUnidad(existeArticuloEnElcarrito)
}


const removerProductoDelCarrito =(product) =>{
    carrito = carrito.filter ((item) => item.id !== product.id)
    updateCartState()
}

const restarUnidad = (product) =>{
    carrito = carrito.map ((item) =>{
    
        return item.id === product.id ?
        {...item, quantity: Number(item.quantity) - 1}
    : item })
}


const handleQuantity = (e) =>{
    
    if (e.target.classList.contains("down")){
        handleMinusBtnEvent(e.target.dataset.id)
    } else if (e.target.classList.contains("up")){
        handlePlusBtnEvent(e.target.dataset.id)
    }
    updateCartState()
}


const resetCartItems = () =>{
    carrito = []
  updateCartState()
}



const completeCartAction = (confirmarMensaje, successMensaje) =>{
    
    if(!carrito.length) 
    
    return;
    
    if(window.confirm(confirmarMensaje)){
    resetCartItems()
    alert(successMensaje)
 }
}



const completeBuy = () =>{
    completeCartAction("desea completar su compra?", "¡gracias por su compra!")
}


const deleteCart = () =>{
    completeCartAction("desea vaciar el carrito?", "¡no hay productos en el carrito!")
}


const init = () =>{
    renderProducts(appState.products[0])
    botonVerMas.addEventListener("click", verMasProductos)
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", mostrarTotal)
    productosCont.addEventListener("click", agregarAlCarrito)
    productosCarrito.addEventListener("click", handleQuantity)
    botonComprar.addEventListener("click", completeBuy)
    botonBorrar.addEventListener("click", deleteCart)
    disableBtn(botonComprar)
    disableBtn(botonBorrar)
    renderCartBubble(carrito)
}
init()