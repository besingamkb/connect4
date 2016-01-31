$(document).ready(function() {
  //

  var tileArray = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];

  var currentPlayer = 1;


  displayPlayersName = function(currentPlayer) {
      var player = (currentPlayer==1) ? "yellow" : "red";
    $(".player").html(player).removeClass("yellow").removeClass("red").addClass(player);
    $(".playerWrapper").show();
  }


  console.log("tileArray has " + tileArray.length + " rows");
  console.log("each tileArray rows has " + tileArray[0].length + " columns");

  TileArray = function(col) {
      var counter = 0;
      for (var i = 0; i < tileArray[col].length; i++) {
        //console.log(tileArray[col][i]);
        if (tileArray[col][i] != 1) {
          counter++;
        }
      }
      tileArray[col][counter-1]=1;

      return counter;
  }

  colorTheTile = function(col, row) {
    console.log(col + " " + row);
    var addClass = "yellow";
    if ( currentPlayer == 2) {
        addClass = "red"
    }
    $(".col"+col).find(".row"+row).addClass(addClass);
  }
  displayPlayersName(currentPlayer);

  $("#entry p").click(function(e) {
    var dataCol = $(this).parent().data("col");
    console.log("Col " + dataCol + " is clicked!");
    var tile = TileArray(dataCol);
    colorTheTile(dataCol, tile);
    if (currentPlayer == 1) {
      currentPlayer = 2;
    } else if (currentPlayer == 2) {
      currentPlayer = 1;
    }
    displayPlayersName(currentPlayer);
    console.log("Nextplayer is " + currentPlayer);

    // game logic checkers
  });
});
