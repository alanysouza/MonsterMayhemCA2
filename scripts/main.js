
//HTML page references
const gridsquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.getElementsByTagName("img");
let btnLogin = document.getElementById("btn-login");
let btnStart = document.getElementById("btn-start");
let btnEndTurn = document.getElementById("btn-turn");
let turn = document.getElementById("turn");
let purplePlayerInfo = document.getElementById("purplePlayerInfo");
let redPlayerInfo = document.getElementById("redPlayerInfo");
let pinkPlayerInfo = document.getElementById("pinkPlayerInfo");
let orangePlayerInfo = document.getElementById("orangePlayerInfo");
let currentUser = document.getElementById("userId");
let userInfo = document.getElementById("userInfo");

//Controls the pieces' positions
let gridSquareArray = [];

// 0: purple; 1: purple; 2: pink; 3: orange
let currentPlayerTurn
 = -1;

//Stores the current game
const players = {
    purple: {monsters: 0, werewolf: 0, vampire: 0, ghost: 0},
    red: {monsters: 0, werewolf: 0, vampire: 0, ghost: 0},
    pink: {monsters: 0, werewolf: 0, vampire: 0, ghost: 0},
    orange: {monsters: 0, werewolf: 0, vampire: 0, ghost: 0},
}

//Login info storage
let usersLS
 = {noOfLogins: 0, purple: 0, red: 0, pink: 0, orange: 0};
let user;

//Login function
function login() {
    usersLS
.noOfLogins = 0;
    usersLS
.purple = 0;
    usersLS
.red = 0;
    usersLS
.pink = 0;
    usersLS
.orange = 0;

    do{
        user = prompt("Enter your username");
    } while (user === '');

    //Else the user pressed Cancel
    if (user) {
        //Check if the user did log in
        if (!localStorage.getItem(user)){
          localStorage.setItem(user, JSON.stringify(usersLS
));
        }

        usersLS
 = JSON.parse(localStorage.getItem(user));
        usersLS
.noOfLogins++;
        localStorage.setItem(user, JSON.stringify(usersLS
));

        userInfo.textContent = `Number of logins: ${usersLS
.noOfLogins}
        Purple's victories: ${usersLS
.purple}
        Red's victories: ${usersLS
.red}
        Pink's victories: ${usersLS
.pink}
        Orange's victories: ${usersLS
.orange}`

        btnLogin.textContent = "Logout";
        if(usersLS
.noOfLogins == 1)
          currentUser
.textContent = `Logged as ${user}`;
        else
          currentUser
.textContent = `Welcome back, ${user}!`;
    }
}

//Logout function
function logout() {
  currentUser
.textContent = "Please login.";
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
    if (btnStart.textContent == "Start Game") {
      if( currentUser
.textContent == "Please login."){
        alert("You must be logged in to play.");
      }
      else{
        currentPlayerTurn
 = parseInt(Math.random() * 4);
        identifyMonsters();
        updatePlayerInfo();
        btnStart.textContent = "End Game";
        btnEndTurn.style.visibility = "visible";
      }

    }

    else {
      alert("You will be logged out.");
      location.reload();
    }
}

//When the user clicks on End Turn Button selection
btnEndTurn.onclick = () => {
  let rand;
  do {
    rand = parseInt(Math.random() * 4);
  } while (rand == currentPlayerTurn
 || players[intToText(rand)].monsters == 0);

  currentPlayerTurn
 = rand;
  updateTurn();
}

//Changing player function
function updateTurn() {
    turn.textContent = `${intToText(currentPlayerTurn
)}'s turn`;
}

//Monter amount displayed
function identifyMonsters() {
    const gridsquares
 = document.getElementsByClassName("square");

    for (let i = 0; i < gridsquares
.length; i++) {
      let square = gridsquares
[i];

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
        alert("Purple player won!");
        usersLS
.purple++;
        localStorage.setItem(user, JSON.stringify(usersLS
));
        logout();
    }
    else if(players.purple.monsters == 0 && players.red.monsters > 0 &&
      players.pink.monsters == 0 && players.orange.monsters == 0) {
        alert("Red player won!");
        usersLS
.red++;
        localStorage.setItem(user, JSON.stringify(usersLS
));
        logout();
    }
    else if(players.purple.monsters == 0 && players.red.monsters == 0 &&
      players.pink.monsters > 0 && players.orange.monsters == 0) {
        alert("Pink player won!");
        usersLS
.pink++;
        localStorage.setItem(user, JSON.stringify(usersLS
));
        logout();
    }
    else if(players.purple.monsters == 0 && players.red.monsters == 0 &&
      players.pink.monsters == 0 && players.orange.monsters > 0) {
        alert("Orange player won!");
        usersLS
.orange++;
        localStorage.setItem(user, JSON.stringify(usersLS
));
        logout();
    }

    else updateTurn();
}

