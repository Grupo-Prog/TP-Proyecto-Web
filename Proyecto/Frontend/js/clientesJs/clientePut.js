//Inputs cargar cliente 

const $cod_clienteP = document.getElementById("cod_cliente");
const $nombreP = document.getElementById("nombreP");
const $apellidoP = document.getElementById("apellidoP");
const $obraSocialP = document.getElementById("obraSocialP");
const $emailP = document.getElementById("emailP");
const $telefonoP = document.getElementById("telefonoP");
const $fechaP = document.getElementById("fechaP");
const $documentoP = document.getElementById("documentoP");

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
            if (res.ok) {
                console.log("respuesta 200, todo bien");
                alert("El cliente se actualizó con éxito!");
                
                $form_editar_cliente.reset();
            } else {
                console.log("error");
            }
            return res.text();
        })
        .then(msg => {
            console.log('Respuesta del servidor: ', msg); 
        })
        .catch(error => {
            console.error('Error:', error); 
        });
    }
})


function cargarCampos(){

    let persona = {
        id: $cod_clienteP,
        nombre: $nombreP.value,
        apellido: $apellidoP.value,
        documento: $documentoP.value,
        email: $emailP.value,
        telefono : $telefonoP.value,
        fecha: $fechaP.value,
        obraSocial: $obraSocialP.value
    };

    return persona;
}


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
            if (res.ok) {
                console.log("respuesta 200, todo bien", res);
            } else {
                console.log("error");
                console.log("res", res);
            }

           //// convertir text a json
            // const clientes = res.json();

            // usando el array casero, luego poner la respuesta de la api
            clientesArray.forEach(c => {
            const opciones = document.createElement('option');
            opciones.value = c.id; 
            opciones.textContent = c.nombre; 
            $cod_clienteP.appendChild(opciones);
        });
        })
        .then(msg => {
            console.log('Respuesta del servidor: ', msg); 
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
    if ($cod_clienteP.value === "Seleccione un cliente"  | $cod_clienteP.value === '' | $cod_clienteP.value === null) {
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

     // El email no tiene @
    if ( !emailValido() | $emailP.value === '' | $emailP.value === null) {
        document.getElementById('input_email_put').classList.add('inputError');
        // return false;
    } else{
        document.getElementById('input_email_put').classList.remove('inputError');
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

function emailValido(){
    let simbolos = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if($emailP.value.match(simbolos)){
        // Contiene arroba       
        return true;
    } return false;
    
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

// Array clientes, luego eliminar
const clientesArray = [
    {
        id:1,
        nombre: "Juan",
        apellido: "Pérez",
        telefono: "3523467891",
        documento: "42346789",
        email: "juanito@juanito.com",
        fechaNacimiento:  new Date(1985, 5, 15),
        obraSocial: "OSDE"
    },
    {
        id:2,
        nombre: "María",
        apellido: "García",
        telefono: "3513467891",
        documento: "29346789",
        email: "maria.garcia@delcarmen.com",
        fechaNacimiento: new Date(1990, 10, 20), 
        obraSocial: "Swiss Medical"
    },
    {
        id:3,
        nombre: "Carlos",
        apellido: "López",
        telefono: "3567891023",
        documento: "42346789",
        email: "carlos@lopez.com",
        fechaNacimiento: new Date(1978, 3, 10), 
        obraSocial: "Galeno"
    },
    {
        id:4,
        nombre: "Ana",
        apellido: "Martínez",
        telefono: "3516549187",
        documento: "41346789",
        email: "ana@martinez.com",
        fechaNacimiento: new Date(1995/1/28), 
        obraSocial: "Medicus"
    }
];
// fin array 