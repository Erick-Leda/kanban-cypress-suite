// Drag & Drop por coordenadas (independente de libs de DnD)
export function dragBetween($source, $target) {
  const s = $source[0].getBoundingClientRect()
  const t = $target[0].getBoundingClientRect()
  const start = { x: s.x + s.width / 2, y: s.y + s.height / 2 }
  const end   = { x: t.x + t.width / 2, y: t.y + 30 }

  cy.wrap($source)
    .trigger('pointerdown', { button: 0, clientX: start.x, clientY: start.y, force: true })
    .trigger('pointermove',  { clientX: start.x + 3, clientY: start.y + 3, force: true })

  cy.get('body')
    .trigger('pointermove', { clientX: end.x, clientY: end.y, force: true })
    .trigger('pointerup',   { force: true })
}
