import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewRouter  from './routes/view.route.js'

const app = express();
app.use(express.urlencoded({extenden:true}));

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname+'/views');
app.set('view engine','handlebars' )

app.use(express.static(__dirname+"/public"));
app.use('/', viewRouter)



const PORT = 8080
const server = app.listen(PORT, () => console.log("Escuchando el puerto 8080") );

