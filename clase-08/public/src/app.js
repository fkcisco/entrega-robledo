import express from "express";
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLtoPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

app.use('/static', express.static(path.join(__dirname, '--', 'public')))

app.use(express.json());
app.use(express.urlencoded({extenden:true}));

import userRouter from  '../../routes/users.js'
import userRouter from  '../../routes/pets.js'

const PORT = 8080;

const server = app.listen(PORT, () => console.log("Escuchando el puerto 8080") );