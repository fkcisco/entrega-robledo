import fs from 'fs';
import express from 'express';
const router = express.Router();
router.use( express.json() );
router.use( express.urlencoded( { extended: true } ) );

import CartManager from '../class/CartManager.js';

const cartManager = new CartManager('./carrito.json');


let cartIdCounter = 1;
function generateIdCart() {
    const newIdCart = cartIdCounter.toString();
    cartIdCounter++;
    return newIdCart;
}

// Este post no va entonces, es solo el post pasando los valores por el params
// router.post( "/", ( req, res ) => {      
//     try {           
//         const { products } = req.body;
//         const cartId = generateIdCart();

//         const createCart = {
//             id: cartId,
//             products: products
//         };        

//         let carrito = [];

//         try {
//             carrito = cartManager.getCart();
//         } catch (error) {
//             cartManager.saveCartEmpty()              
//         }

//         const idExistente = carrito.find(item => item.id === createCart.id);

//         if(!idExistente) {
//             carrito.push(createCart); 
//             cartManager.saveCart(carrito);
//             res.status(200).json(carrito);  
//         } else {
//             res.status(500).json({error: "El producto ya existe en el carrito."});
//         }              
 
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({error: "Error al crear el carrito"});
        
//     } 
// })

router.get( "/:cid", ( req, res ) => {
    
    const cartId = req.params.cid; 

    try {        
        const cart = cartManager.getCartId(cartId); 
        res.send({ cart });
    } catch (error) {
        res.status(404).send({ status: "error", error: "Carrito no encontrado" }); 
    }

})

router.post( "/:cid/product/:pid", ( req, res ) => {

    const cartId = req.params.cid;
    const productId = parseInt(req.params.pid);

    let carrito = [];

    try {
        carrito = cartManager.getCart();         
    } catch (error) {
        cartManager.saveCartEmpty()              
    }

    const productToAdd = {
        product: productId,
        quantity: 1
    };

    const createCart = {
        id: cartId,
        products: [productToAdd]
    }; 

    const existingCartIndex = carrito.findIndex((cart) => cart.id === cartId);

    if (existingCartIndex !== -1) {

        const existingProduct = carrito[existingCartIndex].products.find((product) => product.product === productId);

        if (existingProduct) {

            existingProduct.quantity += 1;
        } else {

            carrito[existingCartIndex].products.push({ product: productId, quantity: quantity || 1 });
        }
    } else {
        const productToAdd = {
            product: productId,
            quantity: 1
        };

        const createCart = {
            id: cartId,
            products: [productToAdd]
        };

        carrito.push(createCart);
    }

    cartManager.saveCart(carrito);

    
})

export default router;