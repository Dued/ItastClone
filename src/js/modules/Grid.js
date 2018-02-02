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

    if(v == 1){
      var price = Math.floor(Math.random()*3+1);
      price *= 100;
      this.struct = new Building(price);
    }else if(v == 2){
      var num = Math.floor(Math.random()*4+1);
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
