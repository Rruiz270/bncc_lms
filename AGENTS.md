# BNCC LMS

Sistema de gestão escolar baseado na Base Nacional Comum Curricular (BNCC), desenvolvido para a Secretaria de Educação de Santa Catarina (~1.038 escolas, ~51 mil professores). Organizado em cinco módulos: Builder (estrutura curricular/competências), Manager (escolas, professores, alunos), Creator (planejamento de aulas), Player (execução em sala) e Trainer (análise/relatórios).

## Stack

- **Linguagem**: TypeScript 5 (strict).
- **Framework**: Next.js 16.0.7 (App Router, `src/app`) + React 19.2.
- **UI**: Tailwind CSS 4 (`@tailwindcss/postcss`), Radix UI (dialog, dropdown-menu, select, slot), `lucide-react`, `class-variance-authority`, `tailwind-merge`, `clsx`.
- **Formulários/validação**: `react-hook-form` + `zod` + `@hookform/resolvers`.
- **Banco**: PostgreSQL via Prisma 7 (`@prisma/client` 7.1) — schema em `prisma/schema.prisma`, config em `prisma.config.ts`.
- **Autenticação**: NextAuth.js 4 com `@auth/prisma-adapter`; senhas com `bcryptjs`.
- **Package manager**: npm (lockfile `package-lock.json`).
- **Deploy**: Vercel (não há `vercel.json`; usa detecção automática de Next.js).

> Nota: o README menciona "Next.js 14", mas o `package.json` real está em **Next 16.0.7 / React 19**. Siga o `package.json`.

## Comandos

```bash
npm install            # instala dependências
npm run dev            # servidor de desenvolvimento (http://localhost:3000)
npm run build          # build de produção
npm run start          # serve o build
npm run lint           # ESLint (flat config, eslint.config.mjs)

npx prisma generate    # gera o Prisma Client
npx prisma migrate dev # cria/aplica migrations em dev
npx prisma studio      # inspeciona o banco
```

Não há script de teste definido.

## Estrutura

```
src/
├── app/
│   ├── layout.tsx, page.tsx, globals.css
│   ├── builder/  manager/  creator/  player/  trainer/   # páginas dos 5 módulos
│   └── api/bncc/competencies/route.ts, api/bncc/stats/route.ts  # API Routes
├── components/ui/        # button.tsx, card.tsx (padrão shadcn/Radix)
└── lib/                  # utils.ts, bncc-data.ts, advanced-types.ts
prisma/schema.prisma      # modelos BNCC (EducationalLevel, Series, Subject, Competency, ...)
prisma.config.ts          # config Prisma 7 (schema + migrations + datasource via env)
```

O schema modela a estrutura BNCC (níveis, séries, disciplinas, competências, habilidades) além de escolas, professores, turmas e alunos, com `@@map` para snake_case no banco.

## Convenções de código

- TypeScript **strict**; alias de import `@/*` → `src/*`.
- ESLint via flat config (`eslint.config.mjs`) estendendo `eslint-config-next/core-web-vitals` + `.../typescript`.
- Componentes de UI seguem o padrão Radix + `cva` + `cn()` (`lib/utils.ts`).
- No Prisma, campos em camelCase no client e `@map`/`@@map` para snake_case no PostgreSQL — mantenha esse padrão ao adicionar modelos.

## Variáveis de ambiente

Definidas em `.env` local (e nas Environment Variables do projeto Vercel). Nunca commite valores — `.env*` está no `.gitignore`.

- `DATABASE_URL` — conexão PostgreSQL (usada por `datasource db` e por `prisma.config.ts`).
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL` — necessárias pelo NextAuth 4 em produção.

Ao introduzir provedores/integrações, documente aqui apenas os **nomes** das novas envs.

## CI/CD & Deploy

- **Deploy**: Vercel com auto-deploy ao dar push na `main`.
- **CI**: não há workflows em `.github/`. Recomendação — adicionar em PR um workflow mínimo (`install → prisma generate → lint → typecheck (tsc --noEmit) → build`), rodando `prisma generate` antes do build para evitar erro de client não gerado.
- Configure `DATABASE_URL` e segredos do NextAuth nas variáveis do projeto Vercel antes do primeiro deploy.

## Boas práticas de PR

- Branches: `feat/…`, `fix/…`, `chore/…`.
- Commits no padrão **Conventional Commits** (`feat:`, `fix:`, `docs:`…).
- PRs pequenos e focados; checklist antes de pedir review:
  - `npm run build` e `npm run lint` passam;
  - nenhum segredo ou `.env` no diff;
  - migrations Prisma acompanham a mudança de schema e têm caminho de rollback claro;
  - screenshots para alterações de UI.
- Pelo menos 1 review; **squash merge**; `main` sempre deployável.

## Testes

Não há testes configurados. Recomendação proporcional: adicionar Vitest + React Testing Library para os componentes de `lib/` e para as API Routes de `api/bncc/*`, começando pela lógica de estatísticas/competências.

## Segurança & dados

- Nunca commitar `.env`/segredos (já ignorados).
- **LGPD**: o sistema armazena dados pessoais de professores e alunos (rede pública de SC). Trate esses dados com cuidado — não os exponha em logs, seeds versionados ou fixtures de teste.
- Senhas sempre via `bcryptjs`; nunca armazenar em texto plano.
- Revise dependências ao atualizar (Next 16 e Prisma 7 são versões recentes com breaking changes frequentes).

## Gotchas

- **Next 16 + React 19**: APIs e convenções diferem de versões anteriores; confirme o comportamento antes de portar código de projetos Next 14.
- **Prisma 7**: usa `prisma.config.ts` (não a antiga config em `package.json`) e requer `import "dotenv/config"` para carregar `DATABASE_URL` — não remova essa linha.
- `src/generated/prisma` está no `.gitignore`; não versione client gerado.
- Rode `prisma generate` após clonar/instalar (o build depende do client gerado).
- README defasado quanto às versões — a fonte de verdade é o `package.json`.
