
//clase que contiene todas las tareas creadas junto con sus metodos que permiten modificarlas 


const Tarea = require("./tarea");
require ('colors');


/**
 * _listado:
 *     { 'uuid-13423432-13244-2: {id:12, desc: asd, completadoEn:9892983}} Esto es a lo que quiero llegar
 * entonces es mas facil manejar _listado como un objeto que como un arreglo para evitar validacion de posiciones
 */
class Tareas {

    _listado = {};

    //Metodo que me sirve para transformar el objeto _listado a un arreglo. EL get se encarga de recibir el valor
    // de un objeto 
    get listadoArr () {
        const listadoArreglado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listadoArreglado.push(tarea);
        });
        return listadoArreglado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea (id=''){

        if (this._listado[id]){

            //funcion que sirve para eliminar la propiedad de un objeto 
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas=[]){
        
        //forEach es para hacer un recorrido de cada elemento de un arreglo o un objeto
        //En este caso es para recorrer el arreglo que tiene todas nuestras tareas 
        tareas.forEach( tarea =>{
            //
            //se crea el atributo tarea id dentro de _listado y se le da el valor de tarea
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea(descripcion=''){

        const tarea = new Tarea(descripcion);
        
        //aca se agrega el id de la tarea creada al listado y se iguala a la clase tarea que contiene 
        //todos los atributos
        /**
         * los [] significan que a _listado se le agrega el atributo tarea.id y dicho atributo se iguala a tarea
         * Ejemplo _listado ={
         * 'abc': 123
         * }
         * this._listado['abc'] es lo mismo que yo decir this._listado.abc con el atributo ya creado previamente 
         * this._listado['abc'] es la forma de hacerlo desde el this, en este caso se crea un atributo dentro de _listado
         * con el id de tarea y se le da el valor de tarea 
         * 
         * En este caso la tarea.id es la key que le asigno a la tarea 
         */
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {

        //1. En verde
        //Completado verde
        //Pendiente Rojo
        //1. Alma :: Compleado | Pendiente
        
        // TODO Como yo lo hice y funciono
        
        // const listadoArreglado = this.listadoArr;
        // const arregloConDescripciones = [];
        // const arregloConCompletados = [];

        // listadoArreglado.forEach(objeto=>{

        //     const descripcion = objeto["descripcion"];
        //     const completado = objeto['completadoEn'];

        //     arregloConDescripciones.push(descripcion);
        //     arregloConCompletados.push(completado)

        // })
        // for (let i=0;i<arregloConDescripciones.length;i++){

        //     if(arregloConCompletados[i]){
                
        //         console.log(`${i+1}.`.green, arregloConDescripciones[i],'::', 'Completada'.green);

        //     } else {

        //         console.log(`${i+1}.`.green, arregloConDescripciones[i],'::', 'Pendiente'.red);

        //     }
        // }   

        // TODO Como era la solucion mas optima y menos codigo 

        console.log('');

        this.listadoArr.forEach((tarea,index)=>{

            const indice = `${index+1}.`.green;
            const {descripcion, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red;
            console.log(`${indice} ${descripcion} :: ${estado}`);
         
        });
    
    }

    //Metodo para saber que tareas estan pendientes o completas 
    listarPendientesCompletados (completado=true){

        //Arreglos para diferenciar tareas completas de pendientes 
        const listadoCompletas=[];
        const listadoPendientes=[];


        //recorridos del listado arreglado 
        this.listadoArr.forEach((tarea)=>{

            //destructuracion de la tarea, lo que necesito
            const {descripcion, completadoEn} = tarea;

            //dependiendo del estado de las tareas las agrego a los arreglos establecidos para cada caso
            (completadoEn)
            ? listadoCompletas.push(tarea)
            : listadoPendientes.push(tarea);
        })

        //Separar si quiero ver las completadas o las pendientes
        if(completado){

            console.log('');

            //recorrido e impresion de las tareas completadas
            listadoCompletas.forEach((tareasCompletadas,i)=>{
                const indice = `${i+1}.`.green;
                const {descripcion, completadoEn} = tareasCompletadas;
                console.log(`${indice} ${descripcion} :: ${completadoEn.green}`);
            })
        } else {

            console.log('');

            //recorrido e impresion de las tareas pendietes 
            listadoPendientes.forEach((tareasPendientes,i)=>{
                const indice = `${i+1}.`.green;
                const {descripcion, completadoEn} = tareasPendientes;
                console.log(`${indice} ${descripcion} :: ${'Pendiente'.red}`);
        })
        }
    }


    //Metodo para completar las tareas con el arreglo de ids que recibi por parte del usuario en el checklist
    toggleCompletadas(ids=[]) {

        //Este primer pedazo es para cambiar el estado de completadoEn de
        //las tareas como completadas por la fecha en que se completo
        ids.forEach(id => {
            
            const tarea = this._listado[id];
            if( !tarea.completadoEn){

                //La funcion new Date().toISOString ya esta predeterminada por node y me permite extraer un string
                //con la fecha actual en la que se completo la tarea y se le asigna dicho valor a la tarea

                //Tener en cuenta que a pesar que el cambio se le esta haciendo a una constante dentro del metodo, 
                //como se esta haciendo por referencia global esta implicitamente se cambia dentro del objeto global _listado
                tarea.completadoEn = new Date().toISOString()
            }
        });

        //Ya este pedazo es para volver a cambiar el estado de una tarea que habia marcado como confirmada
        //ya no es asi
        this.listadoArr.forEach(tarea=>{

            //ids.includes(tarea.id) me permite mirar si dentro del arreglo que recibo de ids 
            //se encuentra el id de tarea.id si no es asi lo cambio nuevamente a nulo 
            if( !ids.includes(tarea.id) ){

                this._listado[tarea.id].completadoEn=null;
            }
        })
    }

}

module.exports=Tareas;