const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// Endpoint de informações
app.get('/api/info', (req, res) => {
    res.json({
        nome: 'API de Catálogo de Filmes',
        versao: '1.0.0',
        autor: 'Giovanna Oliveira'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});