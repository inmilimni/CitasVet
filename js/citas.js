const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editar = false;
const citasObj = {

    id: Date.now(),
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:'',

}
//crear los eventos
eventos() 
function eventos(){
    mascotaInput.addEventListener('input',datosCitas);
    propietarioInput.addEventListener('input',datosCitas);
    telefonoInput.addEventListener('input',datosCitas);
    fechaInput.addEventListener('input',datosCitas);
    horaInput.addEventListener('input',datosCitas);
    sintomasInput.addEventListener('input',datosCitas);
    formulario.addEventListener('submit',nuevaCita);

}

class citas{
    constructor(){
        this.citas = []
    }
    agregarCita(cita){
        this.citas = [...this.citas,cita]
        console.log(this.citas)
    }
    eliminarCita(id){
        this.citas = this.citas.filter(i=>i.id !== id)
    }
    editarCitas(citaAct){
        this.citas = this.citas.map(citas=>citas.id === citaAct.id ? citaAct : citas) 

        //condicion ? (si true) : (si false)
    }
}
class ui{
    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        //mostrar el mensaje de error en la interfaz
        divMensaje.textContent = mensaje;
        //agregar el mensaje
        document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita"));

        setTimeout(()=>{
            divMensaje.remove();
        },3000)
    }
    imprimirCitas({citas}){
        //console.log(citas);
        this.limpiarHTML();
        citas.forEach(citas=>{
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = citas;
            const divCita = document.createElement("div");
            divCita.classList.add("cita", "p-3");
            //estoy creando un atribute personalizado
            divCita.dataset.id = id;
            //generar los textos para la ficha de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title','font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            <span class ="font-weight-bolder">Propietario:${propietario}</span>
            `

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class ="font-weight-bolder">Telefono::${telefono}</span>
            `

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <span class ="font-weight-bolder">Fecha:${fecha}</span>
            `
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <span class ="font-weight-bolder">Hora:${hora}</span>
            `
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
            <span class ="font-weight-bolder">Sintomas:${sintomas}</span>
            `
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg class "w-6 h-6" fill="none" stroEliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = ()=> eliminarCita(id);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = () => cargarEdicion(citas);


            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            contenedorCitas.appendChild(divCita);
        })
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}
//CRUD -> CREATE, READ, UPDATE, DELETE

const administrarCitas = new citas(); 
const useri = new ui();

function datosCitas(e){
    console.log('datos');
    citasObj[e.target.name] =  e.target.value;
    console.log(citasObj);
}

function nuevaCita(e){
    e.preventDefault();
    console.log('hola');
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citasObj;

    if (mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === ""){
        //console.log("al menos un campo vacio")
        useri.imprimirAlerta("Todos los campos son obligatorios.","error");
        return;
    }
    console.log(editar)
    if(editar){
        formulario.querySelector('button[type=submit]').textContent = 'Crear Cita';
        
        administrarCitas.editarCitas({...citasObj});
        editar = false;
        //mensaje datos correctos

        useri.imprimirAlerta('Se ha modificado la cita correctamente')
    }else{
        //console.log("campos llenos")
        citasObj.id = Date.now();
        administrarCitas.agregarCita({...citasObj})
        useri.imprimirAlerta("Se ha agregado su cita satisfactoriamente.", "noterror");
    }
    formulario.reset();
    reiniciarObjeto();
    useri.imprimirCitas(administrarCitas);
}

function reiniciarObjeto(){
    citasObj.mascota = "";
    citasObj.propietario = "";
    citasObj.telefono = "";
    citasObj.fecha = "";
    citasObj.hora = "";
    citasObj.sintomas = "";
}

function eliminarCita(id){
    //console.log('eliminar cita')
    administrarCitas.eliminarCita(id);
    //mostrar un mensaje
    useri.imprimirAlerta('La cita se ha eliminado correctamente');

    //actualizar
    useri.imprimirCitas(administrarCitas);
}
function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    //llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //vamos a llenar el objeto

    citasObj.mascota = mascota;
    citasObj.propietario = propietario;
    citasObj.telefono = telefono;
    citasObj.fecha = fecha;
    citasObj.hora = hora;
    citasObj.sintomas = sintomas;
    citasObj.id = id;

    formulario.querySelector('button[type=submit]').textContent = 'Guardar';

    editar = true;

}
