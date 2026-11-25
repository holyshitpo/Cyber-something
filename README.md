# CYBERHEART 2005

Um mini fórum retrô inspirado na internet dos anos 2000, feito com HTML, CSS e JavaScript puro.

## Como executar
1. Extraia o arquivo ZIP.
2. Abra `index.html` no navegador.
3. Para publicar, envie os três arquivos (`index.html`, `style.css`, `app.js`) para GitHub Pages, Netlify ou outro host estático.

Não precisa instalar dependências nem rodar servidor para testar localmente.

## Funcionalidades
- Visual nostálgico com layout de fórum, cores pastel, fontes pixel e marquee.
- Categorias: Geral, Música, Arte & Web e Games.
- Busca por tópicos.
- Criar tópicos e responder.
- Perfil com apelido salvo localmente.
- Guestbook interativo.
- Dados persistidos no `localStorage` do navegador.

## Limitações importantes
Esta é uma versão front-end: os tópicos e mensagens ficam salvos apenas no navegador/dispositivo de cada visitante. Para um fórum público real com contas, login, moderação e mensagens compartilhadas entre usuários, conecte um backend e banco de dados (por exemplo, Supabase ou Firebase), implemente autenticação e regras de segurança.

## Personalização
- Cores e layout: `style.css`
- Textos e estrutura: `index.html`
- Funcionalidades e dados iniciais: `app.js`
