const productosCont = document.querySelector('.contenedor_productos')
const productosCarrito = document.querySelector('.carrito_contenedor')
const total = document.querySelector('.carrito_total')
const contenedorDeCategorias = document.querySelector('.categorias')
const listaDeCategorias = document.querySelector('.categoria')
const botonVerMas = document.querySelector('.boton_cargar')
const botonComprar = document.querySelector('.boton_comprar')
const botonBorrar = document.querySelector('.boton_borrar')
const carritoBubble = document.querySelector('.carrito_bubble')
const addModal = document.querySelector('.add_modal')

//seteamos el carrito
 let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

 const createProductTemplate = (products) =>{
    const {id, name, value, cardImg} = products;
    return `
    <div class="products">
              <img src='${cardImg}' alt="">
              <h3>${name}</h3>
              <span>PRECIO</span>
              <span>${value}</span>
              <button class="boton_comprar" 
              data-id="${id}" 
              data-name="${name}" 
              data-value="${value}" 
              data-img="${cardImg}">Comprar</button>
            </div>`;
 };
//aca estamos trabajando dentro del products container
 const renderProducts = (productsList) =>{
    productosCont.innerHTML += productsList.map
    (createProductTemplate) .join('');
 };


 //ver mas

const isLastIndexOf = () =>{
    return appState.currentProductsIndex === appState.productsLimit -1;
};

const verMasProductos = () =>{
    appState.currentProductsIndex += 1; //le saque una a
    let{products, currentProductsIndex}  = appState;
    renderProducts(products[currentProductsIndex]);
    if(isLastIndexOf()){
        botonVerMas.classList.add("hidden")
    }
}

//ocultar o mostrar boton ver mas

const setShowMoreVisibility = () =>{
    if (!appState.activeFilter){
        botonVerMas.classList.remove("hidden")
        return;
    }
    botonVerMas.classList.add("hidden")
}

//los filtros

const cambiarEstadoActivoBoton = (seleccionarCategoria)=>{
    const categorias = [...listaDeCategorias]
    categorias.forEach((botonDeCategoria) =>{
        if(botonDeCategoria.dataset.category !== seleccionarCategoria){
            botonDeCategoria.classList.remove("active")
            return;
        }
        botonDeCategoria.classList.add("active")
    })
}

//funcion para cambiar el estado del filtro activo


const cambiarFiltroDeEstado = (boton) =>{
    appState.activeFilter = boton.dataset.category
    cambiarEstadoActivoBoton(appState.activeFilter)
    setShowMoreVisibility(appState.activeFilter)
}

//funcion para saber o no si esta activo el boton qeu se apreto

const isInactiveFilterBtn = (elemento) =>{
    return(
        elemento.classList.contains("category") && !elemento.classList.contains("active")
    )
}


//funcion para plicar filtro cuadno se apreta un boton de categoria

const applyFilter = (event) =>{
    const {target} = event
    if(!isInactiveFilterBtn(target)) return;

    productosCont.innerHTML = "";
    if(appState.activeFilter){
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0])};

    //funcion para renderizar los productos

const renderFilteredProducts = () =>{
    const filteredProducts = productsData.filter(        ////luego ver el filtered products
        (product) => product.category === appState.activeFilter); 

renderProducts(filteredProducts);
};

//ver el la clase 18 en el minuto 53

//logica delk carrito


const createCartProductTemplate = (productcart) =>{
    const {id, name, value, cardImg, quantity} = productcart
    return`<div class="item_carrito">
    <img src=${cardImg} alt="carrito" />
    <div class="item_info">
      <h3 class="item_titulo">${name}</h3>
      <p class="item_valor">el precio es</p>
      <span class="item_precio"> $ ${value} </span>
    </div>
    <div class="item_handler">
      <span class="quantity_handler down" data_id=${id}>-</span>
      <span class="item_cantidad">${quantity}</span>
      <span class="quantity_handler up" data-id=${id}>+</span>
    </div>
  </div>`;
}

//funcion para renderizar los productos del carrito o para poner el mensaje de no hay

