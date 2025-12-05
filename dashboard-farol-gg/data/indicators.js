// 29 Indicadores do Farol de G&G
const indicators = [
  {id:1,name:'Execução das Metas de G&G',responsible:'Luciana',responsibleRole:'Gerente',target:'≥ 80 pts',formula:'(Metas atingidas / Total de metas) × 100',frequency:'Trimestral',green:'≥80',yellow:'70-79',red:'<70',category:'Estratégico'},
  {id:2,name:'Engajamento da Liderança',responsible:'Luciana',responsibleRole:'Gerente',target:'≥ 85 pts',formula:'[(Participação reuniões) × 40%] + [(NPS líderes) × 60%]',frequency:'Semestral',green:'≥85',yellow:'75-84',red:'<75',category:'Estratégico'},
  {id:3,name:'Execução de Projetos Estratégicos',responsible:'Adriano',responsibleRole:'Coordenador',target:'≥ 85 pts',formula:'(Projetos no prazo / Total de projetos) × 100',frequency:'Mensal',green:'≥85',yellow:'75-84',red:'<75',category:'Tático'},
  {id:4,name:'Desenvolvimento do Time',responsible:'Adriano',responsibleRole:'Coordenador',target:'≥ 80 pts',formula:'[(PDI executado) × 50%] + [(Avaliações OK) × 50%]',frequency:'Trimestral',green:'≥80',yellow:'70-79',red:'<70',category:'Tático'},
  {id:5,name:'SLA de Operações de G&G',responsible:'Adriano',responsibleRole:'Coordenador',target:'≥ 95 pts',formula:'(Demandas no prazo / Total de demandas) × 100',frequency:'Mensal',green:'≥95',yellow:'90-94',red:'<90',category:'Tático'},
  {id:6,name:'Cobertura e Efetividade das Trilhas',responsible:'Fellipe',responsibleRole:'BP Educação',target:'≥ 80 pts',formula:'[(Cobertura) × 40%] + [(Conclusão) × 30%] + [(NPS) × 30%]',frequency:'Trimestral',green:'≥80',yellow:'70-79',red:'<70',category:'Business Partner'},
  {id:7,name:'Horas de Treinamento per Capita',responsible:'Fellipe',responsibleRole:'BP Educação',target:'≥ 40h',formula:'Total de horas de treinamento / Headcount',frequency:'Trimestral',green:'≥40h',yellow:'30-39h',red:'<30h',category:'Business Partner'},
  {id:8,name:'Ações para a Rede (Educação)',responsible:'Fellipe',responsibleRole:'BP Educação',target:'≥ 80%',formula:'(Ações executadas para rede / Ações planejadas) × 100',frequency:'Trimestral',green:'≥80%',yellow:'70-79%',red:'<70%',category:'Business Partner'},
  {id:9,name:'Ciclo de Avaliação de Desempenho',responsible:'Márcia',responsibleRole:'BP RCP',target:'≥ 95 pts',formula:'[(Conclusão no prazo) × 60%] + [(Qualidade calibrações) × 40%]',frequency:'Anual',green:'≥95',yellow:'90-94',red:'<90',category:'Business Partner'},
  {id:10,name:'Equilíbrio Interno (Equidade)',responsible:'Márcia',responsibleRole:'BP RCP',target:'≥ 90 pts',formula:'100 - [(Desvios de equidade / Total de cargos) × 100]',frequency:'Semestral',green:'≥90',yellow:'80-89',red:'<80',category:'Business Partner'},
  {id:11,name:'Competitividade Salarial',responsible:'Márcia',responsibleRole:'BP RCP',target:'P50-P75',formula:'Posição da CNA vs mercado (percentil)',frequency:'Anual',green:'P50-P75',yellow:'P40-P49 ou P76-P80',red:'<P40 ou >P80',category:'Business Partner'},
  {id:12,name:'Ações de RCP para a Rede',responsible:'Márcia',responsibleRole:'BP RCP',target:'≥ 80%',formula:'(Ações executadas para rede / Ações planejadas) × 100',frequency:'Semestral',green:'≥80%',yellow:'70-79%',red:'<70%',category:'Business Partner'},
  {id:13,name:'Acompanhamento Ações de Clima',responsible:'BP Talent',responsibleRole:'BP Talent (A Contratar)',target:'≥ 80%',formula:'(Ações de clima executadas / Ações planejadas) × 100',frequency:'Semestral',green:'≥80%',yellow:'70-79%',red:'<70%',category:'Business Partner'},
  {id:14,name:'Eficiência e Qualidade Atração',responsible:'BP Talent',responsibleRole:'BP Talent (A Contratar)',target:'≥ 85 pts',formula:'[(Time to fill ≤30d) × 40%] + [(Quality of hire) × 60%]',frequency:'Trimestral',green:'≥85',yellow:'75-84',red:'<75',category:'Business Partner'},
  {id:15,name:'Banco de Talentos CNA',responsible:'BP Talent',responsibleRole:'BP Talent (A Contratar)',target:'≥ 100',formula:'Número de candidatos qualificados no banco',frequency:'Trimestral',green:'≥100',yellow:'75-99',red:'<75',category:'Business Partner'},
  {id:16,name:'Expansão Talento+',responsible:'BP Talent',responsibleRole:'BP Talent (A Contratar)',target:'≥ 80 pts',formula:'[(Vagas preenchidas) × 50%] + [(Retenção 1º ano) × 50%]',frequency:'Trimestral',green:'≥80',yellow:'70-79',red:'<70',category:'Business Partner'},
  {id:17,name:'Recrutamento Interno',responsible:'BP Talent',responsibleRole:'BP Talent (A Contratar)',target:'≥ 30%',formula:'(Vagas preenchidas internamente / Total de vagas) × 100',frequency:'Trimestral',green:'≥30%',yellow:'20-29%',red:'<20%',category:'Business Partner'},
  {id:18,name:'Ações de AE para a Rede',responsible:'BP Talent',responsibleRole:'BP Talent (A Contratar)',target:'≥ 80%',formula:'(Ações executadas para rede / Ações planejadas) × 100',frequency:'Trimestral',green:'≥80%',yellow:'70-79%',red:'<70%',category:'Business Partner'},
  {id:19,name:'Performance de Fornecedores',responsible:'Priscila',responsibleRole:'Analista Sr',target:'≥ 90 pts',formula:'[(SLA) × 50%] + [(Qualidade) × 30%] + [(Custo-benefício) × 20%]',frequency:'Mensal',green:'≥90',yellow:'80-89',red:'<80',category:'Operacional'},
  {id:20,name:'Turnover',responsible:'Priscila',responsibleRole:'Analista Sr',target:'≤ 15%',formula:'(Desligamentos / Headcount médio) × 100',frequency:'Mensal',green:'≤15%',yellow:'15,1-20%',red:'>20%',category:'Operacional'},
  {id:21,name:'Absenteísmo',responsible:'Priscila',responsibleRole:'Analista Sr',target:'≤ 3%',formula:'(Horas de ausência / Horas totais disponíveis) × 100',frequency:'Mensal',green:'≤3%',yellow:'3,1-5%',red:'>5%',category:'Operacional'},
  {id:22,name:'Despesa com Folha',responsible:'Priscila',responsibleRole:'Analista Sr',target:'95-105%',formula:'(Despesa real / Despesa orçada) × 100',frequency:'Mensal',green:'95-105%',yellow:'90-94 ou 106-110',red:'<90 ou >110',category:'Operacional'},
  {id:23,name:'Ações para a Rede (Serviços)',responsible:'Priscila',responsibleRole:'Analista Sr',target:'≥ 80%',formula:'(Ações executadas para rede / Ações planejadas) × 100',frequency:'Trimestral',green:'≥80%',yellow:'70-79%',red:'<70%',category:'Operacional'},
  {id:24,name:'Acuracidade da Folha',responsible:'Analista Pl',responsibleRole:'Analista Pl (A Contratar)',target:'≥ 98 pts',formula:'100 - [(Erros / Total de lançamentos) × 100]',frequency:'Mensal',green:'≥98',yellow:'95-97',red:'<95',category:'Operacional'},
  {id:25,name:'Gestão de Benefícios e Ciclo de Vida',responsible:'Analista Pl',responsibleRole:'Analista Pl (A Contratar)',target:'≥ 95 pts',formula:'[(Processos no prazo) × 50%] + [(NPS atendimento) × 50%]',frequency:'Mensal',green:'≥95',yellow:'85-94',red:'<85',category:'Operacional'},
  {id:26,name:'Ações para a Rede de Benefícios',responsible:'Analista Pl',responsibleRole:'Analista Pl (A Contratar)',target:'≥ 80%',formula:'(Ações executadas para rede / Ações planejadas) × 100',frequency:'Trimestral',green:'≥80%',yellow:'70-79%',red:'<70%',category:'Operacional'},
  {id:27,name:'Calendário de Endomarketing',responsible:'Victoria',responsibleRole:'Analista Jr',target:'≥ 85 pts',formula:'(Eventos realizados / Eventos planejados) × 100',frequency:'Trimestral',green:'≥85',yellow:'75-84',red:'<75',category:'Operacional'},
  {id:28,name:'Programa de Saúde e Bem-Estar',responsible:'Victoria',responsibleRole:'Analista Jr',target:'≥ 80 pts',formula:'[(Ações OK / Planejadas) × 60%] + [(Participantes / Headcount) × 40%]',frequency:'Trimestral',green:'≥80',yellow:'70-79',red:'<70',category:'Operacional'},
  {id:29,name:'Comunicação Interna e Ações para Rede',responsible:'Victoria',responsibleRole:'Analista Jr',target:'≥ 80 pts',formula:'[(Comunicações OK) × 50%] + [(Ações rede OK) × 50%]',frequency:'Trimestral',green:'≥80',yellow:'70-79',red:'<70',category:'Operacional'}
];

