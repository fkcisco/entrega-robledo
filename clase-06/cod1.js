const http = require("http");

const server = http.createServer( ( request, response ) => {
    response.end( "mi primer Hola Mundo desde Backend" )
})

server.listen(8080, () => {
    console.log( "Escuchando...." )
})