//Inputs cargar venta
// const $cod_venta = document.getElementById("cod_venta");
// const $producto = document.getElementById("producto");
// const $cantidad = document.getElementById("cantidad");
// const $precio = document.getElementById("precio");
const $fecha = document.getElementById("fecha");
const $cliente = document.getElementById("v_cliente_pos");

const $btn_addDetalle = document.getElementById("btn-agregar-campo");
let contadorProductos = 0;
let cantDetalle = [];
//API_URL
const API_URL = "https://localhost:7022/api/";

//Token
let tokenSesion = sessionStorage.getItem("token");
let token = `Bearer ${tokenSesion}`;

// Cerrar sesion evento on click
function eliminarClaveSessionStorage() {
  const key = "token";
  sessionStorage.removeItem(key);
  console.log(`La clave '${key}' ha sido eliminada del sessionStorage.`);
}
document.getElementById("btn-cerrar-sesion").onclick =
  eliminarClaveSessionStorage;
//

// Form ventas POST
const $form_cargar_venta = document.getElementById("form_cargar_venta_post");

$form_cargar_venta.addEventListener("submit", async (e) => {
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
      method: "POST",
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
          alert("La venta se cargó con éxito!");

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

function addDetail() {
  // Validar que los campos actuales no estén vacíos
  if (contadorProductos > 0) {
    const ultimoProducto = document.getElementById(`v_producto_pos${contadorProductos - 1}`);
    const ultimaCantidad = document.getElementById(`v_cantidad_pos${contadorProductos - 1}`);
    const ultimoPrecio = document.getElementById(`v_precio_pos${contadorProductos - 1}`);
    
    if (!ultimoProducto.value || !ultimaCantidad.value || !ultimoPrecio.value) {
      alert("Completa todos los campos del detalle actual antes de agregar uno nuevo.");
      return;
    }
  }

  // Crear nuevo detalle
  const contenedorProducto = document.createElement("div");
  contenedorProducto.classList.add("mb-3", "row", "justify-content-center");

  contenedorProducto.innerHTML = `
                <div class="col-md-4">
                    <label for="v_nroDetalle_pos${contadorProductos}" class="form-label custom-label">Número de detalle</label>
                    <input type="number" class="form-control" id="v_nroDetalle_pos${contadorProductos}" min="1" placeholder="Ingrese el número">
                </div>
                <div class="col-md-4">
                    <label for="v_producto_pos${contadorProductos}" class="form-label custom-label">Nombre del producto</label>
                    <input type="text" class="form-control" id="v_producto_pos${contadorProductos}" placeholder="Ingrese el nombre">
                </div>
                <div class="col-md-4">
                    <label for="v_cantidad_pos${contadorProductos}" class="form-label custom-label">Cantidad</label>
                    <input type="number" class="form-control" id="v_cantidad_pos${contadorProductos}" min="1" placeholder="Cantidad">
                </div>
                <div class="col-md-4">
                    <label for="v_precio_pos${contadorProductos}" class="form-label custom-label">Precio</label>
                    <input type="number" class="form-control" id="v_precio_pos${contadorProductos}" min="0" step="0.01" placeholder="Precio">
                </div>
            `;

  document.getElementById("productos-container").appendChild(contenedorProducto);
  contadorProductos++;
}


function CrearVenta(fecha, clienteId, detalle) {
  let venta = [];
  venta.push(fecha, clienteId, detalle);
  return venta;
}
function CrearDetalle(nroDetalle, producto, precio, cantidad) {
  let detalle = [];

  detalle.push(nroDetalle, producto, precio, cantidad);
  return detalle;
}
function cargarDatos(cantidad) {
  let detalles = [];

  for (let i = 0; i < cantidad; i++) {
    let nroDetalle = document.getElementById(`v_nroDetalle_pos${i}`).value;
    let producto = document.getElementById(`v_producto_pos${i}`).value;
    let precio = document.getElementById(`v_precio_pos${i}`).value;
    let cantidad = document.getElementById(`v_cantidad_pos${i}`).value;

    detalles.push({
      nroDetalle: nroDetalle,
      producto: producto,
      precio: parseFloat(precio),
      cantidad: parseInt(cantidad),
    });
  }

  return {
    fecha: $fecha.value,
    clienteId: $cliente.value,
    detalle: detalles,
  };
}

function validarCampos() {
  // Verificar que al menos un detalle esté agregado
  if (contadorProductos === 0) {
    alert("Debes agregar al menos un detalle a la venta.");
    return false;
  }

  // Validar cada detalle
  for (let i = 0; i < contadorProductos; i++) {
    const producto = document.getElementById(`v_producto_pos${i}`).value;
    const cantidad = document.getElementById(`v_cantidad_pos${i}`).value;
    const precio = document.getElementById(`v_precio_pos${i}`).value;

    if (!producto || !cantidad || !precio) {
      alert(`Completa todos los campos del detalle ${i + 1}.`);
      return false;
    }
  }

  // Validar cliente
  if (!$cliente.value || $cliente.value === "Seleccione un cliente") {
    alert("Debes seleccionar un cliente.");
    return false;
  }

  // Validar fecha
  if (!$fecha.value || $fecha.value > fechaActual()) {
    alert("La fecha no es válida.");
    return false;
  }

  return true;
}

function fechaActual() {
  let fecha = new Date();
  let mes = (fecha.getMonth() + 1).toString();
  if (mes.length <= 1) {
    mes = "0" + mes;
  }
  let dia = fecha.getDate().toString();

  if (dia.length <= 1) {
    dia = "0" + dia;
  }
  fecha_hoy = fecha.getFullYear() + "-" + mes + "-" + dia;

  return fecha_hoy;
}

// Cargar select de clientes
cargarComponentes();

async function cargarComponentes() {
  try {
    const response = await fetch(`${API_URL}Client`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error: Response status: ${response.status}`);
    }

    let json = await response.json();
    console.log(json);

    let clientesArray = json.data;
    console.log(clientesArray);

    clientesArray.forEach((c) => {
      const opciones = document.createElement("option");
      opciones.value = c.id;
      opciones.textContent = c.nombre + ", " + c.apellido;
      $cliente.appendChild(opciones);
    });
  } catch (error) {
    console.error("Error al cargar combo clientes:", error);
    alert("Ocurrió un error al cargar el combo clientes");
  }
}
