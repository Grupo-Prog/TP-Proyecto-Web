//Inputs cargar venta
const $email = document.getElementById("email");
const $contrasenia = document.getElementById("contrasenia");

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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        let data = await response.json();
        
        
        if(!data.success === 1){
            console.log("Data", data);
            alert("No se pudo logear correctamente!");
        }else{
            alert("Se pudo logear correctamente!");
            const token = data.data.token
            console.log("Este es mi token",token);
            sessionStorage.setItem("token", token);
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