const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const produtos = [];

app.post("/produto", (request, response) => {

    try {

        let produto = request.body;

        let novoproduto = {
            id: Math.random(),
            nome: produto.nome,
            quantidade: produto.quantidade,
            valor: produto.valor,
            // tomou_vacina: produto.tomou_vacina
        }

        if (produto.nome == "") {
            throw Error("Campo nome vazio")
        }

        if (produto.quantidade == "") {
            throw Error("Campo quantidade vazio")
        }

        if (produto.valor == "") {
            throw Error("Campo quantidade vazio")
        }

        produtos.push(novoproduto);

        return response.status(201).json(novoproduto);

    } catch (error) {

        return response.status(400).json({
            error: error.message
        });

    }

});

app.get("/produto", (request, response) => {

    return response.status(200).json(produtos);

});

app.put("/produto/:id", (request, response) => {

    let id = request.params.id;
    let produto = request.body;

    let updateProduto;

    produtos.map((element) => {
        if (element.id == id) {

            updateProduto = element.nome = produto.nome;
            updateProduto = element.quantidade = produto.quantidade;
            updateProduto = element.valor = produto.valor;
            // updateProduto = element.tomou_vacina = produto.tomou_vacina;

            return updateProduto;
        }
    });

    return response.status(200).json(updateProduto);

});

app.delete("/produto/:id", (request, response) => {

    let id = request.params.id;

    let indice = produtos.findIndex(element => element.id == id);
    produtos.splice(indice, 1);

    return response.status(204).json();

});

//subir o server
const port = 3333;

app.listen(port, () => {

    console.log(`Rodando na porta ${port}`);

});