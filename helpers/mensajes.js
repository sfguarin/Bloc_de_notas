

//Ejemplo de menu si no hubiera usado el inquire.js simplemente es un archivo con fines educativos
//este no se utiliza en la aplicacion

const { rejects } = require('assert');

require ('colors');

const  mostrarMenu = () => {

    //Necesito hacerlo con resolve y reject porque no puedo retornar una promesa usando async sabiendo que el
    //return va dentro de otra función, el resolve si se puede poner en cualquier lado y no hay problema 

    return new Promise((resolve,reject)=>{

        console.clear();

        console.log('============================'.green);
        console.log('   Seleccione una opción'.green);
        console.log('============================\n'.green);
    
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar una tarea`);
        console.log(`${'0.'.green} Salir \n`);
    
    
        // Esta constante prepara la interfaz que le voy a mostrar al usuario
        const readline = require ('readline').createInterface({
            // Pausa mi aplicacion esperando recibir una información del usuario
            input: process.stdin,
            // Mostar un mensaje en consola cuando le estoy pidiendo algo al usuario
            output: process.stdout
        });
    
        readline.question('Seleccione una opción ', (opt)=>{
            // aca imprime la respuesta que pone el usuario pero ya solo es para ver
            // console.log(opt); 
            readline.close();
            resolve(opt);
        })

    })
    
}   

const  pausa = () => {

    //Aca tambien pongo una promesa con resolve para que la funcion pausa pueda esperar mientras el usuario
    //presiona enter

        return new Promise((resolve, reject)=>{

            // Esta constante prepara la interfaz que le voy a mostrar al usuario
        const readline = require ('readline').createInterface({
            // Pausa mi aplicacion esperando recibir una información del usuario
            input: process.stdin,
            // Mostar un mensaje en consola cuando le estoy pidiendo algo al usuario
            output: process.stdout
        });
    
        readline.question(`\n Presione ${'ENTER'.green} para continuar`, (opt)=>{
            readline.close();
            resolve();
        })
            
        })

    
}


module.exports = {
    mostrarMenu,
    pausa
}
