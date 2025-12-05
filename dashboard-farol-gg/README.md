# Dashboard Farol de G&G - CNA 2026

Sistema de Indicadores de Gente & Gestão com 29 indicadores distribuídos por 8 pessoas.

## 📊 Funcionalidades

- **Dashboard Mensal**: Visualização mês a mês de todos os 29 indicadores com sistema de cores
- **Dashboard Anual**: Gráficos e consolidação de performance por responsável
- **Indicadores**: Lista completa com memórias de cálculo detalhadas
- **Administração**: Interface para atualizar dados, exportar/importar e gerenciar histórico

## 🚀 Como Hospedar

### Opção 1: GitHub Pages (Gratuito e Fácil)

1. Crie um repositório no GitHub
2. Faça upload de todos os arquivos deste projeto
3. Vá em Settings → Pages
4. Selecione a branch `main` e pasta `/` (root)
5. Clique em Save
6. Seu dashboard estará disponível em: `https://seu-usuario.github.io/nome-do-repositorio`

### Opção 2: Netlify (Gratuito, Arraste e Solte)

1. Acesse [netlify.com](https://netlify.com)
2. Crie uma conta gratuita
3. Arraste a pasta do projeto para a área de deploy
4. Pronto! Seu dashboard estará online em segundos
5. URL: `https://seu-site.netlify.app`

### Opção 3: Vercel (Gratuito, Profissional)

1. Acesse [vercel.com](https://vercel.com)
2. Crie uma conta gratuita
3. Clique em "New Project"
4. Faça upload da pasta ou conecte ao GitHub
5. Deploy automático
6. URL: `https://seu-projeto.vercel.app`

### Opção 4: Servidor Próprio

Se você tem um servidor web (Apache, Nginx, IIS):

1. Copie todos os arquivos para a pasta pública do servidor
2. Certifique-se de que o `index.html` está na raiz
3. Acesse via navegador

## 📁 Estrutura de Arquivos

```
dashboard-farol-gg/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos
├── js/
│   └── app.js          # Lógica da aplicação
├── data/
│   └── indicators.js   # Dados dos 29 indicadores
└── README.md           # Este arquivo
```

## 💾 Persistência de Dados

- Os dados são salvos automaticamente no **LocalStorage** do navegador
- Use "Exportar Dados" regularmente para fazer backup
- Use "Importar Dados" para restaurar um backup

## 🎯 Como Usar

1. **Dashboard Mensal**: Visualize o status de cada indicador mês a mês
2. **Dashboard Anual**: Veja a performance consolidada
3. **Indicadores**: Explore todos os 29 indicadores com detalhes
4. **Administração**: Atualize os dados mensalmente

### Atualizando Dados

1. Vá em "Administração"
2. Selecione o indicador e mês
3. Insira o valor real
4. O sistema calcula automaticamente a cor (verde/amarelo/vermelho)
5. Clique em "Salvar"

## 🔒 Segurança

**IMPORTANTE**: Esta versão não possui autenticação. Qualquer pessoa com o link pode acessar e editar.

Para adicionar proteção:
- Use autenticação do servidor (htaccess, etc.)
- Hospede em rede interna da empresa
- Adicione autenticação via código (requer desenvolvimento adicional)

## 📞 Suporte

Para dúvidas ou suporte, entre em contato com a equipe de G&G da CNA.

---

**Desenvolvido para CNA - 2026**
