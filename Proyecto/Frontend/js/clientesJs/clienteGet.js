//Inputs cargar cliente 
const $cod_clienteG = document.getElementById("cod_clienteG");
const $cliente = document.getElementById("v_cliente_get"); 
const $documentoG = document.getElementById("documentoG");
const $telefonoG = document.getElementById("telefonoG");
const $obraSocialG = document.getElementById("obraSocialG");


//API_URL
const API_URL = 'https://localhost:7022/api/';

// Form GET 
const $form_mostrar_cliente = document.getElementById("form_mostrar_cliente");

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

$form_mostrar_cliente.addEventListener('submit', async(e)=>{
    e.preventDefault();

    const id = $cliente.value;

    if (!validarCampos()) {
        alert("Por favor, completa los campos correctamente!");
        return;
    }else{
        //Fetch get
        fetch((`${API_URL}Client/${id}`), {
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
            console.log("Mensaje", msg);
            if (msg.success === 1) {
                let clientes = [];
                clientes.push(msg.data)
                rellenarTClientes(clientes);
            } else {
                console.log("error");
                console.log("res", msg);
            }
            console.log('Respuesta del servidor: ', msg); 
        })
        .catch(error => {
            console.error('Error:', error); 
        });
    }
});


function rellenarTClientes(cli){
    const tbody = document.getElementById('clientes_body');

    console.log(cli);
    
    tbody.innerHTML = '';

    cli.forEach(cliente => {
        const fila = document.createElement('tr')

        // nombre
        const nombreTd = document.createElement('td');
        nombreTd.textContent = cliente.nombre;
        fila.appendChild(nombreTd);

        // apellido
        const apellidoTd = document.createElement('td');
        apellidoTd.textContent = cliente.apellido;
        fila.appendChild(apellidoTd);

        // documento
        const documentoTd = document.createElement('td');
        documentoTd.textContent = cliente.dni;
        fila.appendChild(documentoTd);

        // fechaNac
        const fechaNacTd = document.createElement('td');
        fechaNacTd.textContent = formateoFechaDos(cliente.fecha_nac);
        fila.appendChild(fechaNacTd);

        // telefono
        const telefonoTd = document.createElement('td');
        telefonoTd.textContent = cliente.telefono;
        fila.appendChild(telefonoTd);

        // obraSocial
        const obraSocialTd = document.createElement('td');
        obraSocialTd.textContent = cliente.obraSocial;
        fila.appendChild(obraSocialTd);

        // Agregar la fila a la tabla
        tbody.appendChild(fila);
    });
}


// Función para formatear la fecha (de ISO a dd/MM/yyyy)
function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
    }


//  Otra funcion para formatear la fecha
function formateoFechaDos(fechaISO){
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

function validarCampos(){

    
    // Cliente vacio
    // if( $cliente.value === "Seleccione un cliente"  | $cliente.value === '' | $cliente.value === null){ 
    //     console.log($cliente.value);
    //     document.getElementById('v_input_cliente_get').classList.add('inputError');
    //     return false;
    // } else{
    //     document.getElementById('v_input_cliente_get').classList.remove('inputError');
    // }
    //Documento

    return true;
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
            return data = res.json();
        })
        .then(msg => {
            console.log('Respuesta del servidor: ', msg); 
            if(msg.success === 1) {
                msg.data.forEach(c => {
                    const opciones = document.createElement('option');
                    opciones.value = c.id; 
                    opciones.textContent = c.nombre + ' ' + c.apellido + ' ' + '[' + c.dni + ']'; 
                    $cliente.appendChild(opciones);
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

