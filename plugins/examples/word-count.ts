/**
 * Word Count Plugin Example
 * Demonstrates basic plugin structure for PKU Thesis Editor
 */

import { definePlugin, PluginContext, ValidationIssue } from '../core';

interface WordCountState {
  totalChars: number;
  totalWords: number;
  sectionCounts: Map<string, { chars: number; words: number }>;
}

export default definePlugin({
  id: 'word-count',
  name: '字数统计',
  version: '1.0.0',
  description: '实时显示论文字数统计，检查摘要长度合规性',

  init(context: PluginContext) {
    console.log('Word Count plugin initialized');

    // Initialize state
    const state: WordCountState = {
      totalChars: 0,
      totalWords: 0,
      sectionCounts: new Map()
    };

    // Set up hooks
    if (this.hooks?.onChange) {
      this.hooks.onChange = (content: string) => {
        updateCounts(content, state);
        updateUI(state);
      };
    }
  },

  hooks: {
    onChange(content: string) {
      // Implemented in init
    },

    async onValidate(): Promise<ValidationIssue[]> {
      const issues: ValidationIssue[] = [];
      // This will be connected to compliance engine
      return issues;
    }
  },

  ui: {
    statusBar: [
      {
        id: 'word-count-display',
        position: 'right',
        render() {
          return `<span class="word-count">字数: 0 | 词数: 0</span>`;
        }
      }
    ],

    sidebar: [
      {
        id: 'word-count-panel',
        title: '字数统计',
        icon: 'calculator',
        render() {
          return `
            <div class="word-count-panel">
              <h3>论文统计</h3>
              <div class="stat-row">
                <span class="label">总字符数:</span>
                <span class="value" id="total-chars">0</span>
              </div>
              <div class="stat-row">
                <span class="label">总词数:</span>
                <span class="value" id="total-words">0</span>
              </div>
              <h4>各章节统计</h4>
              <div id="section-stats"></div>
            </div>
          `;
        }
      }
    ]
  }
});

function updateCounts(content: string, state: WordCountState): void {
  // Count Chinese characters
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;

  // Count English words
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length;

  // Total characters (excluding whitespace)
  const totalChars = content.replace(/\s/g, '').length;

  state.totalChars = totalChars;
  state.totalWords = chineseChars + englishWords;
}

function updateUI(state: WordCountState): void {
  // Update status bar
  const statusElement = document.querySelector('.word-count');
  if (statusElement) {
    statusElement.textContent = `字数: ${state.totalChars} | 词数: ${state.totalWords}`;
  }

  // Update sidebar panel
  const totalCharsElement = document.getElementById('total-chars');
  const totalWordsElement = document.getElementById('total-words');

  if (totalCharsElement) {
    totalCharsElement.textContent = state.totalChars.toString();
  }
  if (totalWordsElement) {
    totalWordsElement.textContent = state.totalWords.toString();
  }
}