//Function responsible to store the pieces on the boarding space
function fillGridSquaresArray() {
  const gridsquares
 = document.getElementsByClassName("square");
  for (let i = 0; i < gridsquares
.length; i++) {
    let row = 11 - Math.floor(i / 12);
    let column = String.fromCharCode(96 + (i % 12));
    let square = gridsquares
[i];

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
function updateGridSquaresArray (currentSquareId, targetCellId, gridSquareArray, survivor) {
    let currentSquare = gridSquareArray.find(
        (element) => element.squareId === currentSquareId
    );
    let targetCellElement = gridSquareArray.find(
        (element) => element.squareId === targetCellId
    );
    let pieceColor = currentSquare.pieceColor;
    let pieceType = currentSquare.pieceType;
    let pieceId= currentSquare.pieceId;

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
    currentSquare.pieceColor = "blank";
    currentSquare.pieceType = "blank";
    currentSquare.pieceId = "blank";
}

setupGridSquares();
setupPieces();
fillGridSquaresArray();

//Allows squares to receive pieces.
function setupGridSquares() {
  for (let i = 0; i < gridsquares
.length; i++) {
    gridsquares
[i].addEventListener("dragover", allowDrop);
    gridsquares
[i].addEventListener("preventDefaultOnDrop", preventDefaultOnDrop);
    let row = 11 - Math.floor(i / 12);
    let column = String.fromCharCode(96 + (i % 12));
    let square = gridsquares
[i];
    square.id = column + row;
  }
}

// Allows pieces (monsters) to be moved.
function setupPieces() {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].addEventListener("dragstart", drag);
    pieces[i].setAttribute("draggable", true);
    pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
  }
  for (let i = 0; i < piecesImages.length; i++) {
    piecesImages[i].setAttribute("draggable", false);
  }
}

//preventents non intentional moves 
function allowDrop(ev) {
  ev.preventDefault();
}

//Controls when a piece is moved
function drag(ev) {
  const piece = ev.target;

  const pieceColor = piece.getAttribute("color");
  const pieceType =piece.classList[1];
  const pieceId = piece.id;

  // Checks if the piece is of the current player's color.
  if (intToText(currentPlayerTurn
) == pieceColor) {
    const startingSquareId = piece.parentNode.id;
    ev.dataTransfer.setData("text", pieceId + "|" + startingSquareId);
    const pieceObject ={pieceColor:pieceColor, pieceType:pieceType, pieceId:pieceId}

    let legalMoves = getLegalMoves(
      startingSquareId,
      pieceObject,
      gridSquareArray
    );

    let legalMovesJson = JSON.stringify(legalMoves);
    ev.dataTransfer.setData("application/json", legalMovesJson);
  }

  //Game must be started for user to be allowed to play
  else if (btnStart.textContent == "Start Game")
    alert("Press Start Button to play");

  //Selected piece is another colour
  else
    alert(`It's ${intToText(currentPlayerTurn
)}'s turn!`);

}

