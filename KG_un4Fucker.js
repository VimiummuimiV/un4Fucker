// ==UserScript==
// @name         un4Fucker
// @namespace    https://#
// @version      0.5
// @description  Let this guy suffer!
// @author       Puncher
// @match        http*://klavogonki.ru/g*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// Global dynamical variables
var sentences;
var sentence;
var milliseconds;
var user;
var pereborich;
var snowman;
var chihuahua;
var danieli;
var danger;
// Global constant variables
var field = document.querySelector('.text');
var inject = document.querySelector('.send');

setInterval(function(){
    // Pay attention
    user = document.querySelector('.userlist-content .user111001');
    // Be aware
    pereborich = document.querySelector('.userlist-content .user123190');
    snowman = document.querySelector('.userlist-content .user150888');
    chihuahua = document.querySelector('.userlist-content .user520723');
    danieli = document.querySelector('.userlist-content .user474104');
    // For condition
    danger = pereborich || snowman || chihuahua || danieli;
},1000);

// All the sentences what you need to send in chat
(async() => {
    var url = 'https://raw.githubusercontent.com/VimiummuimiV/TXT_FILES/main/KG_Sentences.txt';
    var response = await fetch(url);
    var data = await response.text();
    sentences = data.split("\n");
})();

function newFunction(user) {
    console.log(user == null);
}

// Do all necessary stuff
function initialize() {
    sentence = `user, ${sentences[Math.floor(Math.random() * sentences.length)]}`;
    field.value = sentence;
    inject.click();
};

// Repeat with interval initialize function
(function loop() {
    milliseconds = Math.round(Math.random() * (800000 - 500)) + 500;
    setTimeout(function() {
            // Don't run if moderator in chat or badass is absent
            if (danger || user == null) {
               void(0); // Do nothing 
            } else {
                initialize();
            }
        loop();
    }, milliseconds);
}());

// Creating Indicator and Stylize it
var chatPanel = document.querySelector('.dummy');
var indicator = chatPanel.appendChild(document.createElement('p'));

indicator.style.cssText =
'display: flex;' +
'height: 16px;' +
'width: 32px;' +
'background: #213434;' +
'justify-content: center;' +
'position: absolute;' +
'top: 0;' +
'right: 105px;' +
'align-items: center;' +
'font: 12px Consolas;' +
'border: 1px solid burlywood;' +
'color: burlywood;' +
'z-index: 1;';

// Indicator functions
(function () {
var nativeSetTimeout = window.setTimeout;

window.bindTimeout = function (listener, interval) {
    function setTimeout(code, delay) {
        var elapsed = 0,
            h;

        h = window.setInterval(function () {
                elapsed += interval;
                if (elapsed < delay) {
                    listener(delay - elapsed);
                } else {
                    window.clearInterval(h);
                }
            }, interval);
        return nativeSetTimeout(code, delay);
    }

    window.setTimeout = setTimeout;
    setTimeout._native = nativeSetTimeout;
};
}());
// Show how much seconds left
window.bindTimeout(function (ms) {
    if (danger) {
        indicator.innerText = '🛡️';
    }
    else if (user == null) {
        indicator.innerText = '😞';
    }
    else {
        var seconds = Math.floor((ms % (100000 * 60)) / 1000);
        indicator.innerText = seconds;
    }
}, 1000);
// Show what sentence will be sended in console
window.setTimeout(function(){}, milliseconds);