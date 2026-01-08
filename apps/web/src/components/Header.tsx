import React from 'react';
import { Button, Select, Space, Tooltip, message } from 'antd';
import {
  FileAddOutlined,
  ExportOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { useThesisStore } from '@/store/thesisStore';

const sectionTemplates = [
  { value: 'chapter', label: '章节 (第X章)' },
  { value: 'abstract_cn', label: '中文摘要' },
  { value: 'abstract_en', label: '英文摘要' },
  { value: 'references', label: '参考文献' },
  { value: 'appendix', label: '附录' },
  { value: 'acknowledgements', label: '致谢' },
];

export default function Header() {
  const { viewMode, setViewMode, checkFormat, generateTOC, isCheckingFormat } = useThesisStore();

  const handleNewThesis = () => {
    message.info('新建论文功能开发中...');
  };

  const handleExportDocx = () => {
    message.info('导出DOCX功能开发中...');
  };

  const handleInsertSection = () => {
    message.info('插入章节功能开发中...');
  };

  const handleGenerateTOC = () => {
    generateTOC();
    message.success('目录已更新');
  };

  const handleCheckFormat = () => {
    checkFormat();
    message.info('正在检查格式...');
  };

  const handlePreviewCover = () => {
    message.info('预览封面功能开发中...');
  };

  const handleAddReference = () => {
    message.info('新增参考文献功能开发中...');
  };

  return (
    <header className="editor-header">
      {/* Logo */}
      <div className="editor-logo">
        <svg className="editor-logo-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span>北京大学学位论文编辑器</span>
      </div>

      {/* Primary Actions */}
      <Space size="small">
        <Tooltip title="新建论文">
          <Button icon={<FileAddOutlined />} onClick={handleNewThesis}>
            新建论文
          </Button>
        </Tooltip>

        <Tooltip title="导出为Word文档">
          <Button icon={<ExportOutlined />} onClick={handleExportDocx}>
            导出 DOCX
          </Button>
        </Tooltip>
      </Space>

      {/* View Mode Toggle */}
      <div className="mode-toggle">
        <button
          className={`mode-toggle-btn ${viewMode === 'web' ? 'active' : ''}`}
          onClick={() => setViewMode('web')}
        >
          Web模式
        </button>
        <button
          className={`mode-toggle-btn ${viewMode === 'page' ? 'active' : ''}`}
          onClick={() => setViewMode('page')}
        >
          页面模式
        </button>
      </div>

      {/* Section Insert */}
      <Space size="small">
        <Select
          placeholder="选择章节模板..."
          style={{ width: 140 }}
          options={sectionTemplates}
          allowClear
        />
        <Tooltip title="插入章节">
          <Button icon={<PlusOutlined />} onClick={handleInsertSection}>
            插入章节
          </Button>
        </Tooltip>
      </Space>

      {/* Format Actions */}
      <Space size="small">
        <Button
          type="primary"
          icon={<UnorderedListOutlined />}
          onClick={handleGenerateTOC}
          className="btn-pku"
        >
          生成目录
        </Button>

        <Button
          icon={<CheckCircleOutlined />}
          onClick={handleCheckFormat}
          loading={isCheckingFormat}
        >
          检查格式
        </Button>

        <Tooltip title="预览封面">
          <Button icon={<EyeOutlined />} onClick={handlePreviewCover}>
            预览封面
          </Button>
        </Tooltip>
      </Space>

      {/* Reference Action - Separate line on small screens */}
      <Tooltip title="新增参考文献">
        <Button icon={<BookOutlined />} onClick={handleAddReference}>
          新增参考文献
        </Button>
      </Tooltip>
    </header>
  );
}
