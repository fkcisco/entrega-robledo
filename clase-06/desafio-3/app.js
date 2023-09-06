import express from "express";
import fs from "fs";
const app = express();
const server = app.listen(8080, () => console.log("Escuchando el puerto 8080") );
app.use(express.json());
app.use(express.urlencoded({extenden:true}));

// Todo esto viene del otro desafio
class ProductManager {
    
    constructor(imgPath) {
        this.products = [];
        this.path = imgPath;
        this.nextId = 1;
        this.loadProducts();
    }

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
    
    // enlistamos los productos
    getProducts() {
        this.loadProducts(); 
        return this.products;
    }

    getProductId(id) {
        this.loadProducts();
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error("Producto no encontrador.");
        }
        return product;
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

}


    // creo la instancia con los productos del json
const productManager = new ProductManager('productos.json');


app.get("/products", (req, res) => {
    const limit = parseInt(req.query.limit); // Aca agregue el limit --> http://localhost:8080/products?limit=2
    const products = productManager.getProducts(); // Cargo los productos

    if (!products || products.length === 0) {
        return res.status(404).send({ status: "error", error: "No se encontraron productos" });
    }

    if (limit) { // con este if controlo que tenga limit sino muestros todos
        const limitedProducts = products.slice(0, limit); // muestro la cantidad definida ?limit=
        res.send({ products: limitedProducts }); // mando con send la cantidad de productos filtrado por limit
    } else {
        res.send({ products }); // muestro todos los productos
    }
});


app.get("/products/:pid", (req, res) => {
    const productId = parseInt(req.params.pid); // capturo el ide del parametro de la url
    try {
        const product = productManager.getProductId(productId); // busco con la función nativa de javascript para buscar por id
        res.send({ product }); // envio el producto que da la respuesta
    } catch (error) {
        res.status(404).send({ status: "error", error: "Producto no encontrado" }); // muestro error
    }
});
