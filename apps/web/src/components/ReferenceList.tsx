import React from 'react';
import { BookOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useThesisStore } from '@/store/thesisStore';

export default function ReferenceList() {
  const { references, removeReference } = useThesisStore();

  const handleDelete = (id: string) => {
    removeReference(id);
  };

  return (
    <div className="reference-list">
      <div className="reference-list-header">
        <BookOutlined />
        <span>参考文献列表</span>
      </div>

      {references.length > 0 ? (
        <div className="reference-items">
          {references.map((ref, index) => (
            <div key={ref.id} className="reference-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 500 }}>[{index + 1}]</span>
                <Popconfirm
                  title="确定删除这条参考文献吗?"
                  onConfirm={() => handleDelete(ref.id)}
                  okText="删除"
                  cancelText="取消"
                >
                  <Button
                    type="text"
                    size="small"
                    icon={<DeleteOutlined />}
                    style={{ color: 'var(--text-secondary)' }}
                  />
                </Popconfirm>
              </div>
              <div style={{ marginTop: '4px' }}>
                <span>{ref.authors}. </span>
                <span>{ref.title}. </span>
                {ref.source && <span>{ref.source}, </span>}
                <span>{ref.year}.</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="reference-empty">暂无参考文献</div>
      )}
    </div>
  );
}
