//Inputs cargar venta
const $cod_venta = document.getElementById("v_cod_venta_del");
const cardContainer = document.getElementById("card-container");

//API_URL
const API_URL = "https://localhost:7022/api/";

// Form GET
const $form_cargar_venta_delete = document.getElementById(
  "form_cargar_venta_delete"
);

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

/// Evento on change que muestra el id seleccionado en el select
function onClienteChange(event) {
  const ventaId = event.target.value;
  console.log("ID del cliente seleccionado:", ventaId);
  cardContainer.innerHTML = " ";
  cargarVistaPrevia(ventaId);
}
// Agrego el evento
$cod_venta.addEventListener("change", onClienteChange);
///

$form_cargar_venta_delete.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cod_venta = $cod_venta.value;

  if (!validarCampos()) {
    alert("Por favor, completa el campo!");
    return;
  } else {
    // Muestra una alerta de confirmación
    const confirmacion = confirm("¿Quieres realizar esta acción?");
    if (!confirmacion) {
      alert("Acción cancelada.");
      return;
    }
    //Fetch get
    fetch(`${API_URL}Master/${cod_venta}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("respuesta 200, todo bien", res);
          alert("La venta se borró con éxito!");
          console.log("codventa", cod_venta);
        } else {
          console.log("error");
          console.log("res", res);
          cargarVista(cod_venta);
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

function validarCampos() {
  //Cod venta
  if (
    ($cod_venta.value === "Seleccione una venta") |
    ($cod_venta.value === "") |
    ($cod_venta.value === null)
  ) {
    document
      .getElementById("v_input_cod_venta_del")
      .classList.add("inputError");
    return false;
  } else {
    document
      .getElementById("v_input_cod_venta_del")
      .classList.remove("inputError");
  }

  return true;
}

// cargar select ventas
cargarComponentes();

async function cargarComponentes() {
  const cod_venta = $cod_venta.value;
  try {
    fetch(`${API_URL}Master/${cod_venta}`, {
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

async function cargarVistaPrevia(cod_venta) {
  try {
    fetch(`${API_URL}Master/${cod_venta}`, {
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

        /////////
        // imprimir la venta selecionada, usando arreglo de un solo objeto, luego cambiar por la respuesta de la api
        imprimirVenta(ventaArrayDelete);
        ////////
      })
      .then((msg) => {
        console.log("Respuesta del servidor: ", msg);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error al cargar la venta:", error);
    alert("Ocurrió un error al cargar la venta seleccionada");
  }
}

function imprimirVenta(arregloVentas) {
  // Recorremos el array de ventas que debe devolver un array con un objeto, no con varios
  arregloVentas.forEach((venta) => {
    // venta
    let cardHTML = `
            <div class="card ">
                <h3>Cliente: ${venta.cliente} </h3>
                <p><strong>Código de Venta:</strong> ${venta.cod_venta}</p>
                <p><strong>Fecha:</strong> ${venta.fecha} </p>
                <p><strong>Total:</strong> $ ${venta.total.toFixed(2)} </p>
                <div class="detalle">
                    <h4>Detalle de Ventas:</h4>
        `;

    // detalle
    venta.detalle.forEach((item) => {
      cardHTML += `
                <div class="detalle-item">
                    <p><strong>Producto:</strong> ${item.producto.nombre}</p>
                    <p><strong>Precio:</strong> $${item.producto.precio.toFixed(
                      2
                    )}</p>
                    <p><strong>Cantidad:</strong> ${item.cantidad}</p>
                </div>
                <hr>
            `;
    });
    cardHTML += `
                </div>
            </div>
        `;

    // Añadimos la card
    cardContainer.innerHTML += cardHTML;
  });
}