//function to handle the move of a piece to a cell
function preventDefaultOnDrop(ev) {
  ev.preventDefault();

  let data = ev.dataTransfer.getData("text");
  let [pieceId, startingSquareId] = data.split("|");
  let legalMovesJson = ev.dataTransfer.getData("application/json");
  let legalMoves = JSON.parse(legalMovesJson);

  const piece = document.getElementById(pieceId);
  const pieceColor = piece.getAttribute("color");
  const pieceType = piece.classList[1];

  const targetCell = ev.currentTarget;
  let   targetCellId = targetCell.id;

  // Check if there is a piece in the target cell
  let squareContent = getPieceAtSquare(targetCellId,gridSquareArray);

  //Check if the movement is allowed
  if(!legalMoves.includes(targetCellId)) {
    alert(`Invalid move. \nValid moves for this monster: ${legalMoves}`);
    return;
  }

 //Place the piece in the target cell
  targetCell.appendChild(piece);

  let children = targetCell.children;
  let survivor = 0;

  if (squareContent.pieceType != "blank") {
    if(squareContent.pieceType == pieceType) {
      alert(`${squareContent.pieceType} x ${pieceType}: both dead!`);

      //Remove pieces from the cells
      for (let i = 0; i < children.length; i++) {
        if (!children[i].classList.contains('coordinate')) {
          targetCell.removeChild(children[i--]);
        }
      }

      players[squareContent.pieceColor]["monsters"]--;
      players[squareContent.pieceColor][squareContent.pieceType]--;
      players[pieceColor]["monsters"]--;
      players[pieceColor][pieceType]--;

      survivor = -1;
    }

    //Different monsters
    else {

      targetCell.appendChild(piece);
      let children = targetCell.children;

      //Check the rules to see who survives 
      if((squareContent.pieceType == "werewolf" && pieceType == "vampire") ||
         (squareContent.pieceType == "vampire" && pieceType == "ghost") ||
         (squareContent.pieceType == "ghost" && pieceType == "werewolf")){

        alert(`${pieceType} x ${squareContent.pieceType}: ${squareContent.pieceType} dead!`);

        //Remove the loser from the cell
        targetCell.removeChild(children[0]);

        players[squareContent.pieceColor]["monsters"]--;
        players[squareContent.pieceColor][squareContent.pieceType]--;
      }
      //O atacado ganhou
      else{
        alert(`${pieceType} x ${squareContent.pieceType}: ${pieceType} dead!`);
        targetCell.removeChild(children[1]);
        players[pieceColor]["monsters"]--;
        players[pieceColor][pieceType]--;
        survivor = 1;
      }
    }
  }

  updateGridSquaresArray(
    startingSquareId,
    targetCellId,
    gridSquareArray,
    survivor
  );

  //Update the information
  updatePlayerInfo();
  return;
}

//Check if the move selected is legal
function getLegalMoves(startingSquareId, piece, gridSquareArray) {

  let horiVert = getHoriVertMoves(startingSquareId, piece.pieceColor, gridSquareArray);
  let diagonal = getDiagonalMoves(startingSquareId, piece.pieceColor, gridSquareArray);
  let legalMoves = [...horiVert, ...diagonal];
  return legalMoves;
}

//Horizontal and vertical moves
function getHoriVertMoves(startingSquareId, pieceColor, gridSquareArray) {
  let vetMoveAllUp = moveEverthyingUp(
    startingSquareId,
    pieceColor,
    gridSquareArray
  );
  let vetMoveAllDown = moveEverthyingDown(
    startingSquareId,
    pieceColor,
    gridSquareArray
  );
  let vetMoveAllLeft = moveEverthyingLeft(
    startingSquareId,
    pieceColor,
    gridSquareArray
  );
  let vetMoveAllRight = moveEverthyingRigth(
    startingSquareId,
    pieceColor,
    gridSquareArray
  );
  let legalMoves = [
    ...vetMoveAllUp,
    ...vetMoveAllDown,
    ...vetMoveAllLeft,
    ...vetMoveAllRight,
  ];
  return legalMoves;
}

//check possibilities
function getDiagonalMoves(startingSquareId, pieceColor, gridSquareArray) {
  let vetMoveToDirNE = moveToDirNE(
    startingSquareId,
    pieceColor,
    gridSquareArray
  );
  let vetMoveToDirNW = moveToDirNW(
    startingSquareId,
    pieceColor,
    gridSquareArray
  );
  let vetMoveToDirSE = moveToDirSE(
    startingSquareId,
    pieceColor,
    gridSquareArray
  );
  let vetMoveToDirSW = moveToDirSW(
    startingSquareId,
    pieceColor,
    gridSquareArray
  );
  let legalMoves = [
    ...vetMoveToDirNE,
    ...vetMoveToDirNW,
    ...vetMoveToDirSE,
    ...vetMoveToDirSW,
  ];
  return legalMoves;
}

//check possible moves 
function moveEverthyingUp(startingSquareId, pieceColor, gridSquareArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);

  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  let legalMoves = [];

  while (currentRank < 10) {
    currentRank++;
    let currentSquareId = file + currentRank;
    let currentSquare = gridSquareArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalMoves;
    legalMoves.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalMoves;
  }

  return legalMoves;
}

