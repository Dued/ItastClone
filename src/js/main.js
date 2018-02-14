import 'enchant.js';
import Board from './modules/Board';
import Grid from './modules/Grid';

enchant();

//ゲームの状態を表す列挙型
var state = {
  INIT:0,
  DICE:1,
  GAME:2
};

//移動したマスの物件に所有者がいるかいないか
var proc = {
  NONOWN:0,
  OWN:1
};

//状態を管理するフラグ
var gameFlag = state.INIT;
//メイン画面に表示する要素たち
var board;
var boardLabel,logLabel,p1infoLabel,p2infoLabel;
//ターンと，移動したかどうかのフラグ
var turn = 0, movement = 0;
//ログを管理するための変数
var logData = [], logCount = 0;
//物件に表示するラベル
var buildingLabel = {};
//はい，いいえを選択した時のフラグ
var selectFlag = null;

window.onload = function(){
    var game = new enchant.Core(1024, 768);
    game.preload('start.png','title.png','gridStruct.png','gridEvent.png','gridStart.png','p1.png','p2.png','p1info.png','p2info.png','log.png','diceBG.png','shuf.png','done.png','bg.png','board.png','yes.png','no.png','1.png','2.png','3.png','4.png','5.png','6.png','endBG.png');

    game.onload = function(){
	     var title = makeTitle(game);
	     game.rootScene.addChild(title);
    };
    game.start();
};

function makeTitle(game){
    //タイトル画面を作るための関数
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
    //メイン画面を作るための関数
    var mainScene = new enchant.Scene();
    mainScene.backgroundColor = "#FFFFFF";

    //背景などの画像を定義しておく
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

    //ゲームボードを作成する
    board = new Board(game, buildingLabel);
    mainScene.addChild(board);
    for(let v in buildingLabel){
      mainScene.addChild(buildingLabel[v]);
    }

    //プレイヤー情報やログの背景とラベルを定義する
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

    mainScene.addEventListener('enterframe', function(){
      //フレーム処理，ここが実質メインのゲームループ
      if(gameFlag == state.GAME){
        //ターンを見て，対応するプレイヤーとその番号を取得しておく
        var p,dest_p,pNum,destNum;
        if(turn == 0){
          p = board.p1;
          dest_p = board.p2;
          pNum = 1;
          destNum = 2;
        }else{
          p = board.p2;
          dest_p = board.p1;
          pNum = 2;
          destNum = 1;
        }

        if(movement == 0){
          //移動する前の処理
          //どっちのターンか表示し，持っているサイコロの選択肢を表示させる
          boardUpdate(pNum+'P','');
          game.pushScene(createDicePop(game,p));
        }else if(movement == 1){
          //移動したあとの処理
          //プレイヤーから今現在のマスを取得する
          var now = p.nowGrid;
          var grid = board.searchForIndex(now);
          if(grid){
            //マスの取得に成功したら，種類を見て処理する
            switch(grid.hasStructOrEvent()){
              case 'Struct':
                //物件マスのとき
                var owner = grid.struct.owner_search();
                if(owner == null){
                  //持ち主なし
                  //購入するかどうかの選択肢を出す
                  boardUpdate(pNum+'P','空き物件 '+grid.struct.price+'G', "購入しますか？");
                  game.pushScene(createSelectPop(game, proc.NONOWN, grid, p));
                }else{
                  //持ち主あり
                  if(owner == p.index){
                    //持ち主が自分
                    //アップグレードするかどうかの選択肢を出す
                    boardUpdate(pNum+'P',pNum+'Pの物件 ', "アップグレードしますか？<br>支払い："+grid.struct.price+'G，使用料：'+grid.struct.lease+'G→'+(grid.struct.lease*5)+'G');
                    game.pushScene(createSelectPop(game, proc.OWN, grid, p));
                  }else{
                    //持ち主が相手
                    //使用料を支払って，確認のボタンを出す
                    grid.struct.pay(p, dest_p);
                    infoUpdate();
                    logUpdate(pNum,now+"番の物件で"+grid.struct.lease+"G支払い");
                    boardUpdate(pNum+'P',destNum+'Pの物件',destNum+"Pに"+grid.struct.lease+"G支払いました．");
                    game.pushScene(createAgreePop(game));
                  }
                }
                break;
              case 'Event':
                //イベントマスのとき
                //ダイスの目を変更するための数字を選んで，イベントを実行する
                var before,after;
                do{
                  before = Math.floor(Math.random()*6);
                  after = Math.floor(Math.random()*6);
                }while(before == after || p.dice[before]<=0);
                var ret = grid.struct.event_process(p, before, after);
                //各種情報を更新し，確認のボタンを出す
                infoUpdate();
                switch (grid.struct.event_num) {
                  case 1:
                    if(ret>0){
                      logUpdate(pNum,"所持金 +"+ret+"G");
                      boardUpdate(pNum+'P',"イベント","所持金に+"+ret+"Gされました．");
                    }else{
                      logUpdate(pNum,"所持金 "+ret+"G");
                      boardUpdate(pNum+'P',"イベント","所持金から"+ret+"Gされました．");
                    }
                    break;
                  case 2:
                    logUpdate(pNum,"ダイス "+(before+1)+"を一つ"+(after+1)+"に変更");
                    boardUpdate(pNum+'P',"イベント","ダイス "+(before+1)+"を一つ"+(after+1)+"に変更しました．");
                    break;
                }
                game.pushScene(createAgreePop(game));
                break;
              case 'Start':
                //スタートマスのとき
                //ランダムにお金を増やして情報更新，確認のボタンを出す
                var money_table=[200,300,500];
                var rand_num=Math.floor(Math.random()*3);
                p.money+=money_table[rand_num];
                infoUpdate();
                logUpdate(pNum,"スタートマス 所持金 +"+money_table[rand_num]+"G");
                boardUpdate(pNum+'P',"スタートマス","スタートマスに止まったため"+money_table[rand_num]+"G貰いました．");
                game.pushScene(createAgreePop(game));
                break;
            }

            //勝敗判定
            //どちらかの所持金が0以下になったとき終了
            if(p.money <= 0){
              game.pushScene(createEndPop(game, destNum));
            }else if(dest_p.money <= 0){
              game.pushScene(createEndPop(game, pNum));
            }
            //2Pのダイスがなくなったとき，所持金の多いほうが勝利
            //同じだった場合は引き分けになる
            if(sum(board.p2.dice) == 0){
              if(p.money > dest_p.money){
                game.pushScene(createEndPop(game, pNum));
              }else if(p.money < dest_p.money){
                game.pushScene(createEndPop(game, destNum));
              }else{
                game.pushScene(createEndPop(game, 'draw'));
              }
            }

            //ターン移行
            turn = (turn+1)%2;
          }
        }
      }
    });

    return mainScene;
}

