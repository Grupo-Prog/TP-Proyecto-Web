//Inputs cargar venta
const $cod_venta = document.getElementById("cod_venta");
const $cliente = document.getElementById("v_cliente_get");
const $fecha = document.getElementById("fecha");

//API_URL
const API_URL = "https://localhost:7022/api/";

// Form GET
const $form_mostrar_venta = document.getElementById("form_mostrar_venta");

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

$form_mostrar_venta.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtener datos
  let venta = {};
  venta = cargarCampos(venta);

  if (!validarCampos()) {
    alert("Por favor, completa los campos correctamente!");
    return false;
  } else {
    //Fetch get
    fetch(
      `${API_URL}Master/${venta.cod_venta}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("respuesta 200, todo bien", res);
          alert("La venta se mostró con éxito!");
          // const ventas = res.json();
          rellenarTVentas(ventasArray);
        } else {
          console.log("error");
          console.log("res", res);

          // de todas formas se muestra porque nunca va a dar una respuesta 200 sin db
          rellenarTVentas(ventasArray);
        }
      })
      .then((msg) => {
        console.log("Respuesta del servidor: ", msg);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

function cargarCampos() {
  // Construir venta
  let venta = {
    cod_venta: $cod_venta.value,
    fecha: $fecha.value,
    cliente: $cliente.value,
  };

  return venta;
}

function rellenarTVentas(vta) {
  const tbody = document.getElementById("ventas_body");

  console.log(vta);

  tbody.innerHTML = "";

  vta.forEach((venta) => {
    const fila = document.createElement("tr");

    // cod venta
    const codVentaTd = document.createElement("td");
    codVentaTd.textContent = venta.cod_venta;
    fila.appendChild(codVentaTd);

    // cod cliente
    const codClienteTd = document.createElement("td");
    codClienteTd.textContent = venta.cliente;
    fila.appendChild(codClienteTd);

    // fechaNac
    const fechaTd = document.createElement("td");
    fechaTd.textContent = formateoFecha(venta.fecha);
    fila.appendChild(fechaTd);

    // total
    const totalTd = document.createElement("td");
    totalTd.textContent = `$ ${venta.total}`;
    fila.appendChild(totalTd);

    // Agregar la fila a la tabla
    tbody.appendChild(fila);
  });
}

//  funcion para formatear la fecha
function formateoFecha(fechaISO) {
  let fecha = new Date(fechaISO);
  let mes = (fecha.getMonth() + 1).toString();
  if (mes.length <= 1) {
    mes = "0" + mes;
  }
  let dia = fecha.getDate().toString();

  if (dia.length <= 1) {
    dia = "0" + dia;
  }
  fechaParseada = fecha.getFullYear() + "-" + mes + "-" + dia;

  return fechaParseada;
}

// function que devuelve la fecha de hoy para comparar
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

function validarCampos() {
  //Cod venta
  if (
    ($cod_venta.value === "Seleccione una venta") |
    ($cod_venta.value === "") |
    ($cod_venta.value === null)
  ) {
    document
      .getElementById("v_input_cod_venta_get")
      .classList.add("inputError");
    return false;
  } else {
    document
      .getElementById("v_input_cod_venta_get")
      .classList.remove("inputError");
  }

  //Cliente vacio
  if (
    ($cliente.value === "Seleccione un cliente") |
    ($cliente.value === "") |
    ($cliente.value === null)
  ) {
    document.getElementById("v_input_cliente_get").classList.add("inputError");
    return false;
  } else {
    document
      .getElementById("v_input_cliente_get")
      .classList.remove("inputError");
  }

  // Fecha invalida
  if (
    ($fecha.value > fechaActual()) |
    ($fecha.value === "") |
    ($fecha.value === null)
  ) {
    document.getElementById("v_input_fecha_get").classList.add("inputError");
    return false;
  } else {
    document.getElementById("v_input_fecha_get").classList.remove("inputError");
  }

  return true;
}

// Cargar select de clientes
cargarComponentes();

async function cargarComponentes() {
  try {
    fetch(`${API_URL}Client`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("respuesta 200, todo bien", res);
        } else {
          console.log("error");
          console.log("res", res);
        }

        // const clientes = res.json();

        clientesArray.forEach((c) => {
          const opciones = document.createElement("option");
          opciones.value = c.id;
          opciones.textContent = c.nombre;
          $cliente.appendChild(opciones);
        });
      })
      .then((msg) => {
        console.log("Respuesta del servidor: ", msg);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error al cargar combo clientes:", error);
    alert("Ocurrió un error al cargar el combo clientes");
  }
}

// cargar select ventas
cargarComponentesVenta();

async function cargarComponentesVenta() {
  const cod_venta = $cod_venta.value;
  try {
    fetch(`${API_URL}Master/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("respuesta 200, todo bien", res);
        } else {
          console.log("error");
          console.log("res", res);
        }

        // const clientes = res.json();

        ventasArray.forEach((v) => {
          const opciones = document.createElement("option");
          opciones.value = v.cod_venta;
          opciones.textContent = v.cod_venta;
          $cod_venta.appendChild(opciones);
        });
      })
      .then((msg) => {
        console.log("Respuesta del servidor: ", msg);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error al cargar combo ventas:", error);
    alert("Ocurrió un error al cargar el combo ventas!");
  }
}
