const express = require('express');
const mysql = require('mysql2'); // Importa o driver MySQL

const router = express.Router();

// Configurações do banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost', // ou o endereço do seu servidor MySQL
    user: 'root', // seu nome de usuário do MySQL
    password: 'bcs220804', // sua senha do MySQL
    database: 'clientes' // nome do banco de dados
});

// Verifica a conexão
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Endpoint para obter todos os clientes
router.get('/', (req, res) => {
    connection.query('SELECT * FROM clientes', (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar clientes');
        }
        res.send(results);
    });
});

// Endpoint para obter um cliente específico pelo ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    connection.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar cliente');
        }

        if (results.length === 0) {
            return res.status(404).send('Cliente não encontrado');
        }

        res.send(results[0]);
    });
});

// Endpoint para adicionar um novo cliente
router.post('/', (req, res) => {
    const novoCliente = req.body;

    connection.query('INSERT INTO clientes SET ?', novoCliente, (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao adicionar cliente');
        }
        novoCliente.id = results.insertId; // Atribui o novo ID ao cliente
        res.status(201).send(novoCliente);
    });
});

// Endpoint para atualizar um cliente
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const clienteAtualizado = req.body;

    connection.query('UPDATE clientes SET ? WHERE id = ?', [clienteAtualizado, id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar cliente');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Cliente não encontrado');
        }

        res.send({ id, ...clienteAtualizado });
    });
});

// Endpoint para deletar um cliente
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    connection.query('DELETE FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao deletar cliente');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Cliente não encontrado');
        }

        res.status(204).send();
    });
});

module.exports = router;
