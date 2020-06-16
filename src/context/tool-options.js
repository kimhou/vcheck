/* eslint-disable no-undef */
import React, { useState, useCallback, useEffect } from 'react';

// const LocalstorageKey = 'vcheck-tool-options';

export const context = React.createContext();

const defaultGlobalState = {
    scale: 1
}
const defaultPageState = {
    opacity: 1
};
const defaultUiState = {
    scale: 1,
    opacity: 1,//透明度 0-1
    brightness: 1,//亮度 0-100
    contrast: 100,//对比度 0-100
    hueRotate: 0,//色相 0-360
    imgList: [],
    currentIndex: 0
};
// const setLocalstorage = (key, data)=>{
//     chrome.storage.sync.set({[LocalstorageKey]:data}, ()=>{
//         console.log('setLocalstorage done', data);
//     });
// }
// const getLocalstorage = (key)=>{
//     return new Promise((resolve, reject)=>{
//         try{
//             chrome.storage.sync.get(key, (data)=>{
//                 console.log('getLocalstorage done:', data);
//                 resolve(data && data[key]);
//              });
//         }catch(e){
//             reject(e);
//         }
//     });
// }
// let saveTimer;

export const Provider = ({ children })=>{
    const [globalState, setGlobalState] = useState(defaultGlobalState);
    const [pageState, setPageState] = useState(defaultPageState);
    const [uiState, setUiState] = useState(defaultUiState);
    // const [inited, setInited] = useState(false);
    const resetGlobalState = useCallback(()=>{
        setGlobalState(defaultGlobalState);
    }, []);

    const resetPageState = useCallback(()=>{
        setPageState(defaultPageState);
    }, []);
    const resetUiState = useCallback(()=>{
        setUiState({...defaultUiState, imgList: uiState.imgList, currentIndex: uiState.currentIndex});
    }, [uiState.currentIndex, uiState.imgList]);
    // 保存配置到本地
    // const saveOptions = useCallback(
    //     () => {
    //         setLocalstorage(LocalstorageKey, {
    //             globalState, pageState, uiState
    //         });
    //     },
    //     [globalState, pageState, uiState],
    // )
    // 读取配置 没有太大的意义
    // useEffect(() => {
    //     console.log('read storage');
    //     getLocalstorage(LocalstorageKey).then((data)=>{
    //         if(data){
    //             data.globalState && setGlobalState(data.globalState);
    //             data.pageState && setPageState(data.pageState);
    //             data.uiState && setUiState(data.uiState);
    //         }
    //         setInited(true);
    //     }).catch(e=>{
    //         console.error(e);
    //     });
    // }, []);
    // useEffect(() => {
    //     if(inited){
    //         saveTimer && clearTimeout(saveTimer);
    //         saveTimer = setTimeout(() => {
    //             //saveOptions();
    //         }, 1000);
    //     }
    // }, [saveOptions, globalState, pageState, uiState, inited])

    return <context.Provider value={{globalState, pageState, uiState, setGlobalState, setPageState, setUiState, resetGlobalState, resetUiState, resetPageState}}>{children}</context.Provider>
}