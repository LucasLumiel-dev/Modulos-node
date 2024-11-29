const clientes = [
    {
        id:1,
        Nome:"Nataka tushia",
        Profissao:"Programadora",
        Altura: 1.50
    },

    {
        id:2,
        Nome:"Lima Maria",
        Profissao:"General",
        Altura: 1.90
    }
];

function inserirclientes(clientes){
    //funcao para adicionar novo elemento no vetor
    
}

function ListaClientes(id) {
    return clientes.find(c => c.id == id);
}

function RetornaClientes() {
    return clientes;
}

//Comando para exportar as funcoes lidas nesse arquivo
module.exports = {
    RetornaClientes,
    ListaClientes
}
