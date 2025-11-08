//vars
const gameName = "Guess The Word";
let startBtn = document.querySelector(".control-buttons span");
let popUp = document.querySelector(".control-buttons ");
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer "
).innerHTML = `${gameName} Game Created By Elzero Web School,Hulcode`;

let playerName = "";
let numOfTries = 6;
let numOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;
let wordToGuess = "";
const words = [
  "banana", "castle", "forest", "planet", "silver",
  "bridge", "butter", "coffee", "danger", "dancer",
  "dragon", "energy", "father", "flight", "friend",
  "galaxy", "garden", "golden", "hunter", "island",
  "jungle", "kitten", "legend", "luxury", "magnet",
  "moment", "mother", "napkin", "orange", "palace",
  "pirate", "pocket", "pretty", "rocket", "school",
  "shadow", "spirit", "stream", "summer", "temple",
  "throne", "ticket", "tomato", "tunnel", "vision",
  "wander", "winter", "writer", "yellow", "zipper",
  "battle", "bright", "camera", "circle", "custom",
  "desert", "fabric", "finger", "floral", "forest",
  "galore", "gentle", "guitar", "hammer", "honest",
  "injury", "jigsaw", "kitten", "laptop", "little",
  "magnet", "marble", "market", "modern", "native",
  "number", "office", "oxygen", "people", "pirate",
  "planet", "puzzle", "rabbit", "rocket", "saddle",
  "secret", "signal", "simple", "single", "smooth",
  "spider", "spirit", "spring", "stable", "string",
  "subtle", "system", "threat", "turtle", "update",
  "vacuum", "vision", "wonder", "wooden", "writer"
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

let massageArea = document.querySelector(".message");

startBtn.addEventListener("click", function () {
  playerName = prompt("Whats Your Name?");
  if (playerName == null || playerName == "") {
    playerName = "Unknown";
  }
  popUp.remove();
});

document.querySelector(".hint span").innerHTML = numberOfHints;
const hintsBtn = document.querySelector(".hint");
hintsBtn.addEventListener("click", getHint);
function generateInput() {
  loadLeaderBoard();
  console.log(wordToGuess);
  const inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) {
      tryDiv.classList.add("disabled-input");
    }
    for (let j = 1; j <= numOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");

      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  const disabledInputs = document.querySelectorAll(".disabled-input input");
  disabledInputs.forEach((input) => (input.disabled = true));
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toLowerCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

function handleGuesses() {
  let sussessGuess = true;
  for (let i = 1; i <= numOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      sussessGuess = false;
    } else {
      sussessGuess = false;
      inputField.classList.add("no");
    }
  }
  if (sussessGuess) {
    massageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
    if(numberOfHints===2)
    {
       massageArea.innerHTML = `<p>Congatz You Didnot Use Hints</p>`;
    }
    addToLeaderBoard(playerName, currentTry);
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));
    guessButton.disabled = true;
        hintsBtn.disabled=true;
  } else {
    tryAgain();
  }
}

window.onload = function () {
  generateInput();
};


function getHint()
{


  const enabledInput=document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs=Array.from( enabledInput).filter((input)=> input.value==="");

if (emptyEnabledInputs.length >0) {
  const randomIndex=Math.floor(Math.random() * emptyEnabledInputs.length);
  const randomInput=emptyEnabledInputs[randomIndex];
  const indexToFill=Array.from(enabledInput).indexOf(randomInput);
  if (indexToFill!==-1) {
    randomInput.value=wordToGuess[indexToFill].toLowerCase();
  }

  if (numberOfHints>0 ) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;

  }
  if (numberOfHints===0) {
    hintsBtn.disabled=true;
  }
}

}


function tryAgain() {
  if (currentTry < numOfTries) {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-input");
    document
      .querySelectorAll(`.try-${currentTry} input`)
      .forEach((input) => (input.disabled = true));

    currentTry++;
    let currentNow = document.querySelector(`.try-${currentTry}`);
    currentNow.classList.remove("disabled-input");
    document
      .querySelectorAll(`.try-${currentTry} input`)
      .forEach((input) => (input.disabled = false));
    currentNow.children[1].focus();
  } else {
    massageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;

    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));
    guessButton.disabled = true;
    hintsBtn.disabled=true;
  }
}

function handleBackspace(event) {
if (event.key==="Backspace") {
   const inputs=document.querySelectorAll("input:not([disabled])");
   const currentIndex=Array.from(inputs).indexOf(document.activeElement);
   if(currentIndex>0)
   {
  const currentInput=inputs[currentIndex];
  const prevInput=inputs[currentIndex-1];
  currentInput.value="";
  prevInput.value="";
  prevInput.focus();
   }
}
}
  document.addEventListener("keydown" , handleBackspace);



function addToLeaderBoard(Playername, currentTry) {
  let LeaderBoard = document.querySelector("#leaderBody");
  let found = false;

  for (let i = 0; i < LeaderBoard.children.length; i++) {
    let row = LeaderBoard.children[i];
    let nameCell = row.children[0];
    let triesCell = row.children[1];

    // If same player found
    if (nameCell.textContent === Playername) {
      found = true;

      // Update only if the new try count is smaller (better)
      if (parseInt(triesCell.textContent) > currentTry) {
        triesCell.textContent = currentTry;
      }
      break;
    }
  }

  // If player not found — create new row
  if (!found) {
    let newRow = document.createElement("tr");
    let nameTd = document.createElement("td");
    let triesTd = document.createElement("td");

    nameTd.textContent = Playername;
    triesTd.textContent = currentTry;

    newRow.appendChild(nameTd);
    newRow.appendChild(triesTd);
    LeaderBoard.appendChild(newRow);
  }

  saveLeaderBoard(); // Save to localStorage after every change
}
function saveLeaderBoard() {
  let rows = document.querySelectorAll("#leaderBody tr");
  let data = [];

  rows.forEach((row) => {
    let name = row.children[0].textContent;
    let tries = parseInt(row.children[1].textContent);
    data.push({ name, tries });
  });

  localStorage.setItem("leaders", JSON.stringify(data));
}

function loadLeaderBoard() {
  let saved = JSON.parse(localStorage.getItem("leaders"));
  if (!saved) return;
  let LeaderBoard = document.querySelector("#leaderBody");
  LeaderBoard.innerHTML = "";
  saved.forEach((item) => {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${item.name}</td><td>${item.tries}</td>`;
    LeaderBoard.appendChild(row);
  });
}
