import 'enchant.js';
import Grid from './Grid';

export default class Board extends enchant.Group {
  constructor(game){
    super();
    this.initialize(game);
  }

  initialize(game){
    super.initialize();
    var n=96*6;
    var m=1024;
    for(var i=0; i<n; i+=96){
      if(i==0 || i==96*5){
        for(var j=256; j<m; j+=96){
          this.addChild(new Grid(j,i,game.assets['gridTest.png']));
        }
      }else{
        this.addChild(new Grid(256,i,game.assets['gridTest.png']));
        this.addChild(new Grid(256+96*7,i,game.assets['gridTest.png']));
      }
    }
  }
}
