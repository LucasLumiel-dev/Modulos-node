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

// Rota para consultar um produto pelo ID
app.get("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id); // Obtém o ID da URL e converte para número
    const produto = produtos.find((p) => p.id === id); // Busca o produto no vetor

    if (produto) {
        res.json(produto); // Retorna o produto encontrado
    } else {
        res.status(404).json({ error: "Produto não encontrado" }); // Retorna erro se não achar
    }
});

// Rota para inserir um novo produto
app.post("/produtos", (req, res) => {
    const { id, nome, quantidade, preco } = req.body; // Desestrutura os dados do corpo da requisição

    // Validações simples
    if (!id || !nome || quantidade === undefined || preco === undefined) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios: id, nome, quantidade, preco" });
    }

    // Verifica se o ID já existe
    const produtoExistente = produtos.find((p) => p.id === id);
    if (produtoExistente) {
        return res.status(400).json({ error: "Produto com esse ID já existe" });
    }

    // Cria o novo produto
    const novoProduto = { id, nome, quantidade, preco };

    // Adiciona ao vetor
    produtos.push(novoProduto);

    // Retorna o produto criado
    res.status(201).json(novoProduto);
});

// Rota para alterar os dados de um produto pelo ID
app.put("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id); // Obtém o ID do produto a ser alterado
    const { nome, quantidade, preco } = req.body; // Dados enviados para alteração

    // Encontra o índice do produto no vetor
    const indice = produtos.findIndex((p) => p.id === id);

    if (indice === -1) {
        return res.status(404).json({ error: "Produto não encontrado" }); // Retorna erro se não encontrar
    }

    // Validações simples
    if (!nome && quantidade === undefined && preco === undefined) {
        return res.status(400).json({ error: "Nenhum dado para atualizar" });
    }

    // Atualiza os campos enviados no corpo da requisição
    if (nome) produtos[indice].nome = nome;
    if (quantidade !== undefined) produtos[indice].quantidade = quantidade;
    if (preco !== undefined) produtos[indice].preco = preco;

    // Retorna o produto atualizado
    res.json(produtos[indice]);
});

// Rota para deletar um produto pelo ID
app.delete("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id); // Captura o ID do produto da URL

    // Encontra o índice do produto no vetor
    const indice = produtos.findIndex((p) => p.id === id);

    if (indice === -1) {
        return res.status(404).json({ error: "Produto não encontrado" }); // Retorna erro se o produto não for encontrado
    }

    // Remove o produto do vetor
    const produtoRemovido = produtos.splice(indice, 1);

    // Retorna o produto que foi removido
    res.json({
        message: "Produto removido com sucesso",
        produto: produtoRemovido[0],
    });
});


app.get("/clientes/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const cliente = await bd.ListaClientes(id);

        if (cliente.length === 0) {
            return res.status(404).json({ error: "Cliente não encontrado" });
        }

        res.json(cliente[0]);
    } catch (erro) {
        res.status(500).json({ error: "Erro ao buscar cliente" });
    }
});

app.get("/clientes", async (req, res) => {
    try {
        const clientes = await bd.ListaClientes();
        res.json(clientes);
    } catch (erro) {
        res.status(500).json({ error: "Erro ao listar clientes" });
    }
});

//const bd = require("./bd");

app.post("/clientes", async (req, res) => {
    try {
        const cliente = req.body;
        const novoCliente = await bd.inserirCliente(cliente);
        res.status(201).json(novoCliente);
    } catch (erro) {
        res.status(500).json({ error: "Erro ao inserir cliente" });
    }
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});