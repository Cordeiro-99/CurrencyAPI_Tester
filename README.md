# 💱 CurrencyAPI Tester

Este projeto é uma aplicação **Web** moderna e responsiva, desenvolvida para demonstrar a capacidade de **consumir e processar dados de uma API de taxas de câmbio em tempo real**. Serve como um exercício prático na integração de serviços externos e na construção de interfaces de utilizador dinâmicas.

---

## 🚀 Funcionalidades

A aplicação oferece as seguintes funcionalidades principais:

1.  **Seleção de Moedas:** Permite ao utilizador selecionar a moeda de origem e a moeda de destino a partir de uma lista abrangente (ex: EUR, USD, JPY, BRL, etc.).
2.  **Conversão em Tempo Real:** Calcula e exibe o valor convertido instantaneamente após a inserção do montante.
3.  **Interface Intuitiva:** Um *design* limpo e minimalista que facilita a utilização.
4.  **Modo Escuro (Dark Mode):** Alternância entre temas claro e escuro para melhor ergonomia visual.

---

## ⚙️ Como Utilizar (Desenvolvimento Local)

Para executar este projeto localmente, siga os passos abaixo:

### Pré-requisitos

*   Node.js (versão 18+)
*   Uma chave de API da [ExchangeRate-API](https://www.exchangerate-api.com/)

### Instalação

1.  **Clonar o repositório:**
    ```bash
    git clone https://github.com/Cordeiro-99/CurrencyAPI_Tester.git
    cd CurrencyAPI_Tester
    ```

2.  **Instalar as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configurar a Chave de API:**
    Crie um ficheiro `.env` na raiz do projeto e adicione a sua chave de API:
    ```
    VITE_EXCHANGE_API_KEY="SUA_CHAVE_DE_API_AQUI"
    ```

4.  **Iniciar a Aplicação:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    A aplicação estará acessível em `http://localhost:5173` (ou porta similar).

---


## 👤 Autor

**Bruno Cordeiro**

*   [GitHub](https://github.com/Cordeiro-99)
---

## 🔗 Referências

[1] [ExchangeRate-API](https://www.exchangerate-api.com/) - A API de taxas de câmbio utilizada neste projeto.
