# KamandNet2.0 - Autonomousappbuilder

## Overview
KamandNet2.0-autonomousappbuilder is a Next.js-based autonomous app builder that enables users to generate, deploy, and preview web applications dynamically. It leverages WebContainers to run a development environment in the browser, allowing real-time updates and previews.

## Features
- Web-based autonomous app building
- Dynamic preview using WebContainers
- Code generation and deployment APIs
- code improvement using Chat support
- Interactive UI with Tailwind CSS and TypeScript support

## Directory Structure
```
└── pihu26112005-autonomousappbuilder/
    ├── README.md              # Project documentation
    ├── components.json        # Component metadata
    ├── next.config.ts         # Next.js configuration
    ├── package.json           # Project dependencies
    ├── postcss.config.mjs     # PostCSS configuration
    ├── tailwind.config.ts     # Tailwind CSS configuration
    ├── tsconfig.json          # TypeScript configuration
    ├── app/                   # Application files
    │   ├── globals.css        # Global styles
    │   ├── layout.tsx         # Main layout component
    │   ├── (api)/             # API routes
    │   │   ├── agent/route.ts  # Agent API
    │   │   ├── deploy/route.ts # Deployment API
    │   │   └── template/route.ts # base prompt API
    │   ├── (frontend)/        # Frontend pages
    │       ├── page.tsx       # Main page
    │       └── builder/page.tsx # Builder UI
    ├── components/            # UI components
    │   ├── CodeShowComponent.tsx # Code display component
    │   ├── FileExplorer.tsx    # Generated Files Preview Component
    │   ├── Preview.tsx        # Live preview component
    │   └── ui/dialog.tsx      # UI Dialog component
    ├── hooks/
    │   └── useWebContainer.ts # Custom WebContainer hook
    ├── lib/
    │   └── utils.ts           # Utility functions
    ├── libs/                  # Libraries and helpers
    │   ├── baseTemplate.ts    # Base template configuration
    │   ├── prompts.ts         # Prompts for Agents
    │   └── sampack.ts         # Sample package configurations
    └── types/
        └── index.ts           # TypeScript types
```

## Installation
To set up the project locally:
```sh
git clone https://github.com/your-repo/pihu26112005-autonomousappbuilder.git
cd pihu26112005-autonomousappbuilder
npm install
```

## Running the Project
Start the Next.js development server:
```sh
npm run dev
```

## Building the Project
To build the project for production:
```sh
npm run build
```

## Technologies Used
- **Agent.ai** - for making multi-agent system
- **Next.js** - React framework & Nodejs base Backend
- **TypeScript** - Static type checking
- **Tailwind CSS** - Styling framework
- **WebContainers** - In-browser development environment
- **Vite** - Frontend tooling for temp project

## API Endpoints
### **1. `POST /api/agent/route.ts`**
- Description: Manages the AI agent for code generation
- Request Body:
  ```json
  { "prompt": "Build a Next.js app" }
  ```
- Response:
  ```json
  { "status": "success", "code": "Generated Code Here" }
  ```

### **2. `POST /api/deploy/route.ts`**
- Description: Deploys generated applications
- Request Body:
  ```json
  { "projectId": "12345" }
  ```
- Response:
  ```json
  { "status": "deployed", "url": "https://example.com" }
  ```

### **3. `GET /api/template/route.ts`**
- Description: Fetches predefined base prompts

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your branch and create a PR.


## Contact
For questions or issues, contact [piyushkumar26november@gmail.com].
