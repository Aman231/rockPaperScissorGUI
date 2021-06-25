const gameChoices = document.querySelectorAll(".item");

function onClickListener(event) {
  gameFlow(event.target.innerText);
}

gameChoices.forEach((choice) =>
  choice.addEventListener("click", onClickListener)
);

function highlightItem(element, selectedItem) {
  document.querySelectorAll(element).forEach((choice) => {
    if (choice.innerText === selectedItem) {
      choice.classList.add("selected");
    } else {
      choice.classList.remove("selected");
    }
  });
}

function updateUserStatus(userChoice) {
  const statusBar = document.querySelector(".subHeader");
  statusBar.textContent = `You chose ${userChoice}`;
  highlightItem(".item", userChoice);
  const items = document.getElementsByClassName("item");
  Object.values(items).map((item) =>
    item.removeEventListener("click", onClickListener)
  );
}

function createStatus(status) {
  const gameContainer = document.getElementById("gameContainer");
  const computerStatus = document.createElement("div");
  computerStatus.classList.add("subHeader");
  computerStatus.innerText = status;
  gameContainer.appendChild(computerStatus);
}

function addComputerStatus() {
  const gameContainer = document.getElementById("gameContainer");
  const computerChoices = ["Rock", "Paper", "Scissor"];
  const computerChose = computerChoices[Math.floor(Math.random() * 3)];

  createStatus(`Computer Chose: ${computerChose}`);

  computerChoices.forEach((choice) => {
    const choiceDiv = document.createElement("div");
    choiceDiv.classList.add("item");
    choiceDiv.innerText = choice;
    gameContainer.appendChild(choiceDiv);
  });

  highlightItem(".item:nth-of-type(n+4)", computerChose);
  return computerChose;
}

function findWinner(userChoice, computerChoice) {
  return userChoice === computerChoice
    ? "Game Tie"
    : (userChoice === "rock" && computerChoice === "scissor") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissor" && computerChoice === "paper")
    ? "User Wins"
    : "Computer Wins";
}

function showResult(result) {
  createStatus(result);
  const highlight =
    result === "Game Tie" ? "tie" : result === "User Wins" ? "winner" : "loser";
  const status = document.querySelector(".subHeader:last-child");
  status.classList.add(highlight);
}

function resetButon() {
  const button = document.createElement("button");
  button.addEventListener("click", (ev) => location.reload());
  button.innerText = "Play Again!";
  button.classList.add("reset");
  document.getElementById("gameContainer").appendChild(button);
}

function gameFlow(userChoice) {
  updateUserStatus(userChoice);
  const computerChoice = addComputerStatus();
  const result = findWinner(
    userChoice.toLowerCase(),
    computerChoice.toLowerCase()
  );
  showResult(result);
  resetButon();
}
