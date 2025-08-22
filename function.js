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
        descripcion: descripcion,
        estado: "incompleto"
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
            <td>
                <input type="checkbox" onchange="toggleEstado(${tarea.id})" ${tarea.estado === "completada" ? "checked" : ""}>
                <span class="${tarea.estado === "completada" ? "text-decoration-line-through" : ""}">
                    <b>${tarea.titulo}</b><br><small>${tarea.descripcion}</small>
                </span>
            </td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="verTarea(${tarea.id})">
                    <i class="fa-solid fa-eye"></i> Ver
                </button>
                <button class="btn btn-warning btn-sm" onclick="editarTarea(${tarea.id})">
                    <i class="fa-solid fa-pen-to-square"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${tarea.id})">
                    <i class="fa-solid fa-trash"></i> Eliminar
                </button>
            </td>
        `;
        contenedorTareas.appendChild(fila);
    });
}

function eliminarTarea(id) {
    contadorTareas--;
    listaTareas = listaTareas.filter(tarea => tarea.id !== id);
    localStorage.setItem("tareas", JSON.stringify(listaTareas));
    mostrarTareas();
}

function verTarea(id) {
    let tarea = listaTareas.find(t => t.id === id);
    document.getElementById("verTitulo").textContent = tarea.titulo;
    document.getElementById("verDescripcion").textContent = tarea.descripcion;
    document.getElementById("verEstado").textContent = tarea.estado;
    new bootstrap.Modal(document.getElementById("modalVer")).show();
}

function editarTarea(id) {
    let tarea = listaTareas.find(t => t.id === id);
    document.getElementById("editId").value = tarea.id;
    document.getElementById("editTitulo").value = tarea.titulo;
    document.getElementById("editDescripcion").value = tarea.descripcion;
    new bootstrap.Modal(document.getElementById("modalEditar")).show();
}

function guardarEdicion() {
    let id = parseInt(document.getElementById("editId").value);
    let titulo = document.getElementById("editTitulo").value.trim();
    let descripcion = document.getElementById("editDescripcion").value.trim();

    let tarea = listaTareas.find(t => t.id === id);
    tarea.titulo = titulo;
    tarea.descripcion = descripcion;

    localStorage.setItem("tareas", JSON.stringify(listaTareas));
    mostrarTareas();
    bootstrap.Modal.getInstance(document.getElementById("modalEditar")).hide();
}

function toggleEstado(id) {
    let tarea = listaTareas.find(t => t.id === id);
    tarea.estado = tarea.estado === "incompleto" ? "completada" : "incompleto";
    localStorage.setItem("tareas", JSON.stringify(listaTareas));
    mostrarTareas();
}