# Planilha de Leads — Marca Lab (VBA)

Transforma as mensagens de cotação que chegam no seu WhatsApp (tanto do
formulário do site quanto do popup flutuante) em linhas organizadas numa
planilha do Excel.

## Configuração (uma única vez, ~2 minutos)

1. **Crie a planilha**
   - Abra o Excel → arquivo novo → salve como **`Leads Marca Lab.xlsm`**
     (tipo: *Pasta de trabalho habilitada para macro do Excel*).

2. **Importe o módulo VBA**
   - Aperte `Alt + F11` para abrir o editor do VBA.
   - Menu **Arquivo → Importar Arquivo…** e selecione `LeadsMarcaLab.bas`
     (desta pasta).
   - Se aparecer aviso de macros ao salvar, escolha **Sim** (habilitar).

3. **Crie a estrutura**
   - Ainda no Excel, aperte `Alt + F8`, escolha **`CriarEstrutura`** e clique
     em *Executar*.
   - Isso cria as abas **Colar_Aqui** e **Leads** (com cabeçalho verde).

4. *(Opcional) Botão de importar com 1 clique*
   - Aba `Leads` → guia **Desenvolvedor → Inserir → Botão (controle de
     formulário)** → desenhe o botão → associe à macro **`ImportarLeads`**.
   - Se a guia Desenvolvedor não aparecer: Arquivo → Opções → Personalizar
     Faixa de Opções → marque *Desenvolvedor*.

## Uso no dia a dia

1. Quando chegar uma cotação no WhatsApp **(11) 97573-6730**, copie a
   mensagem inteira (selecione no WhatsApp Web/Desktop → Copiar).
2. Cole na aba **Colar_Aqui**, uma mensagem embaixo da outra.
3. Rode **`ImportarLeads`** (`Alt + F8` ou no botão).
4. Pronto: cada mensagem vira uma linha na aba **Leads**:

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
| Texto original | a mensagem inteira, para conferência |

- Mensagens repetidas (mesmo Nome + WhatsApp + E-mail) são **ignoradas** —
  pode colar duas vezes sem medo.
- No fim da importação ele pergunta se quer limpar a aba Colar_Aqui.
- Deu texto estranho no meio? Sem problema: só as linhas com
  `Campo: valor` conhecidos são lidas, o resto é ignorado.

## Mensagens reconhecidas

Qualquer mensagem gerada pelo site no formato:

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

(com ou sem os asteriscos `*` do negrito do WhatsApp — os dois funcionam)
