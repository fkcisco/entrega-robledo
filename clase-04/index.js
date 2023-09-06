import fs from 'fs';

class ProductManager {
    
    constructor(imgPath) {
        this.products = [];
        this.path = imgPath;
        this.nextId = 1;
        this.loadProducts();
    }   

    // guardo los productos
    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf8');
    }        

    // enlistamos los productos
    getProducts() {
        this.loadProducts(); 
        return this.products;
    }
    
    // agregamos productos, no pueden estar indefinidos ni null
    addProduct(product) {
        if (product.title === undefined || product.description === undefined || product.price === undefined ||
            product.image === undefined || product.code === undefined || product.stock === undefined ||
            product.title === null || product.description === null || product.price === null ||
            product.image === null || product.code === null || product.stock === null) {
            throw new Error("Campos obligatorios.");
        }
        
        const codeList = this.products.some(codeList => codeList.code === product.code);
        if (codeList) {
            throw new Error("Código ya definido.");
        }
        
        const createProduct = {
            ...product,
            id: this.nextId
        };
        this.products.push(createProduct);
        this.nextId++;

        this.saveProducts();

        console.log("Producto agregado:", createProduct);
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

    generateIdProduct() {
        return Math.random().toString(36).slice(2, 11);
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.nextId = this.products.length + 1;
        } catch (error) {
            this.products = [];
        }
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

// creamos una nueva instancia del producto
const productManager = new ProductManager('./ruta.json');

try {
    // agregamos un termo como nuevo producto
    productManager.addProduct({
        title:  "Termo mate",
        description: "Termo mate acero inxodable 1.5 litros",
        price: 4000,
        image: "img/img2.png",
        code: "Ter158",
        stock: 80
    });
    } catch (error) {
        console.error("Error:", error.message);
    }

    // Intentamos agregar un producto nuevo con un campo incompleto un try catch para capturar el error
    try {
        productManager.addProduct({
            title: "Mate Metalico",
            description: "mate de plastico color verde",
            price: 4000,
            image: "img/img1.png",
            code: "mat780",
            stock: 40
        });
    } catch (error) {
        console.error("Error:", error.message);
    }
        
    console.log("Productos:", productManager.getProducts());

// Obtener un producto por ID
const productById = productManager.getProductId(2);
if (productById) {
    console.log("Producto encontrado", productById);
}

productManager.updateProduct(2, {
    title: "Producto 2 Actualizado",
    price: 55.00
});

productManager.deleteProduct(1);

// enlisto todos los productos
console.log("Lista de productos finales:", productManager.getProducts());


