import React, {useContext, useCallback} from 'react';
import {context as optionsContext} from '../../../context/tool-options'
import {Tabs, Slider, InputNumber, Row, Col, Button } from 'antd';
import classnames from 'classnames';
const {TabPane} = Tabs;

const optionConfig = [
    {key: 'scale', min: 0, max: 10, step: 0.01},
    {key: 'opacity', min: 0, max: 1, step: 0.01},
    {key: 'brightness', min: 0, max: 1, step: 0.01},
    {key: 'contrast', min: 0, max: 200, step: 1},
    {key: 'hueRotate', min: 0, max: 360, step: 1},
]

export default function GlobalPanel() {
    const {uiState, setUiState, resetUiState} = useContext(optionsContext);
    const handleOptionChange = useCallback(({key, min, max})=>(val)=>{
        if(typeof val === 'number' && val <= max && val >= min){
            setUiState({...uiState, [key]: val});
        }
    }, [setUiState, uiState]);
    const handleUploadImg = useCallback((e)=>{
        const input = e.currentTarget;
        var file    = input.files[0];
        var reader  = new FileReader();
        reader.addEventListener("load", function () {
            const imgList =  [...uiState.imgList, reader.result];
            setUiState({
                ...uiState,
                imgList,
                currentIndex: imgList.length - 1
            });
        }, false);
        if (file) {
          reader.readAsDataURL(file);
        }
    }, [setUiState, uiState]);
    const handleImgSelect = useCallback((index)=>()=>{
        setUiState({
            ...uiState,
            currentIndex: index
        });
    }, [setUiState, uiState]);
    const handleImgDel= useCallback((index)=>(e)=>{
        const next = {
            ...uiState,
            imgList: uiState.imgList.filter((item, idx)=>index !== idx),
            currentIndex: uiState.currentIndex >= index ? (uiState.currentIndex -1 >=0 ? uiState.currentIndex -1 : 0) : uiState.currentIndex
        };
        setUiState(next);
    }, [setUiState, uiState]);
    const handleReset = useCallback(()=>{
        resetUiState();
    }, [resetUiState]);

    return (
            <Tabs>
                <TabPane tab="file" key="file">
                    <Row style={{padding: 16, justify: 'center'}}>
                        <Col span={16}>
                        <input type="file" accept=".png,.jpg,.jpeg" onClick={(e)=> { e.target.value = null }}  onChange={handleUploadImg} />
                        </Col>
                    </Row>
                    {uiState.imgList.map((img, index)=>(
                    <Row style={{padding: 16}} justify="center" align="middle">
                        <Col span={10} onClick={handleImgSelect(index)}>
                            <img src={img} className={classnames('img-item', {'img-current':index===uiState.currentIndex })} alt=""/>
                        </Col>
                        <Col span={7}>
                            <Button onClick={handleImgDel(index)}>Delete</Button>
                        </Col>
                    </Row>
                    ))}
                </TabPane>
                <TabPane tab="Options" key="options">
                    <Row justify="center"><Button onClick={handleReset}>Reset</Button></Row>
                    {
                        optionConfig.map(({step, min, max, key})=>(
                            <div key={key} style={{padding: '0 8px'}}>
                                <Row style={{padding: '16px 0'}}><Col>{key}:</Col></Row>
                                <Row style={{padding: '8px 0'}}  justify="center">
                                    <Col span={14}>
                                        <Slider step={step} min={min} max={max} value={uiState[key]} onChange={handleOptionChange({key, min, max})} />
                                        </Col>
                                    <Col span={6}><InputNumber step={step} value={uiState[key]} onChange={handleOptionChange({key, min, max})}/></Col>
                                </Row>
                            </div>
                        ))
                    }
                </TabPane>
            </Tabs>
    )
}
