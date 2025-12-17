import React from 'react';
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useThesisStore } from '@/store/thesisStore';

export default function FormatChecker() {
  const { formatIssues, enabledPlugins, isCheckingFormat } = useThesisStore();

  const getIssueIcon = (type: 'error' | 'warning' | 'info') => {
    switch (type) {
      case 'error':
        return <CloseCircleOutlined style={{ color: 'var(--error-color)' }} />;
      case 'warning':
        return <WarningOutlined style={{ color: 'var(--warning-color)' }} />;
      default:
        return <InfoCircleOutlined style={{ color: 'var(--info-color)' }} />;
    }
  };

  return (
    <div className="format-checker">
      <div className="format-checker-header">
        <CheckCircleOutlined />
        <span>格式检查结果</span>
      </div>

      {isCheckingFormat ? (
        <div className="format-checker-empty">
          <InfoCircleOutlined />
          <span>正在检查格式...</span>
        </div>
      ) : formatIssues.length > 0 ? (
        <div className="format-issues">
          {formatIssues.map((issue) => (
            <div
              key={issue.id}
              className="format-issue"
              style={{
                padding: '8px',
                marginBottom: '8px',
                background: 'var(--bg-light)',
                borderRadius: '4px',
                borderLeft: `3px solid ${
                  issue.type === 'error'
                    ? 'var(--error-color)'
                    : issue.type === 'warning'
                    ? 'var(--warning-color)'
                    : 'var(--info-color)'
                }`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                {getIssueIcon(issue.type)}
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {issue.rule}
                </span>
              </div>
              <div style={{ fontSize: '13px' }}>{issue.message}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="format-checker-empty">
          <InfoCircleOutlined />
          <span>点击"检查格式"按钮开始检查</span>
        </div>
      )}

      {/* Enabled Plugins */}
      <div className="format-checker-plugins">
        <div className="format-checker-plugins-title">已启用插件:</div>
        {enabledPlugins.map((plugin) => (
          <div key={plugin} className="plugin-item">
            {plugin}
          </div>
        ))}
      </div>
    </div>
  );
}
