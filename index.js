const dice = [];
for (let i = 1; i < 6; i++) {
  dice.push(document.getElementById(`dice${i}`));
}

const rollButton = document.getElementById("roll-button");
rollButton.addEventListener("click", rollDice);
let intervalId;
let resultArray;
let rollCounter;

changeDiceImageRandom()

function rollDice() {
  intervalId = setInterval(changeDiceImageRandom,30);
  setTimeout(() => clearInterval(intervalId), 1000);
}
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
  resultArray = dice.map((elem) => {
    let randomNum = Math.floor(Math.random() * 6 + 1);
    if (elem.hasChildNodes()) {
      elem.innerHTML = "";
    }
    changeDiceImage(elem, randomNum);
    return { value: randomNum };
  });
  console.log(resultArray);
}
