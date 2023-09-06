import express from "express";

const app = express();

//  app.get("/unparametro/:nombre", ( req , res ) => {
//      console.log(req.params.nombre)
//      res.send('Bievenido, ${res.params.nombre}')
//  })

const usuarios = [
    {id:"1", nombre: "Pepe", apellido:"Snachez", edad:30},
    {id:"2", nombre: "Analia", apellido:"Lopez", edad:40},
    {id:"3", nombre: "Ramon", apellido:"Sacarias", edad:50}
]

app.get("/", (req,res) => {
    res.send({usuarios})
})

app.get("/:idUsuario", (req, res) => {
    let idUsuario = req.params.idUsuario;
    let usuario = usuarios.find(u=>u.id===idUsuario)
    if(!usuario) return res.send({error:"Usurio incorrecto"})
    res.send({usuario})
})

app.listen(8080, () => console.log("Servidor corriendo en el puerto 8080"))