//Controls the pieces' positions
let gridSquareArray = [];

// 0: purple; 1: purple; 2: pink; 3: orange
let currentPlayerTurn = -1;

//Stores the game
const players = {
    purple: {monsters: 0, werewolf: 0, vampire: 0, ghost: 0},
    red: {monsters: 0, werewolf: 0, vampire: 0, ghost: 0},
    pink: {monsters: 0, werewolf: 0, vampire: 0, ghost: 0},
    orange: {monsters: 0, werewolf: 0, vampire: 0, ghost: 0},
}

//HTML page references
const gridsquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.getElementsByTagName("img");
let btnLogin = document.getElementById("btn-login");
let btnStart = document.getElementById("btn-start");
let btnEndTurn = document.getElementById("btn-end-turn");
let turnIndicator = document.getElementById("turn-indicator");
let purplePlayerInfo = document.getElementById("purplePlayerInfo");
let redPlayerInfo = document.getElementById("redPlayerInfo");
let pinkPlayerInfo = document.getElementById("pinkPlayerInfo");
let orangePlayerInfo = document.getElementById("orangePlayerInfo");
let currentUser = document.getElementById("userId");
let userInfo = document.getElementById("userInfo");

//Login info storage
let userLocalStorage = {noOfLogins: 0, purple: 0, red: 0, pink: 0, orange: 0};
let user;

//Login function
function login() {
    userLocalStorage.noOfLogins = 0;
    userLocalStorage.purple = 0;
    userLocalStorage.red = 0;
    userLocalStorage.pink = 0;
    userLocalStorage.orange = 0;

    do{
        user = prompt("Enter username");
    } while (user === '');

    //Else the user pressed Cancel
    if (user) {
        //Check if the user did log in
        if (!localStorage.getItem(user)){
          localStorage.setItem(user, JSON.stringify(userLocalStorage));
        }

        userLocalStorage = JSON.parse(localStorage.getItem(user));
        userLocalStorage.noOfLogins++;
        localStorage.setItem(user, JSON.stringify(userLocalStorage));

        userInfo.textContent = `Number of logins: ${userLocalStorage.noOfLogins}
        Purple's wins: ${userLocalStorage.purple}
        Red's wins: ${userLocalStorage.red}
        Pink's wins: ${userLocalStorage.pink}
        Orange's wins: ${userLocalStorage.orange}`

        btnLogin.textContent = "Logout";
        if(userLocalStorage.noOfLogins == 1)
          currentUser.textContent = `Logged in as ${user}`;
        else
          currentUser.textContent = `You are back, ${user}!`;
    }
}

//Logout function
function logout() {
  currentUser.textContent = "Please login.";
  btnLogin.textContent = "Login";
  userInfo.textContent = "";
  location.reload();
}

//When the user clicks on Loggin Button selection
btnLogin.onclick = () => {
  if(btnLogin.textContent === "Login")
      login();
  else
      logout();
}

//When the user clicks on Start Button selection
btnStart.onclick = () => {
    if (btnStart.textContent == "Start the Game") {
      if( currentUser.textContent == "Please login."){
        alert("You need to be logged in for playing.");
      }
      else{
        currentPlayerTurn = parseInt(Math.random() * 4);
        countMonsters();
        updatePlayerInfo();
        btnStart.textContent = "End of the Game";
        btnEndTurn.style.visibility = "visible";
      }

    }else {
      alert("You are logging out.");
      location.reload();
    }
}

//When the user clicks on End Turn Button selection
btnEndTurn.onclick = () => {
  let randomNumber;
  do {
    randomNumber = parseInt(Math.random() * 4);
  } while (randomNumber == currentPlayerTurn || players[numToText(randomNumber)].monsters == 0);

  currentPlayerTurn = randomNumber;
  updateTurn();
}
//Changing player function
function updateTurn() {
    turnIndicator.textContent = `${numToText(currentPlayerTurn)}'s turn`;
}

//Mosnter amount displayed
function countMonsters() {
    const gridsquares = document.getElementsByClassName("square");

    for (let i = 0; i < gridsquares.length; i++) {
      let square = gridsquares[i];

      if (square.querySelector(".piece")) {
        let color = square.querySelector(".piece").getAttribute("color");
        players[color]["monsters"]++;
        if      ((square.querySelector(".piece").getAttribute("class")).includes("werewolf")) players[color]["werewolf"]++;
        else if ((square.querySelector(".piece").getAttribute("class")).includes("vampire")) players[color]["vampire"]++;
        else if ((square.querySelector(".piece").getAttribute("class")).includes("ghost")) players[color]["ghost"]++;
      }
    }
}

