import fs from 'fs';

import express from 'express';
const app = express();
app.use(express.json());
app.use( express.urlencoded( { extended:true } ) );

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

app.use('/app/products', productsRouter);
app.use('/app/carts', cartsRouter );

const PORT = 8080;
app.listen(PORT, () => {
    console.log( `Server is running on port ${PORT}` );
});