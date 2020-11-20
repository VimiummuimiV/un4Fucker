// ==UserScript==
// @name         un4Fucker
// @namespace    https://#
// @version      0.6
// @description  Let this guy suffer!
// @author       Puncher
// @match        http*://klavogonki.ru/gamelist/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// Global
var array;
var sentence;
var sentences;
var minCnt = 30;
var maxCnt = 40;
var fastInterval = 1000;
var middleInterval = 2000;
var slowInterval = 3000;
var ultraSlowInterval = 5000;
// Default start max messages value
var maxMessages = 25;
// Global constant variables for chat text input and send button
var field = document.querySelector('.text');
var inject = document.querySelector('.send');

// Randomize seconds
function generateRandomInterval(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

// Set data into local storage if undefined
function setIntoLocalStorage() {
	localStorage.setItem("sentences", JSON.stringify(array));
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
    array = data.split("\n");
};

// Inject sentence in chat
function injectMessage() {
    field.value = `Патлатая_Сущность, ${sentence}`;
    inject.click();
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

function runFast() {
    setTimeout(() => {
        setInterval(() => {
            runAction();
        }, fastInterval);
    }, fastInterval);
    console.log('fast run');
}

// Fill with data local storage
if (localStorage.sentences === undefined || localStorage.sentences === 'undefined') {
    console.log('Storage item sentences does not exist');
    getData();
    setTimeout(() => {
        setIntoLocalStorage();
        window.location.reload();
    }, fastInterval);
// Renew if is empty
} else if (localStorage.sentences.length < 3) {
    console.log('Storage already is empty.');
    localStorage.removeItem("sentences");
    getData();
    setTimeout(() => {
        setIntoLocalStorage();
        window.location.reload();
    }, fastInterval);
} else {
    console.log('Storage is full with sentences. Everything is okay.');
    prepareFromLocalStorage();
    runFast();
}

// Creating Indicator
var chatPanel = document.querySelector('.dummy');
var indicator = chatPanel.appendChild(document.createElement('p'));
    indicator.innerText = '--';
// Info panel
var nextSentence = chatPanel.appendChild(document.createElement('p'));

// Generate new sentence by click on text info panel
nextSentence.addEventListener('dblclick', function() {
    spliceFromLocalStorage();
    nextSentence.innerText = `${sentences.length+1} | ${sentence}`;
});

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

// Indicator value
nextSentence.innerText = `${sentences.length+1} | ${sentence}`;

// Run at the end when every condition up is done 
function runAction() {

// Show since how much messages will run again poster [ value decreasing until becomes 0 ]
indicator.innerText = maxMessages - document.querySelectorAll('.messages-content div p').length;

var triggerOnce = true;
// Check messages max count dynamically
if (document.querySelectorAll('.messages-content div p').length > maxMessages && triggerOnce === true) {
// Randomize max messages value and set into global variable
maxMessages = document.querySelectorAll('.messages-content div p').length + generateRandomInterval(minCnt, maxCnt);
triggerOnce = false;
    // Poster
    if (document.querySelector('.userlist-content .user111001') == null) {
        // Do nothing
    } else if (localStorage.sentences.valueOf() == '[]') {
        localStorage.removeItem("sentences");
        window.location.reload();
    } else {
        initialize();
        spliceFromLocalStorage();
        nextSentence.innerText = `${sentences.length+1} | ${sentence}`;
    }
}

}