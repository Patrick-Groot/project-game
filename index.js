let dice = [];
clearDiceArray();
let rollCount = 1;

function clearDiceArray() {
  for (let i = 1; i < 6; i++) {
    const diceElement = document.getElementById(`dice${i}`);
    dice.push({diceElement, keep: false, value: 1});
  }
}

let intervalId;
let selectedField;


const rollButton = document.getElementById("roll-button");
rollButton.addEventListener("click", rollDice);


const rollCounter = document.getElementById("roll-counter");
rollCounter.innerHTML = `Roll ${rollCount} / 3`;
const keepDiceInput = document.getElementById("keep-input");
const keepDiceConfirm = document.getElementById("submit-keep-dice");
const scoreInput = document.getElementById("score-input");
const scoreConfirm = document.getElementById("submit-score");
const scoreSheet = document.getElementById("scoresheet");
const radioButtonsScore = document.querySelectorAll('input[name="score"]');
const scoreTotal = document.getElementById("score-grand-total");

scoreTotal.innerHTML = 0;
let checkboxDice = [];
for (let i = 1; i < 6; i++) {
  checkboxDice.push(document.getElementById(`checkboxDice${i}`));
}

keepDiceConfirm.addEventListener("click", keepDice);
scoreConfirm.addEventListener("click", chooseField);

changeDiceImageRandom();

function rollDice() {
  //console.log(`rollDice ${rollCount}`);
  intervalId = setInterval(changeDiceImageRandom,30);
  setTimeout(() => {
    clearInterval(intervalId);
    endOfRoll()}, 1000);  
}

function endOfRoll(){
  //console.log(`endOfRoll ${rollCount}`);
  rollCounter.innerHTML = `Roll ${rollCount} / 3`;
  if (rollCount < 3) keepDiceInput.classList.toggle("hidden");
  if (rollCount === 3) scoreInput.classList.toggle("hidden");    
  rollButton.classList.toggle("hidden");
}


function createDiceImage(num) {
  const diceImg = document.createElement("img");
  diceImg.src = `/Images/Alea_${num}.png`;
  return diceImg;
}

function keepDice() {
  //console.log(`keepDice ${rollCount}`);
  keepDiceInput.classList.toggle("hidden");
  for (let i = 0; i < checkboxDice.length; i++){
    if (checkboxDice[i].checked) {
      dice[i].keep = true;
    }
    else dice[i].keep = false;
  }
  console.log(dice);
  if (rollCount < 3) {
    rollCount ++;
    rollButton.classList.toggle("hidden")}
  rollCounter.innerHTML = `Roll ${rollCount} / 3`;
  //console.log(`keepDice End ${rollCount}`);
}


function chooseField() {
  //console.log(`chooseField ${rollCount}`);
  rollCounter.classList.toggle("hidden");
  scoreInput.classList.toggle("hidden");
  for (radioButton of radioButtonsScore) {
    if (radioButton.checked) {
      selectedField = radioButton.value;
      radioButton.disabled = true;
    }
  }
  score(selectedField);
}

function score(str) { 
  //console.log(`score ${rollCount}`);
  console.log(str);
  let scoreField = document.getElementById(`score-${str}`);
  scoreField.innerHTML = evaluate(selectedField);
  scoreTotal.innerHTML = parseInt(scoreTotal.innerHTML) + evaluate(selectedField);
  dice = [];
  newRound();
}


function evaluate(str) {
  //console.log(`evaluate ${rollCount}`);
  console.log(str);
  const diceValues = dice.map((die) => die.value);
  const diceValuesSum = diceValues.reduce((a,b) => {return a + b});
  console.log(diceValues);
  console.log(diceValuesSum);
  const diceValuesSorted = diceValues.reduce((a,b) => {
    a[b] = (a[b] || 0) + 1;
    return a;
  }, {});
  const diceQuantity = Object.values(diceValuesSorted);
  console.log(diceValuesSorted);
  console.log(diceQuantity);

  if (str === "ones") num = 1;
  if (str === "twos") num = 2;
  if (str === "threes") num = 3;
  if (str === "fours") num = 4;
  if (str === "fives") num = 5;
  if (str === "sixes") num = 6;
  if (str === "three-of-a-kind") {
    return (diceQuantity.includes(3) || diceQuantity.includes(4) || diceQuantity.includes(5)) ? diceValuesSum : 0;
  }
  if (str === "four-of-a-kind") {
    return (diceQuantity.includes(4) || diceQuantity.includes(5)) ? diceValuesSum : 0;
  }
  if (str === "yahtzee") {
    return (diceQuantity.includes(5)) ? 50 : 0;
  }
  if (str === "chance") return diceValuesSum;
  if (str === "full-house") {
    return (diceQuantity.includes(2) && diceQuantity.includes(3)) ? 25 : 0;
  }
  if (str === "small-straight") {
    if ((diceValues.includes(1) && diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4)) || (diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5)) || (diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5) && diceValues.includes(6))) {
      return 30;
    }
    else return 0;
  }
  if (str === "large-straight") {
    if ((diceValues.includes(1) && diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5)) || (diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5) && diceValues.includes(6))) {
      return 40;
    }
    else return 0;
  }

  let counter = 0;
  for (let i = 0; i < diceValues.length; i++) {
    if (diceValues[i] === num) counter ++;
  }
  return counter * num;
}

function newRound() {
  let rollCount = 1;
  //console.log(`newRound ${rollCount}`);
  rollCounter.innerHTML = `Roll ${rollCount} / 3`;
  rollCounter.classList.toggle("hidden");
  rollButton.classList.toggle("hidden");
  clearDiceArray();
  rollCount = 1;
}

function changeDiceImage(elem, num) {
  const diceImg = createDiceImage(num);
  elem.appendChild(diceImg);
}

function changeDiceImageRandom() {
    dice = dice.map((singleDice) => {
      if (singleDice.keep) return singleDice;
      let randomNum = Math.floor(Math.random() * 6 + 1);
      if (singleDice.diceElement.hasChildNodes()) {
        singleDice.diceElement.innerHTML = "";
      }    
      changeDiceImage(singleDice.diceElement, randomNum);
      return {... singleDice, value: randomNum};
    });
}