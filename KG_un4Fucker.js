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

// Splice from local storage if data present
function spliceFromLocalStorage() {
    sentences = JSON.parse(localStorage.getItem("sentences"));
    sentence = sentences.splice(Math.floor(Math.random() * sentences.length), 1)[0];
    localStorage.setItem("sentences", JSON.stringify(sentences));
}

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
    localStorage.clear();
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
    
setTimeout(() => {

// Generate new sentence by click on text info panel
nextSentence.addEventListener('click', function() {
    spliceFromLocalStorage();
    nextSentence.innerText = `${sentences.length+1} | ${sentence}`;
});

// People
var user;
var fieldLength;
var fieldValue;
var maxMessages = 25;
// Global constant variables
var field = document.querySelector('.text');
var inject = document.querySelector('.send');

// Inject sentence in chat
function injectMessage() {
    field.value = `Патлатая_Сущность, ${sentence}`;
    inject.click();
}

// Keep original message
function initialize() {
    if (fieldLength > 0) {
        injectMessage();
        field.value = fieldValue;
    } else {
        injectMessage();
    }
};

// Dynamic update Start
setInterval(function () {
    // Chubaka
    user = document.querySelector('.userlist-content .user111001');
    // Check field original message availability
    fieldLength = document.querySelector('.text').value.length;
    fieldValue = document.querySelector('.text').value;
    var availableMessages = document.querySelectorAll('.messages-content div p').length;

    // Post since random range messages count
    if (availableMessages == maxMessages || availableMessages > maxMessages) {
        maxMessages = generateRandomInterval(22, 33);
        setTimeout(() => {
            document.querySelector('.messages-content div').innerHTML = "";
        }, 3000);
    // Check if can post
    setTimeout(function () {
        // Don't run if moderator in chat or badass is absent
        if (user == null) {
            // Do nothing
        } else if (localStorage.sentences.valueOf() == '[]') {
            localStorage.clear();
            window.location.reload();
        } else {
            nextSentence.innerText = `${sentences.length+1} | ${sentence}`;
            initialize();
            spliceFromLocalStorage();
        }
    }, 5000);
}
    // Counter for indicator
    indicator.innerText = `${availableMessages}|${maxMessages}`;
}, 1000);
// Dynamic update End

nextSentence.innerText = `${sentences.length+1} | ${sentence}`;

}, 2000);