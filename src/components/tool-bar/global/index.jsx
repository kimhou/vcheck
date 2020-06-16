import React, {useContext, useCallback} from 'react';
import {context as optionsContext} from '../../../context/tool-options'
import {Tabs, Slider, InputNumber, Row, Col } from 'antd';
const {TabPane} = Tabs;

const min = 0.2;
const max = 10;
export default function GlobalPanel() {
    const {globalState, setGlobalState} = useContext(optionsContext);
    const handleScaleChange = useCallback((scale)=>{
        if(typeof scale === 'number' && scale <= max && scale >= min){
            setGlobalState({...globalState, scale});
        }
    }, [globalState, setGlobalState]);

    return (
            <Tabs>
                <TabPane tab="scale" key="scale">
                    <Row style={{padding: 16, justify: 'center'}}>
                        <Col span={14}><Slider step={0.01} min={min} max={max} value={globalState.scale} onChange={handleScaleChange}></Slider></Col>
                        <Col span={2}><InputNumber step={0.01} value={globalState.scale} onChange={handleScaleChange}/></Col>
                    </Row>
                </TabPane>
            </Tabs>
    )
}
