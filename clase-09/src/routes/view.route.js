import express from 'express';
const router = express.Router();


const foods = [
    {name: "Banana", price: 100},
    {name: "Pizza", price: 200},
    {name: "Gaseosa", price: 300},
    {name: "Empanad", price: 400},
    {name: "Sushi", price: 500}
]

router.get('/register', (req, res) => { 
    res.render('register');

})

router.post('/user', (req, res) => { 
    const { name , mail , password } = req.body;

    const newUser = {
        name : req.body.name,
        mail : req.body.mail,
        password : req.body.password,
    }

    users.push(newUser);
    console.log("Nuevo usuario registado:", newUser);
    res.send("Usuario registado correctamente");

})

const users = [
    {
        "name": "usuario1",
        "lastName": "apellido 1",
        "age": 11,
        "mail": "hola@hola.com",
        "phone": "11 11 11",
        "role": "user"
    },
    {
        "name": "usuario2",
        "lastName": "apellido 2",
        "age": 22,
        "mail": "hola@hola.com",
        "phone": "11 11 22",
        "role": "user"
    },
    {
        "name": "usuario3",
        "lastName": "apellido 3",
        "age": 33,
        "mail": "hola@hola.com",
        "phone": "11 11 33",
        "role": "admin"
    },
    {
        "name": "usuario4",
        "lastName": "apellido 4",
        "age": 44,
        "mail": "hola@hola.com",
        "phone": "11 11 44",
        "role": "admin"
    },
    {
        "name": "usuario5",
        "lastName": "apellido 5",
        "age": 55,
        "mail": "hola@hola.com",
        "phone": "11 11 55",
        "role": "admin"
    }
]

router.get('/', (req, res) => {  

    const randomIndex = Math.floor(Math.random() * users.length);
    const selecdUser = users[randomIndex]
   
    res.render('index', 
        { 
            user: selecdUser,
            style: "index.css",
            isAdmin: selecdUser.role === "admin",
            food: foods
        }
        );
})

export default router