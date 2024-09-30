const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

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

app.get('/produtos', async (req, res) => {
    try {
        const produtos = await lerProdutos();
        res.send(produtos);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint para obter um produto específico pelo ID
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
        
        // Cria um array apenas com os IDs existentes
        const idsExistentes = produtos.map(p => p.id);
        
        // Inicializa o novo ID
        let novoId = 1;

        // Encontra um ID que não esteja em uso
        while (idsExistentes.includes(novoId)) {
            novoId++;
        }

        novoProduto.id = novoId; // Atribui o novo ID ao produto
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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
