# API Node

API REST de cursos construída com Node.js, TypeScript, Fastify, PostgreSQL e Drizzle ORM.

## Sobre

O projeto implementa uma API backend com validação e tipagem de rotas, persistência em PostgreSQL, migrations versionadas e testes de integração. O domínio atual cobre cursos e matrículas.

## Stack

- Node.js + TypeScript
- Fastify
- Drizzle ORM + PostgreSQL
- Zod + `fastify-type-provider-zod`
- Swagger/OpenAPI + Scalar
- Vitest + Supertest
- Docker Compose

## Funcionalidades

- Listagem paginada de cursos com busca por título e contagem de matrículas.
- Consulta de curso por ID.
- Criação e exclusão de cursos.
- Documentação interativa em `/api/docs` quando `NODE_ENV=development`.
- Testes de integração das rotas.

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/courses?search=&orderBy=title&page=1` | Lista cursos com busca e paginação |
| `GET` | `/api/courses/:id` | Busca um curso por ID |
| `POST` | `/api/courses` | Cria um curso com `title` e `description` opcional |
| `DELETE` | `/api/courses/:id` | Remove um curso por ID |

## Como rodar

### Pré-requisitos

- Node.js 22+
- Docker (para o PostgreSQL local)

### Passos

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Suba o PostgreSQL:

   ```bash
   docker compose up -d
   ```

3. Crie o arquivo de ambiente:

   ```bash
   cp .env.example .env
   ```

   O valor padrão usa o banco `courses` criado pelo Docker Compose:

   ```env
   NODE_ENV=development
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/courses
   ```

4. Aplique as migrations:

   ```bash
   npx dotenv -e .env -- npm run db:migrate
   ```

5. Opcionalmente, popule o banco:

   ```bash
   npm run db:seed
   ```

6. Inicie o servidor:

   ```bash
   npm run dev
   ```

   A API fica em `http://localhost:3000` e a documentação em `http://localhost:3000/api/docs`.

## Testes

Crie um banco de testes e configure `.env.test` com a variável `DATABASE_URL`. Depois rode:

```bash
npm test
```

Os testes usam Vitest, Supertest e coverage com V8.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor com watch mode |
| `npm run db:generate` | Gera migrations do Drizzle |
| `npm run db:migrate` | Aplica migrations |
| `npm run db:seed` | Popula o banco |
| `npm run db:studio` | Abre o Drizzle Studio |
| `npm test` | Executa os testes com coverage |

## Estrutura

```text
src/
  app.ts                  # Configuração do Fastify e rotas
  server.ts               # Inicialização do servidor
  database/
    client.ts             # Conexão com PostgreSQL
    schema.ts             # Tabelas users, courses e enrollments
    seed.ts               # Dados iniciais
  routes/                 # Rotas e testes de integração
drizzle/                  # Migrations e metadados
docker-compose.yml        # PostgreSQL 17 local
```

## Licença

MIT. Consulte [LICENSE](LICENSE).
