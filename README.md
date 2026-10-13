# TREME FIT

Site institucional multipágina da **Academia TREME FIT** — musculação e treinamento funcional.

Páginas em português, construídas com HTML, CSS e JavaScript puros — sem dependências, sem etapa de build.

## Modo demonstração (versão atual)

Este é um **exemplo para apresentação à academia**:

- **Telefone/WhatsApp** usam o placeholder `(00) 00000-0000` — em links `wa.me/5500000000000`, `tel:+5500000000000` e nos textos. Os links de WhatsApp abrem com a mensagem pronta, mas o número não é real.
- Todas as páginas exibem uma **faixa "Demonstração"** no topo avisando que os dados definitivos só serão publicados com autorização da academia (dispensável pelo botão ✕; a escolha fica em `localStorage`).
- **Endereço, horários, preços, fotos e redes sociais** não foram inventados: o site diz explicitamente "a confirmar com a academia" — conforme o PRD (seções 6, 7 e 8).
- As **imagens são ilustrações vetoriais** (SVG) na identidade da marca, usadas como espaço reservado até a academia enviar as fotos oficiais.

Para publicar de verdade, troque os placeholders pelas informações oficiais (seção [Configurar antes de publicar](#configurar-antes-de-publicar)) e remova a faixa `.demo-bar` dos HTML + o bloco `0. Faixa de demonstração` do `js/main.js` + o CSS `.demo-bar`.

## Estrutura

```
treme-fit/
├── index.html          # Início: hero, diferenciais, modalidades, estrutura, planos, CTA
├── modalidades.html    # Musculação, funcional e consulta da grade completa
├── estrutura.html      # Galeria com lightbox e comodidades (a confirmar)
├── planos.html         # Como funciona, o que considerar e CTA (sem preços publicados)
├── contato.html        # Canais, formulário validado e mapa (a confirmar)
├── privacidade.html    # Política de privacidade (formulário e dados)
├── css/styles.css      # Identidade visual e layout responsivo
├── js/main.js          # Menu mobile, validação, lightbox e animações
├── img/                # Emblema, logotipo, favicon, imagens sociais e ilustrações
├── docs/PRD.md         # Documento de requisitos do projeto
├── server.ps1          # Servidor local para Windows (PowerShell)
└── README.md
```

## Identidade visual

Segundo o PRD: **preto, branco e vermelho**, letras inclinadas e robustas, linhas diagonais e o "X" do emblema.

| Cor | Hex | Uso |
|-----|-----|-----|
| Preto carvão | `#0D0E12` | Fundo principal |
| Carvão claro | `#14161B` / `#23262E` | Cartões e bordas |
| Vermelho (grafismo) | `#E5142B` | Faixas, diagonais, cantos angulares e detalhes |
| Vermelho (botões) | `#CC1226` | Fundo de botões com texto branco (contraste AA) |
| Vermelho (texto) | `#FF4D5E` | Links e destaques sobre fundo escuro (AA) |
| Branco | `#F8F8FA` | Títulos e texto principal |
| Cinza | `#B8BCC6` | Texto secundário |

**Tipografia:** [Archivo](https://fonts.google.com/specimen/Archivo) (títulos em itálico pesado — 900 — imitando as letras inclinadas do emblema) e [Barlow](https://fonts.google.com/specimen/Barlow) (corpo e botões), via Google Fonts.

Grafismos inspirados no emblema: diagonais vermelhas no hero e nas páginas internas, tarja `////`, marca d'água em **X**, cantos angulares vermelhos nos cartões e ícones levemente rotacionados. O **emblema, logotipo e favicon foram recriados em SVG** com a paleta e o estilo descritos no PRD — quando a academia enviar o arquivo oficial, basta substituir os SVGs em `img/`.

## Rodar localmente

```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
# http://localhost:8758
```

Outras opções:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

## Configurar antes de publicar

Checklist baseado na seção 8 do PRD — nada abaixo foi inventado; tudo depende da confirmação da academia:

- [ ] **Endereço completo** (rua, número, bairro, cidade/UF, CEP) — hoje o site exibe "Endereço a confirmar".
- [ ] **Telefone e link oficiais do WhatsApp** — trocar `5500000000000` e `(00) 00000-0000` em todos os HTML + `js/main.js` (busca `wa.me`).
- [ ] **Horários de funcionamento** — incluir no rodapé, página de contato e marcadores estruturados (JSON-LD do `index.html`).
- [ ] **Modalidades e serviços confirmados** — hoje só musculação e funcional (citados no PRD); ajustar `modalidades.html` conforme a grade real.
- [ ] **Planos, preços e condições divuláveis** — preencher `planos.html` somente com valores autorizados; hoje tudo vai para o WhatsApp.
- [ ] **Fotos próprias** da academia e autorização de uso de imagens de alunos — substituir os SVGs ilustrativos em `img/` (manter os nomes ou atualizar os HTML).
- [ ] **Redes sociais oficiais** — hoje o site não exibe links de redes; adicionar Instagram/Facebook no rodapé e em `contato.html` quando confirmados.
- [ ] **Diferenciais a destacar** — ajustar os cartões de diferenciais do `index.html` conforme a equipe.
- [ ] **Mapa incorporado** — inserir o `iframe` do Google Maps com o endereço real em `contato.html` (hoje exibe `about:blank` + CTA para perguntar a rota).
- [ ] **Remover a faixa de demonstração** (`.demo-bar`) de todos os HTML, o bloco 0 do `js/main.js` e o CSS `.demo-bar`.

## Acessibilidade e qualidade

- Contraste AA em texto sobre fundo escuro e em botões.
- Navegação por teclado, *skip link*, `aria-*` em menu, lightbox e formulário.
- Textos alternativos em todas as imagens.
- Botões grandes (mín. 48px) e rótulos objetivos.
- Animações leves, desativadas com `prefers-reduced-motion`.
- Formulário com validação por campo e confirmação de envio.
- Informações de contato visíveis em todas as páginas (rodapé + botão flutuante de WhatsApp).
