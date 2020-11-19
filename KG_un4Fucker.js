// ==UserScript==
// @name         un4Fucker
// @namespace    https://#
// @version      0.5
// @description  Let this guy suffer!
// @author       Puncher
// @match        http*://klavogonki.ru/gamelist/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// Global
var sentence;
var sentences;
var noneStorage = localStorage.sentences == null;
var emptyStorage = localStorage.sentences == undefined || localStorage.sentences.length < 3;
var minCnt = 3;
var maxCnt = 5;
var interval = 3000;

// Randomize seconds
function generateRandomInterval(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

// Set data into local storage if undefined
function setIntoLocalStorage() {
	localStorage.setItem("sentences", JSON.stringify(sentences));
    sentences = JSON.parse(localStorage.getItem("sentences"));
    sentence = sentences.splice(Math.floor(Math.random() * sentences.length), 1)[0];
    localStorage.setItem("sentences", JSON.stringify(sentences));
}

// Splice from local storage after post or by double click on info panel 
function spliceFromLocalStorage() {
    sentences = JSON.parse(localStorage.getItem("sentences"));
    sentence = sentences.splice(Math.floor(Math.random() * sentences.length), 1)[0];
    localStorage.setItem("sentences", JSON.stringify(sentences));
}

// Get data from local storage after page reload
function prepareFromLocalStorage() {
    sentences = JSON.parse(localStorage.getItem("sentences"));
    sentence = sentences[Math.floor(Math.random() * sentences.length)];
}

// Get data from github
async function getData() {
    var url = 'https://raw.githubusercontent.com/VimiummuimiV/TXT_FILES/main/KG_Sentences.txt';
    var response = await fetch(url);
    var data = await response.text();
    sentences = data.split("\n");
};

// Fill with data local storage
if (noneStorage) {
    getData();
    setTimeout(() => {
        setIntoLocalStorage();
    }, 1500);
// Renew if is empty
} else if (emptyStorage) {
    localStorage.removeItem("sentences");
    getData();
    setTimeout(() => {
        setIntoLocalStorage();
    }, 1500);
} else {
    prepareFromLocalStorage();
}

// Creating Indicator
var chatPanel = document.querySelector('.dummy');
var indicator = chatPanel.appendChild(document.createElement('p'));
    indicator.innerText = '--';
var nextSentence = chatPanel.appendChild(document.createElement('p'));

// CSS indicator
indicator.style.cssText =
    'display: flex;' +
    'height: 16px;' +
    'width: 40px;' +
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

// CSS info panel
nextSentence.style.cssText =
    'display: block;' +
    'position: absolute;' +
    'font-size: 10px;' +
    'top: 2px;' +
    'color: gray;' +
    'left: 100px;' +
    'height: 13px;' +
    'right: 150px;' +
    'overflow: hidden;';

// Timeout for enough time to retrieve data from github to bypass issue with no sentences data 
setTimeout(() => {

// Generate new sentence by click on text info panel
nextSentence.addEventListener('dblclick', function() {
    spliceFromLocalStorage();
    nextSentence.innerText = `${sentences.length+1} | ${sentence}`;
});

// Max messages after runs the trigger 
var maxMessages;
// Global constant variables for chat text input and send button
var field = document.querySelector('.text');
var inject = document.querySelector('.send');

// Inject sentence in chat
function injectMessage() {
    // field.value = `Патлатая_Сущность, ${sentence}`;
    // inject.click();
    console.log(`Патлатая_Сущность, ${sentence}`)
}

// Keep original message
function initialize() {
    if (document.querySelector('.text').value.length > 0) {
        var backup = document.querySelector('.text').value;
        injectMessage();
        field.value = backup;
    } else {
        injectMessage();
    }
};

// Randomize max messages count and set into global variable after page reload
maxMessages = generateRandomInterval(minCnt, maxCnt);

setInterval(() => {
    
// Check messages max count dynamically
if (document.querySelectorAll('messages-content div p').length > maxMessages) {
setTimeout(() => {
    document.querySelector('.messages-content div').innerHTML = "";
    setTimeout(() => {
        // Poster
        if (document.querySelector('.userlist-content .user111001') == null) {
            // Do nothing
        } else if (localStorage.sentences.valueOf() == '[]') {
            localStorage.removeItem("sentences");
            window.location.reload();
        } else {
            spliceFromLocalStorage();
            initialize();
            nextSentence.innerText = `${sentences.length+1} | ${sentence}`;
            }
        }, interval);
    }, interval);
}
maxMessages = generateRandomInterval(minCnt, maxCnt);
}, interval);

// Digital indicator value 
nextSentence.innerText = `${sentences.length+1} | ${sentence}`;

}, interval);