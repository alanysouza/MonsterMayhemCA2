
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

//HTML page references
const gridsquares
 = document.getElementsByClassName("square");
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
let currentUser
 = document.getElementById("userId");
let userInfo = document.getElementById("userInfo");

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
          // alert("if");
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
 || players[numToText(rand)].monsters == 0);

  currentPlayerTurn
 = rand;
  updateTurn();
}

//Changing player function
function updateTurn() {
    turn.textContent = `${numToText(currentPlayerTurn
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
function updateGridSquaresArray (currentSquareId, destinationSquareId, gridSquareArray, whoLived) {
    /*
    whoLived == 0: strikerPiece
    whoLived == 1: attackedPiece
    whoLived == -1: none
    */

    let currentSquare = gridSquareArray.find(
        (element) => element.squareId === currentSquareId
    );
    let destinationSquareElement = gridSquareArray.find(
        (element) => element.squareId === destinationSquareId
    );
    let pieceColor = currentSquare.pieceColor;
    let pieceType = currentSquare.pieceType;
    let pieceId= currentSquare.pieceId;

    //se o wholived = 0 o atacante vai ocupar o quadrado do atacado.
    //se for -1, ambos morrem e o quadrado de destino fica vazio
    //se for -1 significa que o atacado é quem sobrevive, então não muda nada
    if(whoLived == 0){
      destinationSquareElement.pieceColor = pieceColor;
      destinationSquareElement.pieceType = pieceType;
      destinationSquareElement.pieceId = pieceId;
    }
    else if(whoLived == -1){
      destinationSquareElement.pieceColor = "blank";
      destinationSquareElement.pieceType = "blank";
      destinationSquareElement.pieceId = "blank";
    }

    //o quadrado de origem sempre vai ficar vazio depois de um movimento
    currentSquare.pieceColor = "blank";
    currentSquare.pieceType = "blank";
    currentSquare.pieceId = "blank";
}

setupBoardSquares();
setupPieces();
fillGridSquaresArray();

//define que os quadrados podem receber peças
function setupBoardSquares() {
  for (let i = 0; i < gridsquares
.length; i++) {
    gridsquares
[i].addEventListener("dragover", allowDrop);
    gridsquares
[i].addEventListener("drop", drop);
    let row = 11 - Math.floor(i / 12);
    let column = String.fromCharCode(96 + (i % 12));
    let square = gridsquares
[i];
    square.id = column + row;
  }
}

//define que as peças (mosntros) podem ser movimentados
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
  if (numToText(currentPlayerTurn
) == pieceColor) {
    const startingSquareId = piece.parentNode.id;
    ev.dataTransfer.setData("text", pieceId + "|" + startingSquareId);
    const pieceObject ={pieceColor:pieceColor, pieceType:pieceType, pieceId:pieceId}

    let legalSquares = getPossibleMoves(
      startingSquareId,
      pieceObject,
      gridSquareArray
    );

    let legalSquaresJson = JSON.stringify(legalSquares);
    ev.dataTransfer.setData("application/json", legalSquaresJson);
  }

  //Game must be started for user to be allowed to play
  else if (btnStart.textContent == "Start Game")
    alert("Press Start Button to play");

  //Selected piece is another colour
  else
    alert(`It's ${numToText(currentPlayerTurn
)}'s turn!`);

}

//function to handle the move of a piece to a cell
function drop(ev) {
  ev.preventDefault();

  //Extrai as informações da peça movimentada e de onde ela veio
  let data = ev.dataTransfer.getData("text");

  let [pieceId, startingSquareId] = data.split("|");
  let legalSquaresJson = ev.dataTransfer.getData("application/json");
  let legalSquares = JSON.parse(legalSquaresJson);

  const piece = document.getElementById(pieceId);
  const pieceColor = piece.getAttribute("color");
  const pieceType = piece.classList[1];

  const destinationSquare = ev.currentTarget;
  let   destinationSquareId = destinationSquare.id;

  //Verifica se no quadrado de destino há uma peça
  let squareContent = getPieceAtSquare(destinationSquareId,gridSquareArray);

  //Verifica se o movimento realizado está de acordo com as regras
  if(!legalSquares.includes(destinationSquareId)) {
    alert(`Invalid move. \nValid moves for this monster: ${legalSquares}`);
    return;
  }

  //A peça é inserida no quadrado de destino para então decidir sobre o combate
  destinationSquare.appendChild(piece);

  let children = destinationSquare.children;
  let whoLived = 0;

  if (squareContent.pieceType != "blank") {
    if(squareContent.pieceType == pieceType) {
      alert(`${squareContent.pieceType} x ${pieceType}: both dead!`);

      //Remover as peças do quadrado
      for (let i = 0; i < children.length; i++) {
        if (!children[i].classList.contains('coordinate')) {
          destinationSquare.removeChild(children[i--]);
        }
      }

      players[squareContent.pieceColor]["monsters"]--;
      players[squareContent.pieceColor][squareContent.pieceType]--;
      players[pieceColor]["monsters"]--;
      players[pieceColor][pieceType]--;

      whoLived = -1;
    }

    //Different monsters
    else {

      destinationSquare.appendChild(piece);
      let children = destinationSquare.children;

      //Verifica a regra de combate para ver quem sobrevive
      if((squareContent.pieceType == "werewolf" && pieceType == "vampire") ||
         (squareContent.pieceType == "vampire" && pieceType == "ghost") ||
         (squareContent.pieceType == "ghost" && pieceType == "werewolf")){

        alert(`${pieceType} x ${squareContent.pieceType}: ${squareContent.pieceType} dead!`);

        //Remove o perdedor do quadrado
        destinationSquare.removeChild(children[0]);

        players[squareContent.pieceColor]["monsters"]--;
        players[squareContent.pieceColor][squareContent.pieceType]--;
      }
      //O atacado ganhou
      else{
        alert(`${pieceType} x ${squareContent.pieceType}: ${pieceType} dead!`);
        destinationSquare.removeChild(children[1]);
        players[pieceColor]["monsters"]--;
        players[pieceColor][pieceType]--;
        whoLived = 1;
      }
    }
  }

  updateGridSquaresArray(
    startingSquareId,
    destinationSquareId,
    gridSquareArray,
    whoLived
  );

  //Atualiza as informações exibidas na página
  updatePlayerInfo();
  return;
}

