# GRS – Soluções Tecnológicas

Site institucional da GRS. Next.js (App Router) + TypeScript + Tailwind CSS.

> Documentação completa (conteúdo, portfólio, deploy, domínio, Search Console) será escrita na etapa 7.

## Comandos

```bash
npm install
npm run dev         # desenvolvimento em http://localhost:3000
npm run build       # build de produção
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm run test        # testes (Vitest)
npm run icons       # regera favicon e ícones a partir de src/components/brand/logo-mark.ts
```

Conteúdo editável: `src/config/`.

## Portfólio: adicionar projetos e regerar capturas

1. Adicione o projeto em `src/config/portfolio.ts` (com `slug` único, nome, URL, categoria e descrição).
2. Rode as capturas (precisa de acesso à internet):

   ```bash
   npm run capture                 # todos os projetos
   npm run capture -- <slug>       # apenas um projeto
   ```

   O script usa Playwright para capturar cada site em desktop (1440x900) e mobile (390x844),
   salva os arquivos WebP em `public/portfolio/` e atualiza `src/config/portfolio-captures.json`
   com as dimensões das imagens.
3. Revise as imagens e faça commit de `public/portfolio/` e do manifesto.

O script **nunca** roda no build da Vercel. Se alguma página ou recurso falhar ao carregar,
ele encerra com erro e não gera imagem substituta. Para usar outro Chromium, defina
`PLAYWRIGHT_CHROMIUM_PATH`. Na primeira execução local, pode ser necessário instalar o navegador:

```bash
npx playwright install chromium
```
