//Inputs cargar cliente 

const $cod_clienteP = document.getElementById("cod_cliente");
const $nombreP = document.getElementById("nombreP");
const $apellidoP = document.getElementById("apellidoP");
const $obraSocialP = document.getElementById("obraSocialP");
const $emailP = document.getElementById("emailP");
const $telefonoP = document.getElementById("telefonoP");
const $fechaP = document.getElementById("fechaP");
const $documentoP = document.getElementById("documentoP");

const $divSuccess = document.getElementById("mensajeSuccesCliente");

//API_URL
const API_URL = 'https://localhost:7022/api/';

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

// Existe un usuario logeado?
if ("token" in sessionStorage === false ) {
    window.location = "/pages/login.html";
}

// Form Put 
const $form_editar_cliente = document.getElementById("form_editar_cliente");

$form_editar_cliente.addEventListener('submit', async(e)=>{
    e.preventDefault();
    
    // Obtener datos del formulario
    let clienteP = {};
    const id = $cod_clienteP.value;
    clienteP = cargarCampos(clienteP);
    console.log("cliente", clienteP);

    // Validar campos
    if (!validarCampos()) {
            alert("Por favor, completa los campos correctamente!");
            return;
    }else{
        // Fetch put
        fetch((`${API_URL}Client/${id}`), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${token}`
            },
            body: JSON.stringify(clienteP) 
        })
        .then(res => {
            return data = res.json();
        })
        .then(msg => {
            console.log('Respuesta del servidor: ', msg); 
            if(msg.success === 1) {
                console.log("Cliente editado", clienteP);
                divSucces(clienteP);
                $form_editar_cliente.reset();
            } else {
                console.log("error");
            }
        })
        .catch(error => {
            console.error('Error:', error); 
        });
    }
})


function cargarCampos(){

    let persona = {
        id: $cod_clienteP.value,
        nombre: $nombreP.value,
        apellido: $apellidoP.value,
        dni: $documentoP.value,
        telefono : $telefonoP.value,
        fecha_nac: $fechaP.value,
        obraSocial: $obraSocialP.value
    };

    return persona;
}


// Evento on change que muestra el id seleccionado en el select
function onClienteChange(event) {
    const clientId = event.target.value; 
    console.log("ID del cliente seleccionado:", clientId);
    
    cargarVistaPrevia(clientId);

}
$cod_clienteP.addEventListener("change", onClienteChange);


// Cargar select de clientes
cargarComponentes();

async function cargarComponentes() {
    try {
        fetch((`${API_URL}Client`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${token}`
            }
        })
        .then(res => {
            return data = res.json();
        })
        .then(msg => {
            console.log('Respuesta del servidor: ', msg); 

            if (msg.success === 1) {
                console.log("msg data", msg.data);
                $cod_clienteP.innerText= " ";
                $cod_clienteP.innerHTML = `<option selected> Seleccione un cliente para modificar</option>`;
                msg.data.forEach(c => {
                    const opciones = document.createElement('option');
                    opciones.value = c.id; 
                    opciones.textContent = c.nombre + ' ' + c.apellido + " [" + c.dni + "]"; 
                    $cod_clienteP.appendChild(opciones);
                });
            } else {
                console.log("error");
                console.log("res", msg);
            }
        })
        .catch(error => {
            console.error('Error:', error); 
        });
    } catch (error) {
            console.error('Error al cargar combo clientes:', error);
            alert('Ocurrió un error al cargar el combo clientes');
    }
}


function validarCampos(){

    // Codigo 
    if ($cod_clienteP.value === "Seleccione un cliente para modificar"  | $cod_clienteP.value === '' | $cod_clienteP.value === null) {
        document.getElementById('input_id_put').classList.add('inputError');
        // return false;
    } else {
        document.getElementById('input_id_put').classList.remove('inputError');
    } 
        
    // Nombre vacio
    if ($nombreP.value === '' | $nombreP.value === null) {
        document.getElementById('input_nombre_put').classList.add('inputError');
        // return false;
    } else {
        document.getElementById('input_nombre_put').classList.remove('inputError');
    } 

    // Apellido vacio
    if($apellidoP.value === '' | $apellidoP.value === null){
        document.getElementById('input_apellido_put').classList.add('inputError');
        // return false;
    }else{
        document.getElementById('input_apellido_put').classList.remove('inputError');
    }
    
    //Documento
    if ( $documentoP.value === '' | $documentoP.value === null) {
        document.getElementById('input_documento_put').classList.add('inputError');
        // return false;
    } else{
        document.getElementById('input_documento_put').classList.remove('inputError');
    } 

    //Telefono 
    if ( $telefonoP.value === '' | $telefonoP.value === null) {
        document.getElementById('input_telefono_put').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_telefono_put').classList.remove('inputError');
    }

    // Fecha invalida
    if($fechaP.value > fechaActual() | $fechaP.value === '' | $fechaP.value === null ){
        document.getElementById('input_fecha_put').classList.add('inputError'); 
        return false;
    } else{
        document.getElementById('input_fecha_put').classList.remove('inputError');
    }

    //Obra social vacio
    if($obraSocialP.value === '' | $obraSocialP.value === null){
        document.getElementById('input_obra_social_put').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_obra_social_put').classList.remove('inputError');
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

async function cargarVistaPrevia(cod_cliente) {
    try {
        fetch((`${API_URL}Client/${cod_cliente}`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${token}`
            }
        })
        .then(res => {
            return data = res.json();
        })
        .then(msg => {
            console.log('Respuesta del servidor: ', msg); 
            console.log("msg.data vista prev", msg.data);
            let clientes = {};
            clientes = msg.data;
            imprimirCliente(clientes);
        })
        .catch(error => {
            console.error('Error:', error); 
        });
    } catch (error) {
            console.error('Error al cargar cliente:', error);
            alert('Ocurrió un error al cargar cliente');
    }
};

function imprimirCliente(obj){
    $nombreP.value = obj.nombre;
    $apellidoP.value = obj.apellido;
    $documentoP.value = obj.dni;
    $telefonoP.value = obj.telefono;
    $fechaP.value = obj.fecha_nac;
    $obraSocialP.value = obj.obraSocial;
}


// Mensaje al cargar el cliente
function divSucces(cliente) {
    
    $divSuccess.innerHTML = " ";
    $divSuccess.innerHTML += `
                        <div class="alert alert-success mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                            <span class="sucessful">   Se ha modificado el cliente ${cliente.nombre} ${cliente.apellido} </span>
                        </div>
                    `;

    setTimeout(() => {
                            console.log("Mensaje luego de 2 seg");
                            $divSuccess.innerHTML = " ";
                        }, 2500);
    return cliente;
}