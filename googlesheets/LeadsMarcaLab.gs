/**
 * ============================================================================
 * LEADS MARCA LAB — Google Sheets (Google Apps Script)
 * ----------------------------------------------------------------------------
 * Cadastro automático das cotações que chegam no WhatsApp (popup do site ou
 * formulário de cotação).
 *
 * COMO INSTALAR (2 minutos):
 *   1. Abra sua planilha no Google Sheets (sheets.new).
 *   2. Menu Extensões → Apps Script.
 *   3. Apague o código de exemplo, cole ESTE arquivo inteiro e salve (💾).
 *   4. Volte para a planilha e recarregue a página (F5).
 *      O menu "📥 Leads Marca Lab" aparece no topo.
 *   5. Clique no menu → "Criar estrutura (1ª vez)" — na primeira execução o
 *      Google pede autorização: Revise permissões → sua conta →
 *      Avançado → "Acessar (não seguro)" → Permitir. (Normal para script
 *      pessoal; ele só acessa ESTA planilha.)
 *
 * COMO USAR NO DIA A DIA:
 *   1. Copie as mensagens do WhatsApp e cole na aba "Colar_Aqui"
 *      (uma embaixo da outra — a partir da linha 2).
 *   2. Menu 📥 Leads Marca Lab → "Importar mensagens coladas".
 *   3. Cada mensagem vira uma linha na aba "Leads". Duplicadas são ignoradas.
 * ============================================================================
 */

const CFG = {
  abaCola: 'Colar_Aqui',
  abaLeads: 'Leads',
  cabecalhos: [
    'Data do cadastro', 'Origem', 'Nome', 'WhatsApp', 'E-mail',
    'Momento', 'Faturamento', 'Produtos', 'Investimento', 'Página',
    'Observações', 'Status', 'Texto original',
  ],
  statusIniciais: ['Novo', 'Em contato', 'Orçamento enviado', 'Fechado', 'Perdido'],
};

/* ------------------------------ MENU ------------------------------ */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📥 Leads Marca Lab')
    .addItem('Criar estrutura (1ª vez)', 'criarEstrutura')
    .addSeparator()
    .addItem('Importar mensagens coladas', 'importarLeads')
    .addItem('Limpar aba de cola', 'limparColarAqui')
    .addToUi();
}

/* --------------------------- ESTRUTURA ---------------------------- */

function criarEstrutura() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Aba de colagem
  let cola = ss.getSheetByName(CFG.abaCola);
  if (!cola) cola = ss.insertSheet(CFG.abaCola);
  cola.clear();
  cola.getRange('A1').setValue(
    'COLE AQUI AS MENSAGENS DO WHATSAPP (uma embaixo da outra) e use o menu 📥 Leads Marca Lab → Importar mensagens coladas'
  );
  cola.getRange('A1').setFontWeight('bold').setFontSize(11)
      .setBackground('#1d4ed8').setFontColor('#ffffff');
  cola.setColumnWidth(1, 900);
  cola.setRowHeight(1, 30);

  // Aba de leads
  let leads = ss.getSheetByName(CFG.abaLeads);
  if (!leads) leads = ss.insertSheet(CFG.abaLeads, 0);
  leads.clear();

  leads.getRange(1, 1, 1, CFG.cabecalhos.length).setValues([CFG.cabecalhos]);
  leads.getRange(1, 1, 1, CFG.cabecalhos.length)
    .setFontWeight('bold')
    .setBackground('#075e54')
    .setFontColor('#ffffff')
    .setVerticalAlignment('middle');
  leads.setRowHeight(1, 26);
  leads.setFrozenRows(1);

  // Larguras amigáveis
  const larguras = [110, 130, 160, 130, 180, 180, 140, 190, 140, 180, 220, 120, 320];
  larguras.forEach((w, i) => leads.setColumnWidth(i + 1, w));

  // Status com lista suspensa (mini-CR)
  const regras = SpreadsheetApp.newDataValidation()
    .requireValueInList(CFG.statusIniciais, true)
    .setAllowInvalid(true)
    .setHelpText('Novo · Em contato · Orçamento enviado · Fechado · Perdido')
    .build();
  leads.getRange(2, 12, 999, 1).setDataValidation(regras);

  // Condicional: Fechado = verde, Perdido = vermelho
  const regraStatus = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Fechado')
    .setBackground('#d9f7e3')
    .setRanges([leads.getRange(2, 12, 999, 1)])
    .build();
  const regraPerdido = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Perdido')
    .setBackground('#fde2e1')
    .setRanges([leads.getRange(2, 12, 999, 1)])
    .build();
  leads.setConditionalFormatRules([regraStatus, regraPerdido]);

  leads.activate();
 SpreadsheetApp.getUi().alert(
    '✅ Estrutura criada!\n\nCole as mensagens na aba "' + CFG.abaCola + '" e use o menu 📥 Leads Marca Lab → Importar mensagens coladas.'
  );
}

