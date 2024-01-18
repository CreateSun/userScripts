// ==UserScript==
// @name         教师网视频课自动播放
// @namespace    http://tampermonkey.net/
// @version      2024-01-15
// @description  支持https://course.teacheredu.cn/这个地址下的视频自动播放
// @author       createsun
// @license      MIT
// @match        https://course.teacheredu.cn/jsw/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=teacheredu.cn
// @grant        none
// @license      MIT
// ==/UserScript==

// ==OpenUserJS==
// @author createsun
// @collaborator username
// ==/OpenUserJS==


const playNext = () => {
    if(!document.querySelector('#li_menu_1_0_id')) return
    const list = document.querySelector('#li_menu_1_0_id').querySelectorAll('span')
    let currentTab = 0

    Array.prototype.forEach.call(list, function (item, index) {
        if(item.className && item.className.indexOf('b_sel') > -1) {
            currentTab = index
        }
    });


    // 触发click事件
    const targetEle = list[currentTab]
    targetEle && targetEle.click()

    if(currentTab === list.length) {
        console.log('所有视频播放完成...')
    }
}

(function() {
    'use strict';
    console.log('视频自动播放脚本 success', window.location.href)
    window.addEventListener("load", (event) => {
        console.log('start script')
        playNext()
        const interval = setInterval(() => {
            const videoDom = document.querySelector('video')
            // 视频播放结束
            if(videoDom.ended) {
                console.log('视频播放结束，播放下一个视频')
                playNext()
            }
            // 视频被暂停了
            if(videoDom.paused) {
                console.log('重新播放视频')
                videoDom.play()
            }
        }, 5000)
        });
    // Your code here...
})();
