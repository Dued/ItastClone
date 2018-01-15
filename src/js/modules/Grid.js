/*
  coding:utf-8
*/
import 'enchant.js';

export default class Grid extends enchant.Sprite {
  constructor(x, y, src){
    super();
    this.initialize(x, y, src);
  }

  initialize(x, y, src){
    super.initialize(96, 96);
    this.x = x;
    this.y = y;
    this.image = src;
  }
}
