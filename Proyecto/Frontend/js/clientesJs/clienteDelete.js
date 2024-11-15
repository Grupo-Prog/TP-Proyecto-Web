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
                cardContainer.innerHTML = ' ';
                cargarComponentes();
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
    if ($cod_clienteD.value === "Seleccione un cliente a eliminar"  | $cod_clienteD.value === '' | $cod_clienteD.value === null) {
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
    try {
        fetch((`${API_URL}Client/`), {
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
                $cod_clienteD.innerText= " ";
                $cod_clienteD.innerHTML = `<option selected> Seleccione un cliente a eliminar</option>`;
                msg.data.forEach(c => {
                    const opciones = document.createElement('option');
                    opciones.value = c.id; 
                    opciones.textContent = c.nombre + ' ' + c.apellido; 
                    $cod_clienteD.appendChild(opciones);
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
            let clientes = [];
                clientes.push(msg.data)
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



function imprimirCliente(arregloClientes){
    arregloClientes.forEach((cliente) => {
                
        // cliente
        let cardHTML = `
            <div class="card ">
                <h3>Cliente: ${cliente.nombre} ${cliente.apellido} </h3>
                <p><strong>Código de cliente:</strong> ${cliente.id}</p>
                <p><strong>Telefono:</strong> ${cliente.telefono} </p>
                <p><strong>Fecha:</strong> ${formateoFecha(cliente.fecha_nac)} </p>
                <p><strong>Documento:</strong> ${cliente.dni} </p>
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

