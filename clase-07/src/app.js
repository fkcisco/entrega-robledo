import express from "express";
const app = express();
const server = app.listen(8080, () => console.log("Escuchando el puerto 8080") );
app.use(express.json());
app.use(express.urlencoded({extenden:true}));

let users = [];

app.post("/api/user", (req, res) => {
    let user = req.body;
    if(!user.first_name || !user.last_name) {
        return res.status(400).send({status:"error", error:"Valores incompletos"})
    }
    users.push(user);
    res.send({status:"sucecss", message: "Usurio creado"})
})

app.put("/api/user/:id", ( req , res ) => {
    const userId = parseInt(req.params.id);
    const updateUser = req.body;

    if( !updateUser.fist_name || !updateUser.last_name) {
        return res.status(400).send({status: "error", error: "valores incompletos" })
    }

    const userIndex = users.findIndex( user => user.id === userId);
    if(userIndex !== -1) {
        users[userIndex] = {
            ...users[userIndex],
            ...updateUser
        };
        res.send({ status: "sucess", message: "Usuario actualizado"})
    } else {
        res.status(404).send({ status: "error", error: "Usuario no encontrado"})
    }
})

app.delete("/api/user/:id", (req, res) => {
    const userId = parseInt(req.params.id);

    const userIndex = users.findIndex( user => user.id === userId);
    if(userIndex !== -1) {
        users.splice(userIndex, 1)            
        res.send({ status: "sucess", message: "Usuario eliminado"})
    } else {
        res.status(404).send({ status: "error", error: "Usuario no encontrado"})
    }
})


app.get("/api/user", (req, res) => {
    res.send(users);
})