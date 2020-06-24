"use strict";

// Ce script permet d'afficher des images, choisies dans un tableau et positionnées de manière aléatoire

let gifContainer = document.querySelector('.gif-container-1');
let gifsArray = ['1.gif', '2.gif', '3.gif', '4.gif', '5.gif', '6.gif', '7.gif'];
let positionLeft = ['10', '80'];

// Choisi une entrée au hasard dans un tableau qu'il prend en paramètre
function randomArrayEntry(array) {
    return Math.floor(Math.random() * array.length);
};

// Séléctionne un Gif au hasard et le place dans le DOM
function picRandomGif() {
    const randomGifNumber = randomArrayEntry(gifsArray);
    gifContainer.removeChild(gifContainer.firstChild);
    gifContainer.insertAdjacentHTML('beforeend', `<img alt="gif kitsch" src='src/img/${gifsArray[randomGifNumber]}'>`);
};

// Défini l'emplacement où apparaitra le gif
function gifPosition() {
    let randomPositionNumber = randomArrayEntry(positionLeft);
    let topPercent = Math.floor(Math.random() * 80);

    gifContainer.style.left = `${positionLeft[randomPositionNumber]}%`;
    gifContainer.style.top = `${topPercent}%`;
};

picRandomGif();

// Toutes les 3 secondes, relance le positionnement et la génération d'un gif
window.setInterval(function () {
    picRandomGif();
    gifPosition();
}, 3000);