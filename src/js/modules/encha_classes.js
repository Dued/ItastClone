/*
  coding:utf-8
*/
module.exports = Class.create(Sprite, {
  initialize:function(x, y){
    Sprite.call(this, 64, 64);
    this.x = x;
    this.y = y;
    var surface = new Surface(64, 64);
    surface.context.backgroundColor = "#000000";
  }
});
