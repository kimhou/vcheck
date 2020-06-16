import React from 'react';
import './index.css';
import {Collapse } from 'antd';
import Global  from './global'
import UI from './ui';

const {Panel} = Collapse;

export default function ToolBar() {

  return (
    <div className="tool-bar">
      <Collapse defaultActiveKey={['global', 'ui']}>
      <Panel key="global" header={<span>Global</span>}>
          <Global />
      </Panel>
      <Panel key="ui" header={<span>UI</span>}>
          <UI />
      </Panel>
      </Collapse>
      </div>
  );
}
