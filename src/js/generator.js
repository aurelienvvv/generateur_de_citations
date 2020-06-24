"use strict";

// Ce script permet de générer des citations avec différents morceaux de phrases, de manière aléatoire
// Les commentaires seront retirés sur l'éventuelle version en production

// Tableaux avec les morceaux de phrases
const indoorPart1 = [
    "Dessiner",
    "Manger",
    "Prendre en photo",
    "Cuisiner",
    "Dormir avec"
];
const indoorPart2 = [
    "un rat",
    "une fourmie",
    "une fleur",
    "son voisin",
    "un roti de boeuf"
];
const indoorPart3 = [
    "et poster sur facebook",
    "en pleine réunion de télétravail ",
    "sans que personne ne le sache...",
    "au fond du jardin",
    "et mourir sans regrets"
];

const outdoorPart1 = [
    "Écrire sur",
    "Manger",
    "Prendre en photo",
    "Cuisiner",
    "Courir avec"
];
const outdoorPart2 = [
    "un mur blanc",
    "des insectes",
    "un hérisson",
    "Usain Bolt",
    "un oeuf dur"
];
const outdoorPart3 = [
    "au milieu d'une foule en délire",
    "et obtenir la legion d'honneur",
    "et se cacher pour que personne ne voit",
    "et devenir le nouveau Steve Jobs",
    "et devenir ministre des Sports"
];

// Les tableaux sont stockés dans un objet
const sentences = [
    {
        type: "indoor",
        parts: [indoorPart1, indoorPart2, indoorPart3]
    },
    {
        type: "outdoor",
        parts: [outdoorPart1, outdoorPart2, outdoorPart3]
    }
]

// Fonction qui gère le déroulement de l'application
function launchApp() {

    // Déclaration et initialisation des variables qui stockent des éléments du DOM utilisés par la suite
    let formBtn = document.querySelector(".sentences-options .btn");
    let quitBtn = document.querySelector(".quit-btn");
    let reloadBtn = document.querySelectorAll(".reload-btn");
    let quitContainerHTML = document.querySelector(".quit-screen");
    let errorContainerHTML = document.querySelector(".error-screen");
    let divContainerHTML = document.querySelector(".generated-sentences");

    formBtn.addEventListener("click", (event) => {

        // Annule le comportement de base du click sur le bouton formBtn
        event.preventDefault();

        // Appelle getValues et stock les résultat dans la constante valuesOfInputs
        const valuesOfInputs = getValues();

        // Si les valeurs sont bien séléctionnées
        if (valuesOfInputs.type && valuesOfInputs.number) {

            // La fonction generateOneOrManySentences ressort un tableau avec les phrases générées
            const arrayOfSentences = generateOneOrManySentences(valuesOfInputs.type, valuesOfInputs.number);

            // Puis les phrases sont affichées dans le DOM
            displaySentences(arrayOfSentences, divContainerHTML);

        } else {

            // Sinon on affiche un message d'erreur à l'utilisateur
            document.querySelector('.error-screen').classList.add("active");
        };

    }, false);

    // Au click sur reloadBtn, retire la classe active de tous les écrans
    reloadBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            quitContainerHTML.classList.remove("active");
            errorContainerHTML.classList.remove("active");
            divContainerHTML.classList.remove("active");
        });
    });

    // Au click sur quitBtn, retire l'écran des phrases et affiche l'écran quit-screen
    quitBtn.addEventListener("click", () => {
        divContainerHTML.classList.remove("active");
        quitContainerHTML.classList.add("active");
    });
};


function getValues() {
    let inputs = document.querySelectorAll('.sentences-options input');

    // Déclaration de la variable values
    let values;

    // Récupération de la valeur des inputs checkés
    let inputChecked = Array.from(inputs).filter(input => input.checked);
    let inputValue = inputChecked.map(input => input.value);

    // Initialisation de values en un objet qui stocke le type et la valeur
    return values = {
        type: inputValue[0],
        number: inputValue[1]
    };
};


// Prend un tableau en paramètre et en ressort une entrée au hasard
function randomPositionArray(array) {
    return array[Math.floor(Math.random() * array.length)];
};


function buildSentence(type, sentences) {
    // Séléctionne les morceaux de phrases dans l'objet sentence qui correspondent au type
    let typeOfSentences = sentences.filter(sentence => sentence.type === type);

    // Assemble les morceaux de phrases et les joint pour en faire la phrase générée
    let generateSentence = typeOfSentences[0].parts.map(part => randomPositionArray(part)).join(' ');

    return generateSentence;
};


// Répète la fonction generatedSentences selon le nombre séléctionné
function generateOneOrManySentences(type, number) {
    const generatedSentences = [];

    for (let i = 0; i < number; i++) {
        generatedSentences.push(buildSentence(type, sentences));
    };

    return generatedSentences;
};


function displaySentences(sentences, container) {
    let ulContainerHTML = document.querySelector(".generated-sentences ul");

    // Affiche l'écran avec les différentes phrases
    container.classList.add('active');

    while (ulContainerHTML.hasChildNodes()) {
        // Tant que le ul a des enfants 'li', on supprime les 'li'
        ulContainerHTML.removeChild(ulContainerHTML.firstChild);
    };

    for (let sentence of sentences) {
        // Boucle sur le tableau des phrases générées et les insère dans le DOM
        ulContainerHTML.insertAdjacentHTML('beforeend', `<li>${sentence}</li>`);
    };
};


launchApp();