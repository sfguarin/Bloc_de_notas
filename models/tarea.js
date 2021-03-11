
//Clase que me permite definir una tarea con sus respectivos atributos

//La funcion que quiero llamar del paquete uuid es v4 y con los : le asigno el nombre como yo lo quiero manejar
//que en este caso es uuidv4. v4 sirve para asignar identificadores unicos, en este caso es para asignar el id
const { v4: uuidv4 } = require ('uuid');


//El nombre de una clase siempre inicia con mayuscula
class Tarea {

    //Atributos de mi clase y su inicilaización
    id='';
    descripcion = '';
    //Fecha en la que se completo una tarea 
    completadoEn= null;


    //Todas las clases tienen un constructor que asigna los valores a los atributos 
    //que en este caso es una descripcion que recibe como parametro dada por el usuario 
    constructor(descripcion) {

        //this se utiliza para llamar un atributo especifico de la clase
        this.id = uuidv4();
        this.descripcion = descripcion;
        this.completadoEn = null;
    }


}

//Cuando exportamos una clase no se utilizan los {} ya que estos se utilizan solo cuando son funciones
module.exports = Tarea;
