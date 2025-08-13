# language: pt
@Tags
Funcionalidade: Criação, visualização e edição de tags
  Como usuário
  Quero criar, visualizar e editar tags corretamente
  Para organizar o quadro kanban

  @TTK-003 @Funcional @Minor @P1
  Cenário: Impossível criar tag sem cor (bloqueio ou cor padrão)
    Dado que estou no modal de criação de tags de um card
    Quando eu tentar criar uma tag sem escolher cor
    Então devo ser bloqueado com mensagem de erro ou aplicada uma cor padrão

  @TTK-007 @UI @Minor @P3
  Cenário: Muitas tags não atravessam a borda direita do card
    Dado que estou no modal de criação de tags
    Quando eu criar ao menos 15 tags curtas
    Então as tags devem permanecer dentro do card sem atravessar a borda

  @TTK-008 @UI @Minor @P3
  Cenário: Título extenso de tag não quebra a borda esquerda
    Dado que estou no modal de criação de tags
    Quando eu criar uma tag com mais de 13 caracteres
    Então a tag deve permanecer dentro do card sem quebrar a borda

  @TTK-010 @UX @Minor @P2
  Cenário: Impossível criar tag com apenas espaços
    Dado que estou na tela principal com ao menos uma lista e um card
    Quando eu clicar em "adicionar nova tag" no card
    E tentar salvar com apenas espaços
    Então devo ser impedido com uma validação de texto obrigatório

  @TTK-013 @UX @Minor @P2
  Cenário: Editar título de uma tag
    Dado que existe uma lista, um card e uma tag
    Quando eu clicar na tag
    Então devo conseguir editar o nome da tag

  @TTK-019 @UX @Minor @P2
  Cenário: Tag muito longa não impede apagar a tarefa
    Dado que existe uma lista, um card e uma tag com texto muito longo
    Quando eu clicar no botão de "deletar tarefa"
    Então devo conseguir apagar a tarefa mesmo com a tag longa