const renderCart = () => {
    if (!carrito.length){
        productosCarrito.innerHTML = `<p class="empty_msg">No hay productos en el carrito.</p>`;
        return;
    }
    productosCarrito.innerHTML = carrito.map(createCartProductTemplate).join("")
}

//funcion para obtener el total de la compra

const totalDeLacompra = () =>{
    return carrito.reduce((cantidad, valor ) => 
    cantidad + Number(valor.value) * valor.quantity, 0)
}

//funcion para mostrar el total

const mostrarTotal = () =>{
    total.innerHTML = `${totalDeLacompra().toFixed(2)} Pesos`
}

//funcion para ver la burbujita con la cantidad de productos

const renderCartBubble = () =>{
    carritoBubble.textContent = carrito.reduce((cantidad, valor) => cantidad + valor.quantity, 0)
}

//funcion para habilitar o desabilitar un boton segun corresponda

const disableBtn = (boton) =>{
    if(!carrito.length){
        boton.classList.add("disabled")
    } else{
        boton.classList.remove("disabled")
    }
}

// funcion para guardar el carrito en el local storage

const guardarCarrito = () =>{
    localStorage.setItem ("carrito", JSON.stringify(carrito))
}


//funcion para modificar el estado del carrito

const updateCartState = () =>{
    guardarCarrito()
    renderCart()
    mostrarTotal()
    disableBtn(botonComprar)
    disableBtn(botonBorrar)
    renderCartBubble()
}


//funcion para crear un objeto con la informacion del producto a agregar al carrito

const createProductData = (product) => {
    const {id,name,value,img} = product
    return{id, name, value, img};
};
//funcion para crear un objeti con la info del producto qeu se agrega al carrito

const isExistingCartProduct = (product) =>{
    return carrito.find((item) => item.id === product.id)
} 

//funcion para incrementar una unidad del mismo en el carrito

const agregarUnidad = (product) =>{
    carrito = carrito.map((cartproduct) => cartproduct.id === product.id ?
       { ...cartproduct, quantity: cartproduct.quantity + 1 }
    : cartproduct);
    };

const createCartPorduct = (product) => {
    carrito=[...carrito, {...product, quantity :1 }]
}

// funcion para mostrar modal  de exito 

const mostrarModal = (msg) =>{
    addModal.classList.add('activar_modal');
    addModal.textContent = msg
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

//funcion para agregar mas productos al carrito

const handlePlusBtnEvent = (id) =>{
    const existeArticuloEnElcarrito= carrito.find((item) => item.id === id)
    agregarUnidad(existeArticuloEnElcarrito)
}

//funcion para restar un producto al carrito

const handleMinusBtnEvent = (id) =>{
    const existeArticuloEnElcarrito = carrito.find ((item) => item.id=== id)
    if (existeArticuloEnElcarrito.quantity === 1){
        if (window.confirm("desea eliminar producto??")){
            removerProductoDelCarrito(existeArticuloEnElcarrito)
        }
        return;
    }
    sustrerUnidad(existeArticuloEnElcarrito)
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


//funcion para maejar los eventos al pareter el boton mas o menos del item del carrito

const handleQuantity = (e) =>{
    if (e.target.classList.contains("down")){
        handleMinusBtnEvent(e.target.dataset.id)
    } else if (e.target.classList.contains("up")){
        handlePlusBtnEvent(e.target.dataset.id)
    }
    updateCartState()
}

//funcion para vaciar el carrito

const resetCartItems = () =>{
    carrito = []
  updateCartState()
}

//funcion para completar la compra o vaciar el carrito

const completeCartAction = (confirmMsg, successMsg) =>{
    if(!cart.length) 
    return;
if(window.confirm(confirmMsg)){
    resetCartItems()
    alert(successMsg)
 }
}

//funcion disparar un mensaje de compra exitosa

const completeBuy = () =>{
    completeCartAction("desea completar su compra?", "¡gracias por su compra!")
}

//funcion para disparar el mesanje de borra los items del carrito

const deleteCart = () =>{
    completeCartAction("desea vaciar el carrito?", "¡no hay productos en el carrito!")
}


const init = () =>{
    renderProducts(appState.products[0])
    botonVerMas.addEventListener("click", verMasProductos)
    contenedorDeCategorias.addEventListener('click', applyFilter)
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