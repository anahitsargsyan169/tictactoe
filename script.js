'use strict';
let board = [];
const square = document.getElementsByClassName("square");
const x = `<svg height="100" width="100"><polygon points="0,15 15,0 100,85 85,100"  style="fill:white;" /><polygon points="85,0 100,15 15,100 0,85"  style="fill:white;" /></svg>`;
const o = `<svg width="100" height="100" ><circle cx="50" cy="50" r="40" stroke="white" stroke-width="20" fill="black" /></svg>`;
let player = 'x';
let score1 = 0;
let score2 = 0;
function clearBoard(evt){
    if(evt.keyCode == 32) {
        player = 'x';
        board = [];
        let svg = document.getElementsByTagName("svg");
        Array.from(svg).forEach(element => {
            element.remove(); 
        });
    }
    newGame();
}
function checkDraw()
{
    for(let i = 0; i<9; i++)
    {
        if(board[i] !== undefined){
            continue;
        }else{
            return false;
        }
    }
    document.getElementById("notice").innerText = `Press "Space" to start a new round.`;
    window.addEventListener("keydown",clearBoard);
}
function checkWin(...cells){
    if (board[cells[0]] == player && board[cells[1]] == player && board[cells[2]] == player)
    {
        window.addEventListener("keydown",clearBoard);
        Array.from(square).forEach(element => {
            element.removeEventListener("click",play);
        });
        cells.forEach(cell => document.getElementById(`${cell+1}`).firstChild.classList.add("win"));
        document.getElementById("notice").innerText = `Press "Space" to start a new round.`;
        switch (player)
        {
            case "x":
                score1++;
                document.getElementsByClassName("score")[0].innerText = `${score1}`;
                break;
            case "o":
                score2++;
                document.getElementsByClassName("score")[1].innerText = `${score2}`;
                break;

        }
    }
}
function check (){
    checkWin(0,1,2);
    checkWin(3,4,5);
    checkWin(6,7,8);
    checkWin(0,3,6);
    checkWin(1,4,7);
    checkWin(2,5,8);
    checkWin(0,4,8);
    checkWin(2,4,6);
    checkDraw();
}
function play(evt) {
    if (player === 'o') {
        evt.target.innerHTML = o;
        board[evt.target.id-1] = player;
        check();
        player = "x";
    } else {
        evt.target.innerHTML = x;
        board[evt.target.id-1] = player;
        check();
        player = "o";
    }
    evt.target.removeEventListener("click",play);
}
function newGame() {
    Array.from(square).forEach(element => {
        element.addEventListener("click",play);
    });
    window.removeEventListener("keydown",clearBoard);
    document.getElementById("notice").innerText = ``;
}
function start() {
    if(document.getElementById("first").value.trim() != "")
    {
        document.getElementsByClassName("playerName")[0].innerText = `${document.getElementById("first").value} (X)`;
    }
    if(document.getElementById("second").value.trim() != "")
    {
        document.getElementsByClassName("playerName")[1].innerText = `${document.getElementById("second").value} (O)`;
    }
    document.querySelector(".openingPage").remove();
    document.querySelector("#board").style.display = "flex";
    document.querySelector("#result").style.display = "flex";
    newGame();
}

document.querySelector("#start").addEventListener("click",start);