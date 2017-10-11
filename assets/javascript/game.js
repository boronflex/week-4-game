// var gameLogic = {

//   chooseCharacter: function(){

    $(".character-block").click(function(){

      //pick player character
      var stateOfCharacter = $(this).attr("state");

      if (stateOfCharacter==="unpicked"){
             
        var getCharacterBlock = $(this);

        getCharacterBlock.attr("state", "main");

        getCharacterBlock.detach().appendTo("#your-character-area");

        //move leftover characters to enemy section
        $("#character-select-area").children("div").each(function(){

          var getLeftovers = $(this);

          getLeftovers.attr("state", "enemy");

          getLeftovers.find("img").css({"border-color":"red"})


          getLeftovers.detach().appendTo("#enemies-ondeck");

        });

      } else if (stateOfCharacter==="enemy") {

        //pick current defender
        var getCharacterBlock = $(this)

        getCharacterBlock.attr("state", "defender");

        getCharacterBlock.find("img").css({"border-color":"black"})

        getCharacterBlock.find("div").css({"color":"white"})

        console.log(getCharacterBlock);
        getCharacterBlock.detach().appendTo("#defender-area");
      }

    });

//   }
// }


//can possibly clean this up with a while loop
  var mainAttackPointsIncrease = 0;

  $("#attack-button").click(function () {

    var mainCharacter = $("div[state = 'main']")
    var getMainHeathPoints = mainCharacter.attr("hp");
    var getMainAttackPoints = parseInt(mainCharacter.attr("ap"));
    mainCharacter.find(".character-hp");
    
    var defendCharacter = $("div[state = 'defender']")
    var getDefendHealthPoints = defendCharacter.attr("hp");
    var getDefendCap = defendCharacter.attr("cap");

    mainAttackPointsIncrease += 1;

    getMainAttackPoints = getMainAttackPoints * mainAttackPointsIncrease;

    var damageYou = getMainHeathPoints - getDefendCap;
    mainCharacter.attr("hp", damageYou);
    mainCharacter.find(".character-hp").text(damageYou);
    var yourCharacter = mainCharacter.find(".character-name").text();

    var damageThem = getDefendHealthPoints - getMainAttackPoints;
    defendCharacter.attr("hp", damageThem);
    defendCharacter.find(".character-hp").text(damageThem);
    var defendCharacter = defendCharacter.find(".character-name").text();
    

    $("#your-attack-text").text(yourCharacter + " attacked " + defendCharacter + " for " + getMainAttackPoints + " damage");
    $("#enemy-attack-text").text(defendCharacter + " attacked " + yourCharacter + " for " + getDefendCap + " damage");

    //might need to move this out and move variables global, works but not pretty
    if (damageYou <= 0){
      $("#your-attack-text").text("You have been defeated!!");
      $("#restartButton").css({"visibility":"visible"});

    }

    if (damageThem <= 0){

      getDefendCap = 0;

      $("div[state = 'defender']").remove();
      $("#your-attack-text").text("You have defeated them, you can chose another enemy.");
      $("#enemy-attack-text").css({"visibility":"hidden"});
    }

  });

  $( "#restartButton" ).click(function() {
    location.reload(true);
  });

