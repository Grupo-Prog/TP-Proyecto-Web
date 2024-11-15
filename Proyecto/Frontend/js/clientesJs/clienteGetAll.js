window.onload = () => {
    cargarClientes();
  };
  
  // API_URL
  const API_URL = "https://localhost:7022/api/";
  
  // Token
  let tokenSesion = sessionStorage.getItem("token");
  let token = `Bearer ${tokenSesion}`;
  
  // Cerrar sesión evento on click
  function eliminarClaveSessionStorage() {
    const key = "token";
    sessionStorage.removeItem(key);
    console.log(`La clave '${key}' ha sido eliminada del sessionStorage.`);
  }
  document.getElementById("btn-cerrar-sesion").onclick =
    eliminarClaveSessionStorage;
  

    async function cargarClientes() {
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
      
          const json = await response.json();
          let clientes = json.data;
      
          clientes.sort((a, b) => b.id - a.id);
      
          mostrarClientes(clientes.slice(0, 5));
      
        } catch (error) {
          console.error("Error:", error);
          alert("Ocurrió un error al cargar los clientes");
        }
      }
      
      
      
  
  
  // Función para mostrar los clientes en la tabla
  function mostrarClientes(clientes) {
    const $table = document.querySelector("#clientes_body");
  
    // Limpiar tabla antes de rellenarla
    $table.innerHTML = "";
  
    // Recorrer los clientes y crear filas en la tabla
    clientes.forEach((cliente) => {
      const $tableRow = document.createElement("tr");
  
      // Crear las celdas para cada dato del cliente
      $tableRow.innerHTML = `
      <th scope="row">${cliente.id}</th>
      <td>${cliente.nombre} ${cliente.apellido}</td>
      <td>${cliente.dni}</td>
      <td>${formateoFecha(cliente.fecha_nac)}</td>
      <td>${cliente.telefono}</td>
      <td>${cliente.obraSocial}</td>
      `;
  
      // Agregar la fila a la tabla
      $table.appendChild($tableRow);
    });
  }
  
  // Función para formatear la fecha (de ISO a dd/MM/yyyy)
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
    return `${fecha.getFullYear()}-${mes}-${dia}`;
  }
  