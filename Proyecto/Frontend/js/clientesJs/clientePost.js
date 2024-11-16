//Inputs cargar cliente 
const $nombre = document.getElementById("nombre");
const $apellido = document.getElementById("apellido");
const $obraSocial = document.getElementById("obraSocial");
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

//API_URL
const API_URL = 'https://localhost:7022/api/';

// Form clientes POST
const $form_cargar_cliente = document.getElementById("form_cargar_cliente");

$form_cargar_cliente.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    let cliente = {};
    cliente = cargarCampos(cliente);
    console.log("Cliente a enviar:", cliente);
    
    if (!validarCampos()) {
        alert("Por favor, completa los campos correctamente!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}Client`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(cliente)
        });

        console.log("Status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const msg = await response.json();
        console.log('Respuesta del servidor:', msg);

        if (msg.success === 1) {
            alert(`Cliente ${cliente.nombre} agregado con éxito!`);
            $form_cargar_cliente.reset();
        } else {
            alert('Error al crear el cliente: ' + (msg.message || 'Error desconocido'));
        }
    } catch (error) {
        console.error('Error completo:', error);
        alert('Error al procesar la solicitud');
    }
});

function cargarCampos(){
    let persona = {
        nombre: $nombre.value,
        apellido: $apellido.value,
        dni: $documento.value,
        telefono: $telefono.value,
        fecha_nac: $fecha.value,
        obraSocial: $obraSocial.value
    };

    return persona;
}

function validarCampos(){
    // Nombre vacio
    if ($nombre.value === '' || $nombre.value === null) {
        document.getElementById('input_nombre').classList.add('inputError');
        return false;
    } else {
        document.getElementById('input_nombre').classList.remove('inputError');
    } 

    // Apellido vacio
    if($apellido.value === '' || $apellido.value === null){
        document.getElementById('input_apellido').classList.add('inputError');
        return false;
    }else{
        document.getElementById('input_apellido').classList.remove('inputError');
    }
    
    //Documento
    if ($documento.value === '' || $documento.value === null) {
        document.getElementById('input_documento').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_documento').classList.remove('inputError');
    } 

    //Telefono 
    if ($telefono.value === '' || $telefono.value === null) {
        document.getElementById('input_telefono').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_telefono').classList.remove('inputError');
    }

    // Fecha invalida
    if($fecha.value > fechaActual() || $fecha.value === '' || $fecha.value === null ){
        document.getElementById('input_fecha').classList.add('inputError'); 
        return false;
    } else{
        document.getElementById('input_fecha').classList.remove('inputError');
    }

    //Obra social vacio
    if($obraSocial.value === '' || $obraSocial.value === null){
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