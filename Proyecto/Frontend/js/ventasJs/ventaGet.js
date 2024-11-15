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

  console.log(venta);
  

  if (!validarCampos()) {
    alert("Por favor, completa los campos correctamente!");
    return false;
  } else {
    //Fetch get
    fetch(
      `${API_URL}Master/${$cod_venta.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    )
      .then((res) => {
        return data = res.json();
      })
      .then((msg) => {
        console.log("Respuesta del servidor: ", msg);
        
        if (msg.success === 1) {
          console.log("respuesta 200, todo bien", msg);
          
          rellenarTVentas(msg.data);
        } else {
          console.log("error");
          console.log("res", res);

          // de todas formas se muestra porque nunca va a dar una respuesta 200 sin db
          // rellenarTVentas(msg.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

function cargarCampos() {
  // Construir venta
  let venta = {
    cod_venta: $cod_venta.value
  };

  return venta;
}

function rellenarTVentas(vta) {
  const tbody = document.getElementById("ventas_body");
  const venta = [];
  venta.push(vta)

  console.log(venta);

  tbody.innerHTML = " ";

  venta.forEach((venta) => {
    const fila = document.createElement("tr");

    // cod cliente
    // const codClienteTd = document.createElement("td");
    // codClienteTd.textContent = venta.cliente;
    // fila.appendChild(codClienteTd);

    // fecha
    const fechaTd = document.createElement("td");
    fechaTd.textContent = formateoFecha(venta.fecha);
    fila.appendChild(fechaTd);

    // totalVenta
    const totalTd = document.createElement("td");
    totalTd.textContent = `$ ${venta.totalVenta}`;
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


  return true;
}


// cargar select ventas
cargarComponentesVenta();

async function cargarComponentesVenta() {
  
  const verdad = true;
  try {
    fetch(`${API_URL}Master/Order/${verdad}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        return data = res.json();
      })
      .then((msg) => {
        console.log("Respuesta del servidor: ", msg);
        if(msg.success === 1){
          msg.data.forEach((v) => {
            console.log("venta id", v.id);
            
            const opciones = document.createElement("option");
            opciones.value = v.id;
            opciones.textContent = 'Venta nro: ' + v.id;
            $cod_venta.appendChild(opciones);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error al cargar combo ventas:", error);
    alert("Ocurrió un error al cargar el combo ventas!");
  }
}
