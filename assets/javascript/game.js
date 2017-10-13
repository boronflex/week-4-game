$(document).click(function(){
  $("#clickanywhere").css({"visibility":"hidden"});
  gameLogic.chooseCharacter();
});

$("#attack-button").click(function(){
  gameLogic.attack();
});

$("#restartButton").click(function(){
  gameLogic.restart();
});

var gameLogic = {

  chooseCharacter: function(){

    $(".character-block").click(function(){

      //pick player character
      var stateOfCharacter = $(this).attr("state");

      if (stateOfCharacter==="unpicked"){
             
        var getCharacterBlock = $(this);

        //change character to main character through attributes, this is you
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

        //pick current defender this is them
        var getCharacterBlock = $(this)

        //change character to enemy through attributes, this who you are fighting
        getCharacterBlock.attr("state", "defender");

        getCharacterBlock.find("img").css({"border-color":"black"})

        getCharacterBlock.find("div").css({"color":"white"})

        //console.log(getCharacterBlock);
        getCharacterBlock.detach().appendTo("#defender-area");
      }

    });

  },

  //set these global so pressing the button doesnt reset them

  mainAttackPointsIncrease: 0,

  damageYou: 0,

  attack: function(){

    //get main character stats for battle
    var mainCharacter = $("div[state = 'main']")
    this.damageYou = mainCharacter.attr("hp");

    var getMainAttackPoints = parseInt(mainCharacter.attr("ap"));
    mainCharacter.find(".character-hp");
    var yourCharacter = mainCharacter.find(".character-name").text();

    //get current enemy stats  
    var defendCharacter = $("div[state = 'defender']")

    //if an enemy has been selected proceed to battle as normal
    //the selector to find a div with state 'defender' has a length method,
    //1 in this program means its populated
    if (defendCharacter.length===1){

      //this gets hidden later on so need to make sure its visible from the start
      $("#enemy-attack-text").css({"visibility":"visible"});
      $("#enemy-attack-text").text("");
      //get stats
      var getDefendHealthPoints = defendCharacter.attr("hp");
      var getDefendCap = defendCharacter.attr("cap");
      var defendCharacterName = defendCharacter.find(".character-name").text();

      //add attack power multiplier bc its at 0
      this.mainAttackPointsIncrease += 1;

      //multiply base attaack power by multiplier
      getMainAttackPoints = getMainAttackPoints * this.mainAttackPointsIncrease;

      //store annd apply to your characater damage from them attacking you
      this.damageYou = this.damageYou - getDefendCap;
      mainCharacter.attr("hp", this.damageYou);

      mainCharacter.find(".character-hp").text(String(this.damageYou));

      ///////insert you defeat them defeat ifs here////////
          //if you get defeated

      if (this.damageYou <= 0){
        $("#your-attack-text").text("You have been defeated!!");
        //show restart button if you catch a whuppin'
        $("#restartButton").css({"visibility":"visible"});

        mainCharacter.find(".character-hp").text("0");

      } else {

        //store annd apply to their character damage from you attacking them
        var damageThem = getDefendHealthPoints - getMainAttackPoints;
        defendCharacter.attr("hp", damageThem);
        defendCharacter.find(".character-hp").text(damageThem);

        //if you defeat them
        if (damageThem <= 0){

          //so repeated clicking of attack button will not draw down your power after they are defeated
          getDefendCap = 0;

          $("div[state = 'defender']").remove();
          $("#your-attack-text").text("You have defeated " + defendCharacterName + ", you can chose another enemy.");
          $("#enemy-attack-text").css({"visibility":"hidden"});

        } else {

          //display current damage messages
          $("#your-attack-text").text(yourCharacter + " attacked " + defendCharacterName + " for " + getMainAttackPoints + " damage");
          $("#enemy-attack-text").text(defendCharacterName + " attacked " + yourCharacter + " for " + getDefendCap + " damage");

        }

      }
      
    } else {
      //div with state enemy length is 0 - no enemy selected
      $("#your-attack-text").text("You must choose an enemy");
    }
  },

  //restart button to restart game
  restart: function(){
    // $( "#restartButton" ).click(function() {
      location.reload(true);
    // });
  }

}



