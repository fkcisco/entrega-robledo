import express from "express";
const app = express();
app.use(express.urlencoded({extended:true}))

const usuarios = [
    {id:"1", nombre: "francisco", apellido:"robledo", genero:"M"},
    {id:"2", nombre: "brenda", apellido:"oviedo", genero:"F"},
    {id:"3", nombre: "tamara", apellido:"gomez", genero:"F"},
    {id:"4", nombre: "andres", apellido:"perez", genero:"M"},
    {id:"5", nombre: "tomas", apellido:"florez", genero:"M"},
    {id:"6", nombre: "teresa", apellido:"fuentes", genero:"F"},
    {id:"7", nombre: "gabriel", apellido:"mendoza", genero:"M"}
]

app.get("/", (req,res) =>{
    let genero = req.query.genero;
    
    if(!genero || (!genero === "M") && (!genero ==="F")) return res.send({usuarios})
    let usuariosFiltrados = usuarios.filter(usuarios=>usuarios.genero===genero)
    res.send({usuarios:usuariosFiltrados})
})

app.listen(8080, () => console.log("Servidor corriendo en el puerto 8080"))