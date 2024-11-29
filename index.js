require("dotenv").config();
const express = require("express");
const app = express();
const bd = require("./bd");

app.use(express.json());

app.get("/clientes/:id", (request, response) => {
    const id = request.params.id;
    response.json(bd.ListaClientes(id));
});

app.get("/clientes", (request,response) => {
    const clientes = request.body;
    bd.inserir
});

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

