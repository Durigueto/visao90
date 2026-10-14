const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const logoPath = path.resolve(__dirname, 'tcc-frontend', 'public', 'visao90-header.png');
let logoBase64 = '';
if (fs.existsSync(logoPath)) {
  logoBase64 = 'data:image/png;base64,' + fs.readFileSync(logoPath).toString('base64');
}

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Visão 90 - Documentação de Métricas e Indicadores</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;600&display=swap');

    @page {
      size: A4;
      margin: 14mm 14mm 16mm 14mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1A202C;
      background: #FFFFFF;
      font-size: 9pt;
      line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* CABEÇALHO PRINCIPAL DO DOCUMENTO */
    .header-cover {
      background: linear-gradient(135deg, #101820 0%, #1B2530 65%, #0E151D 100%);
      color: #E8E6DF;
      padding: 20px 24px;
      border-radius: 10px;
      margin-bottom: 16px;
      border-left: 5px solid #2E6B66;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      break-inside: avoid;
    }

    .header-logo-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      border-bottom: 1px solid rgba(232, 230, 223, 0.15);
      padding-bottom: 10px;
    }

    .header-logo-img {
      height: 36px;
      width: auto;
    }

    .header-badge {
      background: rgba(46, 107, 102, 0.3);
      border: 1px solid #2E6B66;
      color: #E8E6DF;
      font-size: 7.5pt;
      font-weight: 700;
      padding: 2px 9px;
      border-radius: 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .header-title {
      font-family: 'Outfit', sans-serif;
      font-size: 18pt;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.4px;
      line-height: 1.2;
      margin-bottom: 3px;
    }

    .header-subtitle {
      font-size: 10pt;
      color: #B38C40;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .header-meta {
      font-size: 8pt;
      color: #CBD5E0;
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    /* SEÇÕES E TIPOGRAFIA */
    h2 {
      font-family: 'Outfit', sans-serif;
      font-size: 11.5pt;
      font-weight: 700;
      color: #101820;
      border-bottom: 2px solid #2E6B66;
      padding-bottom: 3px;
      margin-top: 14px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
      break-after: avoid;
    }

    h2 .sec-num {
      background: #2E6B66;
      color: #FFFFFF;
      font-size: 8pt;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
    }

    h3 {
      font-family: 'Outfit', sans-serif;
      font-size: 9.5pt;
      font-weight: 700;
      color: #2E6B66;
      margin-top: 8px;
      margin-bottom: 4px;
      break-after: avoid;
    }

    p {
      margin-bottom: 6px;
      text-align: justify;
    }

    /* TABELAS */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0 12px 0;
      font-size: 8pt;
      break-inside: avoid;
    }

    th {
      background: #1B2530;
      color: #E8E6DF;
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 7pt;
      letter-spacing: 0.5px;
      padding: 6px 8px;
      text-align: left;
      border: 1px solid #1B2530;
    }

    td {
      padding: 5px 8px;
      border-bottom: 1px solid #E2E8F0;
      border-left: 1px solid #EDF2F7;
      border-right: 1px solid #EDF2F7;
      vertical-align: middle;
    }

    tr:nth-child(even) td {
      background: #F8FAFC;
    }

    /* CARDS & DESTAQUES */
    .card-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-left: 4px solid #4F6E80;
      border-radius: 6px;
      padding: 8px 12px;
      margin: 8px 0;
      break-inside: avoid;
    }

    .card-box-accent {
      background: #FFFDF9;
      border: 1px solid #F3E8D2;
      border-left: 4px solid #B38C40;
      border-radius: 6px;
      padding: 8px 12px;
      margin: 8px 0;
      break-inside: avoid;
    }

    .card-box-primary {
      background: #F2F8F8;
      border: 1px solid #D5EBEA;
      border-left: 4px solid #2E6B66;
      border-radius: 6px;
      padding: 8px 12px;
      margin: 8px 0;
      break-inside: avoid;
    }

    /* CAIXAS DE FÓRMULA MATEMÁTICA */
    .formula-box {
      background: #101820;
      color: #E8E6DF;
      padding: 8px 14px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8pt;
      margin: 6px 0 8px 0;
      border-left: 4px solid #B38C40;
      break-inside: avoid;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
    }

    .formula-box .title {
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      color: #B38C40;
      font-size: 7.5pt;
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    .formula-text {
      color: #FFFFFF;
      font-weight: 600;
      font-size: 8.5pt;
      letter-spacing: 0.2px;
    }

    .formula-desc {
      color: #CBD5E0;
      font-size: 7.5pt;
      margin-top: 3px;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* BADGES */
    .badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 7pt;
      font-weight: 700;
      text-transform: uppercase;
    }

    .badge-teal { background: #E6F3F2; color: #2E6B66; border: 1px solid #2E6B66; }
    .badge-slate { background: #EDF2F7; color: #4F6E80; border: 1px solid #4F6E80; }
    .badge-gold { background: #FEF9EF; color: #8A6B2E; border: 1px solid #B38C40; }
    .badge-danger { background: #FDF2F2; color: #C53030; border: 1px solid #E53E3E; }
    .badge-success { background: #F0FFF4; color: #22543D; border: 1px solid #38A169; }

    ul, ol {
      margin-left: 18px;
      margin-bottom: 6px;
    }

    li {
      margin-bottom: 2px;
    }

    .footer-doc {
      margin-top: 18px;
      padding-top: 8px;
      border-top: 1px solid #E2E8F0;
      font-size: 7.5pt;
      color: #718096;
      display: flex;
      justify-content: space-between;
      break-inside: avoid;
    }
  </style>
</head>
<body>

  <!-- CABEÇALHO PRINCIPAL DO DOCUMENTO -->
  <div class="header-cover">
    <div class="header-logo-row">
      ${logoBase64 ? `<img src="${logoBase64}" alt="Visão 90" class="header-logo-img">` : '<div style="font-size: 16pt; font-weight: 800; color: #fff;">VISÃO 90</div>'}
      <div class="header-badge">Documentação Técnica Oficial de Métricas</div>
    </div>
    <div class="header-title">Dicionário de Indicadores, Algoritmos e Fisiologia</div>
    <div class="header-subtitle">Sistema Integrado de Tracking Espacial (25 Hz) e Controle de Carga Interna (PSE / Escala CR-10)</div>
    <div class="header-meta">
      <span><strong>Projeto:</strong> TCC &middot; Sistema Web Visão 90</span>
      <span><strong>Metodologia:</strong> Carga Externa Cinemática + Carga Interna Subjetiva</span>
      <span><strong>Atualização:</strong> Setembro / 2026</span>
    </div>
  </div>

  <!-- SEÇÃO 1 -->
  <h2><span class="sec-num">1</span> Visão Geral: Arquitetura Fisiológica Integrada</h2>
  <p>
    O <strong>Visão 90</strong> adota o modelo científico de monitoramento do treinamento esportivo proposto por <strong>Impellizzeri et al. (2019)</strong> e amplamente consolidado na literatura do futebol de alto rendimento. Esse modelo preconiza que a avaliação completa da prontidão física e risco de lesão exige a integração contínua entre dois pilares complementares:
  </p>
  <ul>
    <li><strong>Carga Externa:</strong> É o trabalho físico e cinemático objetivo imposto ao atleta durante a partida (distâncias, picos de velocidade, acelerações e frenagens), extraído via séries temporais de coordenadas a 25 Hz.</li>
    <li><strong>Carga Interna:</strong> É a resposta biológica, neuromuscular e psicofisiológica do organismo do atleta ao estímulo mecânico, aferida pela Percepção Subjetiva de Esforço (escala CR-10 / método Sessão-RPE de Foster).</li>
  </ul>

  <!-- SEÇÃO 2 -->
  <h2><span class="sec-num">2</span> Ingestão e Processamento Cinemático de Rastreamento (25 Hz)</h2>
  <p>
    Os dados são fornecidos em arquivos CSV brutos contendo coordenadas espaciais bidimensionais registradas a <strong>25 quadros por segundo (25 Hz)</strong>. Cada linha representa um intervalo de tempo exato de 0.04 segundos (&Delta;t = 0.04 s).
  </p>

  <div class="formula-box">
    <div class="title">Cálculo 1 &middot; Conversão Métrica Oficial FIFA</div>
    <div class="formula-text">X = x_norm &times; 105.0 m &emsp;|&emsp; Y = y_norm &times; 68.0 m</div>
    <div class="formula-desc">Converte as coordenadas normalizadas [0, 1] para as dimensões oficiais do campo FIFA (105 m de comprimento &times; 68 m de largura).</div>
  </div>

  <div class="formula-box">
    <div class="title">Cálculo 2 &middot; Distância Euclidiana & Velocidade Instantânea</div>
    <div class="formula-text">&Delta;d = &radic;((X_t - X_{t-1})&sup2; + (Y_t - Y_{t-1})&sup2;) &emsp;&rarr;&emsp; v_inst = &Delta;d / &Delta;t (m/s) &emsp;&rarr;&emsp; v_kmh = v_inst &times; 3.6</div>
    <div class="formula-desc">Mede o deslocamento euclidiano frame a frame e converte a velocidade instantânea em metros por segundo para quilômetros por hora.</div>
  </div>

  <div class="formula-box">
    <div class="title">Cálculo 3 &middot; Filtro Passa-Baixas Exponencial (EMA) & Supressão de Jitter</div>
    <div class="formula-text">v_filtrada = 0.70 &times; v_inst + 0.30 &times; v_{filtrada, t-1}</div>
    <div class="formula-desc">Suprime ruídos de jitter intrínsecos de rastreadores óticos de 25 Hz. Deslocamentos anômalos acima de 12.0 m/s (43.2 km/h) decorrentes de oclusão de visão computacional são descartados como teleporte ótico.</div>
  </div>

  <!-- SEÇÃO 3 -->
  <h2><span class="sec-num">3</span> Estratificação em 5 Zonas de Velocidade (Padrão UEFA Pro / FIFA)</h2>
  <p>
    Toda a quilometragem percorrida pelo atleta é classificada em cinco faixas metabólicas e neuromusculares de intensidade padronizadas:
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 10%;">Zona</th>
        <th style="width: 20%;">Classificação</th>
        <th style="width: 18%;">Velocidade (km/h)</th>
        <th style="width: 52%;">Significado Fisiológico & Dinâmica Tática</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="badge badge-slate">Z1</span></td>
        <td><strong>Caminhada</strong></td>
        <td>0.0 a 7.2 km/h</td>
        <td>Recuperação ativa aeróbia, recomposição posicional e momentos de bola parada.</td>
      </tr>
      <tr>
        <td><span class="badge badge-slate">Z2</span></td>
        <td><strong>Trote / Leve</strong></td>
        <td>7.2 a 14.4 km/h</td>
        <td>Deslocamento predominantemente oxidativo; acompanhamento da linha de passe.</td>
      </tr>
      <tr>
        <td><span class="badge badge-teal">Z3</span></td>
        <td><strong>Corrida Moderada</strong></td>
        <td>14.4 a 19.8 km/h</td>
        <td>Transição aeróbia-anaeróbia; recomposição tática rápida e compactação de bloco.</td>
      </tr>
      <tr>
        <td><span class="badge badge-gold">Z4</span></td>
        <td><strong>High-Speed Running (HSR)</strong></td>
        <td>19.8 a 25.2 km/h</td>
        <td>Alta intensidade glicolítica; infiltrações, quebra de linha defensiva e transições velozes.</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">Z5</span></td>
        <td><strong>Sprint Máximo</strong></td>
        <td>&gt; 25.2 km/h</td>
        <td>Potência neuromuscular pura e sistema alático; disputas diretas e arrancadas decisivas.</td>
      </tr>
    </tbody>
  </table>

  <!-- SEÇÃO 4 -->
  <h2><span class="sec-num">4</span> Indicadores de Carga Externa Mecânica & Dinâmica Inercial</h2>

  <div class="card-box-primary">
    <h3>4.1 Ritmo de Trabalho Mecânico (M/min)</h3>
    <p>
      É o <strong>indicador-ouro de intensidade física</strong> no futebol moderno. Ao contrário da distância total em quilômetros (que depende da minutagem do atleta), o índice de metros por minuto normaliza o esforço real por tempo de exposição.
    </p>
    <div class="formula-box">
      <div class="title">Fórmula &middot; Metros por Minuto</div>
      <div class="formula-text">M/min = Distância Total Percorrida (m) / Minutos Jogados</div>
      <div class="formula-desc">&gt; 120 m/min: Intensidade de elite europeia | 105 a 120 m/min: Padrão profissional competitivo | &lt; 95 m/min: Ritmo moderado ou baixa exigência motora da função.</div>
    </div>
  </div>

  <div class="card-box">
    <h3>4.2 Dinâmica Inercial: Acelerações e Desacelerações (Frenagens)</h3>
    <p>
      A derivada temporal da velocidade expressa a sobrecarga mecânica instantânea: a = (v_t - v_{t-1}) / &Delta;t.
    </p>
    <ul>
      <li><strong>Acelerações Altas (&ge; +2.5 m/s&sup2;):</strong> Ações com alta demanda de recrutamento de unidades motoras rápidas (fibras do tipo IIx).</li>
      <li><strong>Acelerações Explosivas (&ge; +3.0 m/s&sup2;):</strong> Picos fisiológicos máximos de partida estática ou aceleração rápida.</li>
      <li><strong>Desacelerações Altas (&le; -2.5 m/s&sup2;) e Críticas (&le; -3.0 m/s&sup2;):</strong> Frenagens intensas. <em>Ponto crítico do TCC:</em> representam a maior fonte de dano muscular por contração excêntrica nos isquiotibiais e reto femoral, sendo o principal gatilho mecânico de fadiga e lesão muscular.</li>
    </ul>
  </div>

  <div class="card-box-accent">
    <h3>4.3 Player Load (Padrão Inercial Triaxial / Catapult Sports)</h3>
    <p>
      Mede o estresse mecânico inercial acumulado resultante de impactos corporais, mudanças repentinas de direção, fintas e saltos:
    </p>
    <div class="formula-box">
      <div class="title">Fórmula &middot; Player Load Acumulado</div>
      <div class="formula-text">Player Load = &sum; min( 1.5, &radic;(ax&sup2; + ay&sup2;) &times; &Delta;t &times; 0.15 )</div>
      <div class="formula-desc">Quantifica o estresse físico total suportado pelo sistema osteoarticular e muscular mesmo em pequenos deslocamentos espaciais.</div>
    </div>
  </div>

  <div class="card-box">
    <h3>4.4 Potência Metabólica (Metabolic Power &middot; Di Prampero & Osgnach, 2010)</h3>
    <p>
      Fundamenta-se no princípio de que acelerar em piso plano equivale biometricamente a correr em aclive contra a gravidade.
    </p>
    <div class="formula-box">
      <div class="title">Fórmula &middot; Potência Metabólica Instantânea & HPMD</div>
      <div class="formula-text">Custo = 3.6 + 0.102 &times; a&sup2; + 0.28 &times; a &emsp;&rarr;&emsp; P_met = Custo &times; v_filtrada (Watts/kg)</div>
      <div class="formula-desc">HPMD (High Power Metabolic Distance): Metros totais percorridos pelo atleta em potência metabólica extrema (&gt; 20 W/kg).</div>
    </div>
  </div>

  <!-- SEÇÃO 5 -->
  <h2><span class="sec-num">5</span> Indicadores de Carga Interna & Fisiologia Integrada</h2>

  <div class="card-box-primary">
    <h3>5.1 Carga da Sessão de Foster (Sessão-RPE &middot; Foster et al., 2001)</h3>
    <p>
      Coletada entre 20 a 30 minutos após o apito final via Percepção Subjetiva de Esforço (PSE / Escala CR-10):
    </p>
    <div class="formula-box">
      <div class="title">Fórmula &middot; Carga da Sessão (Foster)</div>
      <div class="formula-text">Carga Foster (U.A.) = Escore PSE (CR-10) &times; Minutos Jogados</div>
      <div class="formula-desc">Expressa o estresse psicobiológico total em Unidades Arbitrárias (U.A.). Exemplo: 90 min com PSE 7 (Muito Forte) = 630 U.A.</div>
    </div>
  </div>

  <div class="card-box-accent">
    <h3>5.2 Razão de Eficiência & Anomalia PSE vs. Tracking</h3>
    <p>
      O sistema cruza dinamicamente a demanda mecânica produzida com a percepção biológica relatada pelo atleta:
    </p>
    <div class="formula-box">
      <div class="title">Fórmula &middot; Razão de Eficiência</div>
      <div class="formula-text">Razão de Eficiência = Ritmo Mecânico (m/min) / Escore PSE</div>
      <div class="formula-desc">Alta Eficiência (&gt; 18.0): O atleta entregou alto ritmo com baixo custo biológico | Baixa Eficiência (&lt; 12.0): Desgaste biológico desproporcional para baixa entrega motora.</div>
    </div>
    <p>
      <strong>Algoritmo de Anomalia PSE vs. Tracking:</strong> Se o atleta reporta escore PSE &ge; 8 (Muito Forte / Exaustivo), porém seu ritmo cinemático foi moderado ou baixo (&lt; 115 m/min), o sistema gera alerta automático de fadiga crônica prévia, desidratação, insônia ou sobrecarga extramatriz.
    </p>
  </div>

  <!-- SEÇÃO 6 -->
  <h2><span class="sec-num">6</span> Dinâmica Longitudinal & Risco Epidemiológico de Lesão (ACWR)</h2>
  <p>
    Desenvolvido por <strong>Gabbett (2016)</strong> e adotado pelos principais clubes do futebol mundial, o <strong>Acute:Chronic Workload Ratio (ACWR)</strong> avalia a relação entre a fadiga aguda recente e o condicionamento físico crônico do elenco:
  </p>

  <div class="formula-box">
    <div class="title">Fórmula &middot; ACWR (Gabbett)</div>
    <div class="formula-text">ACWR = Carga Aguda (Média Móvel dos últimos 7 dias) / Carga Crônica (Média Móvel dos últimos 28 dias)</div>
    <div class="formula-desc">Representa se o atleta está preparado para o estresse atual com base no lastro de treinamento do último mês.</div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 18%;">Faixa ACWR</th>
        <th style="width: 22%;">Classificação</th>
        <th style="width: 60%;">Implicação Prática para a Comissão Técnica</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>&lt; 0.80</strong></td>
        <td><span class="badge badge-slate">Subtreinamento</span></td>
        <td>Atleta desacostumado à alta intensidade; risco de sobrecarga caso atue 90 minutos repentinamente.</td>
      </tr>
      <tr>
        <td><strong>0.80 a 1.30</strong></td>
        <td><span class="badge badge-success">Sweet Spot (Ótimo)</span></td>
        <td>Zona de menor taxa epidemiológica de lesões musculares; equilíbrio ideal entre aptidão e fadiga.</td>
      </tr>
      <tr>
        <td><strong>1.31 a 1.49</strong></td>
        <td><span class="badge badge-gold">Sobrecarga / Atenção</span></td>
        <td>Fadiga residual cumulativa; indicação de treinos regenerativos e monitoramento rigoroso.</td>
      </tr>
      <tr>
        <td><strong>&ge; 1.50</strong></td>
        <td><span class="badge badge-danger">Zona de Perigo (Spike)</span></td>
        <td>Risco de lesão aumentado em até 4 a 5 vezes decorrente de picos agudos de carga não suportados pelo lastro crônico.</td>
      </tr>
    </tbody>
  </table>

  <div class="card-box">
    <h3>Monotonia e Tensão de Foster</h3>
    <ul>
      <li><strong>Monotonia:</strong> Carga Média Diária / Desvio Padrão da Carga Diária. Valores &gt; 2.0 indicam treinos repetitivos sem dias de descanso.</li>
      <li><strong>Tensão (Strain):</strong> Carga Total Semanal &times; Monotonia. Quando muito elevada, precipita estados de <em>overtraining</em>.</li>
    </ul>
  </div>

  <!-- SEÇÃO 7 -->
  <h2><span class="sec-num">7</span> Métricas Táticas e Comportamento Espacial Coletivo</h2>
  <p>
    Através do rastreamento cinemático simultâneo de todos os atletas em campo, o Visão 90 quantifica o comportamento tático coletivo da equipe:
  </p>

  <div class="formula-box">
    <div class="title">Fórmula &middot; Baricentro da Equipe (Centroide) & Compacidade</div>
    <div class="formula-text">X_bari = (1/N) &sum; Xi &emsp;|&emsp; Y_bari = (1/N) &sum; Yi &emsp;&rarr;&emsp; Compacidade = &radic;( (1/N) &sum; [ (Xi - X_bari)&sup2; + (Yi - Y_bari)&sup2; ] )</div>
    <div class="formula-desc">O baricentro representa o ponto de equilíbrio tático do time. A compacidade mede a distância média quadrática dos 11 atletas em relação ao baricentro (raio de ocupação em metros).</div>
  </div>

  <ul>
    <li><strong>Compacidade Defensiva:</strong> Valores baixos (16 a 22 m) indicam linhas curtas e time coeso. Valores acima de 28 m sinalizam time descompactado e suscetível a infiltrações entre linhas.</li>
    <li><strong>Comprimento do Bloco Tático:</strong> Distância longitudinal entre o zagueiro mais recuado e o atacante mais adiantado (Máx(X) - Mín(X)).</li>
    <li><strong>Largura do Bloco Tático:</strong> Distância lateral entre os jogadores mais abertos nas alas (Máx(Y) - Mín(Y)).</li>
    <li><strong>Polígono Envolvente (Convex Hull):</strong> Área poligonal mínima do gramado efetivamente ocupada pelo bloco de jogadores em um dado instante.</li>
  </ul>

  <!-- SEÇÃO 8 -->
  <h2><span class="sec-num">8</span> Análise Temporal de Fadiga (Blocos de 15 Minutos & Decaimento)</h2>
  <p>
    Para auxiliar na tomada de decisão sobre o <strong>momento exato de substituição</strong>, a partida é subdividida em 6 blocos cronológicos padronizados: <em>0-15', 15-30', 30-45', 45-60', 60-75' e 75-90'+</em>.
  </p>

  <div class="formula-box">
    <div class="title">Fórmula &middot; Decaimento em Relação ao Bloco Pico & Comparativo 1ºT vs. 2ºT</div>
    <div class="formula-text">&Delta;% = [ (M/min_bloco - M/min_pico) / M/min_pico ] &times; 100 &emsp;|&emsp; Queda 2ºT = [ (M/min_2T - M/min_1T) / M/min_1T ] &times; 100</div>
    <div class="formula-desc">Identifica o momento exato em que o atleta começa a perder rendimento físico em alta intensidade.</div>
  </div>

  <ul>
    <li><strong>Pacing Estável (Normal):</strong> Decaimento &lt; 10%. O atleta mantém capacidade uniforme de esforço ao longo dos 90 minutos.</li>
    <li><strong>Fadiga Moderada (Alerta):</strong> Queda entre 15% e 24%. O atleta reduz sprints e HSR no último quarto de jogo.</li>
    <li><strong>Fadiga Severa (Crítico):</strong> Queda &ge; 25% em relação ao pico ou decaimento &gt; 22% no 2º tempo. O sistema gera automaticamente o parecer recomendando substituição aos 65-70 minutos para proteger o setor tático e prevenir lesão muscular.</li>
  </ul>

  <!-- SEÇÃO 9 -->
  <h2><span class="sec-num">9</span> Mapa de Calor Real 2D no Canvas (KDE & Vetores de Sprint)</h2>
  <p>
    O mapa de calor do Visão 90 não utiliza imagens genéricas. Ele é renderizado matematicamente no elemento <code>&lt;canvas&gt;</code> através de uma aproximação de <strong>Estimação de Densidade por Kernel (Kernel Density Estimation - KDE)</strong>:
  </p>
  <ul>
    <li>Cada coordenada (X_i, Y_i) do atleta durante os 90 minutos é tratada como uma fonte radial de calor com raio proporcional e ponderação de velocidade.</li>
    <li>A superposição densa de trajetórias gera gradientes com a paleta oficial:
      <br><strong>Azul Ardósia (#4F6E80) &rarr; Verde Petróleo (#2E6B66) &rarr; Dourado Queimado (#B38C40) &rarr; Alerta / Vermelho (#D9534F)</strong>.
    </li>
    <li><strong>Vetores Direcionais de Sprint:</strong> Cada arrancada em Z4/Z5 é traçada como um vetor orientado, exibindo uma seta na direção da corrida e um badge indicando o pico de velocidade atingido naquela ação (ex: <em>33.8 km/h</em>).</li>
  </ul>

  <!-- SEÇÃO 10 -->
  <h2><span class="sec-num">10</span> Tabela-Resumo / Dicionário Rápido de Variáveis</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 18%;">Indicador</th>
        <th style="width: 12%;">Unidade</th>
        <th style="width: 32%;">Fórmula / Origem</th>
        <th style="width: 38%;">Objetivo Principal no Futebol</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Distância Total</strong></td>
        <td>Quilômetros (km)</td>
        <td>&sum; &Delta;d_i / 1000</td>
        <td>Volume total de deslocamento no confronto.</td>
      </tr>
      <tr>
        <td><strong>Ritmo Médio</strong></td>
        <td>m/min</td>
        <td>Distância (m) / Minutos</td>
        <td>Intensidade física contínua por tempo jogado.</td>
      </tr>
      <tr>
        <td><strong>Velocidade Máx.</strong></td>
        <td>km/h</td>
        <td>Máx(v_i &times; 3.6)</td>
        <td>Pico de velocidade absoluto atingido na partida.</td>
      </tr>
      <tr>
        <td><strong>HSR (Z4)</strong></td>
        <td>Metros (m)</td>
        <td>&sum; d com v &in; [19.8, 25.2] km/h</td>
        <td>Volume de corridas de alta velocidade.</td>
      </tr>
      <tr>
        <td><strong>Sprints (Z5)</strong></td>
        <td>Quantidade</td>
        <td>Contagem de ações com v &gt; 25.2 km/h</td>
        <td>Número de arrancadas de potência máxima.</td>
      </tr>
      <tr>
        <td><strong>Desacelerações</strong></td>
        <td>Quantidade</td>
        <td>Contagem de a &le; -2.5 m/s&sup2;</td>
        <td>Sobrecarga excêntrica (risco de lesão muscular).</td>
      </tr>
      <tr>
        <td><strong>Player Load</strong></td>
        <td>Adimensional</td>
        <td>&sum; &radic;(ax&sup2; + ay&sup2;) &times; &Delta;t &times; 0.15</td>
        <td>Carga inercial mecânica acumulada.</td>
      </tr>
      <tr>
        <td><strong>Carga Foster</strong></td>
        <td>U.A.</td>
        <td>Escore PSE (CR-10) &times; Minutagem</td>
        <td>Estresse psicofisiológico interno global da sessão.</td>
      </tr>
      <tr>
        <td><strong>Razão de Eficiência</strong></td>
        <td>Adimensional</td>
        <td>Ritmo (m/min) / Escore PSE</td>
        <td>Economia biológica de esforço do atleta.</td>
      </tr>
      <tr>
        <td><strong>ACWR</strong></td>
        <td>Razão (Ratio)</td>
        <td>Carga Aguda (7d) / Carga Crônica (28d)</td>
        <td>Semáforo de risco epidemiológico de lesão.</td>
      </tr>
      <tr>
        <td><strong>Baricentro</strong></td>
        <td>Metros (X, Y)</td>
        <td>(X̄, Ȳ) de todos os 11 atletas</td>
        <td>Centro de massa e posicionamento médio da equipe.</td>
      </tr>
      <tr>
        <td><strong>Compacidade</strong></td>
        <td>Metros (m)</td>
        <td>Dispersão quadrática em torno do baricentro</td>
        <td>Grau de coesão espacial entre linhas do time.</td>
      </tr>
      <tr>
        <td><strong>Decaimento Temporal</strong></td>
        <td>Percentual (%)</td>
        <td>[(M/min_bloco - M/min_pico) / M/min_pico] &times; 100</td>
        <td>Identificação do momento de queda e fadiga.</td>
      </tr>
    </tbody>
  </table>

  <!-- SEÇÃO 11 -->
  <h2><span class="sec-num">11</span> Referências Bibliográficas Fundamentais</h2>
  <ul>
    <li><strong>Borg, G. (1998).</strong> <em>Borg's perceived exertion and pain scales.</em> Human kinetics.</li>
    <li><strong>Di Prampero, P. E., & Osgnach, C. (2010).</strong> <em>Metabolic power in team sports: Part 1.</em> In: Football and Medicine.</li>
    <li><strong>Foster, C., Florhaug, J. A., et al. (2001).</strong> <em>A new approach to monitoring exercise training.</em> Journal of Strength and Conditioning Research, 15(1), 109-115.</li>
    <li><strong>Gabbett, T. J. (2016).</strong> <em>The training-injury prevention paradox: should athletes be training smarter and harder?</em> British Journal of Sports Medicine, 50(5), 273-280.</li>
    <li><strong>Impellizzeri, F. M., Marcora, S. M., & Coutts, A. J. (2019).</strong> <em>Internal and external training load: 15 years on.</em> International Journal of Sports Physiology and Performance, 14(2), 270-273.</li>
  </ul>

  <!-- RODAPÉ FINAL -->
  <div class="footer-doc">
    <span>Sistema Visão 90 &middot; Rastreamento Cinemático e Carga Fisiológica</span>
    <span>Trabalho de Conclusão de Curso (TCC) &middot; Documentação Oficial</span>
  </div>

</body>
</html>
`;

const htmlFilePath = path.resolve(__dirname, 'Visao90_Documentacao_Metricas_TCC.html');
const pdfFilePath = path.resolve(__dirname, 'Visao90_Documentacao_Metricas_TCC.pdf');

fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const result = spawnSync(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${pdfFilePath}`,
  htmlFilePath
]);

if (fs.existsSync(pdfFilePath)) {
  const sizeKb = (fs.statSync(pdfFilePath).size / 1024).toFixed(1);
  console.log(`PDF refinado gerado com sucesso: ${pdfFilePath} (${sizeKb} KB)`);
} else {
  console.error('Erro ao gerar PDF:', result.stderr ? result.stderr.toString() : 'desconhecido');
}
