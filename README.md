# API de Catálogo de Filmes 

Este repositório contém o desenvolvimento de uma API REST para gerenciamento de um catálogo de filmes, realizada como parte das atividades da disciplina de Desenvolvimento Web.

O foco do projeto foi a implementação de rotas robustas utilizando **Node.js** e **Express**, aplicando conceitos de filtros, ordenação, paginação e validações rigorosas de dados.


## Tecnologias e Ferramentas
- **Node.js**: Ambiente de execução.
- **Express.js**: Framework para construção das rotas.
- **Nodemon**: Ferramenta de hot-reload para produtividade.
- **Postman**: Utilizado para testes de integração e validação dos endpoints.
- **JavaScript (ES6+)**: Lógica de manipulação de arrays e objetos.


## Como Executar o Projeto

1. **Clonar o Repositório:**
bash
git clone 
   
**Instalar Dependências:**
npm install

**Rodar em Modo de Desenvolvimento:**
npm run dev
A API estará rodando em: http://localhost:3000

**Documentação e Testes (Prints do Postman)**

1. Listagem Geral (GET)
Retorna a lista de filmes com suporte a filtros por gênero, ordenação por nota e paginação configurável via Query Params.

Endpoint: GET /api/filmes

Status: 200 OK

<img width="1499" height="1361" alt="Captura de tela 2026-03-23 201119" src="https://github.com/user-attachments/assets/9b91ced8-6105-45be-8565-50fc15a114c0" />

2. Busca por ID (GET)
Busca os detalhes de um filme específico através do seu ID (Path Parameter).

Endpoint: GET /api/filmes/:id

<img width="1516" height="1175" alt="Captura de tela 2026-03-23 201154" src="https://github.com/user-attachments/assets/cb516562-1109-4f55-866c-446bccdc077e" />

3. Cadastro de Filme (POST) - Sucesso
Cria um novo filme enviando um objeto JSON no corpo da requisição. O ID é gerado automaticamente pelo servidor para garantir a integridade.

Endpoint: POST /api/filmes

Status: 201 Created

<img width="1522" height="1121" alt="Captura de tela 2026-03-23 201134" src="https://github.com/user-attachments/assets/2ea7943d-b45d-4d31-a98d-e311d3112b77" />

4. Validações e Tratamento de Erro (POST)
A API possui camadas de proteção para garantir que nenhum dado inválido seja inserido. No exemplo abaixo, tentamos enviar uma nota maior que 10.

Status: 400 Bad Request

<img width="1524" height="1167" alt="Captura de tela 2026-03-23 201144" src="https://github.com/user-attachments/assets/ff6306aa-246b-4aed-b89d-71e1a4227683" />


**Regras de Negócio e Validações**
Seguindo as orientações de "Valide SEMPRE" passadas em aula, implementei:

- Campos Obrigatórios: A API não aceita o cadastro se faltar título, diretor, ano, gênero ou nota.
- Consistência de Tipos: Verifica se a nota enviada é do tipo Number.
- Limites de Valor: Notas devem estar entre 0 e 10.
- Coerência Histórica: O ano de lançamento deve ser superior a 1895 (nascimento do cinema).
- Tratamento de 404: Mensagem personalizada caso um ID inexistente seja solicitado.
