$(document).ready(function() {
  //

// tile array
  var tileArray = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];

  var currentPlayer = 1; // current player
  var clickCounter = 0;


//function below will display the currentPlayer
displayPlayersName = function(currentPlayer) {
      var player = (currentPlayer==1) ? "yellow" : "red";
    $(".player").html(player).removeClass("yellow").removeClass("red").addClass(player);
    $(".playerWrapper").show();
  }

//function below will color the tile
colorTheTile = function(col, row) {
    var addClass = "yellow";
    if ( currentPlayer == 2) {
        addClass = "red"
    }
    $(".col"+col).find(".row"+row).addClass(addClass);
  }

displayPlayersName(currentPlayer);

//function below will populate the TileArray
TileArray = function(col, player) {
      var counter = 0;
      for (var i = 0; i < tileArray[col].length; i++) {
        if (tileArray[col][i] == 0) {
          counter++;
        }
      }
      tileArray[col][counter-1]=player;
      return counter;
  }

CheckWinner = function(col, row, player) {
  var hBucket = [];
  var vBucket = [];
  var rdBucket = [];
  var ruBucket = [];
  var maxRow = tileArray[0].length - 1;
  var maxCol = tileArray.length -1;
  console.log("max row: " + maxRow);
  array4Checker = function(array) {
    var a4Counter = 0;

    for (var a4 = 0; array.length > a4; a4++) {
      a4Counter++;
      if (array[a4] == player) {
        if (a4Counter > 3) {
          //console.log("this is it!!");
          return true;
        }
      } else {
        a4Counter=0;
      }
    }
    return false;
  }

  checkHorizontal = function() {
    var hCounter = 0;
    for (var h = 0; tileArray.length > h; h++) {
      hBucket.push(tileArray[h][row]);
    }

    return array4Checker(hBucket);
  }

  checkVertical = function() {
    var vCounter = 0;
    for (var v = 0; tileArray[col].length > v; v++) {
      vBucket.push(tileArray[col][v]);
    }

    return array4Checker(vBucket);
  }

  checkRigthDown = function() {
    console.log("col: " + col + " row: " + row + " player: " + player);
    var decrement = (row >= col)? col: row;
    var rdCount = 0;
    var x = row;
    var y = col;
    console.log("decrement is " + decrement);
    while (rdCount < decrement) {
      x -= 1;
      y -= 1;
      rdCount++;
    }

    var colRowLimit = 0;
    var rdValue;

    try {
      if (typeof tileArray[y][x] != "undefined") {
        while (colRowLimit <= maxRow || colRowLimit <= col && x ) {
          if (typeof tileArray[y][x] != "undefined") {
            rdValue = tileArray[y][x];
          } else {
            rdValue = 0;
          }
          rdBucket.push(rdValue);
          x += 1;
          y += 1;
          colRowLimit++;
        }
      }
    } catch (e) {
      console.log(e.message);
    }
    return array4Checker(rdBucket);
  }

  checkRigthUp = function() {
    console.log("-------------------");
    console.log("col: " + col + " row: " + row + " player: " + player);
    //var decrement = (row >= col)? col: row;
    var justGo = true;
    var x = row;
    var y = col;

    while (justGo) {
      if (y <= col) {
        if (y >  0 && x < maxRow) {
          console.log("this");
          x += 1;
          y -= 1;
        } else {
          justGo = false;
        }
      } else {
        justGo = false;
      }

    }
    console.log("x: " + x + " y: " + y);

    // console.log(y + " " + x);
    //
    var colRowLimit = 0;
    var rdValue;

    try {
      if (typeof tileArray[y][x] != "undefined") {
        console.log("y and x is defined");
        while (colRowLimit <= maxRow || colRowLimit <= col && x ) {
          console.log(tileArray[y][x]);
          if (typeof tileArray[y][x] != "undefined") {
            rdValue = tileArray[y][x];
          } else {
            rdValue = 0;
          }
          ruBucket.push(rdValue);
          x -= 1;
          y += 1;
          colRowLimit++;
        }
      }
    } catch (e) {
      console.log(e.message);
    }

    console.log(ruBucket);
    return array4Checker(ruBucket);
  }

  hasWinner = function(player) {
    alert("Player " + player + " wins.!");
    location.reload();
  }

  if (checkHorizontal()) {
    hasWinner(player);
  } else if (checkVertical()) {
    hasWinner(player);
  } else if (checkRigthDown()) {
    hasWinner(player);
  } else if (checkRigthUp()) {
    hasWinner(player);
  } else{
    // no one wins
  }

}

$("#entry p").click(function(e) {
    clickCounter++;
    var dataCol = $(this).parent().data("col");
    var tile = TileArray(dataCol, currentPlayer);
    colorTheTile(dataCol, tile);

    if (clickCounter > 6) {
      // game logic checkers
      CheckWinner(dataCol, tile-1, currentPlayer);
    }

    if (currentPlayer == 1) {
      currentPlayer = 2;
    } else if (currentPlayer == 2) {
      currentPlayer = 1;
    }

    displayPlayersName(currentPlayer);

  });
});
