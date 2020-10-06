import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>TIC TAC TOES</h1>
<div>

</div>
`;

let move = 0; //counter for gamestate
let time;
let interval;

function renderTable() {
  const board = document.getElementById("board");

  const table = document.createElement("table");
  table.id = "table";
  var tableBody = document.createElement("tbody");

  for (var i = 0; i < 5; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 5; j++) {
      var column = document.createElement("td");

      row.appendChild(column);
    }

    tableBody.appendChild(row);
  }
  table.appendChild(tableBody);
  board.appendChild(table);
  startGame(table);
}

renderTable();

function cellPress(cell, board) {
  //function for playing the game
  progressBar();

  if (move % 2 === 0) {
    //check for which player
    if (cell.innerHTML === "") {
      //check if cell is empty
      cell.innerHTML = "x";
      cell.style.backgroundColor = "rgb(250,128,114)";
      roundTimer();
      move++;
    }
  } else {
    if (cell.innerHTML === "") {
      //check if cell is empty
      cell.innerHTML = "o";
      cell.style.backgroundColor = "rgb(124,252,0)";
      roundTimer();
      move++;
    }
  }
  //check for winner
  if (move > 8) {
    checkWinner(board);
  }
  if (move === 25) {
    alert("It's a draw!");
    emptyBoard(board);
    move = 0;
  }
}

function startGame(board) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      board.rows[i].cells[j].onclick = function () {
        cellPress(this, board);
      };
    }
  }
}

function checkWinner(board) {
  //check for columns

  for (var i = 0; i < 5; i++) {
    let a = board.rows[0].cells[i].innerHTML;
    let b = board.rows[1].cells[i].innerHTML;
    let c = board.rows[2].cells[i].innerHTML;
    let d = board.rows[3].cells[i].innerHTML;
    let e = board.rows[4].cells[i].innerHTML;

    if (a === "" || b === "" || c === "" || d === "" || e === "") {
      continue;
    }

    if (a === b && b === c && c === d && d === e) {
      win(board);
      break;
    }
  }
  //checks rows
  for (var j = 0; j < 5; j++) {
    let a = board.rows[j].cells[0].innerHTML;
    let b = board.rows[j].cells[1].innerHTML;
    let c = board.rows[j].cells[2].innerHTML;
    let d = board.rows[j].cells[3].innerHTML;
    let e = board.rows[j].cells[4].innerHTML;

    if (a === "" || b === "" || c === "" || d === "" || e === "") {
      continue;
    }

    if (a === b && b === c && c === d && d === e) {
      win(board);
      break;
    }
  }

  //check diagonal
  let a = board.rows[0].cells[0].innerHTML;
  let b = board.rows[1].cells[1].innerHTML;
  let c = board.rows[2].cells[2].innerHTML;
  let d = board.rows[3].cells[3].innerHTML;
  let e = board.rows[4].cells[4].innerHTML;
  let f = board.rows[0].cells[4].innerHTML;
  let g = board.rows[1].cells[3].innerHTML;
  let h = board.rows[2].cells[2].innerHTML;
  let x = board.rows[3].cells[1].innerHTML;
  let y = board.rows[4].cells[0].innerHTML;

  if (a === b && b === c && c === d && d === e) {
    win(board);
  } else if (f === g && g === h && h === x && x === y) {
    win(board);
  }
}

function emptyBoard(board) {
  move = 0;
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      board.rows[i].cells[j].innerHTML = "";
      board.rows[i].cells[j].style.backgroundColor = "";
    }
  }
  clearTimeout(time);
}

function win(board) {
  let currentplayer = 1;
  if (move % 2 === 0) {
    currentplayer = 2;
  }
  alert("Player " + currentplayer + " won!");
  emptyBoard(board);
}

function progressBar() {
  clearInterval(interval);
  let bar = document.getElementById("myBar");
  interval = setInterval(frame, 10);
  var width = 0;

  function frame() {
    //handles progressbar
    if (width >= 600) {
      clearInterval(interval);
    } else {
      width++;
      bar.style.width = width / 10 + "%";
      bar.innerHTML = Math.round(width / 60) + " s";
    }
  }
}

function roundTimer() {
  clearTimeout(time);
  time = setTimeout(timeAlert, 10000);

  function timeAlert() {
    move++; //advances turn
    alert("You missed your turn!");
  }
}
