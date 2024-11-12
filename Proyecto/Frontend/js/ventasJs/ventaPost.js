
//Inputs cargar venta 
const $cod_venta = document.getElementById("cod_venta");
const $producto = document.getElementById("v_producto_post");
const $cantidad = document.getElementById("v_cantidad_post");
const $precio = document.getElementById("v_precio_post");
const $fecha = document.getElementById("fecha");
const $cliente = document.getElementById("v_cliente_pos");

//API_URL
const API_URL = 'https://localhost:7022/api/';


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

// Form ventas POST
const $form_cargar_venta = document.getElementById("form_cargar_venta_post");


$form_cargar_venta.addEventListener('submit', async(e)=>{
    e.preventDefault();
    
    // Obtener datos del formulario
    let venta = {};
    venta = cargarCampos(venta);

    // Validar campos
    if (!validarCampos()) {
            alert("Por favor, completa los campos correctamente!")
            return
    }else{
        // Fetch post
        fetch((`${API_URL}Master`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${token}`
            },
            body: JSON.stringify(venta)
            
        })
        .then(res => {
            if (res.ok) {
                console.log("respuesta 200, todo bien");
                console.log("venta", venta);
                alert("El cliente se cargó con éxito!");
                
                $form_cargar_venta.reset();
            } else {
                console.log("error");
                console.log("venta", venta);
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

    // Contruir detalles
    const detalles = [];
    detalles.push({
        producto: {
            nombre_producto: $producto.value,
            precio: $precio.value
        },
        cantidad: $cantidad.value
    });
    
    // Construir ventas
    let venta = {
        cod_venta:$cod_venta.value,
        fecha: $fecha.value,
        detalle_ventas: detalles,
        cliente: $cliente.value
    };

    return venta;
}


function validarCampos(){

    //Cod venta
    if ( $cod_venta.value === '' | $cod_venta.value === null) {
        document.getElementById('v_input_cod_venta_post').classList.add('inputError');
        return false;
    } else{
        document.getElementById('v_input_cod_venta_post').classList.remove('inputError');
    } 

    // Producto vacio
    if($producto.value === '' | $producto.value === null){
        document.getElementById('v_input_producto_post').classList.add('inputError');
        return false;
    }else{
        document.getElementById('v_input_producto_post').classList.remove('inputError');
    }
    
    //Cantidad
    if ( $cantidad.value === '' | $cantidad.value === null) {
        document.getElementById('v_input_cantidad_post').classList.add('inputError');
        return false;
    } else{
        document.getElementById('v_input_cantidad_post').classList.remove('inputError');
    } 

    //Precio 
    if ( $precio.value === '' | $precio.value === null) {
        document.getElementById('v_input_precio_post').classList.add('inputError');
        return false;
    } else{
        document.getElementById('v_input_precio_post').classList.remove('inputError');
    }

    //Cliente vacio
    if($cliente.value === "Seleccione un cliente"  | $cliente.value === '' | $cliente.value === null){
        document.getElementById('v_input_cliente_post').classList.add('inputError');
        return false;
    } else{
        document.getElementById('v_input_cliente_post').classList.remove('inputError');
    }

    // Fecha invalida
    if($fecha.value > fechaActual() | $fecha.value === '' | $fecha.value === null ){
        document.getElementById('v_input_fecha_post').classList.add('inputError'); 
        return false;
    } else{
        document.getElementById('v_input_fecha_post').classList.remove('inputError');
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



// Array inventado, eliminar
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

