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
                        }, 3000);
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
                            <i class="bi-exclamation-octagon-fill"></i>
                            <span class="errorLogin">${mensaje.message}</span>
                        </div>
        `;
        return;

    }else{
        $div.innerHTML += `<div class="alert alert-success mt-3">
                            <i class="bi-check-circle-fill"></i>
                            <span class="sucessful">${mensaje.message}</span>
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