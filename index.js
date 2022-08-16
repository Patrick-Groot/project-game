const dice = document.getElementById("dice");
const diceImg1 = document.createElement("img");
diceImg1.src = "/Images/Alea_1.png";
const diceImg2 = document.createElement("img");
diceImg2.src = "/Images/Alea_2.png";
const diceImg3 = document.createElement("img");
diceImg3.src = "/Images/Alea_3.png";
const diceImg4 = document.createElement("img");
diceImg4.src = "/Images/Alea_4.png";
const diceImg5 = document.createElement("img");
diceImg5.src = "/Images/Alea_5.png";
const diceImg6 = document.createElement("img");
diceImg6.src = "/Images/Alea_6.png";

const rollButton = document.getElementById("roll-button");
const stopButton = document.getElementById("stop-button");



document.getElementById("dice").appendChild(diceImg1);
let intervalId;

function rollDice(){
    intervalId = setInterval(changeDiceImageRandom,30);
    setTimeout(() => clearInterval(intervalId), 1000);
}

rollButton.addEventListener("click", rollDice);

function changeDiceImageRandom(){
    if (dice.hasChildNodes()) {dice.removeChild(dice.lastChild)}
    let randomNum = Math.floor(Math.random() * 6 + 1);
    switch (randomNum) {
        case 1: document.getElementById("dice").appendChild(diceImg1);
            break;
        case 2: document.getElementById("dice").appendChild(diceImg2);
            break;
        case 3: document.getElementById("dice").appendChild(diceImg3);
            break;
        case 4: document.getElementById("dice").appendChild(diceImg4);
            break;
        case 5: document.getElementById("dice").appendChild(diceImg5);
            break;
        case 6: document.getElementById("dice").appendChild(diceImg6);
            break;
    }
}

