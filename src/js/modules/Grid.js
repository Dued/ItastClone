/*
  coding:utf-8
*/
import 'enchant.js';
import Building from './building.js';
import Event from './event.js';

export default class Grid extends enchant.Sprite {
  constructor(x, y, src, v, index){
    super();
    this.initialize(x, y, src, v, index);
  }

  initialize(x, y, src, v, index){
    super.initialize(96, 96);
    this.x = x;
    this.y = y;
    this.image = src;
    this.variaty = v;
    this.index = index;
    this.label = null;

    if(v == 1){
      var price = Math.floor(Math.random()*3+1);
      price *= 100;
      this.struct = new Building(price);
      this.label = new enchant.Label(""+price);
      this.label.color = "#EEDFDF";
      this.label.x = this.x+10;
      this.label.y = this.y+60;
      this.label.font = "20px san-serif";
    }else if(v == 2){
      var num = Math.floor(Math.random()*2)+1;
      this.struct = new Event(num);
    }
  }

  hasStructOrEvent(){
    switch(this.variaty){
      case 0: return 'Start';
      case 1: return 'Struct';
      case 2: return 'Event';
    }
  }

  hasIndex(){
    return this.index;
  }
}
