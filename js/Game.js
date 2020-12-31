class Game {
  constructor(){}

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200,100,100);
    car2 = createSprite(300,200,100,100);
    car3 = createSprite(500,200,100,100);
    car4 = createSprite(700,200,100,100);
    cars = [car1,car2,car3,car4]; 
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  

 

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //var display_position = 130;

      //index of the array
      var index = 0;

      //x and y position of car
      var x = 0;
      var y;

      for(var plr in allPlayers){
        /*if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      */
        
      //add 1 to the index for every car in the for loop
      index = index +1;
      x = x +200;
      y = displayHeight - allPlayers[plr].distance;
      cars[index-1].x = x;
      cars[index-1].y = y;
      
        if(index === player.index){
          cars[index-1].shapeColor = "red";
        }
    }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
  }
}
