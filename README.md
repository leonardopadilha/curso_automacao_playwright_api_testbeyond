# ShortBeyond - Testes de API com Playwright

Este projeto demonstra a implementação de testes de API utilizando Playwright, seguindo o padrão Service e incluindo testes de performance com Artillery. O projeto faz parte do curso **Playwright Além da Interface** da [TestBeyond](https://testbeyond.com/cursos/playwright-alem-da-interface).

## 🎯 Objetivo

Utilização do Playwright para teste de API, implementando:
- Padrão de projeto Service
- Camada de Factory para geração de dados dinâmicos com Faker
- Utilização de fixtures para injeção de dependências
- GlobalSetup para limpeza de base de dados
- Testes de performance com Artillery
- Gerenciamento de ambiente com Podman

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios

```
shortbeyond/
├── playwright/
│   ├── e2e/                    # Testes end-to-end
│   │   ├── auth/              # Testes de autenticação
│   │   ├── links/             # Testes de links
│   │   └── health.spec.js     # Teste de health check
│   └── support/               # Utilitários e configurações
│       ├── config/            # Configurações
│       ├── factories/         # Geração de dados com Faker
│       ├── fixtures/          # Injeção de dependências
│       ├── functions/         # Funções utilitárias
│       └── services/          # Camada de serviços (padrão Service)
├── performance/               # Testes de performance
│   ├── data/                 # Dados para testes
│   ├── tests/                # Scripts do Artillery
│   └── reports/              # Relatórios de performance
├── global-setup.js           # Setup global para limpeza de dados
├── playwright.config.js      # Configuração do Playwright
└── shortbeyond.yaml          # Configuração do Podman
```

### Padrões Implementados

#### 1. **Padrão Service**
- Separação clara entre lógica de teste e lógica de negócio
- Serviços organizados por domínio (`auth.js`, `links.js`, `login.js`, `register.js`)
- Reutilização de código entre testes

#### 2. **Factory Pattern**
- Geração de dados dinâmicos com [Faker.js](https://fakerjs.dev/)
- Factories específicas para diferentes cenários de teste
- Dados consistentes e realistas

#### 3. **Fixtures**
- Injeção de dependências estendendo o Playwright
- Configuração centralizada de recursos de teste
- Reutilização de setup entre testes

## 🚀 Tecnologias Utilizadas

- **[Playwright](https://playwright.dev/)** - Framework de testes
- **[Artillery](https://www.artillery.io)** - Testes de performance
- **[Faker.js](https://fakerjs.dev/)** - Geração de dados fake
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados
- **[Podman](https://podman.io/)** - Containerização
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Hash de senhas
- **[ULID](https://github.com/ulid/spec)** - Identificadores únicos

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Podman instalado
- PostgreSQL (via Podman)

## 🛠️ Instalação

1. **Clone o repositório:**
```bash
git clone <repository-url>
cd shortbeyond
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
Crie um arquivo `.env` na raiz do projeto:
```env
BASE_API=http://localhost:3333
DB_USER=dba
DB_HOST=localhost
DB_NAME=ShortDB
DB_PASS=dba
DB_PORT=5432
```

4. **Inicie o ambiente com Podman:**
```bash
podman play kube shortbeyond.yaml
```

## 🧪 Executando os Testes

### Testes de API (Playwright)

```bash
# Executar todos os testes
npm test

# Executar com interface gráfica
npm run test:ui

# Executar testes específicos
npx playwright test playwright/e2e/auth/login.spec.js
```

### Testes de Performance (Artillery)

```bash
# Health Check
npm run art:health

# Teste de cadastro
npm run art:cadastro

# Teste de login
npm run art:login

# Teste de pré-cadastro
npm run art:pre

# Teste de spike
npm run art:spike
```

### Inserção de Dados de Teste

```bash
# Inserir usuários de teste no banco
npm run insert:users
```

## 📊 Estrutura dos Testes

### Testes de API

- **Autenticação**: Registro e login de usuários
- **Links**: CRUD de links encurtados
- **Health Check**: Verificação de saúde da API

### Testes de Performance

- **Health Check**: Verificação básica de disponibilidade
- **Cadastro**: Teste de carga no endpoint de registro
- **Login**: Teste de performance no endpoint de login
- **Spike Test**: Teste de picos de carga

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL com as seguintes tabelas:
- `users`: Usuários do sistema
- `links`: Links encurtados

### Limpeza Automática

O `global-setup.js` executa automaticamente antes dos testes, removendo dados de teste (usuários com email `@leo.qa`).

## 🐳 Containerização

O ambiente é gerenciado via Podman com os seguintes serviços:

- **PostgreSQL**: Banco de dados na porta 5432
- **Adminer**: Interface web para o banco na porta 8080
- **API**: Serviço principal na porta 3333
- **Web**: Interface web na porta 80

### Comandos Podman

```bash
# Iniciar ambiente
podman play kube shortbeyond.yaml

# Parar ambiente
podman pod stop shortbeyond

# Remover ambiente
podman pod rm shortbeyond
```

## 📚 Documentação da API

A documentação da API está disponível via Swagger em:
- **URL**: http://localhost:3333/docs

## 📈 Relatórios

### Playwright
- Relatórios HTML gerados em `playwright-report/`
- Traces disponíveis para debugging

### Artillery
- Relatórios JSON salvos em `performance/reports/` (Crie a pasta reports)
- Métricas de performance e carga

## 🎓 Curso Relacionado

Este projeto faz parte do curso **Playwright Além da Interface** da TestBeyond:
- **Link**: https://testbeyond.com/cursos/playwright-alem-da-interface

### Documentação Adicional

- **Artillery**: https://www.artillery.io
- **Testes de Performance com Artillery**: https://www.notion.so/Testes-de-Performance-com-Artillery-e-Intelig-ncia-Artificial-275fd79386658067b201f1726391b783
- **Podman**: https://podman.io/
- **Faker.js**: https://fakerjs.dev/

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para mais detalhes.

---

**Feito com ❤️ e muito ☕**
