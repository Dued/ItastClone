import 'enchant.js';
import Grid from './Grid';
import Player from './Player';

export default class Board extends enchant.Group {
  constructor(game){
    super();
    this.initialize(game);
  }

  initialize(game){
    super.initialize();
    var file = ['gridStruct.png','gridEvent.png'];
    var r;
    this.p1 = new Player(game, 1);
    this.p2 = new Player(game, 2);

    //start
    this.addChild(new Grid(256, 0, game.assets['gridStart.png'], 0, 0));
    //generate grids for clock order
    for(var i=1; i<24; i++){
        if (i<=7){
          r = Math.round(Math.random()*0.6);
          this.addChild(new Grid(256+i*96, 0, game.assets[file[r]], r+1, i));
        }else if (i>7 && i<=12){
          r = Math.round(Math.random()*0.6);
          this.addChild(new Grid(928, (i-7)*96, game.assets[file[r]], r+1, i));
        }else if (i>12 && i<=19){
          r = Math.round(Math.random()*0.6);
          this.addChild(new Grid(1024-(i-11)*96, 480, game.assets[file[r]], r+1, i));
        }else if (i>19){
          r = Math.round(Math.random()*0.6);
          this.addChild(new Grid(256, 96*6-(i-18)*96, game.assets[file[r]], r+1, i));
        }
    }
    //players
    this.addChild(this.p1);
    this.addChild(this.p2);

  }

  searchForIndex(ind){
    for(let child of this.childNodes){
      if(ind == child.hasIndex()){
        return child;
      }
    }
    return null;
  }

}
