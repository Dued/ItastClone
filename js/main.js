enchant();

var gameFlag = 0;

window.onload = function(){
    var game = new Game(640, 480);
    game.preload('start.png','title.png');
    var mainScene = new Scene();
    
    game.onload = function(){
	var title = makeTitle(game, mainScene);	
	//mainScene definition
	mainScene.backgroundColor = "#FFFFFF";
	var foo = new Label("foo!!");
	mainScene.addChild(foo);
	
	game.rootScene.addChild(title);
    }

    game.addEventListener('enterframe', function(){
	//frame sequence
	if(gameFlag == 1){
	    game.replaceScene(mainScene);
	    gameFlag = 2;
	}
	
    });

    game.start();
}

var makeTitle = function(game, mainScene){
    //title definition
    var title = new Scene();
    var titleLabel = new Sprite(277,24);
    titleLabel.image = game.assets['title.png'];
    titleLabel.x = game.width/2-titleLabel.width/2;
    titleLabel.y = game.height/4;
    var button = new Sprite(140, 65);
    button.image = game.assets['start.png'];
    button.x = game.width/2-button.width/2;
    button.y = game.height-200;
    button.addEventListener('touchstart', function(){
        gameFlag = 1;
    });
    title.addChild(titleLabel);
    title.addChild(button);

    return title;
};
