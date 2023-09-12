import fs from 'fs';
class ProductManager {
        
    constructor(rutaPath) {
        this.products = [];
        this.path = rutaPath;
        this.nextId = 1;
        this.loadProducts();
    }   
    
    // enlistamos los productos
    getProducts() {
        console.log("llego")
        this.loadProducts(); 
        return this.products;
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.nextId = this.products.length + 1;
        } catch (error) {
            this.products = [];
            console.log("Error al cargar el Json",error)
        }
    }

    // guardo los productos
    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf8');
    }    

    generateIdProduct() {
        const maxId = this.products.reduce((max, product) => {
            const productId = parseInt(product.id);
            return productId > max ? productId : max;
        }, 0);
        
        const newId = this.nextId = maxId + 1;
        return newId;
    }
    
    // agregamos productos, no pueden estar indefinidos ni null
    addProduct(product) {
        if (product.title === undefined || product.description === undefined || product.price === undefined ||
            product.thumbnails === undefined || product.code === undefined || product.stock === undefined ||
            product.title === null || product.description === null || product.price === null ||
            product.thumbnails === null || product.code === null || product.stock === null) {
            throw new Error("Campos obligatorios.");
        }

        
        
        const idList = this.products.some(idList  => idList.id === product.id);
        if (idList) {
            throw new Error("Código ya definido.");
        }
        
        const createProduct = {
            id: this.generateIdProduct(),
            ...product
        };        
        
        const idExistente = this.products.find(item => item.id === createProduct.id);

        if(!idExistente) {
            this.products.push(createProduct);
            this.saveProducts();
            console.log("Producto agregado:", createProduct);;  
        } else {
            console.log("El producto ya existe en el carrito.");
        }           

    }

    // consultamos el producto por el id (find busca comparando los id)
    getProductId(id) {
        this.loadProducts();
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error("Producto no encontrador.");
        }
        return product;
    }
    
     

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            const deletedProduct = this.products.splice(productIndex, 1)[0];
            this.saveProducts();
            console.log("Producto eliminado:", deletedProduct);
        } else {
            console.log("Producto no encontrado");
        }
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = {
                ...this.products[productIndex],
                ...updatedFields
            };
            this.saveProducts();
            console.log("Producto actualizado:", this.products[productIndex]);
        } else {
            console.log("Producto no encontrado");
        }
    }

}

export default ProductManager;