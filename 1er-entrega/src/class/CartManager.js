import fs from 'fs';
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
        fs.writeFileSync(this.path, JSON.stringify({ }), 'utf8');
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

export default CartManager;