/* --------------------------- IMPORTAÇÃO --------------------------- */

function importarLeads() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const cola = ss.getSheetByName(CFG.abaCola);
  const leads = ss.getSheetByName(CFG.abaLeads);
  if (!cola || !leads) {
    ui.alert('⚠️ Abas não encontradas. Rode "Criar estrutura (1ª vez)" no menu.');
    return;
  }

  const ultima = cola.getLastRow();
  if (ultima < 2) {
    ui.alert('⚠️ Não há mensagens coladas na aba ' + CFG.abaCola + ' (cole a partir da linha 2).');
    return;
  }

  const linhas = cola.getRange(2, 1, ultima - 1, 1).getValues();

  // Quebra em blocos: cada bloco começa na linha com "Marca Lab"
  const blocos = [];
  let atual = null;
  linhas.forEach(([txt]) => {
    const t = String(txt || '').trim();
    if (!t) return;
    if (/marca\s*lab/i.test(t)) {
      if (atual) blocos.push(atual);
      atual = t;
    } else if (atual !== null) {
      atual += '\n' + t;
    }
  });
  if (atual) blocos.push(atual);

  let importadas = 0;
  let duplicadas = 0;

  blocos.forEach((bloco) => {
    const d = parseMensagem_(bloco);
    if (!d.Nome) return;
    if (leadDuplicado_(leads, d.Nome, d.WhatsApp, d['E-mail'])) {
      duplicadas++;
      return;
    }
    const linha = [
      new Date(), d.Origem, d.Nome, d.WhatsApp, d['E-mail'],
      d.Momento, d.Faturamento, d.Produtos, d.Investimento, d.Página,
      d['Observações'], 'Novo', bloco,
    ];
    leads.appendRow(linha);
    importadas++;
  });

  if (importadas + duplicadas === 0) {
    ui.alert('⚠️ Nenhuma mensagem reconhecida. Confira se o texto contém a linha "Marca Lab — Nova cotação".');
    return;
  }

  const resp = ui.alert(
    '✅ Resultado',
    importadas + ' lead(s) importado(s), ' + duplicadas + ' duplicado(s) ignorado(s).\n\nLimpar a aba ' + CFG.abaCola + ' agora?',
    ui.ButtonSet.YES_NO
  );
  if (resp === ui.Button.YES) limparColarAqui_(cola);
}

/* ----------------------------- PARSER ----------------------------- */

/** Extrai os campos conhecidos de uma mensagem colada do WhatsApp. */
function parseMensagem_(texto) {
  const d = {
    'Origem': 'Formulário do site', 'Nome': '', 'WhatsApp': '', 'E-mail': '',
    'Momento': '', 'Faturamento': '', 'Produtos': '', 'Investimento': '',
    'Página': '', 'Observações': '',
  };

  String(texto).split(/\r?\n/).forEach((linhaRaw) => {
    const r = extrairCampo_(linhaRaw);
    if (!r) return;
    switch (r.rotulo) {
      case 'origem': d['Origem'] = r.valor; break;
      case 'momento': d['Momento'] = r.valor; break;
      case 'faturamento atual': case 'faturamento': d['Faturamento'] = r.valor; break;
      case 'produtos de interesse': case 'produtos': d['Produtos'] = r.valor; break;
      case 'investimento previsto': case 'investimento': d['Investimento'] = r.valor; break;
      case 'nome': d['Nome'] = r.valor; break;
      case 'whatsapp': case 'whats': d['WhatsApp'] = r.valor; break;
      case 'e-mail': case 'email': d['E-mail'] = r.valor; break;
      case 'observacoes': d['Observações'] = r.valor; break;
      case 'pagina': d['Página'] = r.valor; break;
    }
  });

  return d;
}

