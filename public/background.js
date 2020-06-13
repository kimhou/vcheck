/* eslint-disable no-undef */
function captureCurrentTab(cb){
    chrome.tabCapture.capture({
        video: true, audio: true,
            videoConstraints: {
            mandatory: {
                minWidth: 16,
                minHeight: 9,
                maxWidth: 1024,
                maxHeight: 2122,
                maxFrameRate: 60, 
            },
        },
    }, cb);
}

chrome.browserAction.onClicked.addListener(function(tab) {
  captureCurrentTab((stream)=>{
    const receiver = window.open('index.html');
    receiver.height = window.clientHeight;
    receiver.width = window.clientWidth;
    receiver.currentStream = stream;
  });
});

