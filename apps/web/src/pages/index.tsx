/**
 * PKU Thesis Editor - Main Page
 * Phase 1: Concept Prototype
 */

import React from 'react';
import Head from 'next/head';
import { Header, SectionOutline, Editor, RightSidebar } from '@/components';

export default function Home() {
  return (
    <>
      <Head>
        <title>北京大学学位论文编辑器</title>
        <meta name="description" content="Web-based thesis editor with PKU formatting compliance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="editor-layout">
        <Header />
        <main className="editor-main">
          <SectionOutline />
          <Editor />
          <RightSidebar />
        </main>
      </div>
    </>
  );
}
