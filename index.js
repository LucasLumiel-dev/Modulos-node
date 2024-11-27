               require("dotenv").config();


const express = require("express");
const app = express();

app.get("/clientes", (request, response) => {
    response.json(bd.RetornaClientes());
} );

app.get("/", (request, response) =>{
    response.json(
        {
            message:"Oi Delicious, vc chegou a rota raiz!"
        }
    )
} );


app.listen(process.env.PORT, () => {
    console.log("oi Servidor está no AR!!");
} );

