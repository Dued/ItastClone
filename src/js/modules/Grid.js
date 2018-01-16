/*
  coding:utf-8
*/
import 'enchant.js';

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
  }

  hasStructOrEvent(){
    switch(this.variaty){
      case 0: return 'Start';
      case 1: return 'Struct';
      case 2: return 'Event';
    }
  }
}
