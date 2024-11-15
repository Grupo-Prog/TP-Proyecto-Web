window.onload = () => {
    CargarVentas();
  };
  
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
  
  async function CargarVentas() {
    const order = false; 
    try {
      const response = await fetch(`${API_URL}Master/Order/${order}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: Response status: ${response.status}`);
      }
  
      const json = await response.json();
      let ventas = json.data;
  
      ventas.sort((a, b) => b.totalVenta - a.totalVenta);
  
      MostrarVentas(ventas.slice(0, 5));
  
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al cargar las ventas");
    }
  }
  
  
  
  function MostrarVentas(ventas) {
    const $table = document.querySelector("#tabla-Ventas tbody");
  
    ventas.forEach((venta) => {
      console.log(venta);
      console.log("================================");
    });
  
    // clean table
    $table.innerHTML = "";
  
    ventas.forEach((element) => {
      const $tableRow = document.createElement("tr");
      let cliente = element.cliente.nombre + ", " + element.cliente.apellido;
  
      $tableRow.innerHTML = `
      <th scope="row">${element.id} </th>
      <th scope="row">${element.fecha} </th>
      <th scope="row">${cliente} </th>
      <th scope="row">$${element.totalVenta} </th>
      `;
      $table.appendChild($tableRow);
    });
  }
  