# Visão 90: Plataforma Web para Análise de Desempenho e Controle de Carga no Futebol

Trabalho de Conclusão de Curso (TCC) em Ciência da Computação.

* **Autor:** João Pedro Dias Durigueto
* **Orientador:** Prof. Me. Kenedy Antônio Freitas
* **Aplicação:** Visão 90

---

## 1. Sobre o Projeto

O **Visão 90** é uma plataforma web concebida para integrar dados objetivos de rastreamento cinemático (*tracking data* a 25 Hz) com métodos subjetivos consagrados de controle de carga biológica interna (Escala de Borg CR-10 e Método de Foster).

A ferramenta foi projetada para democratizar o acesso à análise de desempenho de alto nível, permitindo que agremiações de menor poder aquisitivo, divisões de base e futebol feminino realizem a gestão física do elenco, o cálculo da Razão de Carga de Trabalho Aguda:Crônica (ACWR de Gabbett) e a prevenção científica de lesões com custo de hardware zero.

---

## 2. Tecnologias Utilizadas

* **Front-end:** Vue.js 3 (Composition API), Vuetify 3 (Material Design), Vite, HTML5 Canvas 2D acelerado por hardware e SVG vetorial.
* **Back-end:** Node.js, TypeScript e Next.js API Routes.
* **Banco de Dados e Nuvem:** PostgreSQL gerenciado via Supabase, com suporte a segregação multiusuário (*multi-tenant*).
* **Testes Automatizados:** Vitest.
* **Fonte de Dados de Rastreamento:** Datasets abertos de cinemática óptica da Metrica Sports (25 amostras por segundo).

---

## 3. Como Executar a Aplicação Localmente

Para rodar a plataforma em ambiente de desenvolvimento local, certifique-se de possuir o **Node.js** (versão 18 ou superior) instalado em seu computador.

### Passo 1: Executar o Back-end (API e Motor de Cálculo)

Abra um terminal na raiz do projeto e execute:

```bash
cd tcc-backend
npm install
npm run dev
```

O servidor da API estará em execução em: `http://localhost:3000`

Para rodar os testes unitários do algoritmo cinemático no back-end:

```bash
npm run test
```

### Passo 2: Executar o Front-end (Interface Web do Usuário)

Abra um segundo terminal na raiz do projeto e execute:

```bash
cd tcc-frontend
npm install
npm run dev
```

O front-end estará acessível no seu navegador em: `http://localhost:5173`

---

## 4. Guia Rápido de Acesso para a Banca Examinadora

Ao abrir o endereço `http://localhost:5173`, o sistema apresentará a tela de autenticação segura.

### Credenciais Pré-configuradas para Testes:

Para acessar diretamente o repositório com 3 partidas oficiais pré-cadastradas e todos os dados do elenco carregados:

* **E-mail:** `joaopedrodias895@gmail.com`
* **Senha:** `123`

*(Nota: Caso deseje testar o isolamento de dados entre clubes concorrentes, basta utilizar a opção **"Criar nova conta"** na tela de login. Cada usuário cadastrado possui seu próprio banco de partidas e relatórios totalmente isolado).*

---

## 5. Como Obter e Importar os Arquivos CSV da Metrica Sports

A plataforma Visão 90 é compatível com os arquivos oficiais de rastreamento óptico bidimensional disponibilizados no repositório de código aberto da **Metrica Sports**.

