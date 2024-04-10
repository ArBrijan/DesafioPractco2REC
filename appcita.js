document.addEventListener("DOMContentLoaded", () => {
  const facturaForm = document.getElementById("facturaForm");
  const tablaProductos = document.getElementById("tablaProductos");
  const agregarProductoBtn = document.getElementById("agregarProducto");
  const generarFacturaBtn = document.getElementById("generarFactura");
  const totalGeneralInput = document.getElementById("totalGeneral");

  agregarProductoBtn.addEventListener("click", () => {
    const descripcion = document.getElementById("descripcion").value;
    const cantidad = document.getElementById("cantidad").value;
    const precioUnitario = document.getElementById("precioUnitario").value;
    const total = cantidad * precioUnitario;

    const fila = `
            <tr>
                <td class="border p-2 ">${descripcion}</td>
                <td class="border p-2">${cantidad}</td>
                <td class="border p-2">${precioUnitario}</td>
                <td class="border p-2">${total}</td>
                <td class="border p-2"> 
                    <button type="button" class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600" onclick="eliminarFila(this)">Eliminar</button>
                </td>
            </tr>
        `;

    tablaProductos.innerHTML += fila;

    // Calcular y actualizar el total general
    let totalGeneral = 0;
    document.querySelectorAll("#tablaProductos tbody tr").forEach((row) => {
      totalGeneral += parseFloat(row.cells[3].textContent);
    });
    totalGeneralInput.value = totalGeneral.toFixed(2);
  });

  generarFacturaBtn.addEventListener("click", () => {
    generarFacturaPDF();
  });
});

function eliminarFila(btn) {
  const fila = btn.closest("tr");
  fila.remove();

  // Recalcular el total general
  let totalGeneral = 0;
  document.querySelectorAll("#tablaProductos tbody tr").forEach((row) => {
    totalGeneral += parseFloat(row.cells[3].textContent);
  });
  document.getElementById("totalGeneral").value = totalGeneral.toFixed(2);
}

function generarFacturaPDF() {
  const { jsPDF } = window.jspdf;

  const doc = new jsPDF("p","mm",[900,900]);

    let table = document.querySelector("#tablaProductos");
    doc.html(table,{
        callback:function(doc){
            
            doc.save("Facturinha.pdf");
        },
        x: 10,
        y: 10
        })

}
