// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

var randomNumber = Math.floor((Math.random() * 802) + 1);
var itHappens = Math.floor((Math.random() * 12) + 1);
var guessesRemaining = 5;
var correctGuesses = 0;
var pokemonName = "";
var pokemonID = 0;
var pokemonNameArray = [];
var playerHasPicked = [];

function newGame() {
    location.reload();
}

function doIt() {
    var audio = document.getElementById("audio");
    audio.play();
    document.getElementById("root").innerHTML = "<h1> The wild " + pokemonName + " got away!";
    document.getElementById("refresh").innerHTML = "<button type='button' class='btn btn-danger btn-lg' onclick='newGame()'>Play Again?</button>";
}

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + randomNumber + '/', true);

request.onload = function() {
    // This is where the JSON is accessed
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        pokemonName = data.name;
        pokemonNameArray = data.name.split("");
        pokemonID = data.id;
        var blankPokemonName = "";

        for (let index = 0; index < pokemonNameArray.length; index++) {
            blankPokemonName = blankPokemonName + "<span class='nameUnderscore' id='" + index + "'>_</span> ";
        }
        
        document.getElementById("pokemon-sprite").innerHTML = "<img src='" + data.sprites.front_default + "' alt='this is pokemon #" + data.id + "' width='190'>";
        document.getElementById("pokemon-name-blank-spaces").innerHTML = "<h2>" + blankPokemonName + "</h2>";
         
    } else {
        console.log('error');
    }
};

window.onload = function() {
    document.onkeyup = function(event) {
        var inp = String.fromCharCode(event.keyCode);
        var selectedIds = [];
        if (/[a-zA-Z0-9-_ ]/.test(inp)) {
            var playerPick = event.key;

            // determine if there are multiple occurances of the same charecter
            if (pokemonNameArray.includes(playerPick)) {
                for (let index = 0; index < pokemonNameArray.length; index++) {
                    var idToSelect = pokemonNameArray.indexOf(playerPick);
                
                    if (idToSelect >= 0) {
                        selectedIds.push(idToSelect);
                        delete pokemonNameArray[idToSelect];
                    }
                }
                playerHasPicked.push(playerPick);
            } else if (playerHasPicked.indexOf(playerPick) >= 0) {
                console.log("you already picked that letter!");
            } else {
                if (guessesRemaining > 0) {
                    guessesRemaining--;
                    document.getElementById("remaining").innerHTML = guessesRemaining;
                } 
                if (guessesRemaining === 0) {
                    document.getElementById("root").innerHTML = "<h1> The wild " + pokemonName + " got away!";
                    document.getElementById("refresh").innerHTML = "<button type='button' class='btn btn-danger btn-lg' onclick='newGame()'>Play Again?</button>";
                }
                playerHasPicked.push(playerPick);
            }
            // update the displayed name of the pokemon
            for (let index = 0; index < selectedIds.length; index++) {
                document.getElementById(selectedIds[index]).innerHTML = playerPick;
                correctGuesses++;

                if (correctGuesses === pokemonName.length) {
                    document.getElementById("title").innerHTML = "Gotcha!";
                    document.getElementById("subtitle").innerHTML = pokemonName;
                    document.getElementById("subtitle").classList.add("cap");
                    document.getElementById("pokemon-sprite").innerHTML = "<img src='assets/images/pokeball.png' width='190'>";
                    document.getElementById("pokemon-name-blank-spaces").style.display = "none";
                    document.getElementById("caption").innerHTML = "was captured!";
                    document.getElementById("refresh").innerHTML = "<button type='button' class='btn btn-danger btn-lg' onclick='newGame()'>Play Again!</button>";
                }
            }
        }
    };
    if (itHappens === 3 && pokemonID != 25) {
        document.getElementById("theThing").innerHTML = "<button type='button' class='btn btn-danger btn-lg' onclick='doIt()'>IT\'S PIKACHU!</button>";
    }
};


// send request
request.send();