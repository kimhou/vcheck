import React, { useRef, useEffect, useCallback, useContext, useState } from 'react';
import Draggable from 'react-draggable';
import './index.css';
import {context as toolOptionsContext} from '../../context/tool-options';

export default function Platform() {
  const {globalState, pageState, uiState} = useContext(toolOptionsContext);
  const videoRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const [contentSize, setContentSize] = useState({width: 375, height: 812})

  const uiImgSrc = uiState.imgList.length > uiState.currentIndex && uiState.imgList[uiState.currentIndex];

  const shutdownReceiver = useCallback(()=> {
      if (!(window.currentStream && window.currentStream.getTracks)) {
        return;
      }
      videoRef.current.srcObject = null;
      var tracks = window.currentStream.getTracks();
      for (var i = 0; i < tracks.length; ++i) {
        tracks[i].stop();
      }
      window.currentStream = null;
  }, []);
  const keyDownHandler = useCallback((e)=>{
    if(e.keyCode === 32){
      setDisabled(false);
    }
  }, []);
  const keyUpHandler = useCallback((e)=>{
    setDisabled(true);
  }, []);

  useEffect(() => {
      videoRef.current.srcObject = window.currentStream;
      window.addEventListener('beforeunload', shutdownReceiver);
      document.addEventListener('keydown', keyDownHandler);
      document.addEventListener('keyup', keyUpHandler);
    return ()=>{
      window.removeEventListener('beforeunload', shutdownReceiver);
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    }
  }, [shutdownReceiver, keyDownHandler, keyUpHandler]);
  useEffect(() => {
    setContentSize({width: videoRef.current.clientWidth * globalState.scale, height: videoRef.current.clientHeight * globalState.scale});
  }, [globalState]);
  const handlePalying = useCallback((e)=>{
    const video = e.currentTarget;
    setContentSize({width: video.clientWidth, height: video.clientHeight});
  }, []);

console.log(uiState);
  return (
    <div className="platform">
        <div className="move-ctn" style={{...contentSize}}>
           <div style={{transform: `scale(${globalState.scale})`, transformOrigin: 'top left'}}>
            <video ref={videoRef} className="video" autoPlay style={{opacity: pageState.opacity}} onPlaying={handlePalying}/>
            <div className="ui-img-wrap" style={{
              transform: `scale(${uiState.scale})`, 
              transformOrigin: 'top left', 
              opacity: uiState.opacity,
              filter: `brightness(${uiState.brightness}) contrast(${uiState.contrast}%) hue-rotate(${uiState.hueRotate}deg)`
              }}>
            {uiImgSrc && (
              <Draggable
                axis="both"
                handle=".ui-img"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[1, 1]}
                disabled={!disabled}
                scale={1}>
                  <img className="ui-img" src={uiImgSrc} alt=""/>
                </Draggable>
            )}
              </div>
          </div>
        </div>
    </div>
  );
}
