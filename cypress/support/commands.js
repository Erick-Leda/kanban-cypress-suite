// Comandos de alto nível reutilizáveis
import { by } from '../utils/by'

Cypress.Commands.add('visitApp', () => {
  cy.visit('/') // usa baseUrl do cypress.config.js
})

Cypress.Commands.add('addList', (title = 'Lista A') => {
  cy.contains(/adicionar outra lista/i).click({ force: true })
  cy.contains(/^\s*Enviar\s*$/i)
    .parents().first()
    .find('input, textarea').first()
    .clear().type(title)
  cy.contains(/^\s*Enviar\s*$/i).click({ force: true })
  by.listByTitle(title).should('exist')
})

Cypress.Commands.add('addCard', (listTitle, cardTitle = 'Tarefa 1') => {
  by.listByTitle(listTitle).within(() => {
    cy.contains(/\+?\s*adicionar tarefa/i).click({ force: true })
    cy.contains(/^\s*Enviar\s*$/i)
      .parents().first()
      .find('input, textarea').first()
      .clear().type(cardTitle)
    cy.contains(/^\s*Enviar\s*$/i).click({ force: true })
    cy.contains(new RegExp(`^\\s*${cardTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i')).should('exist')
  })
})

Cypress.Commands.add('addTagToCard', (cardTitle, tagText = 'tag-1') => {
  cy.contains(new RegExp(`^\\s*${cardTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i'))
    .parents().first().within(() => {
      cy.contains(/adicionar nova tag/i).click({ force: true })
      cy.contains(/^\s*Enviar\s*$/i)
        .parents().first()
        .find('input, textarea').first()
        .clear().type(tagText)
      cy.contains(/^\s*Enviar\s*$/i).click({ force: true })
      cy.contains(new RegExp(`^\\s*${tagText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i')).should('exist')
    })
})
