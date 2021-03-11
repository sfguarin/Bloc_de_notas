

//metodo para guardar informacion 


const { info } = require('console');
const fs=require('fs');

//Guardarlo como tipo de archivo json es mas amigable de leer que el txt 
const archivo = './db/data.json';

const  guardarDB = (data) => {

    //convertir el arreglo en un string
    fs.writeFileSync(archivo, JSON.stringify(data));

}


//Leer el archivo de la base de datos 
const  leerDB = () => {

    //Verificar si existe el archivo. La negacion ! quiere decir que si no existe el archivo retorna null
    if (!fs.existsSync(archivo)){
        return null;
    }

    //Para leer la informacion del archivo
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });

    //convertir el string a un arreglo 
    const data = JSON.parse(info);

    // console.log(data);

    return data;
}


module.exports = {
    guardarDB,
    leerDB
}