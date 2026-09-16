Attribute VB_Name = "LeadsMarcaLab"
'==============================================================================
' LEADS MARCA LAB — Cadastro automático de cotações vindas do site
'------------------------------------------------------------------------------
' Como funciona:
'   1. Rode CriarEstrutura (uma única vez) para criar as abas "Colar_Aqui"
'      e "Leads".
'   2. Copie as mensagens que chegam no WhatsApp (do formulário do site ou do
'      popup) e cole na aba Colar_Aqui, uma embaixo da outra.
'   3. Rode ImportarLeads. Cada vira uma linha na aba Leads:
'      Data | Origem | Nome | WhatsApp | E-mail | Momento | Faturamento |
'      Produtos | Investimento | Página | Observações | Texto original
'   Duplicadas (mesmo Nome + WhatsApp + E-mail) são ignoradas.
'==============================================================================

Option Explicit

' ---------- Estrutura ----------

Public Sub CriarEstrutura()
    Dim wsColar As Worksheet, wsLeads As Worksheet

    Set wsColar = CriarAbaSeNaoExistir("Colar_Aqui")
    Set wsLeads = CriarAbaSeNaoExistir("Leads")

    ' Aba de colagem
    With wsColar
        .Cells.Clear
        .Range("A1").Value = "COLE AQUI AS MENSAGENS DO WHATSAPP (uma embaixo da outra) e rode a macro ImportarLeads"
        .Range("A1").Font.Bold = True
        .Range("A1").Font.Size = 12
        .Range("A1").Interior.Color = RGB(29, 78, 216)
        .Range("A1").Font.Color = vbWhite
        .Columns("A").ColumnWidth = 110
        .Rows(1).RowHeight = 22
    End With

    ' Aba de leads
    With wsLeads
        .Cells.Clear
        .Range("A1:L1").Value = Array( _
            "Data do cadastro", "Origem", "Nome", "WhatsApp", "E-mail", _
            "Momento", "Faturamento", "Produtos", "Investimento", _
            "Página", "Observações", "Texto original")
        With .Range("A1:L1")
            .Font.Bold = True
            .Interior.Color = RGB(7, 94, 84)   ' verde WhatsApp
            .Font.Color = vbWhite
            .Borders.LineStyle = xlContinuous
        End With
        .Columns("A:K").AutoFit
        .Columns("L").ColumnWidth = 60
        .Rows(1).AutoFilter
        .Activate
        .Range("A2").Select
    End With

    ActiveWindow.FreezePanes = False
    wsLeads.Activate
    ActiveWindow.SplitRow = 1
    ActiveWindow.FreezePanes = True

    MsgBox "Estrutura criada! Cole as mensagens na aba 'Colar_Aqui' e rode a macro 'ImportarLeads'.", _
           vbInformation, "Marca Lab — Leads"
End Sub

' ---------- Importação ----------

Public Sub ImportarLeads()
    Dim wsColar As Worksheet, wsLeads As Worksheet
    On Error Resume Next
    Set wsColar = ThisWorkbook.Worksheets("Colar_Aqui")
    Set wsLeads = ThisWorkbook.Worksheets("Leads")
    On Error GoTo 0

    If wsColar Is Nothing Or wsLeads Is Nothing Then
        MsgBox "Abas não encontradas. Rode a macro 'CriarEstrutura' primeiro.", vbExclamation
        Exit Sub
    End If

    Dim ultimaLinha As Long
    ultimaLinha = wsColar.Cells(wsColar.Rows.Count, "A").End(xlUp).Row
    If ultimaLinha <= 1 Then
        MsgBox "Não há mensagens coladas na aba 'Colar_Aqui' (colo a partir da linha 2, coluna A).", vbExclamation
        Exit Sub
    End If

    Application.ScreenUpdating = False

    ' Lê tudo da coluna A em blocos: um bloco começa quando aparece "Marca Lab"
    Dim linha As Long, blocos As Collection
    Set blocos = New Collection
    Dim blocoAtual As String, achouInicio As Boolean

    For linha = 2 To ultimaLinha
        Dim txt As String
        txt = CStr(wsColar.Cells(linha, "A").Value)
        If InStr(1, txt, "Marca Lab", vbTextCompare) > 0 And achouInicio Then
            blocos.Add blocoAtual
            blocoAtual = txt
        ElseIf InStr(1, txt, "Marca Lab", vbTextCompare) > 0 Then
            achouInicio = True
            blocoAtual = txt
        ElseIf achouInicio Then
            blocoAtual = blocoAtual & vbNewLine & txt
        End If
    Next linha
    If achouInicio Then blocos.Add blocoAtual

    Dim importadas As Long, duplicadas As Long
    Dim b As Variant

    For Each b In blocos
        Dim dados As Object
        Set dados = ParseMensagem(CStr(b))
        If Len(dados("Nome")) > 0 Then
            If LeadDuplicado(wsLeads, dados("Nome"), dados("WhatsApp"), dados("E-mail")) Then
                duplicadas = duplicadas + 1
            Else
                Dim prox As Long
                prox = wsLeads.Cells(wsLeads.Rows.Count, "A").End(xlUp).Row + 1
                wsLeads.Cells(prox, 1).Value = Now
                wsLeads.Cells(prox, 2).Value = dados("Origem")
                wsLeads.Cells(prox, 3).Value = dados("Nome")
                wsLeads.Cells(prox, 4).Value = dados("WhatsApp")
                wsLeads.Cells(prox, 5).Value = dados("E-mail")
                wsLeads.Cells(prox, 6).Value = dados("Momento")
                wsLeads.Cells(prox, 7).Value = dados("Faturamento")
                wsLeads.Cells(prox, 8).Value = dados("Produtos")
                wsLeads.Cells(prox, 9).Value = dados("Investimento")
                wsLeads.Cells(prox, 10).Value = dados("Página")
                wsLeads.Cells(prox, 11).Value = dados("Observações")
                wsLeads.Cells(prox, 12).Value = CStr(b)
                importadas = importadas + 1
            End If
        End If
    Next b

    wsLeads.Columns("A:K").AutoFit
    wsLeads.Activate

    Application.ScreenUpdating = True

    If importadas + duplicadas = 0 Then
        MsgBox "Nenhuma mensagem reconhecida. Confira se o texto contém a linha 'Marca Lab — Nova cotação'.", vbExclamation
    Else
        If MsgBox(importadas & " lead(s) importado(s), " & duplicadas & " duplicado(s) ignorado(s)." & _
                  vbNewLine & vbNewLine & "Limpar a aba Colar_Aqui agora?", vbQuestion + vbYesNo) = vbYes Then
            wsColar.Range("A2:A" & wsColar.Rows.Count).ClearContents
        End If
    End If
