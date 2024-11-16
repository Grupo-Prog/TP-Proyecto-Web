//Inputs cargar venta
const $email = document.getElementById("email");
const $contrasenia = document.getElementById("contrasenia");
const $div = document.getElementById("mensajeRespuestaLogin");

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
        
            fetch((`${API_URL}User/Login`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => {
                return data = response.json();
            })
            .then(msg => {
                console.log("msg pero correcto", msg.message);
                console.log('Respuesta del servidor: ', msg);
                console.log(msg.data);
                
                if(msg.data){
                    const token = msg.data.token
                    console.log("Este es mi token, no se lo muestres a nadie",token);
                    sessionStorage.setItem("token", token);
                    
                    setTimeout(() => {
                            console.log("Mensaje luego de 2 seg");
                            window.location = 'index.html'
                        }, 2500);
                    }
                mostrarMensaje(msg);
            })
            .catch(error => {
                // mostrarMensaje(error);
                console.error('Error:', error); 
                console.log("msg error pero msg", msg);
                
            });
        
    }
})


function cargarCampos(){

    // Construir user
    let usuario = {
        email:$email.value,
        password: $contrasenia.value,
    };

    return usuario;
}

// Mensaje en login
function mostrarMensaje(mensaje) {
    
    $div.innerHTML = " ";
    if (mensaje.success === 0 | mensaje.data === null) {
        $div.innerHTML += `
                        <div class="alert alert-danger mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-octagon-fill" viewBox="0 0 16 16">
                                <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg>
                            <span class="errorLogin">  ${mensaje.message}</span>
                        </div>
        `;
        return;

    }else{
        $div.innerHTML += `<div class="alert alert-success mt-3">
                            
                            <span class="sucessful"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                                ${mensaje.message}
                            </span>
                        </div>
        `;

    }
    return mensaje;
}



function validarCampos(){
    // Contraseña
    if ($contrasenia.value.length < 2 | $contrasenia.value === '' | $contrasenia.value === null) {
        document.getElementById('input_contrasenia').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_contrasenia').classList.remove('inputError');
    }
    // Email 
    if ( $email.value === '' | $email.value === null) {
        document.getElementById('input_email').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_email').classList.remove('inputError');
    }
    return true;
}

// Le saque la funcion porque ninguno de los users tiene 
function emailValido(){
    let simbolos = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if($email.value.match(simbolos)){
        return true;
    } return false;
    
}


//crear usuario nuevo
$form_create_account = document.getElementById("form_create_account");

$emailRegister = document.getElementById("email-create");
$contraseniaRegister = document.getElementById("contrasenia-create");


$form_create_account.addEventListener('submit', async(e)=>{
    e.preventDefault();
    
    // Obtener datos del formularios
    let user = {};
    user = cargarCampos(user);

    // Validar campos
    if (!validarCampos()) {
            alert("Por favor, completa los campos correctamente!")
            return
    }else{
        
            fetch((`${API_URL}User/Register`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => {
                return data = response.json();
            })
            .then(msg => {
                if(msg.success === 1 ){
                    console.log("Usuario creado correctamente",token);
                    alert("Se pudo crear el usuario");
                    setTimeout(() => {
                            window.location = 'login.html'
                        }, 1000);
                    }
                
            })
            .catch(error => {
                console.error('Error:', error); 
                console.log("msg error pero msg", msg);
                
            });
    }
})