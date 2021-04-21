class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    if(gameState === 1){
      this.input.hide();
      this.input2.hide();

    }

    correctAns = this.input2;

    //write code to show a heading for showing the result of Quiz
    if(this.input2 === 2){
      background("green");
      textSize(20);
      text("You Won",425,200);

    }

    //call getContestantInfo( ) here
    getContestantInfo();


    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      debugger;
      
      var display_Answers = 230;
      
      fill("blue");
      textSize(20);
      text("NOTE : Constestents who answered correctly are highlighted by green color",130,230);

      for(var plr in allContestants){
        debugger;
       
        var correctAns = "2";
        
        if(correctAns === allContestants[plr].answer)
        fill("green")
        
        else
        fill("red");

        display_Answers+=30;
        textSize(20);
        text(allContestants[plr].name + ": "+ allContestants[plr].answer,250,display_Answers);
      }
    }

    if(correctAns === 2){
      gameState = 0;
      fill("green");
      textSize(15);
      text("You Won",425,200);

    }


    

    //write code to highlight contest who answered correctly
    
  }

}
