# Gestor de Projetos

Aplicação web para gerir projetos e tarefas, desenvolvida com **React** e **TypeScript**.

## Funcionalidades 

- Criar, editar e apagar projetos
- Adicionar, editar, apagar e concluir tarefas dentro de cada projeto
- Barra de progresso por projeto
- Validação dos campos com mensagens de erro
- Tarefas concluídas com estilo diferente

## Tecnologias

- React + TypeScript (Create React App)
- Context API para gestão de estado
- JSON Server como API REST simulada
- Jest + React Testing Library para testes

## Como executar

Precisas de ter o Node.js instalado.

1. Instalar as dependências:
```bash
   npm install
```
2. Num terminal, iniciar a API (porta 3001):
```bash
   npx json-server --watch db.json --port 3001
```
3. Noutro terminal, iniciar a aplicação (porta 3000):
```bash
   npm start
```
4. Abrir http://localhost:3000

## Testes

```bash
npm test -- --watchAll=false
```

## Estrutura do projeto

```
src/
├── models/        Classes Project e Task, e interfaces dos dados da API
├── services/      Comunicação com a API (fetch)
├── context/       ProjectContext (estado global com Context API)
├── hooks/         Custom Hook useProjectProgress
├── components/    ProjectList, ProjectForm, TaskList, ProjectProgress
└── tests/     Testes unitários
```

## Decisões de design

- **Classes e composição:** um `Project` contém uma lista de `Task`.
- **Interfaces:** `ProjectData` e `TaskData` descrevem o formato dos dados da API, evitando o uso de `any`.
- **Custom Hook:** `useProjectProgress` calcula o progresso de um projeto de forma reutilizável.
- **Context API:** `ProjectProvider` guarda os projetos e expõe as funções para os gerir.
- **API:** as tarefas ficam guardadas dentro de cada projeto no `db.json`.