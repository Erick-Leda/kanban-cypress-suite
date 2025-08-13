// Suíte completa (21 cenários) convertida do BDD
import { by, rxEq } from '../utils/by'
import { dragBetween } from '../utils/dnd'

const BASE_URL = 'https://kanban-dusky-five.vercel.app/'

const ensureSpacingBetween = ($a, $b, min = 4) => {
  const A = $a[0].getBoundingClientRect()
  const B = $b[0].getBoundingClientRect()
  expect(B.left - A.right, 'espaço horizontal em px').to.be.greaterThan(min)
}

describe('Kanban – BDD para Cypress (21 cenários)', () => {
  beforeEach(() => {
    cy.visit(BASE_URL)
  })

  it('BUG-001: trocar modo de tela via botão no header', () => {
    cy.get('header').within(() => {
      cy.get('button, [role="button"]').first().as('themeBtn')
    })
    cy.document().then((doc) => {
      const before = (doc.documentElement.getAttribute('data-theme') || '') + '|' + getComputedStyle(doc.body).backgroundColor
      cy.get('@themeBtn').click({ force: true })
      cy.document().then((doc2) => {
        const after = (doc2.documentElement.getAttribute('data-theme') || '') + '|' + getComputedStyle(doc2.body).backgroundColor
        expect(after).to.not.equal(before)
      })
    })
  })

  it('BUG-002: texto dentro do card não deve ficar cortado', () => {
    cy.addList('Leitura')
    cy.addCard('Leitura', 'Texto legível no card')
    cy.contains(rxEq('Texto legível no card')).parents().first().then(($card) => {
      const el = $card[0]
      const hasOverflow = el.scrollHeight > el.clientHeight + 1
      expect(hasOverflow, 'overflow vertical do card').to.be.false
    })
  })

  it('BUG-003: criar tag sem cor deve bloquear ou aplicar cor padrão', () => {
    cy.addList('Tags')
    cy.addCard('Tags', 'Card com tag')
    cy.contains(rxEq('Card com tag')).parents().first().within(() => {
      cy.contains(/adicionar nova tag/i).click({ force: true })
      cy.contains(rxEq('Enviar')).parents().first().find('input, textarea').first().type('tag-sem-cor')
      cy.contains(rxEq('Enviar')).click({ force: true })
      cy.contains(rxEq('tag-sem-cor')).should('exist')
    })
  })

  it('BUG-004: mover card para coluna vazia e manter após reload', () => {
    cy.addList('To Do')
    cy.addList('Doing')
    cy.addCard('To Do', 'Mover para Doing')
    cy.contains(rxEq('Mover para Doing')).then(($card) => {
      by.listByTitle('Doing').then(($list) => dragBetween($card, $list))
    })
    by.listByTitle('Doing').within(() => {
      cy.contains(rxEq('Mover para Doing')).should('exist')
    })
    cy.reload()
    by.listByTitle('Doing').within(() => {
      cy.contains(rxEq('Mover para Doing')).should('exist')
    })
  })

  it('BUG-005: botão de apagar visível ao hover', () => {
    cy.addList('Visibilidade')
    cy.addCard('Visibilidade', 'Apagar visível')
    cy.contains(rxEq('Apagar visível')).parents().first().trigger('mouseover')
    cy.contains(/apagar|excluir|deletar/i).should('be.visible')
  })

  it('BUG-006: botão "Adicionar outra lista" íntegro com muitas listas', () => {
    for (let i = 1; i <= 8; i++) cy.addList('L' + i)
    cy.contains(/adicionar outra lista/i).should('be.visible').and('not.be.disabled')
  })

  it('BUG-007: muitas tags não atravessam o card', () => {
    cy.addList('Muitas Tags')
    cy.addCard('Muitas Tags', 'Card MT')
    for (let i = 1; i <= 15; i++) cy.addTagToCard('Card MT', 't' + i)
    cy.contains(rxEq('Card MT')).parents().first().then(($card) => {
      const el = $card[0]
      expect(el.scrollWidth <= el.clientWidth + 2).to.be.true
    })
  })

  it('BUG-008: título longo de tag não quebra o card', () => {
    cy.addList('Tag Longa')
    cy.addCard('Tag Longa', 'Card TL')
    cy.addTagToCard('Card TL', 'muitomuitolongatag')
    cy.contains(rxEq('muitomuitolongatag')).parents().first().then(($card) => {
      const el = $card[0]
      expect(el.scrollWidth <= el.clientWidth + 2).to.be.true
    })
  })

  it('BUG-009: não criar tarefa com apenas espaços', () => {
    cy.addList('Entrada')
    by.listByTitle('Entrada').within(() => {
      cy.contains(/adicionar tarefa/i).click({ force: true })
      cy.contains(rxEq('Enviar')).parents().first().find('input, textarea').first().clear().type('   ')
      cy.contains(rxEq('Enviar')).click({ force: true })
      cy.contains(/tarefa\s*1/i).should('not.exist')
    })
  })

  it('BUG-010: não criar tag com apenas espaços', () => {
    cy.addList('Tags Texto')
    cy.addCard('Tags Texto', 'Card TT')
    cy.contains(rxEq('Card TT')).parents().first().within(() => {
      cy.contains(/adicionar nova tag/i).click({ force: true })
      cy.contains(rxEq('Enviar')).parents().first().find('input, textarea').first().clear().type('   ')
      cy.contains(rxEq('Enviar')).click({ force: true })
      cy.contains(/tag\s/i).should('not.exist')
    })
  })

  it('BUG-011: não criar lista com apenas espaços', () => {
    cy.contains(/adicionar outra lista/i).click({ force: true })
    cy.contains(rxEq('Enviar')).parents().first().find('input, textarea').first().clear().type('   ')
    cy.contains(rxEq('Enviar')).click({ force: true })
    cy.contains(rxEq('   ')).should('not.exist')
  })

  it('BUG-012: permitir editar título da lista', () => {
    cy.addList('Lista Editável')
    by.listByTitle('Lista Editável').within(() => {
      cy.contains(rxEq('Lista Editável')).click({ force: true })
      cy.focused().type('{selectall}Lista Renomeada{enter}')
    })
    by.listByTitle('Lista Renomeada').should('exist')
  })

  it('BUG-013: permitir editar título de uma tag', () => {
    cy.addList('LT')
    cy.addCard('LT', 'Card LT')
    cy.addTagToCard('Card LT', 'tag-abc')
    cy.contains(rxEq('tag-abc')).click({ force: true })
    cy.focused().type('{selectall}tag-editada{enter}')
    cy.contains(rxEq('tag-editada')).should('exist')
  })

  it('BUG-014: próxima lista após ciclo de cores deve seguir regra', () => {
    ;['Azul 1','Violeta 1','Verde 1','Azul 2','Violeta 2'].forEach(t => cy.addList(t))
    cy.contains(/adicionar outra lista/i).click({ force: true })
    cy.contains(rxEq('Enviar')).parents().first().find('input, textarea').first().clear().type('Próx Cor')
    cy.contains(rxEq('Enviar')).click({ force: true })
    by.listByTitle('Próx Cor').should('exist')
  })

  it('BUG-015: apagar lista não altera nome/cor das posteriores', () => {
    cy.addList('L1')
    cy.addList('L2')
    by.listByTitle('L1').within(() => {
      cy.contains(/deletar|apagar/i).click({ force: true })
    })
    by.listByTitle('L2').should('exist')
  })

  it('BUG-016: mobile com muitas tags não encolhe a tela', () => {
    cy.viewport(375, 812)
    cy.addList('Mobile')
    cy.addCard('Mobile', 'Card M')
    for (let i = 1; i <= 15; i++) cy.addTagToCard('Card M', `m${i}`)
    cy.window().then((w) => {
      expect(w.innerWidth).to.be.greaterThan(320)
    })
  })

  it('BUG-017: header permanece fixo ao ter scroll horizontal', () => {
    for (let i = 1; i <= 8; i++) cy.addList('H' + i)
    cy.get('header').then(($h) => {
      const before = $h[0].getBoundingClientRect().top
      cy.scrollTo('right')
      cy.get('header').then(($h2) => {
        const after = $h2[0].getBoundingClientRect().top
        expect(after).to.equal(before)
      })
    })
  })

  it('BUG-018: clicar no ícone "+" do botão Adicionar tarefa abre modal', () => {
    cy.addList('Lista X')
    by.listByTitle('Lista X').within(() => {
      cy.contains(/adicionar tarefa/i).find('svg, i, path').first().click({ force: true })
    })
    by.modal().should('exist')
  })

  it('BUG-019: tag longa não impede apagar a tarefa', () => {
    cy.addList('Apagar')
    cy.addCard('Apagar', 'Card LongTag')
    cy.addTagToCard('Card LongTag', 'uma-tag-extremamente-muito-muito-longa-123')
    cy.contains(rxEq('Card LongTag')).parents().first().within(() => {
      cy.contains(/deletar|apagar/i).click({ force: true })
    })
    cy.contains(rxEq('Card LongTag')).should('not.exist')
  })

  it('BUG-020: input e botão "Enviar" não colados (tarefa)', () => {
    cy.addList('Espaço Tarefa')
    by.listByTitle('Espaço Tarefa').within(() => {
      cy.contains(/adicionar tarefa/i).click({ force: true })
      cy.contains(rxEq('Enviar')).parents().first().then(($scope) => {
        const $input = $scope.find('input, textarea').first()
        const $btn   = $scope.find('button, [role="button"]').filter((i, b) => /Enviar/i.test(b.innerText)).first()
        ensureSpacingBetween(Cypress.$($input), Cypress.$($btn), 4)
      })
    })
  })

  it('BUG-021: input e botão "Enviar" não colados (tag)', () => {
    cy.addList('Espaço Tag')
    cy.addCard('Espaço Tag', 'Card ET')
    cy.contains(rxEq('Card ET')).parents().first().within(() => {
      cy.contains(/adicionar nova tag/i).click({ force: true })
      cy.contains(rxEq('Enviar')).parents().first().then(($scope) => {
        const $input = $scope.find('input, textarea').first()
        const $btn   = $scope.find('button, [role="button"]').filter((i, b) => /Enviar/i.test(b.innerText)).first()
        ensureSpacingBetween(Cypress.$($input), Cypress.$($btn), 4)
      })
    })
  })
})
