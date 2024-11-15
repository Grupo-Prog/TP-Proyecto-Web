
//Inputs cargar cliente 
const $nombre = document.getElementById("nombre");
const $apellido = document.getElementById("apellido");
const $obraSocial = document.getElementById("obraSocial");
const $email = document.getElementById("email");
const $telefono = document.getElementById("telefono");
const $fecha = document.getElementById("fecha");
const $documento = document.getElementById("documento");


const $divSuccess = document.getElementById("mensajeSuccesCliente");

//Token
let tokenSesion = sessionStorage.getItem('token');
let token = `Bearer ${tokenSesion}`;

// Cerrar sesion evento on click
function eliminarClaveSessionStorage() {
    const key = 'token'; 
    sessionStorage.removeItem(key);
    console.log(`La clave '${key}' ha sido eliminada del sessionStorage.`);
}
document.getElementById("btn-cerrar-sesion").onclick = eliminarClaveSessionStorage;
//


//API_URL
const API_URL = 'https://localhost:7022/api/';


// Form clientes POST
const $form_cargar_cliente = document.getElementById("form_cargar_cliente");


$form_cargar_cliente.addEventListener('submit', async(e)=>{
    e.preventDefault();
    
    // Obtener datos del formulario
    let cliente = {};
    cliente = cargarCampos(cliente);

    // Validar campos
    if (!validarCampos()) {
            alert("Por favor, completa los campos correctamente!")
            return
    }else{
        // Fetch post
        fetch((`${API_URL}Client`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${token}`
            },
            body: JSON.stringify(cliente) 
            
        })
        .then(res => {
            return data = res.json();
        })
        .then(msg => {
            console.log('Respuesta del servidor: ', msg); 
            divSucces(cliente);
            $form_cargar_cliente.reset;
            console.log("cliente", cliente);
        })
        .catch(error => {
            console.error('Error:', error); 
        });
    }
})

// Mensaje en login
function divSucces(cliente) {
    
    $divSuccess.innerHTML = " ";
    $divSuccess.innerHTML += `
                        <div class="alert alert-success mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                            <span class="sucessful">   Se ha añadido el cliente ${cliente.nombre} ${cliente.apellido} </span>
                        </div>
                    `;

    setTimeout(() => {
                            console.log("Mensaje luego de 2 seg");
                            $divSuccess.innerHTML = " ";
                        }, 2500);
    return cliente;
}


function cargarCampos(){

    let persona = {
        nombre: $nombre.value,
        apellido: $apellido.value,
        dni: $documento.value,
        telefono : $telefono.value,
        fecha_nac: $fecha.value,
        obraSocial: $obraSocial.value
    };

    return persona;
}

function validarCampos(){

    // Nombre vacio
    if ($nombre.value === '' | $nombre.value === null) {
        document.getElementById('input_nombre').classList.add('inputError');
        return false;
    } else {
        document.getElementById('input_nombre').classList.remove('inputError');
    } 

    // Apellido vacio
    if($apellido.value === '' | $apellido.value === null){
        document.getElementById('input_apellido').classList.add('inputError');
        return false;
    }else{
        document.getElementById('input_apellido').classList.remove('inputError');
    }
    
    //Documento
    if ( $documento.value === '' | $documento.value === null) {
        document.getElementById('input_documento').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_documento').classList.remove('inputError');
    } 

    //Telefono 
    if ( $telefono.value === '' | $telefono.value === null) {
        document.getElementById('input_telefono').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_telefono').classList.remove('inputError');
    }

    // Fecha invalida
    if($fecha.value > fechaActual() | $fecha.value === '' | $fecha.value === null ){
        document.getElementById('input_fecha').classList.add('inputError'); 
        return false;
    } else{
        document.getElementById('input_fecha').classList.remove('inputError');
    }

    //Obra social vacio
    if($obraSocial.value === '' | $obraSocial.value === null){
        document.getElementById('input_obra_social').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_obra_social').classList.remove('inputError');
    }
    

    return true;
}



function fechaActual(){
    let fecha = new Date();
    let mes = (fecha.getMonth()+ 1).toString();
    if (mes.length <=1){
        mes = "0" + mes;
    }
    let dia = fecha.getDate().toString();
    
    if(dia.length <=1 ){
        dia = "0" + dia;
    }
    fecha_hoy = fecha.getFullYear() + "-" + mes + "-" + dia;
    
    return fecha_hoy;
}

