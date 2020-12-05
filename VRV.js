// ==UserScript==
// @name         KG_VRV
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Try not to say Big Hi
// @author       Puncher
// @match        http*://klavogonki.ru/gamelist/
// ==/UserScript==

var phrases = [
    'ВРЫВ ВОСХИТИТЕЛЬНЫЙ!',
    'ВРЫВ ПРОНИЦАТЕЛЬНЫЙ!',
    'ВРЫВ ПРЕВОСХОДНЫЙ!',
    'ВРЫВ ПОРИЦАТЕЛЬНЫЙ!',
    'ВРЫВ С ВОЛНЕНИЕМ!',
    'ВРЫВ ЗАСЛУЖЕННЫЙ!',
    'ВРЫВ ЭЛИТНЫЙ!',
    'ВРЫВ СВОЕОБРАЗНЫЙ!',
    'ВРЫВ НЕПРЕВЗОЙДЁННЫЙ!',
    'ВРЫВ УСПЕШНЫЙ!',
    'ВРЫВ С УЛЫБКОЙ!',
    'ВРЫВ ЖУТКО ГРОМКИЙ!',
    'ВРЫВ С УСТОЙЧИВЫМ НАМЕРЕНИЕМ!',
    'ВРЫВ ДЛЯ ВСЕХ И ВСЮДУ!',
    'ВРЫВ БЕЗ ИЗЪЯНА!',
    'ВРЫВ БЕЗ КОМПРОМИСОВ!',
    'ВРЫВ ЛУЧЕЗАРНЫЙ!',
    'ВРЫВ БЛАГОЖЕЛАТЕЛЬНЫЙ!',
    'ВРЫВ ДУШЕСОГРЕВАЮЩИЙ!',
    'ВРЫВ ЭМОЦИОНАЛЬНЫЙ!',
    'ВРЫВ БЛАГОГОВЕННЫЙ!',
    'ВРЫВ ДРУЖЕСТВЕННЫЙ!',
    'ВРЫВ ЛЮБВЕОБИЛЬНЫЙ',
    'ВРЫВ С ДОСТОИНСТВОМ!',
    'ВРЫВ НЕПОКОЛЕБИМЫЙ!',
    'ВРЫВ УСТОЙЧИВЫЙ!',
    'ВРЫВ ХАРАКТЕРНЫЙ!'
]

function rand(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

var field = document.querySelector('.text');
var send = document.querySelector('.send');
var phrasesCount = 0;
var randPhrases = rand(3, 6);


function A(length) {
   var result           = '';
   var characters       = 'AaÀÂÄÁÃÅàáâãäå';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function createA() {
    field.value = A(rand(150, 280)) + '!'; 
    send.click();
}

function sendPhrases() {
    if (phrasesCount < randPhrases) {
        var min = 5, max = 10;
        var rand = Math.floor(Math.random() * (max - min + 1) + min);
            field.value = phrases.splice(Math.floor(Math.random() * phrases.length), 1)[0];
            send.click();
        setTimeout(sendPhrases, rand * 1000);
        phrasesCount++;
    };
}

function createFirework() {
    field.value = ':firework:';
    send.click();
}

function sendMessage() {
    createA();
    setTimeout(() => {
        createFirework();
    }, 3000);
    setTimeout(() => {
        sendPhrases();
    }, 5000);
}

document.querySelector('.filter-btn').addEventListener('dblclick', function(e) {
    sendMessage();
});