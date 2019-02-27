// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
var randomNumber = Math.floor(Math.random() * 807)
var nameBlankSpaces = ""
var pokemonNameArray = [];

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + randomNumber + '/', true);

request.onload = function() {
    // This is where the JSON is accessed
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        pokemonNameArray = data.name.split("");
        var blankPokemonName = "";

        for (let index = 0; index < pokemonNameArray.length; index++) {
            blankPokemonName = blankPokemonName + "<span class='nameUnderscore' id='" + index + "'>_</span> ";
        }
        
        document.getElementById("pokemon-sprite").innerHTML = "<img src='" + data.sprites.front_default + "' alt='this is pokemon #" + data.id + "' width='190'>";
        document.getElementById("pokemon-name-blank-spaces").innerHTML = "<h2>" + blankPokemonName + "</h2>";
         
    } else {
        console.log('error');
    }
}

document.onkeyup = function(event) {
    var playerPick = event.key;
    
    if (pokemonNameArray.includes(playerPick)) {
        var idToSelect = pokemonNameArray.indexOf(playerPick);
        document.getElementById(idToSelect).innerHTML = playerPick;
        delete pokemonNameArray[idToSelect];
                
    } else {
        console.log("that is not in the name");
        
    }
    
}

// send request
request.send();