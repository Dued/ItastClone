/*
  coding:utf-8
*/

import 'enchant.js'
//import encha from './modules/encha_classes';
import Grid from './modules/encha_classes.js'

var state = {
  INIT:0,
  DICE:1,
  GAME:2,
  END:3
};

var gameFlag = state.INIT;

window.onload = function(){
    var game = new enchant.Core(1024, 768);
    game.preload('start.png','title.png');

    game.onload = function(){
	     var title = makeTitle(game);
	     game.rootScene.addChild(title);
    };

    game.addEventListener('enterframe', function(){
	  //frame sequence
    if(gameFlag == state.DICE){

    }else if(gameFlag == state.GAME){

    }else if(gameFlag == state.END){

    }
    });

    game.start();
};

function makeTitle(game)
{
    //title definition
    // get assets image and make title parts
    var title = new enchant.Scene();
    var titleLabel = new enchant.Sprite(277,24);
    titleLabel.image = game.assets['title.png'];
    titleLabel.x = game.width/2-titleLabel.width/2;
    titleLabel.y = game.height/4;
    var button = new enchant.Sprite(140, 65);
    button.image = game.assets['start.png'];
    button.x = game.width/2-button.width/2;
    button.y = game.height-200;

    // button clicked -> game start
    button.addEventListener('touchstart', function(){
	     var mainScene = makeMain(game);
	     game.replaceScene(mainScene);
       gameFlag = state.DICE;
    });

    title.addChild(titleLabel);
    title.addChild(button);

    return title;
}

function makeMain(game)
{
    //mainScene definition
    var mainScene = new enchant.Scene();
    mainScene.backgroundColor = "#FFFFFF";

    return mainScene;
}
