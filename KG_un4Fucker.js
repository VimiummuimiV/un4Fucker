// ==UserScript==
// @name         un4Fucker
// @namespace    https://#
// @version      0.7
// @description  Let this guy suffer!
// @author       Puncher
// @match        http*://klavogonki.ru/gamelist/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// Data 
var array;
var sentence = "Empty";
var sentences = "...";
// Random
var minCnt = 30;
var maxCnt = 40;
// Intervals
var fastInterval = 1000;
var middleInterval = 2000;
var slowInterval = 3000;
var ultraSlowInterval = 5000;
// Default start max messages value
var maxMessages = 50;
// Global constant variables for chat text input and send button
var field = document.querySelector('.text');
var inject = document.querySelector('.send');
// Typewriter
var i = 0;
var speed = 5;
// Typing imitation animation
function typeWriter() {
    if (i < sentence.length) {
        nextSentence.innerHTML += sentence.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// Info panel functions 
function clearInfoPanelValue() {
    nextSentence.innerHTML = "";
}

function setInfoPanelValue() {
    nextSentence.innerHTML = `${sentences.length + 1} | `;
    typeWriter();
}

function reloadPage() {
    setTimeout(() => {
        window.location.reload();
    }, slowInterval);
}

function beep() {
    var sound = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    sound.play();
}

// Reset data base by double click on field
field.addEventListener('dblclick', function() {
    localStorage.removeItem("sentences");
    setTimeout(() => {
    getData();
    setTimeout(() => {
        setIntoLocalStorage(); 
        clearInfoPanelValue();
            i = 0;
        setTimeout(() => {
            setInfoPanelValue();
        }, fastInterval);
    }, fastInterval);
}, fastInterval);
})

// Randomize seconds
function generateRandomInterval(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

// Random nickname to improve variation of sentences
function getRandomNickname() {
    var nicknames = [
        "Патлатый",
        "Патлатая_Сущность",
        "Патлатая_Вычерность",
        "Патлатое_Непотребство",
        "Патлатый_Крендель",
        "Патлатый_Ворчун",
        "Патлатый_Чухан",
        "Патлатый_Нарушитель",
        "Патлатый_Рецидивист"
    ];
    var nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
    return nickname;
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

// Proverbs section Start
async function setProverb() {
    var proverbsAccumulation;
    var proverb;
    
    if (localStorage.proverbs == undefined || localStorage.proverbs == "undefined" || localStorage.proverbs.length < 10) {
        var url = 'https://raw.githubusercontent.com/VimiummuimiV/un4Fucker/main/Proverbs.txt';
        var response = await fetch(url);
        var data = await response.text();
        var array = data.split("\n");

        localStorage.setItem("proverbs", JSON.stringify(array));
        proverbsAccumulation = JSON.parse(localStorage.getItem("proverbs"));
        proverb = proverbsAccumulation.splice(Math.floor(Math.random() * proverbsAccumulation.length), 1)[0];
        localStorage.setItem("proverbs", JSON.stringify(proverbsAccumulation));
    } else {
        proverbsAccumulation = JSON.parse(localStorage.getItem("proverbs"));
        proverb = proverbsAccumulation.splice(Math.floor(Math.random() * proverbsAccumulation.length), 1)[0];
        localStorage.setItem("proverbs", JSON.stringify(proverbsAccumulation));
    }
    setTimeout(() => {
        beep();
        document.querySelector('.text').value = `Пословица: ${proverb}`; 
        document.querySelector('.send').click();
        console.log(`${proverbsAccumulation.length} proverbs left.`)
    }, ultraSlowInterval*2);
}
// Proverbs section End

// Get data from github
async function getData() {
    var url = 'https://raw.githubusercontent.com/VimiummuimiV/TXT_FILES/main/KG_Sentences.txt';
    var response = await fetch(url);
    var data = await response.text();
    array = data.split("\n");
};

// Inject sentence in chat
function injectMessage() {
    field.value = `${getRandomNickname()}, ${sentence}`;
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

function run() {
    setTimeout(() => {
        setInterval(() => {
            runAction();
        }, fastInterval);
    }, fastInterval);
}

// Fill with data local storage
if (localStorage.sentences === undefined || localStorage.sentences === 'undefined') {
    console.log('Storage item sentences does not exist');
    getData();
    setTimeout(() => {
        setIntoLocalStorage();
        setTimeout(() => {
            i = 0;
            clearInfoPanelValue();
            setInfoPanelValue();
            console.log('Now they are. Have fun!');
            run();
        }, fastInterval);
    }, fastInterval);
// Renew if is empty
} else if (localStorage.sentences.length < 10) {
    console.log('Storage already is empty.');
    localStorage.removeItem("sentences");
    getData();
    setTimeout(() => {
        setIntoLocalStorage();
        setTimeout(() => {
            i = 0;
            clearInfoPanelValue();
            setInfoPanelValue();
            console.log('Recharged. You are free to go.');
            run();
        }, fastInterval);
    }, fastInterval);
} else {
    console.log('Storage is full with sentences. Everything is okay.');
    prepareFromLocalStorage();
    run();
}

// Creating Indicator
var chatPanel = document.querySelector('.dummy');
var indicator = chatPanel.appendChild(document.createElement('p'));
    indicator.setAttribute('class', 'digital_indicator');
    indicator.innerText = '--';

// Generate new random range interval number by double click on digital indicator
indicator.addEventListener('dblclick', function() {
    maxMessages = document.querySelectorAll('.messages-content div p').length + generateRandomInterval(minCnt, maxCnt);
})

// Info panel
var nextSentence = chatPanel.appendChild(document.createElement('p'));
    nextSentence.setAttribute('class', 'next_sentence');

// Generate new sentence by click on text info panel
nextSentence.addEventListener('dblclick', function() {
    i = 0;
    clearInfoPanelValue();
    spliceFromLocalStorage();
    setInfoPanelValue();
});

// CSS Indicator and Info panel
var inject_css = document.createElement("style");
    inject_css.setAttribute("type", "text/css");
    inject_css.innerHTML = '' +
    '.digital_indicator {' +
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
        'z-index: 1;' +
        'cursor: pointer' +
    '}' +
    '.next_sentence {' +
        'display: block;' +
        'position: absolute;' +
        'font-size: 10px;' +
        'top: 2px;' +
        'color: gray;' +
        'transition: color .5s ease-in-out;' +
        'left: 100px;' +
        'height: 13px;' +
        'right: 150px;' +
        'overflow: hidden;' +
    '}' +
    '.next_sentence:hover {' +
        'color: lightgray;' +
        'cursor: pointer;';


document.body.appendChild(inject_css);

// Next sentence value after page reload 
setTimeout(() => {
    setInfoPanelValue();
}, middleInterval);

// Run at the end when every condition up is done 
function runAction() {

if (field.value == "Связь с сервером потеряна. Пожалуйста, перезагрузите страницу." && field.hasAttribute('disabled')) {
    reloadPage();
}

// Show since how much messages will run again poster [ value decreasing until becomes 0 ]
indicator.innerText = maxMessages - document.querySelectorAll('.messages-content div p').length;

var triggerOnce = true;
// Check messages max count dynamically
if (document.querySelectorAll('.messages-content div p').length > maxMessages && triggerOnce === true) {
// Randomize max messages value and set into global variable
maxMessages = document.querySelectorAll('.messages-content div p').length + generateRandomInterval(minCnt, maxCnt);
triggerOnce = false;
    // Poster
    if (/* un4given not */ document.querySelector('.userlist-content .user111001') == null || /* danieli is */ document.querySelector('.userlist-content .user474104')) {
        setProverb();
    } else if (localStorage.sentences.valueOf() == '[]') {
        localStorage.removeItem("sentences");
        setTimeout(() => {
            reloadPage();
        }, slowInterval);
    } else {
        i = 0;
        clearInfoPanelValue();
        setTimeout(() => {
            initialize();
            beep();
            spliceFromLocalStorage();
            setInfoPanelValue();
        }, ultraSlowInterval*2);
    }
}

}