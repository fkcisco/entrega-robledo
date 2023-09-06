import express from "express";
const app = express();
const server = app.listen(8080, () => console.log("Escuchando el puerto 8080") );
app.use(express.json());
app.use(express.urlencoded({extenden:true}));app.engine(' ')


app.use(express.static' ')


app.get('/', (req res) => {
    const randomIndex = Math.floor(Math.random() * users.length);
    const seletedUSer = users[randomIndex];

    res.render('index', { user: seletedUSer})
})