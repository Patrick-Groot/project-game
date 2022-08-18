const dice = [];
for (let i = 1; i < 6; i++) {
  dice.push(document.getElementById(`dice${i}`));
}

const rollButton = document.getElementById("roll-button");
rollButton.addEventListener("click", rollDice);

let intervalId;
let diceValues;
let resultArray;
let rollCount = 1;

const rollCounter = document.getElementById("roll-counter");
rollCounter.innerHTML = `Roll ${rollCount} / 3`
const keepDiceInput = document.getElementById("keep-input");


changeDiceImageRandom()

function rollDice() {    
  intervalId = setInterval(changeDiceImageRandom,30);
  setTimeout(() => {
    clearInterval(intervalId);
    endOfRoll()}, 1000);  
}

function endOfRoll(){
    if (rollCount < 3) rollCount ++;
    rollCounter.innerHTML = `Roll ${rollCount} / 3`;
    resultArray = { ...diceValues };
    console.log(resultArray);
    keepDiceInput.classList.toggle("hidden");
}

// After keep-dice input given again toggle hidden

function createDiceImage(num) {
  const diceImg = document.createElement("img");
  diceImg.src = `/Images/Alea_${num}.png`;
  return diceImg;
}

function changeDiceImage(elem, num) {
  const diceImg = createDiceImage(num);
  elem.appendChild(diceImg);
}

function changeDiceImageRandom() {
  diceValues = dice.map((elem) => {
    let randomNum = Math.floor(Math.random() * 6 + 1);
    if (elem.hasChildNodes()) {
      elem.innerHTML = "";
    }
    changeDiceImage(elem, randomNum);
    return {value: randomNum};
  });
  //console.log(diceValues);
}
