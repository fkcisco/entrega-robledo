import express from "express";

const app = express();

app.use(express.urlencoded({extended:true}))

app.get("/ejemploQueries", (req,res) => {
    let consulta = req.query;
    let { nombre, apellido , edad } = req.query;

    res.send(consulta)
})

app.listen(8080, () => console.log("Servidor corriendo en el puerto 8080"))