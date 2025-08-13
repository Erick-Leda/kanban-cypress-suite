# language: pt
@Layout @Header
Funcionalidade: Layout geral e header fixo
  Como usuário
  Quero que os elementos de layout e navegação funcionem e permaneçam visíveis
  Para garantir usabilidade e previsibilidade da interface

  @TTK-001 @UX @Trivial @P2
  Cenário: Botão de modo de tela acessível e alternando a visualização
    Dado que estou na página principal
    Quando eu clicar no botão de modo de tela
    Então a visualização de tela deve alternar entre claro e escuro
    E o botão deve permanecer acessível no header

  @TTK-002 @UI @Trivial @P3
  Cenário: Texto dos cards não fica cortado
    Dado que estou em um card que possui título
    Quando eu ler os textos dentro do card
    Então o texto não deve ficar cortado pelo fundo

  @TTK-005 @UI @Minor @P3
  Cenário: Botão de apagar tarefa visível ao passar o mouse
    Dado que estou visualizando uma tarefa
    Quando eu passar o mouse sobre a tarefa
    Então devo ver o botão de apagar com contraste suficiente

  @TTK-006 @UI @Trivial @P3
  Cenário: Botão "Adicionar outra lista" permanece íntegro com muitas listas
    Dado que estou na tela principal com muitas listas no quadro
    Quando eu visualizar o botão "adicionar outra lista"
    Então o botão deve estar inteiro e responsivo

  @TTK-016 @UI @Minor @P3
  Cenário: Muitas tags no mobile não encolhem a tela
    Dado que estou na versão mobile
    Quando eu criar ao menos 15 tags curtas em um card
    Então a tela não deve encolher indefinidamente

  @TTK-017 @UI @Trivial @P3
  Cenário: Header permanece fixo com scroll horizontal
    Dado que estou na tela principal com várias listas
    Quando houver rolagem horizontal suficiente para sair da tela
    Então o título do site e o botão de modo de tela permanecem fixos no header

  @TTK-018 @UX @Minor @P2
  Cenário: Ícone “+” do botão "Adicionar tarefa" é clicável
    Dado que existe uma lista criada
    Quando eu clicar no “+” dentro do botão "adicionar tarefa"
    Então deve abrir o modal de criação de tarefa

  @TTK-020 @UI @Trivial @P3
  Cenário: Espaçamento entre input e botão "Enviar" ao adicionar tarefa
    Dado que estou na tela principal e existe uma lista
    Quando eu clicar no botão "adicionar tarefa"
    Então a caixa de texto e o botão "Enviar" devem ter espaçamento visível (≥ 4px)

  @TTK-021 @UI @Trivial @P3
  Cenário: Espaçamento entre input e botão "Enviar" ao adicionar tag
    Dado que existe uma lista e um card aberto no modal de tags
    Quando eu clicar no botão "adicionar nova tag"
    Então a caixa de texto e o botão "Enviar" devem ter espaçamento visível (≥ 4px)
