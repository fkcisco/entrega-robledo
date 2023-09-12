import fs from 'fs';
import express from 'express';
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

import ProductManager from '../class/ProductManager.js';

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