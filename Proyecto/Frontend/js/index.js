//Inputs cargar venta
const $email = document.getElementById("email");
const $contrasenia = document.getElementById("contrasenia");

//Token
let tokenSesion = sessionStorage.getItem('token');
let token = `Bearer ${tokenSesion}`;

//API_URL
const API_URL = 'https://localhost:7022/api/';

// Form post login

const $form_login_post = document.getElementById("form_login_post");


$form_login_post.addEventListener('submit', async(e)=>{
    e.preventDefault();
    
    // Obtener datos del formulario
    let user = {};
    user = cargarCampos(user);

    // Validar campos
    if (!validarCampos()) {
            alert("Por favor, completa los campos correctamente!")
            return
    }else{
        let response = await fetch((`${API_URL}User/Login`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${token}`
            },
            body: JSON.stringify(user)
        });

        let data = await response.json();
        
        
        if(data.data.result === null){
            console.log("Data", data.data.result);
            alert("No se pudo logear correctamente!");
        }else{
            alert("Se pudo logear correctamente!");
            // console.log("Se pudo logear correctamente!");
            const tokenn = data.data.result.token
            console.log(tokenn);
            sessionStorage.setItem("token",tokenn);
            window.location = 'index.html'
        }
    }
})


function cargarCampos(){

    // Construir user
    let usuario = {
        username:$email.value,
        password: $contrasenia.value,
    };

    return usuario;
}


function validarCampos(){
    // Contraseña
    if ($contrasenia.value.length < 4 | $contrasenia.value === '' | $contrasenia.value === null) {
        document.getElementById('input_contrasenia').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_contrasenia').classList.remove('inputError');
    }

    // El email no tiene @
    if ( $email.value === '' | $email.value === null) {
        document.getElementById('input_email').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_email').classList.remove('inputError');
    }
    
    
    return true;
}

function emailValido(){
    let simbolos = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if($email.value.match(simbolos)){
        return true;
    } return false;
    
}