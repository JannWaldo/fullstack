import {pool} from './database.js';

//Trae todas las personas de la BD
const getPersonas = async () => {
    const data = await pool.query('select * from personas');
    return data.rows;
}

//Trae un registro de acuerdo al id recibido como parámetro
const getPersonasById = async(id) => {
    const data = await pool.query('select * from personas where id_personas=$1', [id]);
    /*const data = await pool.query('select * from personas where "id_personas"=$1', [id]); entre comillas en caso de que mande error de que no existe la columna*/
    return data.rows;
}

//Inserta un nuevo registro en la tabla personas
const postPersonaGuardar = async(persona) => {
    const query = 'INSERT INTO personas (documento, nombre, apellido, sexo, nota) VALUES ($1,$2,$3,$4,$5)';
    const values = [persona.documento, persona.nombre, persona.apellido, persona.sexo, persona.nota];
    await pool.query(query,values);
    return 'Persona guardada';
}

//Borra un registro en la tabla personas 
const deletePersonaById = async(id) => {
    const data = await pool.query('DELETE from personas where id_personas=$1', [id]);
    /*const data = await pool.query('select * from personas where "id_personas"=$1', [id]); entre comillas en caso de que mande error de que no existe la columna*/
    return 'Persona Eliminada';
}

//Acutaliza un registro en la tabla personas
const putPersonaActualizar = async(persona,id)=>{
    const query = 'UPDATE personas SET nombre=$1, apellido=$2, nota=$3 where id_personas=$4';
    const values =[persona.nombre, persona.apellido, persona.nota, id];
    await pool.query(query,values);
    return 'Persona actualizada'; 
}


export default {getPersonas, getPersonasById, postPersonaGuardar, deletePersonaById, putPersonaActualizar}