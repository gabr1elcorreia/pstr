# POSTURE®

Site institucional e arquivo de coleções da POSTURE. As páginas são estáticas, com galerias leves e vídeos otimizados.

## Coleções

- 2023: Oriental Essence e Kyoto Garden
- 2024: Criminal Streets e Safe Zone
- 2025: Retrotype
- 2026: Void; Raízes em breve

Raízes aparece apenas como aviso de próximo lançamento. O site não usa imagens ilustrativas da coleção.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie **todo o conteúdo desta pasta**, incluindo a pasta `.github` e os arquivos de `dist/assets`.
2. Use a branch `main`. Em **Settings → Pages → Build and deployment**, escolha **GitHub Actions**.
3. O arquivo `.github/workflows/deploy-pages.yml` gera e publica o site automaticamente a cada envio para `main`. O endereço padrão será `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

O fluxo configura automaticamente o caminho de projeto `/NOME-DO-REPOSITORIO/`. Para um domínio próprio ou repositório `SEU-USUARIO.github.io`, defina as variáveis do repositório `PAGES_BASE_PATH` como `/` e `PAGES_SITE_URL` com o endereço público completo, sem barra final.

Para gerar localmente, use Node.js 20 ou superior:

```sh
npm run build
npm run verify
```

A pasta `dist` contém a versão publicável. O código usa caminhos compatíveis com subpasta do GitHub Pages. O site atual no Sites usa o mesmo código com o caminho `/`.

## Arquivos

- `src/data.js`: coleções, anos e links.
- `src/render-v2.js`: páginas e textos.
- `src/style-v2.css`: visual e adaptação para celular.
- `src/client.js`: menu e galeria ampliada.
- `build.mjs`: geração das páginas.
- `verify.mjs`: conferência de páginas e arquivos locais.
- `dist/assets`: fotos e vídeos otimizados, inclusive os arquivos enviados pelo usuário.

O vídeo da home é um trecho otimizado da campanha Void. A página de Kyoto contém o vídeo fornecido. A página de embaixadores usa as fotos individuais indicadas e mantém links para os perfis de ambos. A galeria extra e o vídeo de Suedezin foram retirados conforme solicitado.

