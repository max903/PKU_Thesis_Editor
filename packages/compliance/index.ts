/**
 * PKU Thesis Editor - Compliance Checking Engine
 * Validates thesis content against university formatting rules
 */

import type {
  ComplianceResult,
  ComplianceIssue,
  TemplateRules,
  Section,
  SectionType
} from '@pku-thesis/types';

export interface ComplianceChecker {
  checkSection(section: Section, rules: TemplateRules): ComplianceResult;
  checkAbstract(content: string, type: 'cn' | 'en', degreeType: 'master' | 'doctor', rules: TemplateRules): ComplianceResult;
  checkHeadings(content: string, rules: TemplateRules): ComplianceResult;
  checkParagraphs(content: string, rules: TemplateRules): ComplianceResult;
  checkFigures(content: string, rules: TemplateRules): ComplianceResult;
  checkTables(content: string, rules: TemplateRules): ComplianceResult;
  checkReferences(content: string, rules: TemplateRules): ComplianceResult;
}

/**
 * Abstract length checker for Chinese/English abstracts
 */
export function checkAbstractLength(
  content: string,
  type: 'cn' | 'en',
  degreeType: 'master' | 'doctor',
  rules: TemplateRules
): ComplianceIssue[] {
  const issues: ComplianceIssue[] = [];
  const charCount = content.replace(/\s/g, '').length;

  if (type === 'cn') {
    const { minLength, maxLength } = rules.abstract.chinese;
    const min = minLength[degreeType];
    const max = maxLength[degreeType];

    if (charCount < min) {
      issues.push({
        code: 'ABSTRACT_TOO_SHORT',
        message: `中文摘要字数不足，当前 ${charCount} 字，要求至少 ${min} 字`,
        severity: 'error',
        section: 'abstract_cn',
        suggestion: `请补充摘要内容，使其达到 ${min} 字以上`
      });
    }

    if (charCount > max) {
      issues.push({
        code: 'ABSTRACT_TOO_LONG',
        message: `中文摘要字数过多，当前 ${charCount} 字，要求不超过 ${max} 字`,
        severity: 'warning',
        section: 'abstract_cn',
        suggestion: `请精简摘要内容，使其不超过 ${max} 字`
      });
    }
  }

  return issues;
}

/**
 * Heading hierarchy checker
 */
export function checkHeadingHierarchy(
  headings: { level: number; text: string; position: number }[],
  maxLevel: number = 3
): ComplianceIssue[] {
  const issues: ComplianceIssue[] = [];

  for (const heading of headings) {
    if (heading.level > maxLevel) {
      issues.push({
        code: 'HEADING_LEVEL_EXCEEDED',
        message: `标题层级过深：${heading.text}，不建议使用 ${heading.level} 级标题`,
        severity: 'warning',
        location: { start: heading.position, end: heading.position + heading.text.length },
        suggestion: `建议重新组织内容，避免使用三级以上标题`
      });
    }
  }

  // Check for skipped levels
  let lastLevel = 0;
  for (const heading of headings) {
    if (heading.level > lastLevel + 1) {
      issues.push({
        code: 'HEADING_LEVEL_SKIPPED',
        message: `标题层级跳跃：从 ${lastLevel} 级直接到 ${heading.level} 级`,
        severity: 'error',
        location: { start: heading.position, end: heading.position + heading.text.length },
        suggestion: `请确保标题层级连续，不要跳过中间层级`
      });
    }
    lastLevel = heading.level;
  }

  return issues;
}

/**
 * Keywords checker
 */
export function checkKeywords(
  keywords: string[],
  minCount: number,
  maxCount: number
): ComplianceIssue[] {
  const issues: ComplianceIssue[] = [];

  if (keywords.length < minCount) {
    issues.push({
      code: 'KEYWORDS_TOO_FEW',
      message: `关键词数量不足，当前 ${keywords.length} 个，要求 ${minCount}-${maxCount} 个`,
      severity: 'error',
      section: 'abstract_cn',
      suggestion: `请添加更多关键词，使其达到 ${minCount} 个以上`
    });
  }

  if (keywords.length > maxCount) {
    issues.push({
      code: 'KEYWORDS_TOO_MANY',
      message: `关键词数量过多，当前 ${keywords.length} 个，要求 ${minCount}-${maxCount} 个`,
      severity: 'warning',
      section: 'abstract_cn',
      suggestion: `请精选关键词，使其不超过 ${maxCount} 个`
    });
  }

  return issues;
}

/**
 * Figure/Table numbering checker
 */
export function checkFigureTableNumbering(
  items: { type: 'figure' | 'table'; number: string; chapter: number; position: number }[],
  rules: TemplateRules
): ComplianceIssue[] {
  const issues: ComplianceIssue[] = [];

  const figuresByChapter = new Map<number, number>();
  const tablesByChapter = new Map<number, number>();

  for (const item of items) {
    const counter = item.type === 'figure' ? figuresByChapter : tablesByChapter;
    const currentCount = counter.get(item.chapter) || 0;
    const expectedNumber = `${item.chapter}.${currentCount + 1}`;

    if (item.number !== expectedNumber) {
      issues.push({
        code: `${item.type.toUpperCase()}_NUMBER_INCORRECT`,
        message: `${item.type === 'figure' ? '图' : '表'}编号错误：${item.number}，应为 ${expectedNumber}`,
        severity: 'error',
        location: { start: item.position, end: item.position },
        suggestion: `请将编号修改为 ${expectedNumber}`
      });
    }

    counter.set(item.chapter, currentCount + 1);
  }

  return issues;
}

export default {
  checkAbstractLength,
  checkHeadingHierarchy,
  checkKeywords,
  checkFigureTableNumbering
};