function sum(arr) {
  //勝敗判定用の配列合計値を求める処理
  return arr.reduce(function(prev, current, i, arr) {
    return prev+current;
  });
};

function makeDiceScene(game){
  //最初にダイスを振る画面を作る関数
  var diceScene = new enchant.Scene();

  var bg = new enchant.Sprite(670, 520);
  bg.image = game.assets['diceBG.png'];
  bg.x = game.width/2 - 670/2;
  bg.y = game.height/2 - 520/2;

  var shuf = new enchant.Sprite(123, 50);
  shuf.image = game.assets['shuf.png'];
  shuf.x = game.width/2 - 160/2;
  shuf.y = bg.y + 400;

  diceScene.addChild(bg);
  diceScene.addChild(shuf);

  var diceimg = new Array(6);
  for(var i=0; i<6; i++){
    diceimg[i] = new enchant.Sprite(96,96);
    diceimg[i].image = game.assets[(i+1)+'.png'];
    diceimg[i].x = bg.x + 167*(i%3+1) - 96/2;
    if(i<3){
      diceimg[i].y = bg.y + 67;
    }else{
      diceimg[i].y = bg.y + 233;
    }
    diceScene.addChild(diceimg[i]);
  }
  var diceLabel = new Array(6);
  for(i=0; i<6; i++){
    diceLabel[i] = new enchant.Label();
    diceLabel[i].font = "22px san-serif";
    diceLabel[i].text = "1P:0<br>2P:0";
    diceLabel[i].x = diceimg[i].x;
    diceLabel[i].y = diceimg[i].y + 100;

    diceScene.addChild(diceLabel[i]);
  }

  shuf.addEventListener('touchstart', function(){
    //振るボタンをおした時の処理
    //dice1:1P dice2:2P
    var dice1 = randomDice();
    var dice2 = randomDice();
    //labelに反映
    for(i=0; i<6; i++){
      diceLabel[i].text = "1P:" + dice1[i] + "<br>2P:" + dice2[i];
    }
    //決定ボタンを出現させる
    var done = new enchant.Sprite(123, 50);
    done.image = game.assets['done.png'];
    done.x = shuf.x;
    done.y = shuf.y;
    done.addEventListener('touchstart', function(){
      //決定ボタンを押した時の処理
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
  var n = 20;
  var tmp = new Array(n);
  for(var i=0; i<n; i++){
    tmp[i] = Math.floor(Math.random()*6);
  }
  var dice = [0,0,0,0,0,0];
  for(i=0; i<n; i++){
    dice[tmp[i]]++;
  }

  return dice;
}

function infoUpdate(){
  //各プレイヤー情報を更新する関数
  //ダイスの数と所持金を取得してラベルに反映する
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
  //ログを更新する関数
  /*
  ログの形式：
  物件購入："1P:n番の物件を購入"
  物件Upg："1P:n番の物件をアップグレード 100G->500G"
  物件使用："1P:n番の物件で100G支払い"
  イベント："1P：所持金 +100G" "1P：ダイス 4を一つ3に変更"
  スタートマス："1P:スタートマス 所持金 +100G"
  */
  logCount++;
  if(logCount >= 20){
    //ログの数が20を超えたら，古いものを削除する
    var trush = logData.shift();
  }
  logData.push(num+"P："+str);

  logLabel.text = logData.join('<br>');
}

function buildingUpdate(index){
  //物件についているラベルを更新する関数
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
  //ボード内の表示を更新する関数
  boardLabel.text = player+"のターン<br>"+info+"<br><br>"+message;
}

function createDicePop(game, p){
  //ダイスを選ぶ時の選択肢を作る処理
  var diceSelect = new enchant.Scene();

  var diceimg = new Array(6);
  for(var i=0; i<6; i++){
    diceimg[i] = new enchant.Sprite(96,96);
    diceimg[i].image = game.assets[(i+1)+'.png'];
    diceimg[i].scaleX = 0.5;
    diceimg[i].scaleY = 0.5;
    diceimg[i].x = 442+(48+22)*i;
    diceimg[i].y = 408;
  }

  //ダイスを選んだ時の処理
  //forループで定義すると正しく動作しないので展開した
  diceimg[0].addEventListener('touchstart', function(){
    p.dice[0] -= 1;
    p.moveForward(1);
    movement = 1;
    infoUpdate();
    game.popScene();
  });
  diceimg[1].addEventListener('touchstart', function(){
    p.dice[1] -= 1;
    p.moveForward(2);
    movement = 1;
    infoUpdate();
    game.popScene();
  });
  diceimg[2].addEventListener('touchstart', function(){
    p.dice[2] -= 1;
    p.moveForward(3);
    movement = 1;
    infoUpdate();
    game.popScene();
  });
  diceimg[3].addEventListener('touchstart', function(){
    p.dice[3] -= 1;
    p.moveForward(4);
    movement = 1;
    infoUpdate();
    game.popScene();
  });
  diceimg[4].addEventListener('touchstart', function(){
    p.dice[4] -= 1;
    p.moveForward(5);
    movement = 1;
    infoUpdate();
    game.popScene();
  });
  diceimg[5].addEventListener('touchstart', function(){
    p.dice[5] -= 1;
    p.moveForward(6);
    movement = 1;
    infoUpdate();
    game.popScene();
  });

  for(var i=0; i<6; i++){
    if(p.dice[i] > 0){
      diceSelect.addChild(diceimg[i]);
    }
  }

  return diceSelect;
}

function createSelectPop(game, flag, grid, p){
  //はい，いいえの選択肢を作る関数
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
    processYN(flag, grid, p);
    game.popScene();
  });
  no.addEventListener('touchstart', function(){
    selectFlag = false;
    processYN(flag, grid, p);
    game.popScene();
  });

  selection.addChild(yes);
  selection.addChild(no);

  return selection;
}

function processYN(flag, grid, player){
  //止まったマスが物件だったとき，はい，いいえを選択した時の処理をする関数
  var playerNum = turn+1;
  if(flag == proc.NONOWN){
    //空き物件のときの処理 はい→購入 いいえ→何もしない
    if(selectFlag){
      grid.struct.bought(player);
      infoUpdate();
      logUpdate(playerNum,player.nowGrid+"番の物件を購入");
      buildingUpdate(player.nowGrid);
      boardUpdate(playerNum+'P',playerNum+'Pの物件');
    }
  }else if(flag == proc.OWN){
    //自分が所有しているときの処理 はい→アップグレード いいえ→何もしない
    if(selectFlag){
      grid.struct.upgrade(player);
      infoUpdate();
      logUpdate(playerNum,player.nowGrid+"番の物件をアップグレード");
      buildingUpdate(player.nowGrid);
      boardUpdate(playerNum+'P',playerNum+'Pの物件');
    }
  }
  selectFlag = null;
  movement = 0;
}

function createAgreePop(game){
  //イベント後などに「はい」だけを表示させる関数
  var agree = new enchant.Scene();

  var yes = new enchant.Sprite(123, 50);
  yes.image = game.assets['yes.png'];
  yes.x = 567;
  yes.y = 408;

  yes.addEventListener('touchstart', function(){
    //特に何もせず終了する
    movement = 0;
    game.popScene();
  });

  agree.addChild(yes);

  return agree;
}

function createEndPop(game, win){
  //ゲームが終了した時の表示を作る関数
  var endScene = new enchant.Scene();

  var bg = new enchant.Sprite(1024, 768);
  bg.image = game.assets['endBG.png'];
  bg.x = 0;
  bg.y = 0;

  var label = new enchant.Label();
  if(win == 'draw'){
    label.text = "引き分け！";
  }else{
    label.text = win+"Pの勝ち！";
  }
  label.x = game.width/2-200;
  label.y = game.height/2;
  label.width = 1024;
  label.font = "60px sans-serif";
  label.color = "#EEDFDF";

  endScene.addChild(bg);
  endScene.addChild(label);

  return endScene;
}
