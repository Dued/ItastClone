/*
var event_money=1;
var event_dice=2;
var event_get_building=3;
var event_lost_building=4;
var no_event=-1;
*/

export default class Event{
  constructor(num){
    this.initialize(num);
  }

  initialize(num){
    this.event_num=num;
  }

  //イベントの実行
  //event_process(player[, before_dice, after_dice])
  event_process(player, before_dice, after_dice){
    switch(this.event_num){
      case 1://お金が増える
      var money_table=[100,200,300,500,-100,-200];
      var rand_num=Math.round(Math.random()*5);
      player.money+=money_table[rand_num];
      break;

      case 2://ダイスの目を変更
      if(player.dice[before_dice] != 0){
        player.dice[before_dice] -= 1;
        player.dice[after_dice] += 1;
      }else{
        return "変えようとしたサイコロはもう持ってません。";
      }

      break;

      case 3://物件を得る
      break;

      case 4://物件を失う
      break;
    }
    return 0;
  }
}

/*
function lost_building(player_any){
  //所有物件があるなら処理
  if(player_any.structs!=null){
    var rand_num=Math.floor(Math.random()*player_any.structs.length);
    player_any.structs.splice(randnum,1);//所有者無しに変更
  }
  //return player_any;
}
*/
