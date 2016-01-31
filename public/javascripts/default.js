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
  var bucket = [];
  var hasWinner = null;

  connect4 = function() {

  }

  checkHorizontal = function() {
    // check left first
    //if false check rigth
    for (var a = 0; a < tileArray[col].length; a++) {
      if (tileArray[a][row-1] == player && tileArray[a][row+1] == row) {
        bucket.push(tileArray[a]);
      }

      console.log(tileArray[a]);
    }

    console.log("bucket"+bucket);

  }

  checkHorizontal();
}

$("#entry p").click(function(e) {
    clickCounter++;
    var dataCol = $(this).parent().data("col");
    var tile = TileArray(dataCol, currentPlayer);
    colorTheTile(dataCol, tile);

    if (clickCounter > 6) {
      // game logic checkers
      CheckWinner(dataCol, tile, currentPlayer);
    }

    if (currentPlayer == 1) {
      currentPlayer = 2;
    } else if (currentPlayer == 2) {
      currentPlayer = 1;
    }

    displayPlayersName(currentPlayer);

  });
});
