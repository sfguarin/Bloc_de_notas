const inquirer = require('inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

require ('colors');

const {inquirerMenu, 
    pausa, 
    mensajeCreacionDeTarea, 
    listadoDeTareasParaBorrar, 
    confirmar,
    listadoTareasCompletar} = require ('./helpers/inquirer');


const Tareas = require('./models/tareas');


//Esto se hizo para ver como se hacia manualmente pero con el paquete inquire ya no lo necesito 
// const { mostrarMenu, pausa }=require('./helpers/mensajes');

const main = async() => {

    let opt='';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        
        // Cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    
    //ciclo que voy a repetir infinitamente
    do {
        //valor que le voy a asignar a opt y pongo el await para que la función se ejecute y opt este a la espera
        //del resultado de la promesa de inquirerMenu que es tambien la que se encarga de mostrar el menu
        opt = await inquirerMenu();


        // EL switch me permite llamar funciones o realizar acciones en caso de que opt tome un valor en especifico
        switch (opt) {
            case '1':
                //mostrar el mensaje al usuario para que ponga su tarea y guardarlo como la descripcion que 
                //despues se utiliza para crear la tarea
                descripcion = await mensajeCreacionDeTarea();
                tareas.crearTarea(descripcion);
                break;

            case '2':
                //imprimir las tareas guardadas de manera temporal mientras este abierta la aplicacion
                tareas.listadoCompleto();
                break;
            
            case '3':
                //listar tareas completadas
                tareas.listarPendientesCompletados(true);   
                break;
            
            case '4':
                //listar tareas pendientes
                tareas.listarPendientesCompletados(false);
                break;

            case '5':
                //completar tareas(s)
                const idsCompletados= await listadoTareasCompletar(tareas.listadoArr);
                tareas.toggleCompletadas(idsCompletados);
                break;
            
            case '6':
                //borrar una tarea

                //Obtener id de la tarea seleccionada para borrar
                const id = await listadoDeTareasParaBorrar(tareas.listadoArr);

                //Para agregar la opcion de cancelar la accion de borrar tarea
                if(id!=='0'){

                    //mostrar mensaje de confirmacion para borrar tarea 
                    const mensajeConfirmacion = await confirmar('¿Está seguro de borrar la tarea seleccionada?')
    
                    //Si el mensajeConfirmacion es true se borra la tarea
                    if(mensajeConfirmacion){
                        tareas.borrarTarea(id);
                        console.log('La tarea se borro con exito');
                    }
                    
                }

                break;
            
        }
        guardarDB(tareas.listadoArr);

        // tareas._listado[tarea.id]=tarea;
        // console.log(tareas);

        //Esto es para ver el valor que esta tomando mi opt si lo quiero ver
        // console.log({opt});

        if(opt!=='0'){

            await pausa();

        }

    } 
    //condicion para que pare el ciclo infinito 
    while (opt !== '0');

}

main();