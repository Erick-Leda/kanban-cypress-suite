# language: pt
@Listas @Cards @DnD
Funcionalidade: Criação, edição e movimentação de listas e cards
  Como usuário
  Quero criar/editar listas e cards e mover cards entre listas
  Para manter meu fluxo de trabalho organizado

  @TTK-004 @Funcional @Major @P1
  Cenário: Mover card para coluna vazia e manter após recarregar
    Dado que existem as listas "To Do" e "Doing"
    E existe um card "Mover para Doing" em "To Do"
    Quando eu arrastar o card "Mover para Doing" para a lista "Doing"
    Então devo ver o card "Mover para Doing" dentro da lista "Doing"
    E após recarregar a página o card permanece na lista "Doing"

  @TTK-009 @UX @Minor @P2
  Cenário: Impossível criar card com apenas espaços
    Dado que estou na tela principal e existe uma lista
    Quando eu clicar no botão "adicionar tarefa" e tentar salvar com apenas espaços
    Então devo ser impedido com validação de texto obrigatório

  @TTK-011 @UX @Minor @P2
  Cenário: Impossível criar lista com apenas espaços
    Dado que estou na tela principal
    Quando eu clicar em "adicionar outra lista" e tentar salvar com apenas espaços
    Então devo ser impedido com validação de texto obrigatório

  @TTK-012 @UX @Minor @P2
  Cenário: Editar o título de uma lista
    Dado que existe uma lista criada
    Quando eu clicar no nome da lista
    Então devo conseguir editar o título da lista

  @TTK-014 @Funcional @Major @P1
  Cenário: Próxima lista segue regra de cor após ciclos
    Dado que já completei ao menos um ciclo de cores (azul, violeta e verde)
    E estou no violeta do segundo ciclo
    Quando eu clicar em "adicionar outra lista"
    Então a próxima lista deve ser da cor verde

  @TTK-015 @Funcional @Major @P1
  Cenário: Apagar uma lista não altera nome/cor das posteriores
    Dado que existem múltiplas listas criadas
    Quando eu apagar uma lista que está à esquerda
    Então as listas posteriores mantêm nome e cor, apenas suas posições são ajustadas
