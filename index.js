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

// Banco de dados em memória (Array de filmes da aula)
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

// Variável para controlar o próximo ID (Tinha esquecido de declarar!)
let proximoId = 11;

// GET /api/filmes - Listagem com filtros, ordem e paginação
app.get('/api/filmes', (req, res) => {
    // Pegando os parâmetros da URL
    const { genero, ordem, pagina = 1, limite = 5 } = req.query;
    let resultado = [...filmes];

    // Lógica de filtro por gênero
    if (genero) resultado = resultado.filter(f => f.genero.toLowerCase() === genero.toLowerCase());

    // Lógica de ordenação por nota
    if (ordem === 'nota') resultado.sort((a, b) => b.nota - a.nota);

    // Cálculos de paginação que o professor passou
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

// GET por ID - Adicionei para ficar completo
app.get('/api/filmes/:id', (req, res) => {
    const idParam = parseInt(req.params.id);
    const filme = filmes.find(f => f.id === idParam);

    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado no sistema" });
    }
    res.json(filme);
});

// POST /api/filmes - Criar novo filme
app.post('/api/filmes', (req, res) => {
    const { titulo, diretor, ano, genero, nota } = req.body;

    // 1. Campos obrigatórios
    if (!titulo || !diretor || !ano || !genero || !nota) {
        return res.status(400).json({ erro: "Campos obrigatorios faltando" });
    }

    // 2. Validação de Nota (0 a 10) - Não pode ser string nem fora do limite
    if (typeof nota !== 'number' || nota < 0 || nota > 10) {
        return res.status(400).json({ erro: "A nota deve ser entre 0 e 10" });
    }

    // 3. Validação de Ano (Regra de negócio: cinema nasceu em 1895)
    if (ano < 1895 || ano > 2026) {
        return res.status(400).json({ erro: "Ano de lancamento invalido" });
    }

    // Criando o objeto com ID automático
    const novoFilme = { id: proximoId++, titulo, diretor, ano, genero, nota };
    filmes.push(novoFilme);

    // Status 201 indica que algo foi criado com sucesso
    res.status(201).json(novoFilme);
});

// Iniciando o servidor na porta 3000
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});