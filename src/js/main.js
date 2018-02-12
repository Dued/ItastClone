/*
  coding:utf-8
*/

import 'enchant.js';
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
var board;
var boardLabel,logLabel,p1infoLabel,p2infoLabel;
var turn = 0, movement = 0;
var logData = [], logCount = 0;

window.onload = function(){
    var game = new enchant.Core(1024, 768);
    game.preload('start.png','title.png','gridStruct.png','gridEvent.png','gridStart.png','p1.png','p2.png','p1info.png','p2info.png','log.png','diceBG.png','shuf.png','done.png','dice.png');

    game.onload = function(){
	     var title = makeTitle(game);
	     game.rootScene.addChild(title);
    };

    game.keybind('Y'.charCodeAt(), 'y');
    game.keybind('N'.charCodeAt(), 'n');

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
       var dScene = makeDiceScene(game);
       game.pushScene(dScene);
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

    var p1info = new enchant.Sprite(368, 160);
    p1info.image = game.assets['p1info.png'];
    p1info.x = 256;
    p1info.y = 608;

    var p2info = new enchant.Sprite(368, 160);
    p2info.image = game.assets['p2info.png'];
    p2info.x = 656;
    p2info.y = 608;

    var logFrame = new enchant.Sprite(224, 768);
    logFrame.image = game.assets['log.png'];
    logFrame.x = 0;
    logFrame.y = 0;

    mainScene.addChild(p1info);
    mainScene.addChild(p2info);
    mainScene.addChild(logFrame);

    p1infoLabel = new enchant.Label("");
    p1infoLabel.font = "30px san-serif";
    p1infoLabel.x = p1info.x+10;
    p1infoLabel.y = p1info.y+35;

    p2infoLabel = new enchant.Label("");
    p2infoLabel.font = "30px san-serif";
    p2infoLabel.x = p2info.x+10;
    p2infoLabel.y = p2info.y+35;

    logLabel = new enchant.Label("");
    logLabel.width = 160;
    logLabel.font = "12px serif";
    logLabel.x = logFrame.x+10;
    logLabel.y = logFrame.y+10;

    mainScene.addChild(p1infoLabel);
    mainScene.addChild(p2infoLabel);
    mainScene.addChild(logLabel);

    //forDebag
    /*
    mainScene.addEventListener('touchstart', function(){
      board.p1.moveForward(1);
      //board.p2.moveForward(2);
    });
    */

    game.addEventListener('enterframe', function(){
	  //frame sequence
    if(gameFlag == state.GAME){
      if(movement == 1){
      }
    }else if(gameFlag == state.END){

    }
    });

    return mainScene;
}

function makeDiceScene(game){
  var diceScene = new enchant.Scene();

  var bg = new enchant.Sprite(670, 520);
  bg.image = game.assets['diceBG.png'];
  bg.x = game.width/2 - 670/2;
  bg.y = game.height/2 - 520/2;

  var shuf = new enchant.Sprite(160, 60);
  shuf.image = game.assets['shuf.png'];
  shuf.x = game.width/2 - 160/2;
  shuf.y = bg.y + 400;

  diceScene.addChild(bg);
  diceScene.addChild(shuf);

  var diceimg = new Array(6);
  for(var i=0; i<6; i++){
    diceimg[i] = new enchant.Sprite(96,96);
    diceimg[i].image = game.assets['dice.png'];
    diceimg[i].x = bg.x + 167*(i%3+1) - 96/2;
    if(i<3){
      diceimg[i].y = bg.y + 133;
    }else{
      diceimg[i].y = bg.y + 266;
    }
    diceScene.addChild(diceimg[i]);
  }
  var diceLabel = new Array(6);
  for(i=0; i<6; i++){
    diceLabel[i] = new enchant.Label();
    diceLabel[i].text = "1P:0<br>2P:0";
    diceLabel[i].x = diceimg[i].x;
    diceLabel[i].y = diceimg[i].y + 100;

    diceScene.addChild(diceLabel[i]);
  }

  shuf.addEventListener('touchstart', function(){
    //dice1:1P dice2:2P
    var dice1 = randomDice();
    var dice2 = randomDice();
    //labelに反映
    for(i=0; i<6; i++){
      diceLabel[i].text = "1P:" + dice1[i] + "<br>2P:" + dice2[i];
    }
    //決定ボタンを出現させる
    var done = new enchant.Sprite(160, 60);
    done.image = game.assets['done.png'];
    done.x = shuf.x;
    done.y = shuf.y;
    done.addEventListener('touchstart', function(){
      //playerに反映
      board.p1.dice = dice1;
      board.p2.dice = dice2;
      game.popScene();
      infoUpdate();
      gameFlag = state.GAME;
    });
    diceScene.addChild(done);
  });

  return diceScene;
}

function randomDice(){
  //サイコロを20個ランダムに振る処理
  var tmp = new Array(20);
  for(var i=0; i<20; i++){
    tmp[i] = Math.floor(Math.random()*6);
  }
  var dice = [0,0,0,0,0,0];
  for(i=0; i<20; i++){
    dice[tmp[i]]++;
  }

  return dice;
}

function infoUpdate(){
  var p1dices = board.p1.getDice();
  var p2dices = board.p2.getDice();

  var tmp1 = "", tmp2 = "";
  for(var i=0; i<6; i++){
    tmp1 += (p1dices[i] + "  ");
    tmp2 += (p2dices[i] + "  ");
  }

  tmp1 += ("<br>所持金:" + board.p1.getMoney() + "G");
  tmp2 += ("<br>所持金:" + board.p2.getMoney() + "G");

  p1infoLabel.text = tmp1;
  p2infoLabel.text = tmp2;
}

function logUpdate(num, str){
  /*
  ログの形式：
  物件購入："1P:n番の物件を購入"
  物件Upg："1P:n番の物件をアップグレード 100G->500G"
  物件使用："1P:n番の物件で100G支払い"
  イベント："1P：所持金 +100G" "1P：ダイス 4を一つ3に変更"
  スタートマス："1P:スタートマスに止まったため所持金 +100G"
  */
  logCount++;
  if(logCount >= 60){
    var trush = logData.shift();
  }
  logData.push(num+"P："+str);

  logLabel.text = logData.join('<br>');
}
