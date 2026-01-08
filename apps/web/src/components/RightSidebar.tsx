import React from 'react';
import FormatChecker from './FormatChecker';
import ReferenceList from './ReferenceList';

export default function RightSidebar() {
  return (
    <aside className="sidebar sidebar-right">
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>
          <FormatChecker />
        </div>
        <div style={{ padding: '12px 16px' }}>
          <ReferenceList />
        </div>
      </div>
    </aside>
  );
}
