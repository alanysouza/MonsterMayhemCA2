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