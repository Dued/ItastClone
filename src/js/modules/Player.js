/*
  coding:utf-8
*/
import 'enchant.js';

export default class Player extends enchant.Sprite {
  constructor(x, y, pnum){
    super();
    this.initialize(x, y, pnum);
  }

  initialize(x, y, pnum){
    super.initialize(36, 36);
    this.x = x;
    this.y = y;
    //draw
    var img = new enchant.Surface(36, 36);
    img.context.beginPath();
    img.context.arc(x, y, 18, 0, Math.PI*2, false);
    if(pnum == 1){
      img.context.fillStyle = "red";
    }else{
      img.context.fillStyle = "blue";
    }
    img.context.fill();
    this.image = img;

    //fields
    this.dice = [];
    this.money = 1000;
    this.structs = [];
    this.nowGrid = 0;
  }
}