//Amount of players and monsters left
function updatePlayerInfo(){

    if (players.purple.monsters)
        purplePlayerInfo.textContent = `Werewolves: ${players.purple.werewolf},
      Vampires: ${players.purple.vampire}, Ghosts: ${players.purple.ghost}`;
    else purplePlayerInfo.textContent = "Game over";

    if (players.red.monsters)
        redPlayerInfo.textContent = `Werewolves: ${players.red.werewolf},
      Vampires: ${players.red.vampire}, Ghosts: ${players.red.ghost}`;
    else redPlayerInfo.textContent = "Game over";

    if (players.pink.monsters)
        pinkPlayerInfo.textContent = `Werewolves: ${players.pink.werewolf},
      Vampires: ${players.pink.vampire}, Ghosts: ${players.pink.ghost}`;
    else pinkPlayerInfo.textContent = "Game over";

    if (players.orange.monsters)
        orangePlayerInfo.textContent = `Werewolves: ${players.orange.werewolf},
      Vampires: ${players.orange.vampire}, Ghosts: ${players.orange.ghost}`;
    else orangePlayerInfo.textContent = "Game over";

    //In case of victory localStorage get updated
    if(players.purple.monsters > 0 && players.red.monsters == 0 &&
      players.pink.monsters == 0 && players.orange.monsters == 0) {
        alert("Red player is the winer!");
        userLocalStorage.purple++;
        localStorage.setItem(user, JSON.stringify(userLocalStorage));
        logout();
    }
    else if(players.purple.monsters == 0 && players.red.monsters > 0 &&
      players.pink.monsters == 0 && players.orange.monsters == 0) {
        alert("Yellow player is the winer!");
        userLocalStorage.red++;
        localStorage.setItem(user, JSON.stringify(userLocalStorage));
        logout();
    }
    else if(players.purple.monsters == 0 && players.red.monsters == 0 &&
      players.pink.monsters > 0 && players.orange.monsters == 0) {
        alert("Green player is the winer!");
        userLocalStorage.pink++;
        localStorage.setItem(user, JSON.stringify(userLocalStorage));
        logout();
    }
    else if(players.purple.monsters == 0 && players.red.monsters == 0 &&
      players.pink.monsters == 0 && players.orange.monsters > 0) {
        alert("Blue player is the winer!");
        userLocalStorage.orange++;
        localStorage.setItem(user, JSON.stringify(userLocalStorage));
        logout();
    }

    else updateTurn();
}
//Function responsible to store the pieces on the grid

function fillGridSquaresArray() {
    const gridsquares = document.getElementsByClassName("square");
    for (let i = 0; i < gridsquares.length; i++) {
      let row = 11 - Math.floor(i / 12);
      let column = String.fromCharCode(96 + (i % 12));
      let square = gridsquares[i];
  
      square.id = column + row;
      let color = "";
      let pieceType = "";
      let pieceId = "";
      if (square.querySelector(".piece")) {
        color     = square.querySelector(".piece").getAttribute("color");
        pieceType = square.querySelector(".piece").classList[1];
        pieceId   = square.querySelector(".piece").id;
      } else {
        color = "blank";
        pieceType = "blank";
        pieceId ="blank";
      }
      let arrayElement = {
        squareId: square.id,
        pieceColor: color,
        pieceType: pieceType,
        pieceId: pieceId
      };
      gridSquareArray.push(arrayElement);
    }
  }
  
  //
  function updateGridSquaresArray (currentCellId, targetCellId, gridSquareArray, survivor) {
      /*
      survivor == 0: strikerPiece
      survivor == 1: attackedPiece
      survivor == -1: none
      */
  
      let currentCell = gridSquareArray.find(
          (element) => element.squareId === currentCellId
      );
      let targetCellElement = gridSquareArray.find(
          (element) => element.squareId === targetCellId
      );
      let pieceColor = currentCell.pieceColor;
      let pieceType = currentCell.pieceType;
      let pieceId= currentCell.pieceId;
  
      // If survivor is 0, the attacker occupies the attacked square.
      // If it's -1, both die and the target square is empty.
      // If it's 1, the attacked survives, so no change is needed.
      if(survivor == 0){
        targetCellElement.pieceColor = pieceColor;
        targetCellElement.pieceType = pieceType;
        targetCellElement.pieceId = pieceId;
      }
      else if(survivor == -1){
        targetCellElement.pieceColor = "blank";
        targetCellElement.pieceType = "blank";
        targetCellElement.pieceId = "blank";
      }
  
      // The origin square always becomes empty after a move.
      currentCell.pieceColor = "blank";
      currentCell.pieceType = "blank";
      currentCell.pieceId = "blank";
  }