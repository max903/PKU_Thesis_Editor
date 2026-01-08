# CLAUDE.md - PKU Thesis Editor Project Guide

## Project Overview

A web-based thesis editor platform that enforces strict PKU (Peking University) graduate thesis formatting standards. The system is designed to be **open-source**, **cloud-native**, **horizontally scalable**, with a clear **freemium monetization** path.

### Vision
- Help students write theses **100% compliant** with university formatting standards
- Provide a **guided, structured editor** (not free-form word processor)
- Integrate **AI assistants** for formatting guidance and content assistance
- Use **plugin architecture** for extensibility to other universities
- Target Chinese market initially (Aliyun infrastructure, WeChat Pay)

## Quick Start Commands

```bash
# Development (once set up)
cd /home/user/PKU_Thesis_Editor
npm install                    # Install dependencies
npm run dev                    # Start development server
npm run build                  # Production build
npm run test                   # Run tests
npm run lint                   # Lint code

# Docker (once configured)
docker-compose up -d           # Start all services
docker-compose logs -f         # View logs
```

## Architecture Overview

### Tech Stack (Recommended)

**Frontend:**
- Framework: Next.js (React with SSR/SSG)
- Editor: CKEditor 5 (DecoupledDocumentEditor, custom build)
- UI: Ant Design (Chinese-market-ready)
- State: Zustand + React Query

**Backend:**
- Framework: NestJS (Node.js + TypeScript)
- API: REST (GraphQL optional for later)
- Database: PostgreSQL (Aliyun RDS)
- Cache: Redis (Aliyun Redis)
- Storage: Aliyun OSS
- Queue: Aliyun MNS / RocketMQ

**Infrastructure:**
- Cloud: Aliyun (Alibaba Cloud)
- Container: Docker + Kubernetes (ACK)
- CI/CD: GitHub Actions
- Monitoring: Prometheus + Grafana / Aliyun ARMS

**Payments:**
- WeChat Pay (Native/JSAPI/QR code)

## PKU Thesis Formatting Rules (Key Requirements)

Based on 《北京大学研究生学位论文写作指南》(2014):

### Document Structure (10 Sections)
1. **封面 (Cover)** - University-specified format
2. **版权声明 (Copyright Declaration)** - Fixed format
3. **中文摘要 (Chinese Abstract)** - 800-1000 chars (PhD), ~600 chars (Master)
4. **英文摘要 (English Abstract)** - ABSTRACT
5. **目录 (Table of Contents)** - Up to 3 levels
6. **主要符号对照表 (Symbol Table)** - Optional
7. **正文 (Main Text)** - Introduction through Conclusion
8. **参考文献 (References)** - Sequential or Author-Year system
9. **附录 (Appendix)** - Optional, labeled A, B, C...
10. **致谢 (Acknowledgments)** + **原创性声明 (Originality Declaration)**

### Page Setup
- Paper: A4 (21.0cm × 29.7cm)
- Margins: Top 3.0cm, Bottom 2.5cm, Left 2.6cm, Right 2.6cm
- Binding: Left side
- Header: 2.0cm from edge, Footer: 1.75cm from edge

### Font Requirements
| Element | Chinese Font | English/Numbers Font | Size |
|---------|-------------|---------------------|------|
| Default body | 宋体 (SimSun) | Times New Roman | 小四 (12pt) |
| Chapter title | 黑体 (SimHei) | - | 三号 (16pt) |
| Section 1 (X.X) | 黑体 | - | 四号 (14pt) |
| Section 2 (X.X.X) | 黑体 | - | 13pt |
| Section 3 (X.X.X.X) | 黑体 | - | 小四 (12pt) |
| Abstract title | 黑体 | Arial | 三号 |
| References | 宋体 | Times New Roman | 五号 (10.5pt) |

