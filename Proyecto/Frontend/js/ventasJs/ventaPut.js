
//Inputs cargar venta 
const $cod_venta = document.getElementById("cod_venta");
const $producto = document.getElementById("v_producto_put");
const $cantidad = document.getElementById("v_cantidad_put");
const $precio = document.getElementById("v_precio_put");
const $fecha = document.getElementById("fecha");
const $cliente = document.getElementById("v_cliente_put");

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

// Form ventas PUT
const $form_cargar_venta_put = document.getElementById("form_cargar_venta_put");

$form_cargar_venta_put.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    // Obtener datos del formulario
    let venta = {};
    console.log("cantidad: ", contadorProductos)
    venta = cargarDatos(contadorProductos);
    console.log("lista para enviar: ", venta)
  
    let request = {
      venta: venta
    }
    
    
  
    // Validar campos
    if (!validarCampos()) {
      alert("Por favor, completa los campos correctamente!");
      return;
    } else {
      // Fetch post
      fetch(`${API_URL}Master`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(request),
      })
        .then((res) => {
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
        .then((msg) => {
          console.log("Respuesta del servidor: ", msg);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
  

  function cargarDatos(cantidad) {
    // Contruir detalles
  
  
    let detalles = [];
    let det = { };
    
    det.producto = $producto.value;
    det.precio = $precio.value;
    det.cantidad = $cantidad.value;
    detalles.push(det)
        
    
  
    // Construir ventas
    let venta = {
      
      fecha: $fecha.value,
      clienteId: $cliente.value,
      detalle: detalles,
    };
    console.log("venta", venta);
    return venta;
  }
  

function validarCampos(){

    //Cod venta
    if ( $cod_venta.value === "Seleccione una venta"  | $cod_venta.value === '' | $cod_venta.value === null) {
        document.getElementById('v_input_cod_venta_put').classList.add('inputError');
        return false;
    } else{
        document.getElementById('v_input_cod_venta_put').classList.remove('inputError');
    } 

    // Producto vacio
    if($producto.value === '' | $producto.value === null){
        document.getElementById('v_input_producto_put').classList.add('inputError');
        return false;
    }else{
        document.getElementById('v_input_producto_put').classList.remove('inputError');
    }
    
    //Cantidad
    if ( $cantidad.value === '' | $cantidad.value === null) {
        document.getElementById('v_input_cantidad_put').classList.add('inputError');
        return false;
    } else{
        document.getElementById('v_input_cantidad_put').classList.remove('inputError');
    } 

    //Precio 
    if ( $precio.value === '' | $precio.value === null) {
        document.getElementById('v_input_precio_put').classList.add('inputError');
        return false;
    } else{
        document.getElementById('v_input_precio_put').classList.remove('inputError');
    }

    //Cliente vacio
    if($cliente.value === "Seleccione un cliente"  | $cliente.value === '' | $cliente.value === null){
        document.getElementById('v_input_cliente_put').classList.add('inputError');
        console.log($cliente.value);
        return false;
    } else{
        document.getElementById('v_input_cliente_put').classList.remove('inputError');
        console.log($cliente.value);
    }

    // Fecha invalida
    if($fecha.value > fechaActual() | $fecha.value === '' | $fecha.value === null ){
        document.getElementById('v_input_fecha_put').classList.add('inputError'); 
        return false;
    } else{
        document.getElementById('v_input_fecha_put').classList.remove('inputError');
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
                $cliente.innerText= " ";
                $cliente.innerHTML = `<option selected> Seleccione un cliente a eliminar</option>`;
                msg.data.forEach(c => {
                    const opciones = document.createElement('option');
                    opciones.value = c.id; 
                    opciones.textContent = c.nombre + ' ' + c.apellido; 
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
