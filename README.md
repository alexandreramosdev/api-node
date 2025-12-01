# api-node

API REST em Node.js + TypeScript + Fastify

> Projeto pessoal — API backend desenvolvida com Node.js e Fastify, com suporte a banco de dados, autenticação e rotas tipadas.

---

## 🎯 Objetivo do Projeto

Este repositório implementa uma API REST com foco em **boa estrutura**, **tipagem** e **desempenho**, ideal para servir como backend de aplicações web ou mobile.
Ele serve como base para seus estudos, projetos pessoais ou portfólio profissional.

---

## 🚀 Funcionalidades (ou expectativas de uso)

- Estrutura em TypeScript — tipagem forte e segurança de tipos.
- Servidor HTTP com Fastify.
- Rotas REST definidas em `server.ts` (ou em modulo/rotas conforme evolução).
- Possível integração com banco de dados (ex: PostgreSQL) e uso de ambiente de produção.
- Fácil configuração e inicialização — ideal para testes locais ou como boilerplate para novos projetos.

---

## 🛠️ Tecnologias utilizadas

- Node.js
- TypeScript
- Fastify
- (Opcional / futuro) PostgreSQL
- (Opcional / futuro) Docker

---

## ⚙️ Pré-requisitos

- Node.js (v22.19.0)
- npm ou yarn
- (Opcional) Banco de dados se você for integrar com PostgreSQL

---

## ✅ Como rodar localmente

```bash
# clone o repositório
git clone https://github.com/alexandreramosdev/api-node.git

# entre na pasta do projeto
cd api-node

# instale as dependências
npm install
# ou
yarn install

# inicie o servidor em modo de desenvolvimento
npm run dev
# ou
yarn dev
```

Após isso, a API deverá estar rodando (por padrão, por exemplo, em `http://localhost:3000` — depende da sua configuração).

### 📁 Estrutura do Projeto

```
api-node/
├── server.ts         # ponto de entrada do backend (rotas, middlewares, etc)
├── tsconfig.json     # configuração do TypeScript
├── package.json      # dependências e scripts
├── .gitignore
└── ...               # (futuras pastas: routes/, controllers/, services/, models/ etc)
```

À medida que o projeto crescer, é recomendado organizar por camadas (`routes` → `controllers` → `services` → `models`) para facilitar manutenção e escalabilidade.

### 📝 Boas práticas e recomendações

- Utilize tipagem com TypeScript — facilita manutenção e evita erros.
- Mantenha o código organizado e modular: cada rota / controller com sua responsabilidade.
- Documente endpoints, parâmetros e respostas: isso ajuda se o projeto crescer ou for usado por outros.
- Versione conforme necessidade (tags/branches) se for evoluir a API.

### 🎯 Possíveis melhorias / roadmap

- Adicionar configuração de banco de dados (PostgreSQL) + ORM/Query builder.
- Criar rotas de CRUD para recursos genéricos.
- Adicionar autenticação (JWT, OAuth, etc).
- Adicionar testes automatizados (unitários/integrados).
- Configurar ambiente de produção (variáveis de ambiente, scripts de build, Docker).
- Documentação da API (ex: Swagger / OpenAPI).

---

## 📄 Licença

Este projeto está disponibilizado sob a **licença MIT** — livre para uso, modificação e distribuição.

---

## 👤 Sobre o autor

Desenvolvido por **Alexandre Ramos** — como parte do portfólio pessoal e para aprimoramento contínuo em backend e full-stack.
