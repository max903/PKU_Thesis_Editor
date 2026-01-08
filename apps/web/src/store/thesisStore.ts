import { create } from 'zustand';

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

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  content: string;
  order: number;
  chapterNumber?: number;
}

export interface FormatIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  section?: string;
  rule: string;
}

export interface Reference {
  id: string;
  type: 'book' | 'article' | 'thesis' | 'website' | 'other';
  authors: string;
  title: string;
  year: string;
  source?: string;
  url?: string;
}

interface ThesisState {
  // Thesis metadata
  title: string;
  author: string;
  studentId: string;
  department: string;
  major: string;
  supervisor: string;
  degreeType: 'master' | 'doctor';

  // Sections
  sections: Section[];
  currentSectionId: string | null;

  // Editor state
  viewMode: 'web' | 'page';
  editorContent: string;

  // Format checking
  formatIssues: FormatIssue[];
  isCheckingFormat: boolean;
  enabledPlugins: string[];

  // References
  references: Reference[];

  // Actions
  setTitle: (title: string) => void;
  setViewMode: (mode: 'web' | 'page') => void;
  setEditorContent: (content: string) => void;
  setCurrentSection: (sectionId: string | null) => void;
  addSection: (section: Omit<Section, 'id'>) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
  removeSection: (id: string) => void;
  reorderSections: (sections: Section[]) => void;
  checkFormat: () => void;
  addReference: (reference: Omit<Reference, 'id'>) => void;
  removeReference: (id: string) => void;
  generateTOC: () => void;
}

// Default sections for PKU thesis
const defaultSections: Section[] = [
  { id: 'cover', type: 'cover', title: '封面', content: '', order: 1 },
  { id: 'copyright', type: 'copyright', title: '版权声明', content: '', order: 2 },
  { id: 'abstract_cn', type: 'abstract_cn', title: '摘要', content: '', order: 3 },
  { id: 'abstract_en', type: 'abstract_en', title: 'ABSTRACT', content: '', order: 4 },
  { id: 'toc', type: 'toc', title: '目录', content: '', order: 5 },
  { id: 'chapter_1', type: 'chapter', title: '第一章 引言', content: '', order: 6, chapterNumber: 1 },
  { id: 'references', type: 'references', title: '参考文献', content: '', order: 7 },
  { id: 'acknowledgements', type: 'acknowledgements', title: '致谢', content: '', order: 8 },
  { id: 'declaration', type: 'declaration', title: '原创性声明', content: '', order: 9 },
];

// Default enabled plugins
const defaultPlugins = [
  'CnAbstractHeadingRule',
  'BodyParagraphStyleRule',
  'H1ChapterHeadingRule',
  'ReferenceSectionRule',
  'EnAbstractRule',
  'MinimumWordCountRule',
];

export const useThesisStore = create<ThesisState>((set, get) => ({
  // Initial state
  title: '北京大学研究生学位论文',
  author: '',
  studentId: '',
  department: '',
  major: '',
  supervisor: '',
  degreeType: 'master',

  sections: defaultSections,
  currentSectionId: null,

  viewMode: 'web',
  editorContent: `<h1>北京大学研究生学位论文</h1>
<p>请在此处开始撰写您的论文，或通过上方工具栏插入章节模板。</p>
<p>本系统采用模块化Plugin架构，每个格式规则都是独立的插件。</p>
<h2>使用说明</h2>
<ol>
<li>切换"Web模式"和"页面模式"查看不同的显示效果</li>
<li>点击"检查格式"可以看到所有已启用的Plugin检查结果</li>
<li>支持图片插入和粘贴（Ctrl+V）</li>
<li>点击"导出DOCX"保存为Word文档</li>
</ol>`,

  formatIssues: [],
  isCheckingFormat: false,
  enabledPlugins: defaultPlugins,

  references: [],

  // Actions
  setTitle: (title) => set({ title }),

  setViewMode: (viewMode) => set({ viewMode }),

  setEditorContent: (editorContent) => set({ editorContent }),

  setCurrentSection: (currentSectionId) => set({ currentSectionId }),

  addSection: (section) => {
    const id = `section_${Date.now()}`;
    set((state) => ({
      sections: [...state.sections, { ...section, id }].sort((a, b) => a.order - b.order),
    }));
  },

  updateSection: (id, updates) => {
    set((state) => ({
      sections: state.sections.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  },

  removeSection: (id) => {
    set((state) => ({
      sections: state.sections.filter((s) => s.id !== id),
    }));
  },

  reorderSections: (sections) => set({ sections }),

  checkFormat: () => {
    set({ isCheckingFormat: true });

    // Simulate format checking
    setTimeout(() => {
      const content = get().editorContent;
      const issues: FormatIssue[] = [];

      // Check for common issues
      if (content.length < 100) {
        issues.push({
          id: '1',
          type: 'warning',
          message: '内容较少，请继续撰写论文内容',
          rule: 'MinimumWordCountRule',
        });
      }

      if (!content.includes('<h1>')) {
        issues.push({
          id: '2',
          type: 'error',
          message: '缺少一级标题（章标题）',
          rule: 'H1ChapterHeadingRule',
        });
      }

      set({ formatIssues: issues, isCheckingFormat: false });
    }, 500);
  },

  addReference: (reference) => {
    const id = `ref_${Date.now()}`;
    set((state) => ({
      references: [...state.references, { ...reference, id }],
    }));
  },

  removeReference: (id) => {
    set((state) => ({
      references: state.references.filter((r) => r.id !== id),
    }));
  },

  generateTOC: () => {
    // Extract headings from content and update TOC
    const content = get().editorContent;
    const headings: string[] = [];

    // Simple regex to find headings
    const h1Matches = content.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
    const h2Matches = content.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
    const h3Matches = content.match(/<h3[^>]*>(.*?)<\/h3>/gi) || [];

    console.log('Generated TOC:', { h1Matches, h2Matches, h3Matches });
  },
}));
