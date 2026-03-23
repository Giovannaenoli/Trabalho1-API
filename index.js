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

let filmes = [
    { id: 1, titulo: "Inception", diretor: "Christopher Nolan", ano: 2010, genero: "Sci-Fi", nota: 8.8 },
    { id: 2, titulo: "O Poderoso Chefão", diretor: "Francis Ford Coppola", ano: 1972, genero: "Crime", nota: 9.2 },
    { id: 3, titulo: "Pulp Fiction", diretor: "Quentin Tarantino", ano: 1994, genero: "Crime", nota: 8.9 },
    { id: 4, titulo: "Batman: O Cavaleiro das Trevas", diretor: "Christopher Nolan", ano: 2008, genero: "Ação", nota: 9.0 },
    { id: 5, titulo: "Interestelar", diretor: "Christopher Nolan", ano: 2014, genero: "Sci-Fi", nota: 8.6 },
    { id: 6, titulo: "Parasita", diretor: "Bong Joon-ho", ano: 2019, genero: "Drama", nota: 8.5 },
    { id: 7, titulo: "Matrix", diretor: "Lana Wachowski", ano: 1999, genero: "Sci-Fi", nota: 8.7 },
    { id: 8, titulo: "Gladiador", diretor: "Ridley Scott", ano: 2000, genero: "Aventura", nota: 8.5 },
    { id: 9, titulo: "Seven", diretor: "David Fincher", ano: 1995, genero: "Crime", nota: 8.6 },
    { id: 10, titulo: "Clube da Luta", diretor: "David Fincher", ano: 1999, genero: "Drama", nota: 8.8 }
];

app.get('/api/info', (req, res) => {
    res.json({ nome: 'API de Catálogo de Filmes', versao: '1.0.0', autor: 'Giovanna Oliveira' });
});

// GET simples para listar todos
app.get('/api/filmes', (req, res) => {
    res.json(filmes);
});

// GET por ID
app.get('/api/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filme = filmes.find(f => f.id === id);

    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }
    res.json(filme);
});


app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});