/** Reconhece linhas "*Rotulo:* valor" ou "Rotulo: valor" (com/sem asteriscos). */
function extrairCampo_(linha) {
  const limpa = String(linha).replace(/\*/g, '').replace(/\u00a0/g, ' ').trim();
  const i = limpa.indexOf(':');
  if (i < 1) return null;
  const rotulo = semAcentos_(limpa.slice(0, i).trim().toLowerCase());
  const valor = limpa.slice(i + 1).trim();
  if (!valor) return null;
  return { rotulo, valor };
}

function semAcentos_(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function leadDuplicado_(leads, nome, whats, email) {
  const ultima = leads.getLastRow();
  if (ultima < 2) return false;
  const vals = leads.getRange(2, 3, ultima - 1, 3).getValues(); // C, D, E
  return vals.some(
    ([n, w, e]) =>
      String(n).trim().toLowerCase() === String(nome).trim().toLowerCase() &&
      String(w).trim().toLowerCase() === String(whats).trim().toLowerCase() &&
      String(e).trim().toLowerCase() === String(email).trim().toLowerCase()
  );
}

/* --------------------------- UTILITÁRIOS -------------------------- */

function limparColarAqui() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const cola = ss.getSheetByName(CFG.abaCola);
  if (!cola) return;
  limparColarAqui_(cola);
  SpreadsheetApp.getUi().alert('🧹 Aba ' + CFG.abaCola + ' limpa.');
}

function limparColarAqui_(cola) {
  const ultima = cola.getLastRow();
  if (ultima >= 2) cola.getRange(2, 1, ultima - 1, 1).clearContent();
}

/* --------------------- WEBHOOK DO SITE (Web App) ------------------- */
// Implante como "Aplicativo da Web" (ver README) e cole a URL /exec em
// src/data/site.ts → LEADS.webAppUrl. A partir daí, cada cotação enviada
// no site (formulário ou popup) cai DIRETO na aba Leads desta planilha.

var WEBHOOK_TOKEN = 'marcalab-2026'; // pode trocar — atualize também no site.ts

function doGet() {
  return json_({ ok: true, servico: 'Leads Marca Lab — webhook ativo' });
}

function doPost(e) {
  try {
    if (!e.parameter.token || e.parameter.token !== WEBHOOK_TOKEN) {
      return json_({ ok: false, erro: 'token invalido' });
    }
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const nome = String(d.nome || '').trim();
    if (!nome) return json_({ ok: false, erro: 'campo nome ausente' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let leads = ss.getSheetByName(CFG.abaLeads);
    if (!leads) {
      leads = ss.insertSheet(CFG.abaLeads, 0);
      leads.getRange(1, 1, 1, CFG.cabecalhos.length).setValues([CFG.cabecalhos])
        .setFontWeight('bold').setBackground('#075e54').setFontColor('#ffffff');
      leads.setFrozenRows(1);
    }

    const whats = String(d.whatsapp || '');
    const email = String(d.email || '');
    if (!leadDuplicado_(leads, nome, whats, email)) {
      leads.appendRow([
        new Date(), d.origem || 'Site', nome, whats, email,
        d.momento || '', d.faturamento || '', d.produtos || '',
        d.investimento || '', d.pagina || '', d.observacoes || '',
        'Novo', d.texto || JSON.stringify(d),
      ]);
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, erro: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
