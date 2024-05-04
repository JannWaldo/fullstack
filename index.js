import express from 'express'
import conectar, {pool} from './database.js';
import servicioPersonas from './services.js'
import cors from 'cors';

const app = express();
//Middleware
app.use(express.json());

const port = 3800;
conectar()

app.get('/',async (req, res)=>{
    /*res.status(200).json({message:'Bienvenido'})*/
    const data = await servicioPersonas.getPersonas();
    res.status(200).json({data: data});
})

//Trae el registro de acuerdo al id
app.get('/:id',async (req, res)=>{  
    const data = await servicioPersonas.getPersonasById(req.params.id);
    res.status(200).json({data: data});
})

app.post('/', async (req, res)=>{
    await servicioPersonas.postPersonaGuardar(req.body);
    res.status(201).send('Persona guardada')
})

app.delete('/:id',async (req, res)=>{  
    const data = await servicioPersonas.deletePersonaById(req.params.id);
    res.json('Persona eliminada');
})

app.put('/:id', async (req, res)=>{
    await servicioPersonas.putPersonaActualizar(req.body,req.params.id);
    res.status(201).send('Persona actualizada')
})

app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`)
})