# StackHat Client App

A React-based single-page application (SPA) for the StackHat platform, featuring enterprise capabilities including multi-tenant support, SSO authentication, and customizable theming.

## Technology Stack

- **React 18** - Modern React with Hooks
- **MobX 6** - Reactive state management
- **React Router 6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Bootstrap 3** - UI framework (via react-bootstrap)
- **Sass** - CSS preprocessing
- **Webpack 5** - Module bundling
- **Jest** - Testing framework
- **ESLint** - Code linting

## Features

- User authentication (password + SSO/OpenID Connect)
- Multi-tenant organization support
- Role-based access control
- Theme customization per organization
- Idle session timeout
- Version checking and auto-reload

## Getting Started

### Prerequisites

- Node.js 18+
- npm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/C20S-Ventures/stackhat-client-app.git
cd stackhat-client-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server (port 4001)
npm run dev

# Start with test backend (port 4002)
npm run devtest

# Start with demo backend (port 4003)
npm run devdemo
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

### Building

```bash
# Production build
npm run prod

# Build and create version tag
npm run dist
```

## Project Structure

```
src/
├── areas/              # Page-level components
│   ├── public/         # Login, Logout, Password reset
│   ├── dashboard/      # User dashboard
│   ├── account/        # User account management
│   └── settings/       # Admin settings
├── components/         # Reusable UI components
│   ├── forms/          # Form inputs and fields
│   ├── modals/         # Modal dialogs
│   ├── navigation/     # Navigation components
│   ├── routing/        # Private routes
│   └── errors/         # Error boundaries
├── services/           # Business logic & API layer
├── stores/             # MobX state stores
├── styles/             # Global SCSS styles
├── config/             # Environment configurations
└── assets/             # Static assets
```

## Configuration

Environment configurations are in `src/config/`:

- `Base.js` - Base configuration for all environments
- `Dev.js` - Local development
- `DevTest.js` - Development with test backend
- `DevDemo.js` - Development with demo backend
- `Test.js`, `Demo.js`, `Live.js` - Production environments

## Contributing

1. Create a feature branch
2. Make changes
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Submit a pull request

## License

ISC
