class ProductManager {
    constructor() {
        this.products = [];
    }
    
    // enlistamos los productos
    getProducts() {
        return this.products;
    }
    
    // agregamos productos, no pueden estar indefinidos ni null
    addProduct(title, description, price, thumbnail, code, stock) {
        if (title === undefined || description === undefined || price === undefined ||
            thumbnail === undefined || code === undefined || stock === undefined ||
            title === null || description === null || price === null ||
            thumbnail === null || code === null || stock === null) {
            throw new Error("Campos obligatorios.");
        }
        
        const codeList = this.products.some(product => product.code === code);
        if (codeList) {
            throw new Error("Código ya definido.");
        }
        
        const idProduct = this.generateIdProduct();
        const createProduct = {
            idProduct,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(createProduct);
        return createProduct;
    }

    // consultamos el producto por el id (find busca comparando los id)
    getProductId(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error("Not found.");
        }
        return product;
    }

    generateIdProduct() {
        return Math.random().toString(36).slice(2, 11);
    }
}

// creamos una nueva instancia del producto
const productManager = new ProductManager();

// agregamos un termo como nuevo producto
const newProduct = productManager.addProduct(
    "Termo mate",
    "Termo mate acero inxodable 1.5 litros",
    25000,
    "sin imagen",
    "Ter158",
    80
);

// obtenemos el listado de todos los productos en la constante
const allProducts = productManager.getProducts();
console.log("Productos:", allProducts);

// Obtener un producto por ID
const foundProduct = productManager.getProductId(newProduct.id);
console.log("Producto encontrado:", foundProduct);

// Intentamos agregar un producto nuevo con un campo incompleto un try catch para capturar el error
try {
    productManager.addProduct(
        "mate de plastico color verdee",
        4000,
        "sin imagen",
        "mat780",
        40
    );
} catch (error) {
    console.error("Error:", error.message);
}

// Intentamos agregar un producto nuevo con un campo incompleto un try catch para capturar el error
try {
    productManager.addProduct(
        "Mate Metalico",
        "mate metálico",
        2000,
        "sin imagen",
        "mat580",
        80
    );
} catch (error) {
    console.error("Error:", error.message);
}

