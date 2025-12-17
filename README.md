# PKU Thesis Editor

A web-based thesis editor platform that enforces strict PKU (Peking University) graduate thesis formatting standards.

## Overview

This project aims to help Chinese graduate students write theses that are **100% compliant** with university formatting requirements. Starting with PKU, the system is designed to be extensible to other universities through a plugin architecture.

### Key Features

- **Structured Editor**: Guided thesis sections based on official PKU guidelines
- **Real-time Compliance**: Instant validation of formatting rules
- **AI Assistant**: Get help with formatting questions and content suggestions
- **Plugin System**: Extensible architecture for custom features
- **Export**: Generate compliant PDF/DOCX documents

## Project Status

**Phase 1: Concept Prototype** (In Development)

See [Mission.txt](./Mission.txt) for the full project specification.

## Tech Stack

- **Frontend**: Next.js, React, CKEditor 5, Ant Design
- **Backend**: NestJS, TypeScript, PostgreSQL, Redis
- **Infrastructure**: Docker, Kubernetes, Aliyun
- **Payments**: WeChat Pay (China market)

## Quick Start

```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Or use Docker
docker-compose up -d
```

## Documentation

- [CLAUDE.md](./CLAUDE.md) - AI assistant guide and project details
- [Architecture Overview](./docs/architecture/overview.md)
- [PKU Thesis Writing Guide](./研究生学位论文写作指南.pdf) - Official PKU guidelines (Chinese)

## Project Structure

```
PKU_Thesis_Editor/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend
├── packages/
│   ├── types/        # Shared TypeScript types
│   ├── compliance/   # Formatting validation engine
│   └── editor/       # CKEditor custom build
├── plugins/          # Plugin system
├── templates/        # University templates (PKU)
├── docs/             # Documentation
└── infrastructure/   # Docker, K8s configs
```

## License

MIT

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.