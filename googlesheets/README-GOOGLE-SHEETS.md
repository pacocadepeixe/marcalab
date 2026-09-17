# Planilha de Leads — Marca Lab (Google Sheets)

Transforma as mensagens de cotação que chegam no seu WhatsApp (do popup do
site ou do formulário) em linhas organizadas no Google Sheets — com coluna
**Status** (lista suspensa) pra usar como mini-CR.

## Instalação (uma única vez, ~2 minutos)

1. Abra [sheets.new](https://sheets.new) com sua conta Google e dê um nome
   (ex.: **Leads Marca Lab**).
2. Menu **Extensões → Apps Script**.
3. Apague o código de exemplo (`function myFunction() {}`), **cole o conteúdo
   de `LeadsMarcaLab.gs`** e salve (ícone 💾).
4. Volte para a planilha e **recarregue a página (F5)**.
   → O menu **📥 Leads Marca Lab** aparece na barra de menus.
5. Menu **📥 Leads Marca Lab → Criar estrutura (1ª vez)**.
   - Na primeira execução o Google pede autorização (normal para scripts
     pessoais): *Revise permissões* → escolha sua conta → **Avançado →
     Acessar Marca Lab (não seguro)** → **Permitir**. O script só acessa
     esta planilha.

Isso cria as abas **Colar_Aqui** e **Leads** (cabeçalho verde, linha fixa,
Status com lista suspensa e cores para Fechado/Perdido).

## Uso no dia a dia

1. Chegou cotação no WhatsApp **(11) 97573-6730**? Copie a mensagem inteira
   (WhatsApp Web ou Desktop → selecionar → Copiar).
2. Cole na aba **Colar_Aqui** (a partir da linha 2; várias mensagens, uma
   embaixo da outra).
3. Menu **📥 Leads Marca Lab → Importar mensagens coladas**.
4. Cada mensagem vira uma linha na aba **Leads**:

| Coluna | Conteúdo |
| --- | --- |
| Data do cadastro | quando você importou |
| Origem | Popup do site / Formulário do site |
| Nome, WhatsApp, E-mail | contatos do lead |
| Momento | criar do zero / já tem marca / trocar fornecedor |
| Faturamento | faixa informada |
| Produtos | itens de interesse |
| Investimento | faixa do primeiro lote |
| Página | URL de onde o lead veio (só popup) |
| Observações | texto livre (só formulário completo) |
| **Status** | Novo · Em contato · Orçamento enviado · Fechado · Perdido |
| Texto original | a mensagem inteira, para conferência |

- Mensagens repetidas (mesmo Nome + WhatsApp + E-mail) são **ignoradas** —
  pode colar duas vezes sem medo.
- No fim, ele pergunta se quer limpar a aba Colar_Aqui.
- Linhas com sujeira no meio não têm problema: só os campos conhecidos
  (`Campo: valor`) são lidos.

## Mensagens reconhecidas

Qualquer mensagem gerada pelo site, com ou sem os asteriscos `*` do negrito:

```
Marca Lab — Nova cotação

Momento: Quero criar uma marca nova
Faturamento atual: Ainda não faturamos
Produtos de interesse: Creatina, Whey Protein
Investimento previsto: Até R$ 5 mil

Nome: Maria Silva
WhatsApp: (11) 90000-0000
E-mail: maria@exemplo.com
```

## Dica: instalar em celulares

Depois de instalado no desktop, abra o mesmo arquivo no app **Planilhas
Google** do celular — o menu aparece nos ⋮ (três pontinhos). Cole a mensagem
direto do WhatsApp (Compartilhar → Copiar) e importe na hora.
