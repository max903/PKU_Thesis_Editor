/**
 * PKU Thesis Editor - Plugin SDK
 * Core interfaces and utilities for plugin development
 */

export interface PluginContext {
  /** The CKEditor instance */
  editor: unknown; // CKEditor5 instance
  /** Plugin-specific configuration */
  config: Record<string, unknown>;
  /** API client for backend communication */
  api: PluginAPIClient;
  /** Compliance engine access */
  compliance: ComplianceEngine;
  /** Current thesis context */
  thesis: ThesisContext;
}

export interface PluginAPIClient {
  /** Make authenticated API requests */
  request<T>(path: string, options?: RequestOptions): Promise<T>;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
}

export interface ComplianceEngine {
  /** Check current content against rules */
  validate(): Promise<ValidationResult>;
  /** Get specific rule */
  getRule(ruleId: string): unknown;
}

export interface ValidationResult {
  passed: boolean;
  issues: ValidationIssue[];
}

export interface ValidationIssue {
  code: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  location?: { start: number; end: number };
}

export interface ThesisContext {
  /** Current thesis ID */
  thesisId: string;
  /** Current section being edited */
  currentSection: string;
  /** Degree type */
  degreeType: 'master' | 'doctor';
  /** Template being used */
  templateId: string;
}

/**
 * Plugin Definition
 */
export interface PluginDefinition {
  /** Unique plugin identifier */
  id: string;
  /** Display name */
  name: string;
  /** Plugin version */
  version: string;
  /** Plugin description */
  description?: string;
  /** Required dependencies */
  dependencies?: string[];
  /** Plugin initialization */
  init(context: PluginContext): void | Promise<void>;
  /** Plugin cleanup */
  destroy?(): void | Promise<void>;
  /** Event hooks */
  hooks?: PluginHooks;
  /** UI components */
  ui?: PluginUI;
}

export interface PluginHooks {
  /** Called when editor content changes */
  onChange?(content: string): void;
  /** Called before save */
  onBeforeSave?(content: string): string | Promise<string>;
  /** Called after save */
  onAfterSave?(): void;
  /** Called during validation */
  onValidate?(): ValidationIssue[] | Promise<ValidationIssue[]>;
  /** Called when section changes */
  onSectionChange?(sectionId: string): void;
}

export interface PluginUI {
  /** Toolbar items */
  toolbar?: ToolbarItem[];
  /** Sidebar panels */
  sidebar?: SidebarPanel[];
  /** Context menu items */
  contextMenu?: ContextMenuItem[];
  /** Status bar items */
  statusBar?: StatusBarItem[];
}

export interface ToolbarItem {
  id: string;
  label: string;
  icon?: string;
  tooltip?: string;
  onClick(): void;
  isEnabled?(): boolean;
  isActive?(): boolean;
}

export interface SidebarPanel {
  id: string;
  title: string;
  icon?: string;
  render(): HTMLElement | string;
  onActivate?(): void;
  onDeactivate?(): void;
}

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  onClick(): void;
  isVisible?(): boolean;
}

export interface StatusBarItem {
  id: string;
  render(): HTMLElement | string;
  position?: 'left' | 'center' | 'right';
}

/**
 * Plugin Registry
 */
export class PluginRegistry {
  private plugins = new Map<string, PluginDefinition>();
  private instances = new Map<string, unknown>();

  register(plugin: PluginDefinition): void {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin ${plugin.id} is already registered`);
    }
    this.plugins.set(plugin.id, plugin);
  }

  unregister(pluginId: string): void {
    this.plugins.delete(pluginId);
    this.instances.delete(pluginId);
  }

  get(pluginId: string): PluginDefinition | undefined {
    return this.plugins.get(pluginId);
  }

  getAll(): PluginDefinition[] {
    return Array.from(this.plugins.values());
  }

  async initializeAll(context: PluginContext): Promise<void> {
    for (const plugin of this.plugins.values()) {
      await plugin.init(context);
    }
  }

  async destroyAll(): Promise<void> {
    for (const plugin of this.plugins.values()) {
      if (plugin.destroy) {
        await plugin.destroy();
      }
    }
  }
}

/**
 * Create a new plugin
 */
export function definePlugin(definition: PluginDefinition): PluginDefinition {
  return definition;
}

export const pluginRegistry = new PluginRegistry();
