import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  files: Array<{
    id: string;
    name: string;
    content: string;
    type: 'file' | 'folder';
  }>;
  rootId: string;
}

export interface Tab {
  id: string;
  fileId: string;
  name: string;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
}

export interface TerminalLog {
  id: string;
  timestamp: number;
  type: 'log' | 'error' | 'warn';
  content: string;
}

export interface TerminalOutput {
  id: string;
  logs: TerminalLog[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  files: Array<{
    name: string;
    content: string;
    type: 'file';
  }>;
}
