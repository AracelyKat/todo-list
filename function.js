let listaTareas = [];
let contadorTareas = 0;
window.addEventListener("DOMContentLoaded", () => {
    let tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
        listaTareas = JSON.parse(tareasGuardadas);
        contadorTareas = listaTareas.length;
        mostrarTareas();
    }
});
document.getElementById("agregarTarea").addEventListener("click", () => {
    let titulo = document.getElementById("tituloTarea").value.trim();
    let descripcion = document.getElementById("descripcionTarea").value.trim();

    if (!titulo || !descripcion) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    contadorTareas++;
    let nuevaTarea = {
        id: contadorTareas,
        titulo: titulo,
        descripcion: descripcion
    };
    listaTareas.push(nuevaTarea);
    localStorage.setItem("tareas", JSON.stringify(listaTareas));
    mostrarTareas();
    document.getElementById("tituloTarea").value = "";
    document.getElementById("descripcionTarea").value = "";
});
function mostrarTareas() {
    let contenedorTareas = document.getElementById("contenedorTareas");
    contenedorTareas.innerHTML = "";
    listaTareas.forEach((tarea) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td><b>${tarea.titulo}</b><br><small>${tarea.descripcion}</small></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="verTarea(${tarea.id})">Ver</button>
                <button class="btn btn-warning btn-sm" onclick="editarTarea(${tarea.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
            </td>
        `;
        contenedorTareas.appendChild(fila);
    });
}

function eliminarTarea(id) {
    listaTareas = listaTareas.filter(tarea => tarea.id !== id);
    localStorage.setItem("tareas", JSON.stringify(listaTareas));
    mostrarTareas();
}
function editarTarea(id) {

}
