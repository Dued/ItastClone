/*
  coding:utf-8
*/
import 'enchant.js';

export default class Board extends enchant.Group {
  constructor(game){
    super();
    this.initialize(game);
  }

  initialize(game){
    super.initialize();
    
  }
}

export default class Grid extends enchant.Sprite {
  constructor(x, y){
    super();
    this.initialize(x, y);
  }

  initialize(x, y){
    super.initialize(64, 64);
    this.x = x;
    this.y = y;
    var surface = new enchant.Surface(64, 64);
    surface.context.backgroundColor = "#FF0000";
    surface.context.beginPath();
	  surface.context.arc(50, 50, 45, 0, Math.PI*2, false);
	  surface.context.fillStyle = "green";
    surface.context.fill();
    this.image = surface;
  }
}