End Sub

' ---------- Parser ----------

Private Function ParseMensagem(ByVal texto As String) As Object
    Dim d As Object
    Set d = CreateObject("Scripting.Dictionary")
    d("Origem") = "": d("Nome") = "": d("WhatsApp") = "": d("E-mail") = ""
    d("Momento") = "": d("Faturamento") = "": d("Produtos") = ""
    d("Investimento") = "": d("Página") = "": d("Observações") = ""

    ' Popup do site gera "Origem: Popup do site"; formulário completo => padrão
    d("Origem") = "Formulário do site"

    Dim linhas As Variant, i As Long
    linhas = Split(texto, vbNewLine)

    For i = LBound(linhas) To UBound(linhas)
        Dim ln As String
        ln = Trim$(CStr(linhas(i)))
        If Len(ln) > 0 Then
            Dim rotulo As String, valor As String
            If ExtrairCampo(ln, rotulo, valor) Then
                Select Case rotulo
                    Case "origem":         d("Origem") = valor
                    Case "momento":        d("Momento") = valor
                    Case "faturamento atual", "faturamento": d("Faturamento") = valor
                    Case "produtos de interesse", "produtos": d("Produtos") = valor
                    Case "investimento previsto", "investimento": d("Investimento") = valor
                    Case "nome":           d("Nome") = valor
                    Case "whatsapp", "whats": d("WhatsApp") = valor
                    Case "e-mail", "email": d("E-mail") = valor
                    Case "observacoes":    d("Observações") = valor
                    Case "pagina":         d("Página") = valor
                End Select
            End If
        End If
    Next i

    Set ParseMensagem = d
End Function

' Reconhece linhas "*Rotulo:* valor" ou "Rotulo: valor" (com ou sem asteriscos)
Private Function ExtrairCampo(ByVal linha As String, ByRef rotulo As String, ByRef valor As String) As Boolean
    Dim limpa As String
    limpa = Replace(linha, "*", "")
    limpa = Replace(limpa, Chr(160), " ")          ' espaço não separável
    limpa = Trim$(limpa)

    Dim posDoisPontos As Long
    posDoisPontos = InStr(limpa, ":")
    If posDoisPontos < 2 Then Exit Function

    rotulo = SemAcentos(LCase$(Trim$(Left$(limpa, posDoisPontos - 1))))
    valor = Trim$(Mid$(limpa, posDoisPontos + 1))
    ExtrairCampo = (Len(valor) > 0)
End Function

Private Function SemAcentos(ByVal s As String) As String
    Dim comAcento As String, semAcento As String, i As Long
    comAcento = "áàâãäéèêëíìîïóòôõöúùûüçñÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ"
    semAcento = "aaaaaeeeeiiiiooooouuuucnAAAAAEEEEIIIIOOOOOUUUUCN"
    For i = 1 To Len(comAcento)
        s = Replace(s, Mid$(comAcento, i, 1), Mid$(semAcento, i, 1))
    Next i
    SemAcentos = s
End Function

Private Function LeadDuplicado(ws As Worksheet, ByVal nome As String, ByVal whats As String, ByVal email As String) As Boolean
    Dim ultima As Long, r As Long
    ultima = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    For r = 2 To ultima
        If StrComp(Trim$(CStr(ws.Cells(r, 3).Value)), nome, vbTextCompare) = 0 _
           And StrComp(Trim$(CStr(ws.Cells(r, 4).Value)), whats, vbTextCompare) = 0 _
           And StrComp(Trim$(CStr(ws.Cells(r, 5).Value)), email, vbTextCompare) = 0 Then
            LeadDuplicado = True
            Exit Function
        End If
    Next r
End Function

' ---------- Utilitários ----------

Private Function CriarAbaSeNaoExistir(ByVal nome As String) As Worksheet
    Dim ws As Worksheet
    On Error Resume Next
    Set ws = ThisWorkbook.Worksheets(nome)
    On Error GoTo 0
    If ws Is Nothing Then
        Set ws = ThisWorkbook.Worksheets.Add(After:=ThisWorkbook.Worksheets(ThisWorkbook.Worksheets.Count))
        ws.Name = nome
    End If
    Set CriarAbaSeNaoExistir = ws
End Function

Public Sub LimparColarAqui()
    Dim ws As Worksheet
    On Error Resume Next
    Set ws = ThisWorkbook.Worksheets("Colar_Aqui")
    On Error GoTo 0
    If ws Is Nothing Then Exit Sub
    ws.Range("A2:A" & ws.Rows.Count).ClearContents
    MsgBox "Aba Colar_Aqui limpa.", vbInformation
End Sub