//Verificar as possibilidade de movimento da peça selecionada
function getPossibleMoves(startingSquareId, piece, gridSquareArray) {

  let horiVert = getHoriVertMoves(startingSquareId, piece.pieceColor, gridSquareArray);

  let diagonal = getDiagonalMoves(startingSquareId, piece.pieceColor, gridSquareArray);
  let legalSquares = [...horiVert, ...diagonal];
  return legalSquares;
}

//Movimentos horizontais e verticais
function getHoriVertMoves(startingSquareId, pieceColor, gridSquareArray) {
  let vetMoveAllUp = moveAllUp(
    startingSquareId,
    pieceColor,
    gridSquareArray
  );
  let vetMoveAllDown = moveAllDown(
    startingSquareId,
    pieceColor,
    gridSquareArray
  );
  let vetMoveAllLeft = moveAllLeft(
    startingSquareId,
    pieceColor,
    gridSquareArray
  );
  let vetMoveAllRight = moveAllRight(
    startingSquareId,
    pieceColor,
    gridSquareArray
  );
  let legalSquares = [
    ...vetMoveAllUp,
    ...vetMoveAllDown,
    ...vetMoveAllLeft,
    ...vetMoveAllRight,
  ];
  return legalSquares;
}

//Movimentos diagonais
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
  let legalSquares = [
    ...vetMoveToDirNE,
    ...vetMoveToDirNW,
    ...vetMoveToDirSE,
    ...vetMoveToDirSW,
  ];
  return legalSquares;
}

//Verifica todas as possibilidades na vertical acima
function moveAllUp(startingSquareId, pieceColor, gridSquareArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);

  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  let legalSquares = [];

  while (currentRank < 10) {
    currentRank++;
    let currentSquareId = file + currentRank;
    let currentSquare = gridSquareArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }

  return legalSquares;
}

//Verifica todas as possibilidades na vertical abaixo
function moveAllDown(startingSquareId, pieceColor, gridSquareArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  let legalSquares = [];

  while (currentRank > 1) {
    currentRank--;
    let currentSquareId = file + currentRank;
    let currentSquare = gridSquareArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }

  return legalSquares;
}

//Verifica todas as possibilidades na horizontal à esquerda
function moveAllLeft(startingSquareId, pieceColor, gridSquareArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);
  let currentFile = file;
  let legalSquares = [];

  if (rank == 0 || rank == 11 || currentFile == "`") return legalSquares;
  while (currentFile != "a") {
    currentFile = String.fromCharCode(currentFile.charCodeAt(0) - 1);
    let currentSquareId = currentFile + rank;
    let currentSquare = gridSquareArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }

  return legalSquares;
}

//Verifica todas as possibilidades na horizontal à direita
function moveAllRight(startingSquareId, pieceColor, gridSquareArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);
  let currentFile = file;
  let legalSquares = [];

  if (rank == 0 || rank == 11 || currentFile == "k") return legalSquares;
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
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }

  return legalSquares;
}

//Verifica todas as possibilidades na diagonal superior esquerda
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
  let legalSquares = [];

  if (file == "`" || rank == 11) return legalSquares;

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
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
    moves--;
  }
  return legalSquares;
}

//Verifica todas as possibilidades na diagonal superior direita
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
  let legalSquares = [];

  if (file == "k" || rank == 11) return legalSquares;

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
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
    moves--;
  }
  return legalSquares;
}

//Verifica todas as possibilidades na diagonal inferior esquerda
function moveToDirSW(startingSquareId, pieceColor, gridSquareArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let legalSquares = [];

  if (file == "`" || rank == 0) return legalSquares;

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
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
    moves--;
  }
  return legalSquares;
}

//Verifica todas as possibilidades na diagonal inferior direita
function moveToDirSE(startingSquareId, pieceColor, gridSquareArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.substring(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let legalSquares = [];

  if (file == "k" || rank == 0) return legalSquares;

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
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
    moves--;
  }
  return legalSquares;
}

//Verifica se no quadrado de destino há uma peça
function getPieceAtSquare(squareId, gridSquareArray) {
  let currentSquare = gridSquareArray.find(
    (element) => element.squareId === squareId
  );
  const color = currentSquare.pieceColor;
  const pieceType = currentSquare.pieceType;
  const pieceId=currentSquare.pieceId;
  return { pieceColor: color, pieceType: pieceType,pieceId:pieceId};
}

// Converte os números aos seus correspondentes de texto
function numToText(i) {
  switch(i){
      case 0:   return "purple";
      case 1:   return "red";
      case 2:   return "pink";
      case 3:   return "orange";
      default:  return "invalid";
  }
}