var connect4 = {
        wrapper: "",
        gameMode: null,
        currentPlayer: ""
};

connect4.compute = function () {
    // game logic
};

connect4.loadFirstRow = function(wrapper) {
    // load the first row
    // removing disabled class and adding canAdd class on first row
    wrapper.find(".row5").find(".col").removeClass("disabled").addClass("canAdd"); // remove disabled class on first load and add canAdd class
};

connect4.reload = function() {
    // reloading page
    location.reload();
}

connect4.generatePlayers = function() {
    if (this.gameMode === "human") {
        this.players = {
            one : {
                name : "one",
                color : "yellow"
            },
            two : {
                name : "two",
                color : "red"
            }
        }
    }

    this.players.currentPlayer = "one";
};

connect4.nextPlayer = function(player) {
    this.players.currentPlayer = player;
}

$(document).ready(function() {
    var wrapper;
    $("#controls").change(function(e) {
        if (connect4.gameMode === null) {
            if (this.value !== "default") {
                $("#startGame").removeAttr("disabled");
                if (this.value === "computer") {
                    connect4.gameMode = "computer";
                } else {
                    connect4.gameMode = "human";
                }
            } else {
                $("#startGame").prop('disabled', true);
            }
            connect4.generatePlayers();
        } else {
            // reload page
            connect4.reload();
        }
    });

    $("#startGame").click(function() {
        //init;
        startGame();
    });

    function startGame() {
        wrapper = $(".connect4wrapper");
        connect4.loadFirstRow(wrapper);

        wrapper.parent().find(".controls").find(".currentPlayer").find("em").html(connect4.players.one.name);
        wrapper.parent().find(".controls").find(".currentPlayer").show().find("em").css({"color": connect4.players.one.color});

        function canAdd() {

        }

        wrapper.find(".canAdd").on("click", function() {

            var THIS = $(this);
            console.log(THIS);
            var c4Player = connect4.players;
            if (THIS.hasClass("canAdd")) {
                if (c4Player.currentPlayer == "one") {
                    THIS.addClass(c4Player.one.color);
                    THIS.removeClass("canAdd");
                    THIS.parent().prev().find(".col"+THIS.data("col")).removeClass("disabled");
                    THIS.parent().prev().find(".col"+THIS.data("col")).addClass("canAdd");
                    connect4.nextPlayer("two");
                } else if (c4Player.currentPlayer =="two") {
                    THIS.addClass(c4Player.two.color);
                    THIS.removeClass("canAdd");
                    THIS.parent().prev().find(".col"+THIS.data("col")).removeClass("disabled");
                    THIS.parent().prev().find(".col"+THIS.data("col")).addClass("canAdd");
                    connect4.nextPlayer("one");
                }
            }

        });
    }


});
