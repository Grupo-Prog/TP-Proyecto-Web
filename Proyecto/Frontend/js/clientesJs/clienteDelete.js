//Inputs cargar cliente 
const $cod_clienteD = document.getElementById("c_cod_cliente_del");
const cardContainer = document.getElementById('card-container');
//API_URL
const API_URL = 'https://localhost:7022/api/';

// Form Put 
const $form_eliminar_cliente = document.getElementById("form_eliminar_cliente");


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


// Evento on change que muestra el id seleccionado en el select
function onClienteChange(event) {
    const clientId = event.target.value; 
    console.log("ID del cliente seleccionado:", clientId);
    cardContainer.innerHTML = ' ';
    cargarVistaPrevia(clientId);

}
$cod_clienteD.addEventListener("change", onClienteChange);
//


$form_eliminar_cliente.addEventListener('submit', async(e)=>{
    e.preventDefault();
    
    // Obtener datos del formulario
    const id = $cod_clienteD.value;
    console.log(id);
    
    
    // Validar campos
    if (!validarCampo()) {
            alert("Por favor, completa el campo id!");
            return;
    }else{
        // Muestra una alerta de confirmación
        const confirmacion = confirm("¿Quieres realizar esta acción?");
        if (!confirmacion) {
            alert("Acción cancelada.");
            return;
        } 
        // Fetch delete
        fetch((`${API_URL}Client/${id}`), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${token}`
            }
        })
        .then(res => {
            if (res.ok) {
                console.log("respuesta 200, todo bien");
                alert("El cliente se eliminó con éxito!");
                
                $form_eliminar_cliente.reset();
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


function validarCampo(){

    // Codigo 
    if ($cod_clienteD.value === "Seleccione un cliente"  | $cod_clienteD.value === '' | $cod_clienteD.value === null) {
        document.getElementById('c_input_cod_cliente_del').classList.add('inputError');
        return false;
    } else {
        document.getElementById('c_input_cod_cliente_del').classList.remove('inputError');
    } 
    return true;
}


// Cargar select de clientes
cargarComponentes();

async function cargarComponentes() {
    const cod_cliente = $cod_clienteD.value;
    try {
        fetch((`${API_URL}Client/${cod_cliente}`), {
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
            // const clientes = res.json();

            clientesArray.forEach(c => {
            const opciones = document.createElement('option');
            opciones.value = c.id; 
            opciones.textContent = c.nombre; 
            $cod_clienteD.appendChild(opciones);
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
            if (res.ok) {
                console.log("respuesta 200, todo bien", res);
            } else {
                console.log("error");
                console.log("res", res);
            }

            /////////
            // imprimir el cliente selecionado, usando arreglo de un solo objeto, luego cambiar por la respuesta de la api
            imprimirCliente(clienteArray);
            ////////
        })
        .then(msg => {
            console.log('Respuesta del servidor: ', msg); 
        })
        .catch(error => {
            console.error('Error:', error); 
        });
    } catch (error) {
            console.error('Error al cargar cliente:', error);
            alert('Ocurrió un error al cargar cliente');
    }
};



function imprimirCliente(arregloClientes){

    // Recorremos el array de clientes que debe devolver un array con solo un objeto, no con varios
    arregloClientes.forEach((cliente) => {
                
        // cliente
        let cardHTML = `
            <div class="card ">
                <h3>Cliente: ${cliente.nombre} </h3>
                <p><strong>Código de Venta:</strong> ${cliente.apellido}</p>
                <p><strong>Telefono:</strong> ${cliente.telefono} </p>
                <p><strong>Fecha:</strong> ${formateoFecha(cliente.fechaNacimiento)} </p>
                <p><strong>Documento:</strong> ${cliente.documento} </p>
                <p><strong>Email:</strong> ${cliente.email} </p>
                <p><strong> ObraSocial:</strong> ${cliente.obraSocial} </p> 

            </div>
            `;
        // Añadimos la card
        cardContainer.innerHTML += cardHTML;
    });
}

//  funcion para formatear la fecha
function formateoFecha(fechaISO){
    let fecha = new Date(fechaISO);
    let mes = (fecha.getMonth()+ 1).toString();
    if (mes.length <=1){
        mes = "0" + mes;
    }
    let dia = fecha.getDate().toString();
    
    if(dia.length <=1 ){
        dia = "0" + dia;
    }
    fechaParseada = fecha.getFullYear() + "-" + mes + "-" + dia;
    
    return fechaParseada;
}

//Array con un solo obj, eliminar luego
const clienteArray = [
    {
        id:2,
        nombre: "María",
        apellido: "García",
        telefono: "3513467891",
        documento: "29346789",
        email: "maria.garcia@delcarmen.com",
        fechaNacimiento: new Date(1990, 10, 20), 
        obraSocial: "Swiss Medical"
    }
]
// 


// Array de muchos clientes, luego eliminar
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