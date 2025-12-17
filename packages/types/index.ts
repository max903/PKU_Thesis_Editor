/**
 * PKU Thesis Editor - Shared Types
 * Core type definitions used across the application
 */

// User types
export interface User {
  id: string;
  email?: string;
  phone?: string;
  passwordHash: string;
  role: UserRole;
  plan: SubscriptionPlan;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'student' | 'admin' | 'partner_university';
export type SubscriptionPlan = 'free' | 'pro' | 'institutional';

// Thesis types
export interface ThesisProject {
  id: string;
  userId: string;
  title: string;
  universityId: string;
  templateId: string;
  status: ThesisStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ThesisStatus = 'draft' | 'ready_for_review' | 'locked_for_submission';

// Section types
export interface Section {
  id: string;
  thesisId: string;
  type: SectionType;
  orderIndex: number;
  data: Record<string, unknown>;
  content: string; // Rich-text as HTML/JSON
}

export type SectionType =
  | 'cover'
  | 'copyright'
  | 'abstract_cn'
  | 'abstract_en'
  | 'toc'
  | 'symbols'
  | 'chapter'
  | 'references'
  | 'appendix'
  | 'acknowledgements'
  | 'declaration';

// Template types
export interface Template {
  id: string;
  universityId: string;
  name: string;
  version: string;
  rules: TemplateRules;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateRules {
  pageSetup: PageSetup;
  fonts: FontConfig;
  headings: HeadingConfig;
  paragraph: ParagraphConfig;
  abstract: AbstractConfig;
  figures: FigureConfig;
  tables: TableConfig;
  references: ReferenceConfig;
}

export interface PageSetup {
  paperSize: { width: string; height: string; name: string };
  margins: {
    top: string;
    bottom: string;
    left: string;
    right: string;
    gutter: string;
    gutterPosition: 'left' | 'right';
  };
  header: { distance: string };
  footer: { distance: string };
}

export interface FontConfig {
  chinese: { default: string; heading: string; cover: string };
  english: { default: string; heading: string };
}

export interface HeadingConfig {
  chapter: HeadingStyle;
  section1: HeadingStyle;
  section2: HeadingStyle;
  section3: HeadingStyle;
}

export interface HeadingStyle {
  format: string;
  numbering: 'chinese' | 'arabic' | 'roman';
  font: string;
  size: string;
  alignment: 'left' | 'center' | 'right';
  lineSpacing: string;
  spaceBefore: string;
  spaceAfter: string;
}

export interface ParagraphConfig {
  font: string;
  fontEnglish: string;
  size: string;
  lineSpacing: string;
  firstLineIndent: string;
  alignment: 'left' | 'center' | 'right' | 'justify';
}

export interface AbstractConfig {
  chinese: {
    title: string;
    minLength: { master: number; doctor: number };
    maxLength: { master: number; doctor: number };
    keywords: { count: { min: number; max: number }; separator: string };
  };
  english: {
    titleLabel: string;
    keywords: { label: string; separator: string };
  };
}

export interface FigureConfig {
  numbering: string;
  captionPosition: 'above' | 'below';
  labelFormat: string;
}

export interface TableConfig {
  numbering: string;
  captionPosition: 'above' | 'below';
  labelFormat: string;
}

export interface ReferenceConfig {
  citationStyles: ('sequential' | 'author-year')[];
  defaultStyle: 'sequential' | 'author-year';
}

// Plugin types
export interface Plugin {
  id: string;
  name: string;
  key: string;
  version: string;
  enabled: boolean;
  configSchema: Record<string, unknown>;
  uiIntegrationPoints: UIIntegrationPoint[];
  backendHooks: string[];
}

export type UIIntegrationPoint = 'toolbar' | 'sidebar' | 'context_menu' | 'footer';

// Compliance types
export interface ComplianceResult {
  passed: boolean;
  errors: ComplianceIssue[];
  warnings: ComplianceIssue[];
}

export interface ComplianceIssue {
  code: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  section?: string;
  location?: { start: number; end: number };
  suggestion?: string;
}

// AI types
export interface AIRequest {
  type: 'explain' | 'suggest' | 'generate';
  context: string;
  query: string;
}

export interface AIResponse {
  text: string;
  proposedChanges?: TemplateRuleDiff[];
}

export interface TemplateRuleDiff {
  path: string;
  oldValue: unknown;
  newValue: unknown;
  explanation: string;
}
