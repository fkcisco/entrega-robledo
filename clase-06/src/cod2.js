import express from "express";

const app = express();

app.get( "/bienvenido", ( req, res ) => {
    let html = "<h1 style='color: blue;'>Bienvenido</h1>"
    res.send(html)
})

app.get( "/usuario", ( req, res ) => {
    let usuario = ({
        "nombre": "Francisco",
        "apellido": "Robledo",
        "edad": "30",
        "correo": "hola@franrobledo.com"
    })
    res.send(usuario);
})

app.listen(8080, () => console.log("Servidor corriendo en el puerto 8080"))