### Heading Hierarchy
- **Chapter**: "第一章 引言" - 黑体三号, centered, single-spaced, 24pt before, 18pt after
- **Section 1**: "2.1 实验方法" - 黑体四号, left-aligned, 20pt line, 24pt before, 6pt after
- **Section 2**: "2.1.1 实验装置" - 黑体13pt, left-aligned, 20pt line, 12pt before, 6pt after
- **Section 3**: "2.1.2.1 归纳法" - 黑体小四, left-aligned, 20pt line, 12pt before, 6pt after

### Paragraph Formatting
- Line spacing: Fixed 20pt
- First line indent: 2 Chinese characters
- Alignment: Justified

### Page Numbering
- Before main text (Abstract to TOC): Roman numerals (Ⅰ, Ⅱ, Ⅲ...)
- Main text onwards: Arabic numerals (1, 2, 3...)
- Position: Center footer, Times New Roman 五号

### Figure & Table Numbering
- Format: Chapter.Sequence (e.g., 图 2.1, 表 4.1, 式(1.2))
- Figure caption: Below figure, 宋体 11pt, centered
- Table caption: Above table, 宋体 11pt, centered

### Reference Styles
Two supported systems:
1. **顺序编码制** (Sequential): [1], [2], [3]...
2. **著者-出版年制** (Author-Year): (张三, 2020)

## Project Structure

```
PKU_Thesis_Editor/
├── CLAUDE.md                 # This file - AI assistant guide
├── Mission.txt               # Project specification
├── 研究生学位论文写作指南.pdf    # PKU formatting guide
├── 論文模版 (20251207a).docx   # Sample thesis template
│
├── apps/                     # Application packages
│   ├── web/                  # Next.js frontend
│   │   ├── src/
│   │   │   ├── components/   # React components
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   ├── pages/        # Next.js pages
│   │   │   ├── styles/       # Global styles
│   │   │   └── utils/        # Utility functions
│   │   ├── public/           # Static assets
│   │   └── package.json
│   │
│   └── api/                  # NestJS backend
│       ├── src/
│       │   ├── modules/      # Feature modules
│       │   │   ├── auth/
│       │   │   ├── thesis/
│       │   │   ├── template/
│       │   │   ├── plugin/
│       │   │   ├── payment/
│       │   │   └── ai/
│       │   ├── common/       # Shared utilities
│       │   └── main.ts
│       └── package.json
│
├── packages/                 # Shared packages
│   ├── editor/               # CKEditor custom build
│   ├── pku-template/         # PKU formatting rules (JSON)
│   ├── compliance/           # Compliance checking engine
│   ├── types/                # Shared TypeScript types
│   └── utils/                # Shared utilities
│
├── plugins/                  # Plugin system
│   ├── core/                 # Plugin SDK
│   └── examples/             # Example plugins
│
├── templates/                # University templates
│   └── pku/                  # PKU-specific rules
│       ├── rules.json        # Machine-readable formatting rules
│       ├── sections.json     # Required sections definition
│       └── styles.json       # Style definitions
│
├── docs/                     # Documentation
│   ├── architecture/         # Architecture decisions
│   ├── api/                  # API documentation
│   └── guides/               # User guides
│
├── infrastructure/           # Infrastructure as Code
│   ├── docker/               # Docker configurations
│   ├── k8s/                  # Kubernetes manifests
│   └── terraform/            # Aliyun Terraform configs
│
├── scripts/                  # Build and deployment scripts
├── docker-compose.yml        # Local development
├── package.json              # Monorepo root
├── turbo.json                # Turborepo config
└── tsconfig.json             # TypeScript config
```

## Development Phases

### Phase 1: Concept Prototype (Current Focus)
**Goal**: Single-page web prototype demonstrating core concepts

**Deliverables**:
- [ ] Thesis editor UI with fixed PKU template
- [ ] Left panel: Thesis outline (fixed sections)
- [ ] Center panel: Rich-text editor (CKEditor 5)
- [ ] Right panel: Compliance panel (rule satisfaction, warnings)
- [ ] AI conversation panel for formatting questions
- [ ] Basic plugin system skeleton
- [ ] Mock auth (no real authentication)