const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const responsibles = ['Todos','Luciana','Adriano','Fellipe','Márcia','BP Talent','Priscila','Analista Pl','Victoria'];

function generateMonthlyData() {
  const data = [];
  indicators.forEach(indicator => {
    months.forEach((month, index) => {
      let status = 'gray';
      let value = null;
      if (indicator.frequency === 'Mensal') {
        const rand = Math.random();
        if (rand > 0.8) status = 'yellow';
        else if (rand > 0.95) status = 'red';
        else status = 'green';
        value = Math.floor(Math.random() * 20 + 80);
      } else if (indicator.frequency === 'Trimestral') {
        if ([2, 5, 8, 11].includes(index)) {
          const rand = Math.random();
          if (rand > 0.8) status = 'yellow';
          else if (rand > 0.95) status = 'red';
          else status = 'green';
          value = Math.floor(Math.random() * 20 + 80);
        }
      } else if (indicator.frequency === 'Semestral') {
        if ([5, 11].includes(index)) {
          status = 'green';
          value = Math.floor(Math.random() * 15 + 85);
        }
      } else if (indicator.frequency === 'Anual') {
        if (index === 11) {
          status = 'green';
          value = Math.floor(Math.random() * 10 + 90);
        }
      }
      data.push({indicatorId: indicator.id, month: month, status: status, value: value});
    });
  });
  return data;
}

let monthlyData = generateMonthlyData();
