const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Importa o roteador de clientes
const clientesRouter = require('./serverClientes'); // Ajuste o caminho conforme necessário

const app = express();
app.use(cors());
app.use(express.json());

// Rota para produtos
const produtosFilePath = path.join(__dirname, '../src/produtos.json');

const lerProdutos = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(produtosFilePath, 'utf8', (err, data) => {
            if (err) {
                return reject('Erro ao ler arquivo de produtos');
            }
            resolve(JSON.parse(data));
        });
    });
};

const escreverProdutos = (produtos) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(produtosFilePath, JSON.stringify(produtos, null, 2), (err) => {
            if (err) {
                return reject('Erro ao salvar produtos');
            }
            resolve();
        });
    });
};

// Endpoints para produtos
app.get('/produtos', async (req, res) => {
    try {
        const produtos = await lerProdutos();
        res.send(produtos);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/produtos/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const produtos = await lerProdutos();
        const produto = produtos.find(prod => prod.id === id);

        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }

        res.send(produto);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/produtos', async (req, res) => {
    const novoProduto = req.body;

    try {
        const produtos = await lerProdutos();
        const idsExistentes = produtos.map(p => p.id);
        
        let novoId = 1;

        while (idsExistentes.includes(novoId)) {
            novoId++;
        }

        novoProduto.id = novoId;
        produtos.push(novoProduto);

        await escreverProdutos(produtos);
        res.status(201).send(novoProduto);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/produtos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const produtoAtualizado = req.body;

    try {
        const produtos = await lerProdutos();
        const produtoIndex = produtos.findIndex(produto => produto.id === id);

        if (produtoIndex === -1) {
            return res.status(404).send('Produto não encontrado');
        }

        produtos[produtoIndex] = { id, ...produtoAtualizado };
        await escreverProdutos(produtos);
        res.send(produtos[produtoIndex]);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/produtos/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const produtos = await lerProdutos();
        const produtosFiltrados = produtos.filter(produto => produto.id !== id);

        if (produtos.length === produtosFiltrados.length) {
            return res.status(404).send('Produto não encontrado');
        }

        await escreverProdutos(produtosFiltrados);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// Usar o roteador de clientes
app.use('/clientes', clientesRouter);

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
