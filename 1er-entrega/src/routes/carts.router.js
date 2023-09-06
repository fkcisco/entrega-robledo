import fs from 'fs';
import express from 'express';
const router = express.Router();
router.use( express.json() );
router.use( express.urlencoded( { extended: true } ) );

class CartManager {
        
    constructor(rutaPath) {
        this.carts = [];
        this.path = rutaPath;
        this.nextId = 1;
        this.loadCart();
    }   
    
    loadCart() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];           
        }
    }

    // guardo los productos
    saveCart(carrito) {
        fs.writeFileSync(this.path, JSON.stringify(carrito), 'utf8');
    }  

    // guardo vacio
    saveCartEmpty() {
        fs.writeFileSync(this.path, JSON.stringify({}), 'utf8');
    }
    
     // enlistamos los productos
    getCart() {
        this.loadCart(); 
        return this.carts;
    }    
    
    // consultamos el producto por el id (find busca comparando los id)
    getCartId(cartId) {
        this.getCart();
        const product = this.carts.find(product => product.id === cartId);
          if (!product) {
            throw new Error("el Carrito no encontrador.");
        }
        return product;
    }


}

let cartIdCounter = 1;
function generateIdCart() {
    const newIdCart = cartIdCounter.toString();
    cartIdCounter++;
    return newIdCart;
}

const cartManager = new CartManager('./carrito.json');

router.post( "/", ( req, res ) => {      
    try {           
        const { products } = req.body;
        const cartId = generateIdCart();

        const createCart = {
            id: cartId,
            products: products
        };        

        let carrito = [];

        try {
            carrito = cartManager.getCart();
        } catch (error) {
            cartManager.saveCartEmpty()              
        }

        console.log(createCart)
        
        carrito.push(createCart); 
        cartManager.saveCart(carrito);      

        res.status(200).json(carrito);  
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error al crear el carrito"});
        
    } 
})

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
    const { quantity } = req.body;

    let carrito = [];

    try {
        carrito = cartManager.getCart();
    } catch (error) {
        cartManager.saveCartEmpty()              
    }

    const cart = carrito.find( (cart) => cart.id === cartId);

    if (cart) {

        const existingProduct = cart.products.find((product) => product.id === productId)
        
        if (existingProduct) {
            existingProduct.quantity += quantity || 1
        } else {
            cart.products.push( {id: productId, quantity: quantity || 1});
        }  

        cartManager.saveCart({cart});
    }

    
})

export default router;