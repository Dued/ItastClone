/*
  coding:utf-8
*/
import 'enchant.js';

export default class Player extends enchant.Sprite {
  constructor(game, pnum){
    super();
    this.initialize(game, pnum);
  }

  initialize(game, pnum){
    super.initialize(36, 36);
    this.x = 256;
    this.y = 0;
    //draw
    if(pnum == 1){
      this.xoffset = 5;
      this.yoffset = 5;
      this.image = game.assets['p1.png'];
    }else{
      this.xoffset = 40;
      this.yoffset = 5;
      this.image = game.assets['p2.png'];
    }
    this.x += this.xoffset;
    this.y += this.yoffset;

    //fields
    this.dice = [];
    this.money = 1000;
    this.structs = [];
    this.nowGrid = 0;
  }

  hasIndex(){
    return this.index || null;
  }

  moveForward(num){
    var next = (this.nowGrid + num)%24;
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
}
