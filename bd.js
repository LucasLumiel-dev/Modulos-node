const clientes = [
    {
        Nome:"Nakama tushia",
        Profissao:"Programadora",
        Altura: 1.5
    }
];

function RetornaClientes() {
    return clientes;
}

//Comando para exportar as funcoes lidas nesse arquivo
module.exports = {
    RetornaClientes,
}