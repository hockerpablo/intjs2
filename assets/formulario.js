const registroDeFormulario = document.getElementById("registrar")
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const telefono = document.getElementById('telefono')
const email = document.getElementById('email')


const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];



const estaVacio =(input)=>{
    return !input.value.trim().length;
}

const aTraves = (input,min,max) =>{
   return input.value.length >= min && input.value.length < max
}

const validarEmail = (input) =>{
    const re = /\S+@\S+\.\S+/;
    return re.test(input.value.trim());
  };

const existeElEmail = (input) =>{
    return usuarios.some((usuario) => usuario.email === input.value.trim());
};

const validarTelefono = (input) => {
    const re = /^[0-9]{10}$/;
    return re.test(input.value.trim());
  };

const darUnError = (input, message) => {
    const baliza = input.parentElement;
    baliza.classList.remove('success')
    baliza.classList.add('error')
    const error = baliza.querySelector('small')
    error.style.display = "flex";
    error.textContent = message;
  };
  
  
  const mostrarSuccess = (input) => {
    const baliza = input.parentElement;
    baliza.classList.remove('error');
    baliza.classList.add('success');
    const error = baliza.querySelector('small');
    error.textContent = '';
  };

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
    mostrarSuccess(input);
    valid = true;
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
    e.preventDefault();

    let validarNombre = validarTxt(nombre);
    let validarApellido = validarTxt(apellido);
    let validarCorreo = revisarEmail(email);
    let validarTel = revisraTelefono(telefono);

    let isValidForm = 
    validarNombre 
    && validarApellido 
    && validarCorreo 
    && validarTel;


    if (isValidForm){
        usuarios.push({
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            telefono: telefono.value,
        })
        guardarUsuarios(usuarios)
        alert('su registro fue exitoso')

    }
}

const guardarUsuarios= ()=>{
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
}
        registroDeFormulario.addEventListener('submit', validarForm )
        nombre.addEventListener('input', ()=>validarTxt(nombre))
        apellido.addEventListener('input', ()=>validarTxt(apellido))
        telefono.addEventListener('input',()=>validarTelefono(telefono))
        email.addEventListener('input', ()=>validarEmail(email))
