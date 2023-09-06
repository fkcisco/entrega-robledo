import fs from 'fs';
import express from 'express';
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

class ProductManager {
        
    constructor(rutaPath) {
        this.products = [];
        this.path = rutaPath;
        this.nextId = 1;
        this.loadProducts();
    }   
    
    // enlistamos los productos
    getProducts() {
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

    generateIdCart() {
        let cartIdCounter = 1;
        const newIdCart = cartIdCounter.toString();
        cartIdCounter++;
        return newIdCart;
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
            ...product,
            id: this.generateIdCart()
        };

        console.log(createProduct)

         this.products.push(createProduct);

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
const productManager = new ProductManager('./productos.json');

router.get( "/", ( req, res ) => {
    const productosCargados = productManager.getProducts();
    res.send(productosCargados)
})

router.get("/:pid", (req, res) => {
    const productId = parseInt(req.params.pid); // capturo el ide del parametro de la url
    try {
        const product = productManager.getProductId(productId); // busco con la función nativa de javascript para buscar por id
        res.send({ product }); // envio el producto que da la respuesta
    } catch (error) {
        res.status(404).send({ status: "error", error: "Producto no encontrado" }); // muestro error
    }
});

router.post("/", (req, res) => {   
   

    const product =  req.body
        productManager.addProduct(product)  


    // try {
        
    //     res.status(200).send({ status: "success", message: "Producto cargado exitosamente." });      
    // } catch (error) {
    //     res.status(404).send({ status: "error", error: "Producto no cargado..." });        
    // }

});

router.put("/:pid", (req, res) => {
    const productId = parseInt(req.params.pid); 
    const bodyUpdate = req.body;

    if ("id" in bodyUpdate) {
        res.status(400).send({ status: "error", error: "No se puede modificar el campo Id" });
    } else {
        try {
            productManager.updateProduct(productId, bodyUpdate ); 
            res.status(200).send({ status: "success", menssage: "Producto actualizado correctamente" });
        } catch (error) {
            res.status(404).send({ status: "error", error: "Producto no encontrado" }); 
        }
    }

});

router.delete("/:pid", (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        productManager.deleteProduct(productId);
        res.status(200).send({ status: "success", menssage: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(404).send({ status: "error", error: "Producto no encontrado" }); // muestro error
    }

});

export default router;