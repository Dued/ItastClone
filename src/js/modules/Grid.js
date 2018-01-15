/*
  coding:utf-8
*/
import 'enchant.js';

export default class Grid extends enchant.Sprite {
  constructor(x, y, src, v){
    super();
    this.initialize(x, y, src, v);
  }

  initialize(x, y, src, v){
    super.initialize(96, 96);
    this.x = x;
    this.y = y;
    this.image = src;
    this.variaty = v;
  }

  hasStructOrEvent(){
    switch(this.variaty){
      case 0: return 'Start';
      case 1: return 'Struct';
      case 2: return 'Event';
    }
  }
}
