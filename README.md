# Kobe - Base

## Presentation

[Kobe - Presentation]([https://www.figma.com/slides/tmOQDZXXDg6shYu2XgL9BQ/kobe-deck-base?node-id=1-305&node-type=slide](https://www.figma.com/deck/UeDJVwaaKfwmjrHCc4c9PO/kobe-deck-base?node-id=1-305&node-type=slide&t=IWjEYCshXFGZXHZn-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1))

[Video introducing Kobe](https://www.youtube.com/watch?v=zvIfosxRu8A)

## Description

This project is a developer tool designed for the blockchain ecosystem, powered by Large Language Models (LLMs). The tool provides a seamless interface for developers to interact with the model, offering a range of features to enhance the blockchain development experience. Whether you're generating code, testing it, compiling, deploying, or seeking the latest information in the blockchain space, this tool has you covered.

With Kobe, anyone can automate the creation and development of a smart contract, from generation to deployment on the Base blockchain, all within one environment.

## Features

- **Smart Contract Generation**: Automatically generates contracts for the Base blockchain using artificial intelligence.
- **Testing and Validation**: Validates and tests the generated smart contracts before deployment.
- **Compilation and Deployment**: Compiles and deploys contracts directly onto the Base blockchain from the tool.
- **Real-Time Information**: Access the latest blockchain updates through Retrieval-Augmented Generation (RAG) technologies, ensuring you're always up-to-date.

## Installation

To generate, compile, and deploy contracts on the Base blockchain using Kobe, follow these steps:

### Prerequisites for using Kobe

Make sure you have the following tools installed on your system:

1. **Node.js and npm**: Kobe uses npm to handle frontend dependencies.
   - Install Node.js and npm [here](https://nodejs.org/en/download/), or with a package manager like `nvm`:
     ```bash
     nvm install node
     ```

2. **Yarn**: Yarn is a package manager that helps manage frontend dependencies efficiently.
   - Install Yarn globally using npm:
     ```bash
     npm install -g yarn
     ```

3. **Base CLI**: Required to interact with the Base blockchain, including compiling and deploying contracts.
   - Install the Base CLI by running:
     ```bash
     curl -o- https://cli.base.org/install.sh | bash
     ```
     More details can be found in the official documentation: [Base CLI - download](https://docs.base.org/cli/install-base-cli-tools).

4. **Solidity**: Ensure that the Solidity compiler is available in your environment, as Base smart contracts are written in Solidity.
   - Install Solidity by running:
     ```bash
     npm install -g solc
     ```
     You can verify the installation with:
     ```bash
     solc --version
     ```
     For more information, check the official [Solidity installation guide](https://docs.soliditylang.org/en/v0.8.19/installing-solidity.html).

### Installation Steps

1. Run `yarn install` at the root of the project to install the dependencies.

2. Navigate to the `frontend` directory and run:
   ```bash
   npm run build
   ```

3. Start the frontend application:
   ```bash
   npm start
   ```

4. In another terminal, run the backend service:
   ```bash
   node backend/redireccionador/index.js
   ```

## API Keys

Kobe is powered by large language models (LLMs). Therefore, it is necessary to provide the API keys for the services we use to access these capabilities (Claude-Anthropic and GPT-OpenAI). Add the required keys to the `.env` file in the root of the project.

### Disclaimer

If you do not wish to use the RAG functionality (which helps keep you updated with the latest Base developments), you can comment out or remove the following code snippet in the file `backend/ragBranch/index.js`:

```javascript
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = "https://eajrvhzuisvfdqkobved.supabase.co";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

## External Resources

This project leverages the power of Base blockchain to generate, compile, and deploy smart contracts using Solidity quickly, securely, and efficiently.

## User Conversations Data

We are committed to protecting user data. All information generated in conversations is handled securely and will never be shared.
