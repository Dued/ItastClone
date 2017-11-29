enchant();
window.onload = function(){
    var game = new Game(480, 480);
    game.preload('start.png','title.png');
    var title = new Scene();
    var mainScene = new Scene();
    game.onload = function(){
      //title
      var titleLabel = new Sprite(277,24);
      titleLabel.image = game.assets['title.png'];
      titleLabel.x = game.width/2-titleLabel.width/2;
      titleLabel.y = game.height/4;
      var button = new Sprite(140, 65);
      button.image = game.assets['start.png'];
      button.x = game.width/2-button.width/2;
      button.y = game.height-200;
      button.addEventListener('touchstart', function(){
        game.replaceScene(mainScene);
      });
      title.addChild(titleLabel);
      title.addChild(button);

      //mainScene
      mainScene.backgroundColor = "#FFFFFF";
      var foo = new Label("foo!!");
      mainScene.addChild(foo);

      game.rootScene.addChild(title);
    }

    game.start();
}