### Onde baixar os dados:
Os datasets abertos estão disponíveis publicamente no GitHub:
👉 [https://github.com/metrica-sports/sample-data](https://github.com/metrica-sports/sample-data)

### Quais arquivos devem ser importados:
Acesse a pasta `data/Sample_Game_1/` ou `data/Sample_Game_2/` no repositório acima. Os arquivos compatíveis com o algoritmo de rastreamento contínuo são:

1. `Sample_Game_1_RawTrackingData_Home_Team.csv` (Partida 1, Time Mandante)
2. `Sample_Game_1_RawTrackingData_Away_Team.csv` (Partida 1, Time Visitante)
3. `Sample_Game_2_RawTrackingData_Home_Team.csv` (Partida 2, Time Mandante)
4. `Sample_Game_2_RawTrackingData_Away_Team.csv` (Partida 2, Time Visitante)

> **Importante:** Não importe arquivos de eventos (como `events.csv`), pois eles contêm apenas registros discretos de passes e finalizações. O sistema do Visão 90 opera sobre séries temporais cinemáticas completas a 25 Hz (arquivos que possuem `RawTrackingData` no nome).

### Arquivo já incluso no repositório local:
Para agilizar os testes práticos da banca sem a necessidade de baixar arquivos externos, um arquivo completo de rastreamento já foi disponibilizado na pasta do projeto:
* `tcc-backend/dados/dados_rastreamento_exemplo.csv` (32,9 MB)

### Passo a passo para importar no sistema:
1. No menu lateral esquerdo do Visão 90, clique na aba **"Inserir Partida"**.
2. No campo de upload, selecione ou arraste o arquivo CSV (por exemplo, `dados_rastreamento_exemplo.csv`).
3. Opcionalmente, digite um nome identificador para a partida no campo correspondente (ex: *"Final Campeonato Regional - Jogo de Ida"*).
4. Clique no botão **"Processar e Importar CSV"**.
5. O sistema fará a leitura e conversão das coordenadas em metros, filtrará os ruídos e direcionará automaticamente a visualização para o **Painel da Comissão Técnica**.

---

## 6. Principais Funcionalidades Disponíveis para Avaliação

A navegação está organizada em quatro módulos principais:

1. **Inserir Partida:** Permite importar novos arquivos CSV e gerenciar o histórico de confrontos cadastrados pelo usuário.
2. **Painel da Comissão Técnica:**
   * **Semáforo Coletivo ACWR (Gabbett):** Classificação dos atletas em *Sweet Spot* (0,80 a 1,30), *Sobrecarga Moderada*, *Zona de Perigo/Spike* (≥ 1,50) e *Subtreinamento*.
   * **Quadro de Alertas Fisiológicos:** Notificações automáticas ao detectar incompatibilidade entre a percepção de esforço e o ritmo mecânico percorrido.
   * **Tabela Ranqueada do Elenco:** Ordenação interativa por distância total, m/min, sprints e escore ACWR.
3. **Análise Individual do Atleta:**
   * **Radar Físico e 5 Zonas Metabólicas:** Comparativo entre o perfil do atleta e a média posicional (Caminhada Z1 até Sprint Puro Z5).
   * **Escala de Borg Interativa:** Permite modificar a nota de PSE (1 a 10) e observar em tempo real o recálculo da Carga de Foster e da Razão de Eficiência.
   * **Dinâmica Temporal em Blocos de 15 Minutos:** Gráfico de intensidade ao longo do jogo, diagnosticando a fadiga e a quebra de ritmo (*fade-out*) na segunda etapa.
4. **Relatório Pós-Jogo:**
   * **Mapa de Calor Contínuo em Canvas 2D:** Renderização espacial das zonas de atuação e sobreposição dos vetores de sprint.
   * **Síntese de Carga e Parecer Clínico:** Dossiê executivo pronto para impressão ou exportação.

---

## 7. Estrutura de Pastas do Repositório

```text
DesenvTCC/
├── README.md                      # Documentação geral e guia da banca examinadora
├── .gitmodules                    # Vínculo dos submódulos do front-end e back-end
│
├── tcc-backend/                   # API Node.js/TypeScript (Next.js)
│   ├── dados/
│   │   └── dados_rastreamento_exemplo.csv # Dataset oficial Metrica Sports (25 Hz)
│   ├── src/
│   │   ├── app/api/rastreamento/  # Rota HTTP para ingestão de tracking
│   │   └── lib/
│   │       ├── algoritmoRastreamento.ts # Motor cinemático e zonas de velocidade
│   │       └── clienteSupabase.ts       # Camada de persistência relacional
│   └── package.json
│
└── tcc-frontend/                  # Interface do Usuário Vue.js 3 + Vuetify
    ├── src/
    │   ├── App.vue                # Componente raiz com módulos integrados
    │   ├── services/
    │   │   └── authService.js     # Autenticação e isolamento por usuário
    │   └── assets/
    └── package.json
```

---

## 8. Contato e Suporte

Em caso de dúvidas na inicialização ou durante a homologação pela banca examinadora:
* **E-mail:** joaopedrodias895@gmail.com
