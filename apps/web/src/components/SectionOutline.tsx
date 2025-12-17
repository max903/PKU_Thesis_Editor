import React from 'react';
import { FileTextOutlined, BookOutlined } from '@ant-design/icons';
import { useThesisStore, Section } from '@/store/thesisStore';

const getSectionIcon = (type: Section['type']) => {
  switch (type) {
    case 'chapter':
      return <BookOutlined />;
    default:
      return <FileTextOutlined />;
  }
};

export default function SectionOutline() {
  const { sections, currentSectionId, setCurrentSection } = useThesisStore();

  const handleSectionClick = (sectionId: string) => {
    setCurrentSection(sectionId);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <FileTextOutlined />
        <span>章节大纲</span>
      </div>
      <div className="sidebar-content">
        {sections.length > 0 ? (
          <div className="section-outline">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`section-item ${currentSectionId === section.id ? 'active' : ''}`}
                onClick={() => handleSectionClick(section.id)}
              >
                <span className="section-item-icon">{getSectionIcon(section.type)}</span>
                <span>{section.title}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="section-empty">点击"生成目录"更新大纲</div>
        )}
      </div>
    </aside>
  );
}
