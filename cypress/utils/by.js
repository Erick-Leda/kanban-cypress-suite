// Helpers semânticos (sem depender de classes/ids)
export const rxEq = (s) => new RegExp(`^\\s*${String(s).replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\s*$`, 'i')

export const by = {
  // Encontra uma coluna/lista pelo título visível
  listByTitle(title) {
    return cy.contains('h1, h2, h3, h4, h5, h6', rxEq(title))
      .parents()
      .filter((i, el) => el.querySelector('button, [role="button"]'))
      .first()
  },

  // Botão por texto visível (útil se quiser expandir comandos)
  button(label) {
    return cy.contains('button, [role="button"]', rxEq(label))
  },

  // Modal genérico (qualquer diálogo visível)
  modal() {
    return cy.get('[role="dialog"], .modal').filter(':visible').first()
  },
}
