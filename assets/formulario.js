const registroDeFormulario = document.getElementById("#registrar")
const nombre = document.getElementById('#nombre')
const apellido = document.getElementById('#apellido')
const telefono = document.getElementById('#telefono')
const email = document.getElementById('#email')

//const carrito = JSON.parse(localStorage.getItem("carrito") || [])

// const guardarUsuarios= ()=>{
//     localStorage.setItem('carrito', JSON.stringify(carrito))
// }

const estaVacio =(input)=>{
    return !input.value.trim().lenght
}

const aTraves = (input,min,max) =>{
   return input.value.lenght >= min && input.vale.lenght < max
}

const validarEmail = (input) =>{
     const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
     return re.test(input.value.trim())
}

const existeElEmail = (input) =>{
    return carrito.some((usuario) => usuario.email === input.value.trim())
}

const validarTelefono = (input) =>{
    const re = /^[0-9]{10}$/;
    return re.test(input.value.trim())
}

const darUnError = (input, mensaje) =>{
    const formField = input.parentElement; 
    formField.classList.remove("success"); formField.classList.add("error")
    const error = formField.querySelector('smaill')
    error.style.display ='block'
    error.textContent = mensaje
}

const mostrarSuccess = (input) =>{
    const formField=input.parentElement;formField.classList.remove('error');formField.classList.add('success')
    const error = formField.querySelector('small'); error.textContent=''
}


const validarTxt = ()=>{
    let valid = false
    const minCharacter = 3
    const maxCharacter = 25
    if (estaVacio(input)){
        darUnError(input, "es obligatorio escribir aqui")
        return;
    }
    if (!aTraves(input, minCharacter, maxCharacter)){
        darUnError(input, `debe tener entre ${minCharacter} y ${maxCharacter} caracteres`)
        return;
    }
    mostrarSuccess(input)
    valid = true
    return valid;
}

const revisarEmail = (input) =>{
    let valid = false;
    
    if (estaVacio(input)){
        darUnError(input, "es obligatorio poner el correo")
        return;
    }
    if (!validarEmail(input)){
        darUnError(input, "este correo no es valido")
        return;
    }
    if (existeElEmail(input)){
        darUnError(input, `ya esta registrado`)
        return;
    }
    mostrarSuccess(input)
    valid = true
    return valid;
}

const revisraTelefono = (input) =>{
    let valid = false;
    
    if (estaVacio(input)){
        darUnError(input, "es obligatorio poner el telefono")
        return;
    }
    if (!validarTelefono(input)){
        darUnError(input, "este telefono no es valido")
        return;
    }
    mostrarSuccess(input)
    valid = true
    return valid;
}

const validarForm = (e)=>{
    e.preventdateform()

    let validarNombre = validarTxt(nombreInput)
    let validarApellido = validarTxt(apellidoInput)// ver esto depues por las dudas
    let validarCorreo = validarEmail(emaliInput)
    let validarTel = validarTelefono(telefonoInput)

    let isValidForm = validarNombre 
    && validarApellido 
    && validarCorreo 
    && validarCorreo 
    && validarTel;


    if (isValidForm){
        user.push({
            nombre: nombreInput.value,
            apellido: apellidoInput.value,
            email: emaliInput.value,
            telefono: telefonoInput.valaue,
        })
        localStorage(user)
        alert('su registro fue exitoso')
    }
}


    registroDeFormulario.addEventListener('submit', validarForm )
    nombre.addEventListener('input', ()=>validarTxt(nombreInput))
    apellido.addEventListener('input', ()=>validarTxt(apellidoInput))
    telefono.addEventListener('input',()=>validarTelefono(telefonoInput))
    email.addEventListener('input', ()=>validarEmail(emaliInput))
