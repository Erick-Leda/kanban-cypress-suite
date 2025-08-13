# Kanban Bug Test Suite — Cypress

Suíte de testes automatizados (Cypress) cobrindo **21 bugs** mapeados em BDD para um Kanban.

## Rodando localmente
```bash
npm install
npm run cy:open   # modo interativo
# ou
npm run cy:run    # headless
```

A URL da aplicação é configurada em `cypress.config.js` (propriedade `baseUrl`).

## Estrutura
```
cypress/
  e2e/bugs-kanban.cy.js
  support/commands.js
  support/e2e.js
  utils/by.js
  utils/dnd.js
cypress.config.js
package.json
README.md
```

Seletores **semânticos** por texto/hierarquia (não dependem de classes/ids). Arraste-e-solte por coordenadas.
