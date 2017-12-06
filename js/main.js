/*
  coding:utf-8
*/

enchant();

var gameFlag = 0;

window.onload = function(){
    var game = new Game(640, 480);
    game.preload('start.png','title.png');
    
    game.onload = function(){
	var title = makeTitle(game);	
	game.rootScene.addChild(title);
    }

    game.addEventListener('enterframe', function(){
	//frame sequence
    });

    game.start();
}

function makeTitle(game)
{
    //title definition
    // get assets image and make title parts
    var title = new Scene();
    var titleLabel = new Sprite(277,24);
    titleLabel.image = game.assets['title.png'];
    titleLabel.x = game.width/2-titleLabel.width/2;
    titleLabel.y = game.height/4;
    var button = new Sprite(140, 65);
    button.image = game.assets['start.png'];
    button.x = game.width/2-button.width/2;
    button.y = game.height-200;

    // button clicked -> game start
    button.addEventListener('touchstart', function(){
	var mainScene = makeMain(game);
	game.replaceScene(mainScene);
    });
    
    title.addChild(titleLabel);
    title.addChild(button);

    return title;
}

function makeMain(game)
{
    //mainScene definition
    var mainScene = new Scene();
    mainScene.backgroundColor = "#FFFFFF";
    var foo = new Label("foo!!");
    mainScene.addChild(foo);

    return mainScene;
}
