const registroDeFormulario = document.querySelector(".form_container")
const nombre = document.querySelector('#nombre')
const apellido = document.querySelector('#apellido')
const telefono = document.querySelector('#telefono')
const email = document.querySelector('#email')


const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

const guardarUsuarios= ()=>{
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
}

const estaVacio =(input)=>{
    return !input.value.trim().lenght;
}

const aTraves = (input,min,max) =>{
   return input.value.lenght >= min && input.vale.lenght < max
}

const validarEmail = (input) =>{
     const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
     return re.test(input.value.trim())
}

const existeElEmail = (input) =>{
    return usuarios.some((usuario) => usuario.email === input.value.trim())
}

const validarTelefono = (input) =>{
    const re = /^[0-9]{10}$/;
    return re.test(input.value.trim())
}

const darUnError = (input, mensaje) => {
    const formField = input.parentElement; 

    
    if (formField) {
        formField.classList.remove("success");
        const error = formField.querySelector('small');

    
        if (error) {
            error.style.display = "block";
            error.textContent = mensaje;
        }
    }
}

const mostrarSuccess = (input) =>{
    const formField=input.parentElement;formField.classList.remove('error');formField.classList.add('success')
    const error = formField.querySelector('small'); error.textContent=''
}


const validarTxt = (input)=>{
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
    e.preventdateform();

    let validarNombre = validarTxt(nombre);
    let validarApellido = validarTxt(apellido);
    let validarCorreo = validarEmail(email);
    let validarTel = validarTelefono(telefono);

    let isValidForm = validarNombre 
    && validarApellido 
    && validarCorreo 
    && validarCorreo 
    && validarTel;


    if (isValidForm){
        usuarios.push({
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            telefono: telefono.valaue,
        })
        saveToLocalStorage(usuarios)
        alert('su registro fue exitoso')

    }
}

        registroDeFormulario.addEventListener('submit', validarForm )
        nombre.addEventListener('input', ()=>validarTxt(nombre))
        apellido.addEventListener('input', ()=>validarTxt(apellido))
        telefono.addEventListener('input',()=>validarTelefono(telefono))
        email.addEventListener('input', ()=>validarEmail(email))