# Guess The Game 🎮

**Um jogo de adivinhação onde você precisa descobrir o nome de um jogo baseado em imagens e dicas!**

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/IGDB_API-000000?style=for-the-badge" alt="IGDB API">
</div>

## 📌 Visão Geral

"Guess The Game" é um jogo onde você recebe imagens gradualmente mais reveladoras de um jogo e precisa adivinhar seu nome. Quanto mais rápido você acertar, mais pontos ganha!

## ✨ Funcionalidades

- ✔ **Sistema de Pontuação** (Diminui com erros e dicas usadas)
- ✔ **Dicas Estratégicas** (Cada dica custa pontos)
- ✔ **Persistência no LocalStorage** (Salva progresso e recordes)
- ✔ **Modo Cooldown** (Evita abuso de requisições à API)
- ✔ **Efeitos Visuais** (Confetti ao vencer, imagens filtradas)
- ✔ **Totalmente Responsivo** (Mobile & Desktop)

## ⚙️ Tecnologias Utilizadas

- **Next.js** (App Router, Server Components, API Routes)
- **React** (useReducer, Context API, Hooks)
- **Tailwind CSS** (Estilização rápida e responsiva)
- **IGDB API** (Banco de dados de jogos e screenshots)
- **LocalStorage** (Persistência de estado e pontuação)
- **Lucide Icons** (Ícones modernos)

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js (v18+)
- NPM ou Yarn
- Chave de API do IGDB ([Como obter](https://api-docs.igdb.com/))

### Passo a Passo

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/guess-the-game.git
   cd guess-the-game
   ```

2. **Instale as dependências**

   > _Algumas dependências podem exigir `--force` devido a conflitos de versão_

   ```bash
   npm install --force
   # ou
   yarn install --force
   ```

3. **Configure a API Key do IGDB**

   Crie um arquivo `.env.local` na raiz do projeto:

   ```env
    SECRET=sua_chave_secreta
    CLIENT_ID=seu_client_id
    TOKEN=seu_access_token
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    COOLDOWN_TIME=0
   ```

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse no navegador**

   Abra [http://localhost:3000](http://localhost:3000)

## 📂 Estrutura do Projeto

```
guess-the-game/
├── app/                  # Next.js App Router
│   ├── api/              # Rotas da API (IGDB)
│   └── page.js/          # Páginas principal do jogo
├── components/           # Componentes React
│   └── page/             # Componentes Importantes
├── public/               # Assets estáticos
├── utils/                # Funções auxiliares
└── README.md             # Este arquivo
```

## 🔧 Possíveis Problemas & Soluções

### Erro ao instalar dependências

Se ocorrerem conflitos, use:

```bash
npm install --legacy-peer-deps --force
```

### API do IGDB não responde

Verifique:

- ✅ Se a chave de API está correta no `.env.local`
- ✅ Se a conta da IGDB tem créditos disponíveis

### LocalStorage não persiste

Alguns navegadores bloqueiam localStorage em modo privado. Teste em modo normal.

## 📜 Licença

MIT License - Livre para uso e modificação.

---

**Gostou? Dê uma ⭐ no repositório!**

**Quer contribuir? Abra uma PR ou Issue!**

🚀 **Divirta-se jogando!** 🚀
