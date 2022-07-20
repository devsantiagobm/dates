// variables

const form = document.getElementById('nueva-cita')
const mensaje = document.querySelector('.mensaje')
const contenedorCitas = document.getElementById('citas')
let editando = false;
const inputs = {
    mascota,
    propietario,
    telefono,
    fecha,
    hora,
    sintomas
}

//eventos

eventos()
function eventos() {
    form.addEventListener('submit', e => verificarForm(e))
    contenedorCitas.addEventListener('click', e => listaCitas.eliminarCita(e) )
}

// clases

class ListaCitas {
    constructor() {
        this.citas = JSON.parse(localStorage.getItem("citas")) || [];
        ui.mostrarCitas(this.citas);
    }

    agregarCita(cita) {
        this.citas = [cita, ...this.citas]
        ui.mostrarCitas(this.citas)
        sincronizarStorage(this.citas);
    }

    eliminarCita(e) {
        if (e.target.id == "delete") {
            const parentID = e.target.parentNode.dataset.id;
            this.citas = this.citas.filter(item => item.id != parentID)
            ui.mostrarCitas(this.citas)
            sincronizarStorage(this.citas);
        }
    }
    
}

class Cita {
    constructor(mascota, propietario, telefono, fecha, hora, sintoma) {
        this.mascota = mascota
        this.propietario = propietario
        this.telefono = telefono
        this.fecha = fecha
        this.hora = hora
        this.sintomas = sintoma
        this.id = Date.now()
    }
}

class UI {
    mostrarMensaje(message, classList) {

        mensaje.textContent = message
        mensaje.style.opacity = `1`;
        mensaje.style.maxHeight = `${mensaje.scrollHeight}px`;
        mensaje.classList.remove('alert-success', 'alert-danger')
        mensaje.classList.add(classList)

        setTimeout(() => {
            mensaje.style.opacity = `0`;
            mensaje.style.maxHeight = `0`;
        }, 2000);

    }

    mostrarCitas(citas) {
        this.limpiarHTMLCitas();
        citas.forEach(item => {
            this.citaHTML(item)
        })
    }

    citaHTML(item) {
        const { id, mascota, propietario, telefono, fecha, hora, sintomas } = item;
        const element = document.createElement('li');
        element.classList.add('cita', 'p-4');
        element.dataset.id = id;
        const mascotaParrafo = document.createElement('h2');
        mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
        mascotaParrafo.innerHTML = `${mascota}`;

        const propietarioParrafo = document.createElement('p');
        propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> 
        <span class="propietario">${propietario}</span>`;

        const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> 
        <span class="telefono">${telefono}</span>`;

        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> 
        <span class="fecha">${fecha}</span>`;

        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> 
        <span class="hora">${hora}</span>`;

        const sintomasParrafo = document.createElement('p');
        sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas: </span>
        <span class="sintomas">${sintomas}</span> `;

        // Agregar un botón de eliminar...
        const btnEliminar = document.createElement('button');
        btnEliminar.id = "delete";
        btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
        btnEliminar.textContent = 'Eliminar '

        element.appendChild(mascotaParrafo);
        element.appendChild(propietarioParrafo);
        element.appendChild(telefonoParrafo);
        element.appendChild(fechaParrafo);
        element.appendChild(horaParrafo);
        element.appendChild(sintomasParrafo);
        element.appendChild(btnEliminar)

        contenedorCitas.appendChild(element);

    }

    limpiarHTMLCitas() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }

}

const ui = new UI();
const listaCitas = new ListaCitas();

// funciones

function verificarForm(e) {
    e.preventDefault();

    const revisarInputVacio = Object.values(inputs).some(item => item.value === "")
    if (revisarInputVacio) {
        ui.mostrarMensaje("Todos los campos deben estar diligenciados!", "alert-danger");
        return;
    }

    if (editando) {
        ui.mostrarMensaje("Edición completada!", "alert-success");
        return;
    }

    ui.mostrarMensaje("¡Cita creada!", "alert-success");
    const nuevaCita = new Cita(mascota.value, propietario.value, telefono.value, fecha.value, hora.value, sintomas.value)
    listaCitas.agregarCita(nuevaCita)
    form.reset();
}

function sincronizarStorage(listaCitas) {
    listaCitas = JSON.stringify(listaCitas);
    localStorage.setItem("citas", listaCitas)
}