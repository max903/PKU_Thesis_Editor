import React, { useRef, useCallback } from 'react';
import { Button, Tooltip, Upload, message } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { useThesisStore } from '@/store/thesisStore';

export default function Editor() {
  const { editorContent, setEditorContent, viewMode } = useThesisStore();
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }, []);

  const handleFormat = (format: string) => {
    switch (format) {
      case 'bold':
        execCommand('bold');
        break;
      case 'italic':
        execCommand('italic');
        break;
      case 'underline':
        execCommand('underline');
        break;
      case 'h1':
        execCommand('formatBlock', '<h1>');
        break;
      case 'h2':
        execCommand('formatBlock', '<h2>');
        break;
      case 'h3':
        execCommand('formatBlock', '<h3>');
        break;
      case 'p':
        execCommand('formatBlock', '<p>');
        break;
      case 'ul':
        execCommand('insertUnorderedList');
        break;
      case 'ol':
        execCommand('insertOrderedList');
        break;
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML);
    }
  };

  const handleImageUpload = (info: any) => {
    if (info.file.status === 'done' || info.file.originFileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = `<img src="${e.target?.result}" style="max-width: 100%;" />`;
        execCommand('insertHTML', img);
      };
      reader.readAsDataURL(info.file.originFileObj || info.file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          e.preventDefault();
          const blob = items[i].getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const img = `<img src="${event.target?.result}" style="max-width: 100%;" />`;
              execCommand('insertHTML', img);
            };
            reader.readAsDataURL(blob);
          }
          break;
        }
      }
    }
  };

  return (
    <div className="editor-container">
      {/* Formatting Toolbar */}
      <div className="editor-toolbar">
        <Tooltip title="粗体 (Ctrl+B)">
          <Button icon={<BoldOutlined />} onClick={() => handleFormat('bold')} />
        </Tooltip>
        <Tooltip title="斜体 (Ctrl+I)">
          <Button icon={<ItalicOutlined />} onClick={() => handleFormat('italic')} />
        </Tooltip>
        <Tooltip title="下划线 (Ctrl+U)">
          <Button icon={<UnderlineOutlined />} onClick={() => handleFormat('underline')} />
        </Tooltip>

        <div className="toolbar-divider" />

        <Tooltip title="章标题 (一级标题)">
          <Button onClick={() => handleFormat('h1')}>H1</Button>
        </Tooltip>
        <Tooltip title="节标题 (二级标题)">
          <Button onClick={() => handleFormat('h2')}>H2</Button>
        </Tooltip>
        <Tooltip title="小节标题 (三级标题)">
          <Button onClick={() => handleFormat('h3')}>H3</Button>
        </Tooltip>
        <Tooltip title="正文段落">
          <Button onClick={() => handleFormat('p')}>正文</Button>
        </Tooltip>

        <div className="toolbar-divider" />

        <Tooltip title="无序列表">
          <Button icon={<UnorderedListOutlined />} onClick={() => handleFormat('ul')}>
            • 列表
          </Button>
        </Tooltip>
        <Tooltip title="有序列表">
          <Button icon={<OrderedListOutlined />} onClick={() => handleFormat('ol')}>
            1. 列表
          </Button>
        </Tooltip>

        <div className="toolbar-divider" />

        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleImageUpload}
        >
          <Tooltip title="插入图片">
            <Button icon={<PictureOutlined />}>插入图片</Button>
          </Tooltip>
        </Upload>
      </div>

      {/* Editor Content */}
      <div className="editor-content-wrapper">
        <div
          className="editor-paper"
          style={{
            boxShadow: viewMode === 'page' ? '0 4px 20px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <div
            ref={editorRef}
            className="editor-content"
            contentEditable
            suppressContentEditableWarning
            onInput={handleContentChange}
            onPaste={handlePaste}
            dangerouslySetInnerHTML={{ __html: editorContent }}
          />
        </div>
      </div>
    </div>
  );
}
