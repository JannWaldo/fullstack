import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgres://default:5FJVgoAjtBx7@ep-steep-sun-a47wftnb.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
  
  /*ssl:{'rejectUnauthorized:false'} En caso de que usemos render agregar esta linea*/
})

const conectar = () =>{
    pool.connect()
    .then(()=>{console.log('Conectado a la base de datos');})
    .catch((error)=>{console.log('Error al conectar a la bd', error);})
}

export default conectar;
export {pool};