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
    const document = $documentoG.value;
    const telefono = $telefonoG.value
    const obraSocial = $obraSocialG.value

    if (!validarCampos()) {
        alert("Por favor, completa los campos correctamente!");
        return;
    }else{
        //Fetch get
        fetch((`${API_URL}Client/${id}/${document}/${telefono}/${obraSocial}`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${token}`
            }
        })
        .then(res => {
            if (res.ok) {
                console.log("respuesta 200, todo bien", res);
                alert("El cliente se mostró con éxito!");
                // const clientes = res.text();
                rellenarTClientes(clientesArray);
            } else {
                console.log("error");
                console.log("res", res);
                
                // de todas formas se mostrar porque nunca va a dar una respuesta 200 sin db
                rellenarTClientes(clientesArray);
            }
            
        })
        .then(msg => {
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

        // id cliente
        const codClienteTd = document.createElement('td');
        codClienteTd.textContent = cliente.id;
        fila.appendChild(codClienteTd);

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
        documentoTd.textContent = cliente.documento;
        fila.appendChild(documentoTd);

        // email
        const emailTd = document.createElement('td');
        emailTd.textContent = cliente.email;
        fila.appendChild(emailTd);

        // fechaNac
        const fechaNacTd = document.createElement('td');
        fechaNacTd.textContent = formateoFechaDos(cliente.fechaNacimiento);
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

    
    //Cliente vacio
    if( $cliente.value === "Seleccione un cliente"  | $cliente.value === '' | $cliente.value === null){
        document.getElementById('v_input_cliente_get').classList.add('inputError');
        return false;
    } else{
        document.getElementById('v_input_cliente_get').classList.remove('inputError');
    }
    //Documento
    if ( $documentoG.value === '' | $documentoG.value === null) {
        document.getElementById('input_documento_get').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_documento_get').classList.remove('inputError');
    } 

    //Telefono 
    if ( $telefonoG.value === '' | $telefonoG.value === null) {
        document.getElementById('input_telefono_get').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_telefono_get').classList.remove('inputError');
    }

    //Obra social vacio
    if($obraSocialG.value === '' | $obraSocialG.value === null){
        document.getElementById('input_obra_social_get').classList.add('inputError');
        return false;
    } else{
        document.getElementById('input_obra_social_get').classList.remove('inputError');
    }

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
            if (res.ok) {
                console.log("respuesta 200, todo bien", res);
            } else {
                console.log("error");
                console.log("res", res);
            }

           //// convertir text a json
            // const clientes = res.json();
            // console.log("clientes", clientes);

            // usando el array "clientesArray", luego poner el de la respuesta de la api
            clientesArray.forEach(c => {
            const opciones = document.createElement('option');
            opciones.value = c.id; 
            opciones.textContent = c.nombre; 
            $cliente.appendChild(opciones);
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