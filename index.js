require("dotenv").config();
const express = require("express");
const bd = require("./bd"); // Certifique-se de que esse arquivo existe e funciona
const app = express();

app.use(express.json()); // Middleware para interpretar JSON

// Base de dados de produtos (em memória)
const produtos = [
    { id: 1, nome: "Peito de Frango", quantidade: 10, preco: 25.0 },
    { id: 2, nome: "Saco de Arroz", quantidade: 5, preco: 15.0 },
    { id: 3, nome: "Pote de Leite", quantidade: 20, preco: 50.0 },
];

// Porta do servidor
const PORT = process.env.PORT || 3010;

// Rota raiz
app.get("/", (request, response) => {
    response.json({
        message: "Oi Delicious, você chegou à rota raiz!",
    });
});

// Rota para listar produtos
app.get("/produtos", (req, res) => {
    res.json(produtos);
});

// Rota para buscar cliente por ID
app.get("/clientes/:id", (request, response) => {
    const id = request.params.id;
    const cliente = bd.ListaClientes(id); // Supondo que esta função existe no arquivo bd.js
    if (cliente) {
        response.json(cliente);
    } else {
        response.status(404).json({ error: "Cliente não encontrado" });
    }
});

// Rota para listar todos os clientes
app.get("/clientes", (request, response) => {
    const clientes = bd.RetornaClientes(); // Supondo que esta função existe no arquivo bd.js
    response.json(clientes);
});

// Rota para inserir cliente (usando POST)
app.post("/clientes", (request, response) => {
    const novoCliente = request.body;
    if (!novoCliente || !novoCliente.nome || !novoCliente.idade) {
        return response.status(400).json({ error: "Dados inválidos" });
    }
    const clienteInserido = bd.inserir(novoCliente); // Supondo que bd.inserir existe
    response.status(201).json(clienteInserido);
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});