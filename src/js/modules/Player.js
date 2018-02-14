import 'enchant.js';

export default class Player extends enchant.Sprite {
  constructor(game, pnum){
    super();
    this.initialize(game, pnum);
  }

  initialize(game, pnum){
    super.initialize(39, 39);
    this.x = 256;
    this.y = 0;

    if(pnum == 1){
      this.xoffset = 5;
      this.yoffset = 5;
      this.image = game.assets['p1.png'];
      this.index = 998;
    }else{
      this.xoffset = 40;
      this.yoffset = 5;
      this.image = game.assets['p2.png'];
      this.index = 999;
    }
    this.x += this.xoffset;
    this.y += this.yoffset;

    //プレイヤーが持つもの：ダイス，所持金，物件，今いるマス(index値)
    this.dice = [];
    this.money = 1000;
    this.structs = [];
    this.nowGrid = 0;
  }

  hasIndex(){
    //プレイヤーのindex値を返すメソッド
    return this.index;
  }

  moveForward(num){
    //numマス進める処理
    //Boardから次のマスを検索して，そこに座標を移動，今いるマスを更新する
    var next = (this.nowGrid + num) % 24;
    for(let child of this.parentNode.childNodes){
      var ind = child.hasIndex();
      if(ind == next){
        //TODO:一マスずつ進むようにする？
        this.x = child.x + this.xoffset;
        this.y = child.y + this.yoffset;
        this.nowGrid = ind;
        break;
      }
    }
  }

  getDice(){
    //ダイスのリストに対するゲッター
    return this.dice;
  }

  getMoney(){
    //所持金に対するゲッター
    return this.money;
  }
}
