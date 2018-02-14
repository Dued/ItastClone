import 'enchant.js';
import Grid from './Grid';
import Player from './Player';

export default class Board extends enchant.Group {
  constructor(game, bLabel){
    super();
    this.initialize(game, bLabel);
  }

  initialize(game, bLabel){
    super.initialize();
    var file = ['gridStruct.png','gridEvent.png'];
    var r;
    this.p1 = new Player(game, 1);
    this.p2 = new Player(game, 2);

    //スタートマスを追加
    this.addChild(new Grid(256, 0, game.assets['gridStart.png'], 0, 0));
    //以降時計回りにマスを生成する
    var tmpGrid;
    for(var i=1; i<24; i++){
        if (i<=7){
          //イベントより物件のほうが多いように比重をかける
          r = Math.round(Math.random()*0.6);
          tmpGrid = new Grid(256+i*96, 0, game.assets[file[r]], r+1, i);
        }else if (i>7 && i<=12){
          r = Math.round(Math.random()*0.6);
          tmpGrid = new Grid(928, (i-7)*96, game.assets[file[r]], r+1, i);
        }else if (i>12 && i<=19){
          r = Math.round(Math.random()*0.6);
          tmpGrid = new Grid(1024-(i-11)*96, 480, game.assets[file[r]], r+1, i);
        }else if (i>19){
          r = Math.round(Math.random()*0.6);
          tmpGrid = new Grid(256, 96*6-(i-18)*96, game.assets[file[r]], r+1, i);
        }
        this.addChild(tmpGrid);
        if(r+1 == 1){
          //物件のとき，mainで宣言している辞書にラベルを登録する
          bLabel[''+tmpGrid.index] = tmpGrid.label;
        }
    }
    //プレイヤーを追加する
    this.addChild(this.p1);
    this.addChild(this.p2);

  }

  searchForIndex(ind){
    //index値からマスやプレイヤーを検索するメソッド
    //該当する物があったらそのインスタンスを，該当しなければnullを返す
    for(let child of this.childNodes){
      if(ind == child.hasIndex()){
        return child;
      }
    }
    return null;
  }

}
