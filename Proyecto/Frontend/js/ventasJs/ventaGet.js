//Inputs cargar venta
const $cod_venta = document.getElementById("cod_venta");
const $cliente = document.getElementById("v_cliente_get");
const $fecha = document.getElementById("fecha");


//API_URL
const API_URL = 'https://localhost:7022/api/';


// Form GET 
const $form_mostrar_venta = document.getElementById("form_mostrar_venta");


//Token
let tokenSesion = sessionStorage.getItem('token')
let token = `Bearer ${tokenSesion}`;

// Cerrar sesion evento on click
function eliminarClaveSessionStorage() {
    const key = 'token'; 
    sessionStorage.removeItem(key);
    console.log(`La clave '${key}' ha sido eliminada del sessionStorage.`);
}
document.getElementById("btn-cerrar-sesion").onclick = eliminarClaveSessionStorage;
//


$form_mostrar_venta.addEventListener('submit', async(e)=>{
    e.preventDefault();

    // Obtener datos 
    let venta = {};
    venta = cargarCampos(venta);

    if (!validarCampos()) {
        alert("Por favor, completa los campos correctamente!");
        return;
    }else{
        //Fetch get
        fetch((`${API_URL}Master/${venta.cod_venta}/${venta.fecha}/${venta.cliente}`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${token}`
            }
        })
        .then(res => {
            if (res.ok) {
                console.log("respuesta 200, todo bien", res);
                alert("La venta se mostró con éxito!");
                // const ventas = res.json();
                rellenarTVentas(ventasArray)
            } else {
                console.log("error");
                console.log("res", res);

                // de todas formas se muestra porque nunca va a dar una respuesta 200 sin db
                rellenarTVentas(ventasArray)
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

function cargarCampos(){
    
    // Construir venta
    let venta = {
        cod_venta:$cod_venta.value,
        fecha: $fecha.value,
        cliente: $cliente.value
    };

    return venta;
}


function rellenarTVentas(vta){
    const tbody = document.getElementById('ventas_body');

    console.log(vta);
    
    tbody.innerHTML = '';

    vta.forEach(venta => {
        const fila = document.createElement('tr')

        // cod venta
        const codVentaTd = document.createElement('td');
        codVentaTd.textContent = venta.cod_venta;
        fila.appendChild(codVentaTd);

        // cod cliente
        const codClienteTd = document.createElement('td');
        codClienteTd.textContent = venta.cliente;
        fila.appendChild(codClienteTd);

        // fechaNac
        const fechaTd = document.createElement('td');
        fechaTd.textContent = formateoFecha(venta.fecha);
        fila.appendChild(fechaTd);

        // total
        const totalTd = document.createElement('td');
        totalTd.textContent = `$ ${venta.total}`;
        fila.appendChild(totalTd);

        // Agregar la fila a la tabla
        tbody.appendChild(fila);
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

function validarCampos(){

    //Cod venta
    if ( $cod_venta.value === '' | $cod_venta.value === null) {
        document.getElementById('v_input_cod_venta_get').classList.add('inputError');
        return false;
    } else{
        document.getElementById('v_input_cod_venta_get').classList.remove('inputError');
    } 

    //Cliente vacio
    if($cliente.value === "Seleccione un cliente"  | $cliente.value === '' | $cliente.value === null){
        document.getElementById('v_input_cliente_get').classList.add('inputError');
        return false;
    } else{
        document.getElementById('v_input_cliente_get').classList.remove('inputError');
    }

    // Fecha invalida
    if($fecha.value > formateoFecha() | $fecha.value === '' | $fecha.value === null ){
        document.getElementById('v_input_fecha_get').classList.add('inputError'); 
        return false;
    } else{
        document.getElementById('v_input_fecha_get').classList.remove('inputError');
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

            // const clientes = res.json();

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


// Array ventas, luego eliminar
const ventasArray = [
    {
        cod_venta: 1,
        cliente: "Juan Pérez",
        fecha: "2024-11-11",
        total: 120,
        detalle: [
            { producto: { nombre: "Camiseta", precio: 15.5 }, cantidad: 2 },
            { producto: { nombre: "Pantalones", precio: 50.0 }, cantidad: 1 },
            { producto: { nombre: "Zapatos", precio: 39.5 }, cantidad: 1 }
        ]
    },
    {
        cod_venta: 2,
        cliente: "María Gómez",
        fecha: "2024-11-10",
        total: 85.0,
        detalle: [
            { producto: { nombre: "Falda", precio: 25.0 }, cantidad: 1 },
            { producto: { nombre: "Blusa", precio: 20.0 }, cantidad: 2 },
            { producto: { nombre: "Cinturón", precio: 20.0 }, cantidad: 1 }
        ]
    },
    {
        cod_venta: 3,
        cliente: "Carlos Ruiz",
        fecha: "2024-11-09",
        total: 150.0,
        detalle: [
            { producto: { nombre: "Chaqueta", valor: 75.0 }, cantidad: 1 },
            { producto: { nombre: "Bufanda", valor: 15.0 }, cantidad: 1 },
            { producto: { nombre: "Guantes", valor: 30.0 }, cantidad: 2 }
        ]
    }
];
// fin array 


// Array clientes, eliminar luego solo prueba
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