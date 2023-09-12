import express from 'express';
const router = express.Router();

const foods = [
    {name: "Banana", price: 100},
    {name: "Pizza", price: 200},
    {name: "Gaseosa", price: 300},
    {name: "Empanad", price: 400},
    {name: "Sushi", price: 500}
]

router.get('/', (req, res) => { 
    res.render('home', { food: foods } );
})

router.get ('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { food: foods });

})

export default router;