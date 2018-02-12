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
var buildingLabel = {};
var selectFlag = null;

window.onload = function(){
    var game = new enchant.Core(1024, 768);
    game.preload('start.png','title.png','gridStruct.png','gridEvent.png','gridStart.png','p1.png','p2.png','p1info.png','p2info.png','log.png','diceBG.png','shuf.png','done.png','dice.png','bg.png','board.png','yes.png','no.png');

    game.onload = function(){
	     var title = makeTitle(game);
	     game.rootScene.addChild(title);
    };

    game.keybind('1'.charCodeAt(), 'q');
    game.keybind('2'.charCodeAt(), 'w');
    game.keybind('3'.charCodeAt(), 'e');
    game.keybind('4'.charCodeAt(), 'r');
    game.keybind('5'.charCodeAt(), 't');
    game.keybind('6'.charCodeAt(), 'y');

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

    var background = new enchant.Sprite(1024, 768);
    background.image = game.assets['bg.png'];
    background.x = 0;
    background.y = 0;
    mainScene.addChild(background);

    var boardBG = new enchant.Sprite(1024, 768);
    boardBG.image = game.assets['board.png'];
    boardBG.x = 0;
    boardBG.y = 0;
    mainScene.addChild(boardBG);

    board = new Board(game, buildingLabel);
    mainScene.addChild(board);
    for(let v in buildingLabel){
      mainScene.addChild(buildingLabel[v]);
    }

    var p1info = new enchant.Sprite(1024, 768);
    p1info.image = game.assets['p1info.png'];
    p1info.x = 0;
    p1info.y = 0;

    var p2info = new enchant.Sprite(1024, 768);
    p2info.image = game.assets['p2info.png'];
    p2info.x = 0;
    p2info.y = 0;

    var logFrame = new enchant.Sprite(1024, 768);
    logFrame.image = game.assets['log.png'];
    logFrame.x = 0;
    logFrame.y = 0;

    mainScene.addChild(p1info);
    mainScene.addChild(p2info);
    mainScene.addChild(logFrame);

    p1infoLabel = new enchant.Label("");
    p1infoLabel.font = "30px san-serif";
    p1infoLabel.color = "#EEDFDF";
    p1infoLabel.x = 280;
    p1infoLabel.y = 643;

    p2infoLabel = new enchant.Label("");
    p2infoLabel.font = "30px san-serif";
    p2infoLabel.color = "#EEDFDF";
    p2infoLabel.x = 666;
    p2infoLabel.y = 643;

    logLabel = new enchant.Label("");
    logLabel.width = 160;
    logLabel.font = "16px san-serif";
    logLabel.color = "#EEDFDF";
    logLabel.x = 20;
    logLabel.y = 18;

    boardLabel = new enchant.Label("");
    boardLabel.font = "30px san-serif";
    boardLabel.color = "#EEDFDF";
    boardLabel.x = 370;
    boardLabel.y = 120;
    boardLabel.width = 550;

    mainScene.addChild(p1infoLabel);
    mainScene.addChild(p2infoLabel);
    mainScene.addChild(logLabel);
    mainScene.addChild(boardLabel);

    //forDebag

    mainScene.addEventListener('touchstart', function(){
      board.p1.moveForward(1);
      //board.p2.moveForward(2);
      movement = 1;
    });


    game.addEventListener('enterframe', function(){
      //frame sequence
      /*お試しセット
      if(movement == 1){
      var now = board.p1.nowGrid;
      var grid = board.searchForIndex(now);
      if(grid){
        if(grid.hasStructOrEvent() == 'Struct' && grid.struct.owner_search() == null){
          //message
          boardUpdate('1P','空き物件 '+grid.struct.price+'G', "購入しますか？");
          game.pushScene(createSelectPop(game));
          if(selectFlag){
            grid.struct.bought(board.p1);
            infoUpdate();
            logUpdate(1,now+"番の物件を購入");
            buildingUpdate(now);
            boardUpdate('1P','1Pの物件');
            selectFlag = null;
            movement = 0;
          }else{
            selectFlag = null;
            movement = 0;
          }
        }
      }
      }*/
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

function buildingUpdate(index){
  if(!Object.keys(buildingLabel).includes(''+index)){
    return;
  }
  var grid = board.searchForIndex(index);
  if(grid){
    var own = grid.struct.owner_search();
    switch (own) {
      case 998:
        //1P -> 赤，使用料を表示させる
        buildingLabel[''+index].color = "#AA0000";
        buildingLabel[''+index].text = ""+grid.struct.lease;
        break;
      case 999:
        //2P -> 青，使用料を表示させる
        buildingLabel[''+index].color = "#0000AA";
        buildingLabel[''+index].text = ""+grid.struct.lease;
        break;
      default:
        //持ち主なし -> 白，買値を表示させる
        buildingLabel[''+index].color = "#EEDFDF";
        buildingLabel[''+index].text = ""+grid.struct.price;
    }
  }
}

function boardUpdate(player, info, message=""){
  boardLabel.text = player+"のターン<br>"+info+"<br><br>"+message;
}

function createSelectPop(game){
  var selection = new enchant.Scene();

  var yes = new enchant.Sprite(123, 50);
  yes.image = game.assets['yes.png'];
  yes.x = 500;
  yes.y = 408;
  var no = new enchant.Sprite(123, 50);
  no.image = game.assets['no.png'];
  no.x = 652;
  no.y = 408;

  yes.addEventListener('touchstart', function(){
    selectFlag = true;
    game.popScene();
  });
  no.addEventListener('touchstart', function(){
    selectFlag = false;
    game.popScene();
  });

  selection.addChild(yes);
  selection.addChild(no);

  return selection;
}
