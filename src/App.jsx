import React from 'react';
import './app.css';
import ToolBar from './components/tool-bar';
import Platform from './components/platform';

export default function App() {
  return (
    <div className="page-box">
      <Platform />
      <ToolBar />
    </div>
  );
}
