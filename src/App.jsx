import React from 'react';
import './app.css';
import ToolBar from './components/tool-bar';
import Platform from './components/platform';
import {Provider} from './context/tool-options';

export default function App() {
  return (
    <Provider>
    <div className="page-box">
      <Platform />
      <ToolBar />
    </div>
    </Provider>
  );
}
