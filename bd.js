const mysql = require("mysql2/promise");

// Criação da pool de conexões com o banco de dados
const conexao = mysql.createPool(process.env.CONNECTION_STRING);

// Função para inserir um cliente
async function inserirCliente(cliente) {
    try {
        const { nome, email, telefone } = cliente; // Exemplo de campos
        const query = "INSERT INTO cliente (nome, email, telefone) VALUES (?, ?, ?);";
        const [resultado] = await conexao.query(query, [nome, email, telefone]);
        return {
            id: resultado.insertId,
            ...cliente,
        };
    } catch (erro) {
        console.error("Erro ao inserir cliente:", erro.message);
        throw erro;
    }
}

// Função para listar clientes, com ou sem filtro por ID
async function ListaClientes(id = null) {
    try {
        if (id) {
            const query = "SELECT * FROM cliente WHERE id = ?;";
            const [resultado] = await conexao.query(query, [id]);
            return resultado;
        } else {
            const query = "SELECT * FROM cliente;";
            const [resultado] = await conexao.query(query);
            return resultado;
        }
    } catch (erro) {
        console.error("Erro ao listar clientes:", erro.message);
        throw erro;
    }
}

// Exporta as funções do módulo
module.exports = {
    inserirCliente,
    ListaClientes,
};
