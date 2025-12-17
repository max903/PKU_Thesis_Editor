/**
 * PKU Thesis Editor - Main Page
 * Phase 1: Concept Prototype
 */

import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>PKU Thesis Editor - 北京大学论文编辑器</title>
        <meta name="description" content="Web-based thesis editor with PKU formatting compliance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        <h1>PKU Thesis Editor</h1>
        <p>北京大学研究生学位论文编辑器</p>
        <p style={{ color: '#666' }}>
          Phase 1: Concept Prototype - Coming Soon
        </p>
        <hr />
        <h2>Features (Planned)</h2>
        <ul>
          <li>Structured thesis sections based on PKU guidelines</li>
          <li>Real-time formatting compliance checking</li>
          <li>AI-assisted formatting and content suggestions</li>
          <li>Export to PDF/DOCX in compliant format</li>
          <li>Plugin system for extensibility</li>
        </ul>
      </main>
    </>
  );
}
