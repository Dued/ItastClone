/*
  coding:utf-8
*/

import 'enchant.js';
//import encha from './modules/encha_classes';
import Board from './modules/Board';
import Grid from './modules/Grid';

enchant();

var state = {
  INIT:0,
  DICE:1,
  GAME:2,
  END:3
};

var gameFlag = state.INIT;
var board,logFrame,p1info,p2info;

window.onload = function(){
    var game = new enchant.Core(1024, 768);
    game.preload('start.png','title.png','gridStruct.png','gridEvent.png','gridStart.png','p1.png','p2.png','p1info.png','p2info.png','log.png');

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
    board = new Board(game);
    mainScene.addChild(board);

    p1info = new Sprite(368, 160);
    p1info.image = game.assets['p1info.png'];
    p1info.x = 256;
    p1info.y = 608;

    p2info = new Sprite(368, 160);
    p2info.image = game.assets['p2info.png'];
    p2info.x = 656;
    p2info.y = 608;

    logFrame = new Sprite(224, 768);
    logFrame.image = game.assets['log.png'];
    logFrame.x = 0;
    logFrame.y = 0;

    mainScene.addChild(p1info);
    mainScene.addChild(p2info);
    mainScene.addChild(logFrame);

    //forDebag
    mainScene.addEventListener('touchstart', function(){
      board.p1.moveForward(1);
      //board.p2.moveForward(2);
    });
    return mainScene;
}
