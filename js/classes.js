/*
  coding:utf-8
*/

enchant();

Grid = Class.create(Sprite, {
  initialize:function(x, y){
    super.call(this, 64, 64);
    var surface = new Surface(64, 64);
    surface.context.backgroundColor = "#FFFFFF";
  }
});
