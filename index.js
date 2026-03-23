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

app.get('/api/filmes', (req, res) => {
    const { genero, ordem, pagina = 1, limite = 5 } = req.query;
    let resultado = [...filmes];

    if (genero) resultado = resultado.filter(f => f.genero.toLowerCase() === genero.toLowerCase());
    if (ordem === 'nota') resultado.sort((a, b) => b.nota - a.nota);

    // Cálculos de paginação (Aula 2)
    const paginaNum = parseInt(pagina);
    const limiteNum = parseInt(limite);
    const inicio = (paginaNum - 1) * limiteNum;
    const final = inicio + limiteNum;

    res.json({
        dados: resultado.slice(inicio, final),
        total_itens: resultado.length,
        pagina_atual: paginaNum
    });
});


app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});