//Check possibilities downward
function moveEverthyingDown(startingSquareId, pieceColor, gridSquareArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  let legalMoves = [];

  while (currentRank > 1) {
    currentRank--;
    let currentSquareId = file + currentRank;
    let currentSquare = gridSquareArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalMoves;
    legalMoves.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalMoves;
  }

  return legalMoves;
}

//Check all possibilities left
function moveEverthyingLeft(startingSquareId, pieceColor, gridSquareArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);
  let currentFile = file;
  let legalMoves = [];

  if (rank == 0 || rank == 11 || currentFile == "`") return legalMoves;
  while (currentFile != "a") {
    currentFile = String.fromCharCode(currentFile.charCodeAt(0) - 1);
    let currentSquareId = currentFile + rank;
    let currentSquare = gridSquareArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalMoves;
    legalMoves.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalMoves;
  }

  return legalMoves;
}

//check possibilities rightward
function moveEverthyingRigth(startingSquareId, pieceColor, gridSquareArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);
  let currentFile = file;
  let legalMoves = [];

  if (rank == 0 || rank == 11 || currentFile == "k") return legalMoves;
  while (currentFile != "j") {
    currentFile = String.fromCharCode(
      currentFile.charCodeAt(0) + 1
    );
    let currentSquareId = currentFile + rank;
    let currentSquare = gridSquareArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalMoves;
    legalMoves.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalMoves;
  }

  return legalMoves;
}

//Check possibilities northwest
function moveToDirNW(
  startingSquareId,
  pieceColor,
  gridSquareArray
) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let legalMoves = [];

  if (file == "`" || rank == 11) return legalMoves;

  let moves = 2;
  while (!(currentFile == "a" || currentRank == 8 || moves == 0)) {
    currentFile = String.fromCharCode(
      currentFile.charCodeAt(0) - 1
    );
    currentRank++;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = gridSquareArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalMoves;
    legalMoves.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalMoves;
    moves--;
  }
  return legalMoves;
}

//Check possibilities northeast
function moveToDirNE(
  startingSquareId,
  pieceColor,
  gridSquareArray
) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let legalMoves = [];

  if (file == "k" || rank == 11) return legalMoves;

  let moves = 2;
  while (!(currentFile == "j" || currentRank == 10 || moves == 0)) {
    currentFile = String.fromCharCode(
      currentFile.charCodeAt(0) + 1
    );
    currentRank++;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = gridSquareArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalMoves;
    legalMoves.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalMoves;
    moves--;
  }
  return legalMoves;
}

//Check all possibilities southeast
function moveToDirSW(startingSquareId, pieceColor, gridSquareArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let legalMoves = [];

  if (file == "`" || rank == 0) return legalMoves;

  let moves = 2;
  while (!(currentFile == "a" || currentRank == 1 || moves == 0)) {
    currentFile = String.fromCharCode(
      currentFile.charCodeAt(0) - 1
    );
    currentRank--;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = gridSquareArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalMoves;
    legalMoves.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalMoves;
    moves--;
  }
  return legalMoves;
}

//check all the possibilities diagonal right.
function moveToDirSE(startingSquareId, pieceColor, gridSquareArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let legalMoves = [];

  if (file == "k" || rank == 0) return legalMoves;

  let moves = 2;
  while (!(currentFile == "j" || currentRank == 1 || moves == 0)) {
    currentFile = String.fromCharCode(
      currentFile.charCodeAt(0) + 1
    );
    currentRank--;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = gridSquareArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalMoves;
    legalMoves.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalMoves;
    moves--;
  }
  return legalMoves;
}

//Chack if there is already a piece on the destination grid
function getPieceAtSquare(squareId, gridSquareArray) {
  let currentSquare = gridSquareArray.find(
    (element) => element.squareId === squareId
  );
  const color = currentSquare.pieceColor;
  const pieceType = currentSquare.pieceType;
  const pieceId=currentSquare.pieceId;
  return { pieceColor: color, pieceType: pieceType,pieceId:pieceId};
}

// Convert numbers to text
function intToText(i) {
  switch(i){
      case 0:   return "purple";
      case 1:   return "red";
      case 2:   return "pink";
      case 3:   return "orange";
      default:  return "invalid";
  }
}