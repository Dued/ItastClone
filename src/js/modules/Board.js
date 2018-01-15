import 'enchant.js';
import Grid from './Grid';

export default class Board extends enchant.Group {
  constructor(game){
    super();
    this.initialize(game);
  }

  initialize(game){
    super.initialize();
    var file = ['gridStruct.png','gridEvent.png'];
    var n=96*6;
    var m=1024;
    var r;
    for(var i=0; i<n; i+=96){
      if(i==0 || i==96*5){
        for(var j=256; j<m; j+=96){
          if(i==0 && j==256){
            this.addChild(new Grid(j,i,game.assets['gridStart.png'], 0));
          }else{
            r = Math.round(Math.random()*0.6);
            this.addChild(new Grid(j,i,game.assets[file[r]], r+1));
          }
        }
      }else{
        r = Math.round(Math.random()*0.6);
        this.addChild(new Grid(256,i,game.assets[file[r]], r+1));
        r = Math.round(Math.random()*0.6);
        this.addChild(new Grid(256+96*7,i,game.assets[file[r]], r+1));
      }
    }
  }
}
