# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Client Layer                               │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │
│  │   Next.js   │  │  CKEditor 5 │  │   Plugins   │                  │
│  │   (React)   │  │  (Custom)   │  │   (SDK)     │                  │
│  └─────────────┘  └─────────────┘  └─────────────┘                  │
│                         │                                            │
│  ┌─────────────────────────────────────────────────┐                │
│  │              State Management (Zustand)          │                │
│  │              + React Query (Server State)        │                │
│  └─────────────────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ REST API / WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           API Gateway                                │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │
│  │   Rate      │  │   Auth      │  │   Routing   │                  │
│  │   Limiting  │  │   (JWT)     │  │             │                  │
│  └─────────────┘  └─────────────┘  └─────────────┘                  │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Service Layer (NestJS)                        │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │   Auth   │ │  Thesis  │ │ Template │ │  Plugin  │ │    AI    │  │
│  │  Module  │ │  Module  │ │  Module  │ │  Module  │ │  Module  │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────────────────────────┐ │
│  │ Payment  │ │  Export  │ │           Compliance Engine          │ │
│  │  Module  │ │  Module  │ │                                      │ │
│  └──────────┘ └──────────┘ └──────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          Data Layer                                  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │
│  │ PostgreSQL  │  │    Redis    │  │  Aliyun OSS │                  │
│  │   (RDS)     │  │   (Cache)   │  │  (Storage)  │                  │
│  └─────────────┘  └─────────────┘  └─────────────┘                  │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Design Decisions

### 1. Monorepo Structure (Turborepo)
- Shared packages for types, utilities, and compliance engine
- Independent apps for web and API
- Simplified dependency management

### 2. Plugin Architecture
- Plugins are first-class citizens
- Sandboxed execution for security
- Dynamic loading for extensibility

### 3. Template-Driven Formatting
- University rules stored as JSON
- Machine-readable for validation
- AI-readable for assistance

### 4. Horizontal Scalability
- Stateless API services
- Redis for session/cache
- S3-compatible object storage

## Data Flow

### Editing Flow
1. User edits content in CKEditor
2. onChange triggers compliance check
3. Compliance engine validates against template rules
4. Issues displayed in real-time
5. Auto-save to backend periodically

### AI Assistance Flow
1. User asks question in AI panel
2. Request sent to AI module
3. AI module processes with template context
4. Response may include rule change proposals
5. User reviews and approves changes

### Export Flow
1. User requests export (PDF/DOCX)
2. Backend queues export job
3. Worker processes with template rules
4. File stored in OSS
5. User downloads or shares
