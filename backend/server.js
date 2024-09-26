const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importa o pacote cors

const app = express();
app.use(cors()); // Permite requisições CORS

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Caminho para o arquivo JSON
const produtosFilePath = path.join(__dirname, '../src/produtos.json');

// Endpoint para obter produtos
app.get('/produtos', (req, res) => {
    fs.readFile(produtosFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler arquivo de produtos');
        }
        res.send(JSON.parse(data));
    });
});

// Endpoint para adicionar produtos
app.post('/produtos', (req, res) => {
    const novoProduto = req.body;

    // Lê o arquivo JSON
    fs.readFile(produtosFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler arquivo de produtos');
        }

        let produtos = JSON.parse(data);
        novoProduto.id = produtos.length + 1; // Adiciona ID ao novo produto
        produtos.push(novoProduto);

        // Escreve de volta no arquivo JSON
        fs.writeFile(produtosFilePath, JSON.stringify(produtos, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Erro ao salvar produto');
            }
            res.send(novoProduto);
        });
    });
});""

// Inicia o servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
