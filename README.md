# GRS – Soluções Tecnológicas

Site institucional da GRS: criação de sites profissionais e soluções de presença digital,
com atendimento remoto para todo o Brasil.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 ·
Motion · Lucide · Vitest · Playwright (apenas desenvolvimento).

---

## Sumário

1. [Requisitos](#requisitos)
2. [Instalação e execução local](#instalação-e-execução-local)
3. [Editar o conteúdo](#editar-o-conteúdo)
4. [Modelos de site: adicionar modelos e regerar capturas](#modelos-de-site-adicionar-modelos-e-regerar-capturas)
5. [Variáveis de ambiente](#variáveis-de-ambiente)
6. [Deploy na Vercel](#deploy-na-vercel)
7. [Domínio próprio](#domínio-próprio)
8. [Google Search Console](#google-search-console)
9. [Google Analytics e cookies](#google-analytics-e-cookies)
10. [Estrutura do projeto](#estrutura-do-projeto)
11. [Pendências](#pendências)

---

## Requisitos

- Node.js **20.9 ou superior** (recomendado: 22 LTS)
- npm 10+

## Instalação e execução local

```bash
npm install
npm run dev            # http://localhost:3000
```

| Comando              | O que faz                                                       |
| -------------------- | --------------------------------------------------------------- |
| `npm run dev`        | Servidor de desenvolvimento                                     |
| `npm run build`      | Build de produção                                               |
| `npm run start`      | Serve o build de produção                                       |
| `npm run lint`       | ESLint                                                          |
| `npm run typecheck`  | TypeScript (`tsc --noEmit`)                                     |
| `npm run test`       | Testes unitários (Vitest): mensagem do WhatsApp e telefone      |
| `npm run modelo`     | Prepara um modelo HTML para a seção "Modelos de site"           |
| `npm run capture`    | Captura as telas dos modelos (Playwright, manual)               |
| `npm run icons`      | Regera favicon e ícones a partir do símbolo da marca            |

## Editar o conteúdo

Todo o conteúdo editável fica em **`src/config/`**. Não é preciso mexer nos componentes.

| Arquivo                   | Conteúdo                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| `site.ts`                 | Nome, slogan, descrição, WhatsApp, e-mail, mensagem padrão do WhatsApp, **redes sociais**, CNPJ/CPF, data da política, itens do menu |
| `content.ts`              | Textos do Hero, Soluções, Diferenciais, Como funciona, Portfólio, Contato e **FAQ**           |
| `portfolio.ts`            | Modelos de site exibidos na seção "Modelos" (título, categoria, descrição e endereço)        |
| `portfolio-captures.json` | Gerado pelo script de captura (não editar à mão)                                              |
| `form.ts`                 | Opções dos campos do formulário de orçamento e limites                                        |

Regras importantes:

- **Redes sociais:** preencha a URL em `siteConfig.social`. Redes com valor vazio não aparecem no
  rodapé nem nos dados estruturados.
- **CNPJ/CPF:** preencha `siteConfig.legal.document`. Enquanto vazio, não é exibido na política.
- **Política de Privacidade:** o texto fica em `src/app/politica-de-privacidade/page.tsx`. Ao alterá-lo,
  atualize `siteConfig.legal.privacyPolicyUpdatedAt`.
- **Logotipo:** o símbolo está em `src/components/brand/logo-mark.ts` e o logotipo completo em
  `src/components/brand/Logo.tsx`. Depois de trocar o símbolo, rode `npm run icons`.

## Modelos de site: adicionar modelos e regerar capturas

Os modelos são páginas HTML de arquivo único, publicadas em `public/modelos/` e abertas pelo botão
"Ver modelo" (ex.: `/modelos/psicologa.html`).

1. Prepare o arquivo HTML do modelo:

   ```bash
   npm run modelo -- caminho/do/arquivo.html <slug>
   ```

   O script copia o arquivo para `public/modelos/<slug>.html` e adiciona:
   - `<meta name="robots" content="noindex">`, para que os negócios fictícios dos modelos não
     apareçam no Google com o seu domínio;
   - um selo fixo "Modelo de demonstração · dados fictícios" com link de volta para a GRS;
   - um script que redireciona todos os links e formulários de WhatsApp do modelo para o WhatsApp
     da GRS (`src/config/site.ts`), com a mensagem "Olá! Vi o modelo de site para … no site da GRS
     e quero um site parecido para o meu negócio." O título vem do cadastro em `portfolio.ts`
     (pelo slug) ou de um 3º argumento: `npm run modelo -- arquivo.html padaria "padaria"`.

   Pode ser rodado de novo sobre o mesmo arquivo sem duplicar nada. Se o WhatsApp da GRS mudar,
   rode o comando de novo para cada modelo.
2. Cadastre o modelo em `src/config/portfolio.ts` (mesmo `slug`, título, categoria, descrição e
   `url: "/modelos/<slug>.html"`).
3. Gere as capturas (precisa de acesso à internet para fontes e fotos):

   ```bash
   npm run capture                 # todos os modelos
   npm run capture -- <slug>       # apenas um
   ```

   O script usa Playwright para capturar cada página em desktop (1440x900) e mobile (390x844),
   salva os arquivos WebP em `public/portfolio/` e atualiza `src/config/portfolio-captures.json`.
   Os modelos em `public/modelos/` são abertos direto do arquivo, sem servidor. O selo de
   demonstração é ocultado só na captura.
4. Revise as imagens e faça commit de `public/modelos/`, `public/portfolio/` e do manifesto.

Para remover um modelo, apague o item de `portfolio.ts`, o arquivo em `public/modelos/` e as duas
imagens em `public/portfolio/`. O campo `url` também aceita endereços externos (`https://...`),
caso queira voltar a exibir sites publicados.

O script de captura **nunca** roda no build da Vercel. Se alguma página ou recurso falhar ao
carregar, ele encerra com erro e não gera imagem substituta. Enquanto um item não tiver captura, o
card mostra "Captura pendente". Para usar outro Chromium, defina `PLAYWRIGHT_CHROMIUM_PATH`.
Na primeira execução local, instale o navegador:

```bash
npx playwright install chromium
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` (desenvolvimento) e configure as mesmas variáveis na Vercel
(produção).

| Variável                       | Obrigatória | Uso                                                                                                   |
| ------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Recomendada | URL final, sem barra no fim (ex.: `https://www.seudominio.com.br`). Usada em `metadataBase`, canonical, sitemap, robots, Open Graph e JSON-LD. Se vazia, usa a URL de produção da Vercel (`VERCEL_PROJECT_PRODUCTION_URL`) e, localmente, `http://localhost:3000`. |
| `NEXT_PUBLIC_GA_ID`            | Não         | ID do Google Analytics 4 (`G-XXXXXXXXXX`). Sem ele, o Analytics e o banner de cookies não existem.     |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Não         | Código de verificação do Google Search Console (apenas o valor do `content`).                         |

> As variáveis `NEXT_PUBLIC_*` são incorporadas no build. Depois de alterá-las na Vercel,
> faça um novo deploy (Deployments → ⋯ → Redeploy).

## Deploy na Vercel

1. Envie o repositório para o GitHub (ou GitLab/Bitbucket).
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório. O framework **Next.js** é
   detectado automaticamente; não altere os comandos de build.
3. Em **Settings → Environment Variables**, adicione as variáveis da seção anterior (ambiente
   *Production*).
4. Clique em **Deploy**. Cada push na branch principal gera um novo deploy de produção.

O build não acessa a internet nem roda o Playwright: as capturas do portfólio já estão versionadas.

## Domínio próprio

1. Na Vercel, abra o projeto → **Settings → Domains** → **Add** e informe o domínio
   (ex.: `seudominio.com.br` e `www.seudominio.com.br`).
2. No painel do registrador (ex.: Registro.br), configure os registros DNS indicados pela Vercel —
   em geral um registro `A` para o domínio raiz e um `CNAME` para o `www`. Use os valores exibidos
   na tela da Vercel, pois eles podem mudar.
3. Escolha qual versão é a principal (com ou sem `www`); a Vercel redireciona a outra.
4. Defina `NEXT_PUBLIC_SITE_URL` com a URL principal (ex.: `https://www.seudominio.com.br`) e faça
   um **Redeploy**.

O certificado HTTPS é emitido automaticamente pela Vercel.

## Google Search Console

1. Acesse o [Google Search Console](https://search.google.com/search-console) e adicione uma
   propriedade do tipo **Prefixo do URL** com a URL principal do site.
2. Escolha o método de verificação **Tag HTML**. Copie apenas o valor do atributo `content`
   (ex.: de `<meta name="google-site-verification" content="ABC123">`, copie `ABC123`).
3. Na Vercel, defina `NEXT_PUBLIC_GSC_VERIFICATION=ABC123` e faça um **Redeploy**.
4. Volte ao Search Console e clique em **Verificar**.
5. Em **Sitemaps**, envie `sitemap.xml`.

Como alternativa, com uma propriedade de **Domínio**, a verificação é feita por registro DNS (TXT) no
registrador e a variável não é necessária.

O site já inclui: metadados completos, canonical, Open Graph/Twitter, `robots.txt`, `sitemap.xml` e
dados estruturados (`Organization`, `WebSite` e `FAQPage`). Nenhuma configuração garante posições
específicas nos resultados de busca.

## Google Analytics e cookies

1. Crie uma propriedade GA4 e um fluxo de dados da Web para o domínio do site.
2. Copie o **ID de métricas** (`G-XXXXXXXXXX`) e defina `NEXT_PUBLIC_GA_ID` na Vercel. Faça um Redeploy.

Comportamento:

- O banner de cookies só aparece quando o ID está definido.
- O GA só é carregado depois que o visitante clica em **Aceitar**. "Aceitar" e "Recusar" têm o mesmo
  peso visual. A escolha fica salva no `localStorage` (chave `grs-cookie-consent`).
- O visitante pode rever a escolha em **Preferências de cookies**, no rodapé. Ao recusar, o GA é
  desativado e os cookies `_ga` são removidos.

## Estrutura do projeto

```
assets/fonts/            Fontes TTF usadas só na imagem Open Graph
public/modelos/          Modelos de site em HTML (preparados por npm run modelo)
public/portfolio/        Capturas dos modelos (geradas por npm run capture)
public/icons/            Ícones do manifesto (gerados por npm run icons)
scripts/                 add-template.ts, capture-portfolio.ts, generate-icons.ts
src/app/                 Rotas, layout, metadados, OG image, sitemap, robots, manifest
src/components/
  brand/                 Logo, símbolo e ícone de WhatsApp
  consent/               Banner de cookies e carregamento do GA
  graphics/              Motivo gráfico (trilhas de circuito)
  layout/                Header, rodapé, skip link, botão flutuante
  motion/                Revelação ao rolar
  sections/              Seções da landing page e formulário
  seo/                   JSON-LD
  ui/                    Botão, container, card, seção, título
src/config/              Conteúdo editável
src/hooks/               Hooks de rolagem e seção ativa
src/lib/                 Telefone, mensagem do WhatsApp, consentimento, SEO, URL do site
tests/                   Testes unitários (Vitest)
```

Observação técnica: com Cache Components, o Next.js mantém até três páginas visitadas ocultas no DOM
(React Activity) para preservar estado. Por isso, código que procura elementos por `id` deve
considerar apenas os visíveis (veja `SkipLink.tsx`).

## Pendências

- [ ] Domínio próprio e `NEXT_PUBLIC_SITE_URL`
- [ ] CNPJ/CPF (opcional) em `src/config/site.ts`
- [ ] Redes sociais em `src/config/site.ts`
- [ ] `NEXT_PUBLIC_GA_ID` (se for usar o Google Analytics)
- [ ] `NEXT_PUBLIC_GSC_VERIFICATION` e envio do sitemap no Search Console
- [ ] Revisão dos textos do FAQ (`src/config/content.ts`) e da Política de Privacidade
