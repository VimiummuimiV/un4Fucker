// ==UserScript==
// @name         un4Fucker
// @namespace    https://#
// @version      0.5
// @description  Let this guy suffer!
// @author       Puncher
// @match        http*://klavogonki.ru/gamelist/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var sentences;
var sentence;
// Get sentences database from github txt file
(async() => {
    var url = 'https://raw.githubusercontent.com/VimiummuimiV/TXT_FILES/main/KG_Sentences.txt';
    var response = await fetch(url);
    var data = await response.text();
    sentences = data.split("\n");
})();

// Creating Indicator
var chatPanel = document.querySelector('.dummy');
var indicator = chatPanel.appendChild(document.createElement('p'));
indicator.innerText = '--';
var nextSentence = chatPanel.appendChild(document.createElement('p'));

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

nextSentence.style.cssText =
    'display: block;' +
    'position: absolute;' +
    'font-size: 10px;' +
    'top: 2px;' +
    'color: gray;' +
    'left: 100px;';
    
setTimeout(() => {

// Random sentence with no repeat
var oneRepeatSentence = shuffle(sentences);
// Randomize sentences array index from database with repeat no more than 1
function* shuffle() {
    var i = sentences.length;
    while (i--) {
        yield sentences.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    }
}

// Generate new sentence by click on text info panel
nextSentence.addEventListener('click', function() {
    sentence = oneRepeatSentence.next().value.toLowerCase();
    nextSentence.innerText = `${sentences.length+1} | ${sentence}`;
});

// Milliseconds
var milliseconds;
// Users
var user;
var pereborich;
var snowman;
var danieli;
var danger;
var fieldLength;
var fieldValue;
// Global constant variables
var field = document.querySelector('.text');
var inject = document.querySelector('.send');
// Randomize seconds
function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}
// Update every second users availability in chat list
setInterval(function () {
    // Pay attention
    user = document.querySelector('.userlist-content .user111001');
    // Be aware
    pereborich = document.querySelector('.userlist-content .user123190');
    snowman = document.querySelector('.userlist-content .user150888');
    danieli = document.querySelector('.userlist-content .user474104');
    // For condition
    danger = pereborich || snowman || danieli;
    // Check field original message availability
    fieldLength = document.querySelector('.text').value.length;
    fieldValue = document.querySelector('.text').value;
}, 1000);

function injectMessage() {
    field.value = `4уханы4, ${sentence}`;
    inject.click();
}
// Inject sentence in chat
function initialize() {
    if (fieldLength > 0) {
        injectMessage();
        field.value = fieldValue;
    } else {
        injectMessage();
    }
};

// Repeat with interval initialize function
(function loop() {
    sentence = oneRepeatSentence.next().value.toLowerCase();
    nextSentence.innerText = `${sentences.length+1} | ${sentence}`;
    milliseconds = generateRandomInteger(400000, 600000);
    setTimeout(function () {
        // Don't run if moderator in chat or badass is absent
        if (danger || user == null) {
            void (0); // Do nothing 
        } else {
            initialize();
        }
        loop();
    }, milliseconds);
} ());

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
} ());
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
window.setTimeout(() => { }, milliseconds);

}, 1500);