**Key Features**:
- Preset PKU-like rules (approximate)
- Fixed section order: Cover → Abstract CN → Abstract EN → TOC → Chapters → References
- Heading levels limited to 1-3
- Basic compliance checking

### Phase 2: MVP with Authentication
- Real user authentication (email/phone)
- Persistent thesis storage
- Export to PDF/DOCX
- Basic subscription system

### Phase 3: Production Release
- Full WeChat Pay integration
- Plugin marketplace
- Multi-university support
- Institutional accounts

## Core Domain Model

### Key Entities
- **User**: id, email, phone, role (student/admin/institution), plan (free/pro/institutional)
- **ThesisProject**: id, user_id, title, university_id, template_id, status (draft/review/locked)
- **Section**: id, thesis_id, type (enum), order_index, data (JSON), content (rich-text)
- **Template**: id, university_id, name, version, rules (JSON)
- **Plugin**: id, name, key, version, enabled, config_schema, ui_integration_points

### Section Types (PKU)
```typescript
enum SectionType {
  COVER = 'cover',
  COPYRIGHT = 'copyright',
  ABSTRACT_CN = 'abstract_cn',
  ABSTRACT_EN = 'abstract_en',
  TOC = 'toc',
  SYMBOLS = 'symbols',          // Optional
  CHAPTER = 'chapter',
  REFERENCES = 'references',
  APPENDIX = 'appendix',
  ACKNOWLEDGEMENTS = 'acknowledgements',
  DECLARATION = 'declaration'
}
```

## AI Integration Guidelines

When working on AI features:
1. **Abstracted API**: Use `/api/ai/*` endpoints, allowing LLM provider swapping
2. **Formatting Guidance**: AI should explain PKU rules and suggest corrections
3. **Rule Proposals**: AI can propose JSON diffs for template rule changes
4. **User Approval**: All AI-proposed changes require user inspection and approval
5. **Plugin Creation**: AI can help users create/configure plugins

## Plugin Architecture

### Plugin Capabilities
- Add toolbar buttons
- Add sidebar panels
- Subscribe to editor events (onChange, onSave, onValidate)
- Access compliance engine
- Limited network access (through provided APIs only)

### Example Plugin: Word Count Checker
```typescript
interface Plugin {
  id: string;
  name: string;
  hooks: {
    onChange?: (content: string) => void;
    onValidate?: () => ValidationResult[];
  };
  ui?: {
    toolbar?: ToolbarItem[];
    sidebar?: SidebarPanel[];
  };
}
```

## Monetization Strategy

### Freemium Model
**Free Tier**:
- 1 thesis project
- Basic formatting compliance
- Community support

**Pro Tier** (个人专业版):
- Unlimited projects
- Advanced compliance checking
- AI formatting assistant
- PDF/DOCX export
- Priority support

**Institutional** (机构版):
- Bulk user management
- Custom templates
- API access
- Dedicated support

### Payment Integration
- Primary: WeChat Pay (China)
- Secondary: Alipay
- International: Stripe (future)

## Code Style & Conventions

- **Language**: TypeScript (strict mode)
- **Formatting**: Prettier + ESLint
- **Testing**: Jest + React Testing Library
- **Commits**: Conventional Commits (feat:, fix:, docs:, etc.)
- **i18n**: Support zh-CN and en from the start

## Important Notes

1. **PKU Rules are Authoritative**: Always refer to 《研究生学位论文写作指南》for formatting decisions
2. **No Over-Engineering**: Start simple, add complexity as needed
3. **Plugin-First**: Design features as plugins where possible
4. **AI Transparency**: Users must see and approve all AI-proposed changes
5. **Mobile-Aware**: While primarily desktop, ensure basic mobile compatibility

## Reference Documents

- `Mission.txt` - Full project specification
- `研究生学位论文写作指南.pdf` - Official PKU formatting guide (2014)
- `論文模版 (20251207a).docx` - Sample thesis template

## Getting Help

For questions about:
- **PKU formatting rules**: Refer to the PDF guide in this repo
- **Architecture decisions**: Check `/docs/architecture/`
- **API usage**: Check `/docs/api/`
