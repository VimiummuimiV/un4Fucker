// ==UserScript==
// @name         un4Fucker
// @namespace    https://#
// @version      0.2
// @description  Let this guy suffer!
// @author       Puncher
// @match        http*://klavogonki.ru/g*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// All the sentences what you need to send in chat
var sentences;

(async() => {
    var url = 'https://raw.githubusercontent.com/VimiummuimiV/TXT_FILES/main/KG_Sentences.txt';
    var response = await fetch(url);
    var data = await response.text();
    sentences = data.split("\n");
})();

// Text field and send button
var input = document.querySelector('.text');
var send = document.querySelector('.send');

// Do all necessary stuff
function initialize() {
    var sentence = sentences[Math.floor(Math.random() * sentences.length)];
    input.value = `un4given, ${sentence}`;
    send.click();
};

// Repeat with interval initialize function
(function loop() {
    var rand = Math.round(Math.random() * (360000 - 500)) + 500;
    setTimeout(function() {
        initialize();
        loop();
    }, rand);
}());