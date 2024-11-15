//Inputs cargar venta
const $cod_venta = document.getElementById("v_cod_venta_del");
const cardContainer = document.getElementById("card-container");
const $divSuccess = document.getElementById("mensajeSuccesCliente");

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
document.getElementById("btn-cerrar-sesion").onclick = eliminarClaveSessionStorage;
//

/// Evento on change que muestra el id seleccionado en el select
function onClienteChange(event) {
  const ventaId = event.target.value;
  console.log("ID de la venta seleccionada:", ventaId);
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
        return data = res.json();
      })
      .then((msg) => {
        console.log("Respuesta del servidor: ", msg);
        
        if (msg.success === 1) {
          console.log("respuesta 200, todo bien", msg);
          alert("La venta se borró con éxito!");
          cardContainer.innerHTML = ' ';
          cargarComponentes();
          divSucces(cod_venta);
          $form_cargar_venta_delete.reset();
        } else {
          console.log("error");
          console.log("res", msg);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

function validarCampos() {
  if (
    ($cod_venta.value === "Seleccione una venta para eliminar") |
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

// Cargar combobox ventas
cargarComponentes();

async function cargarComponentes() {
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
        if (msg.success === 1) {
          console.log("respuesta 200, todo bien", msg);
          $cod_venta.innerText= " ";
          $cod_venta.innerHTML = `<option selected>Seleccione una venta para eliminar</option>`;
          msg.data.forEach((v) => {
            const opciones = document.createElement("option");
            opciones.value = v.id;
            opciones.textContent = v.id;
            $cod_venta.appendChild(opciones);
          });
        } else {
          console.log("error");
          console.log("msg", msg);
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



// Vista previa al hacer click
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
        return data = res.json()
      })
      .then((msg) => {
        console.log("Respuesta del servidor: ", msg);
        if (msg.success === 1) {
          console.log("respuesta 200, todo bien", msg);
          console.log(msg.data);
          const ventas = [];
          ventas.push(msg.data);
          imprimirVenta(ventas);

        } else {
          console.log("error");
          console.log("res", msg);
        }
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
  arregloVentas.forEach((venta) => {
    // venta
    let cardHTML = `
            <div class="card ">
                <h3>Cliente: </h3>
                <p><strong>Código de Venta:</strong> ${venta.id}</p>
                <p><strong>Fecha:</strong> ${venta.fecha} </p>
                <p><strong>Total:</strong> $ ${venta.totalVenta.toFixed(2)} </p>
                <div class="detalle">
                    <h4>Detalle de Ventas:</h4>
        `;

    // detalle
    if(venta.detalle === null){
      cardHTML += `
                </div>
            </div>
        `;
        cardContainer.innerHTML += cardHTML;
        return;
    }else{
    venta.detalle.forEach((item) => {
      cardHTML += `
                <div class="detalle-item">
                    <p><strong>Producto:</strong> ${item.producto}</p>
                    <p><strong>Precio:</strong> $${item.precio.toFixed(
                      2
                    )}</p>
                    <p><strong>Cantidad:</strong> ${item.cantidad}</p>
                </div>
                <hr>
                `;
        });
    }
    cardHTML += `
                </div>
            </div>
        `;

    // Añadimos la card
    cardContainer.innerHTML += cardHTML;
  });
}

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
        
        msg.data.forEach((v) => {
          console.log("venta id", v.id);
          
          const opciones = document.createElement("option");
          opciones.value = v.id;
          opciones.textContent = v.id;
          $cod_venta.appendChild(opciones);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error al cargar combo ventas:", error);
    alert("Ocurrió un error al cargar el combo ventas!");
  }
}



// Mensaje al cargar el cliente
function divSucces(venta) {
  console.log("venta aaa", venta);
  
  $divSuccess.innerHTML = " ";
  $divSuccess.innerHTML += `
                      <div class="alert alert-success mt-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                          </svg>
                          <span class="sucessful">   Se ha eliminado la venta ${venta}! </span>
                      </div>
                  `;

  setTimeout(() => {
    $divSuccess.innerHTML = " ";
    }, 3000);
  return venta;
}
