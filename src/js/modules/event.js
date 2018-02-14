export default class Event{
  constructor(num){
    this.initialize(num);
  }

  initialize(num){
    this.event_num=num;
  }

  event_process(player, before_dice, after_dice){
    //イベントを実行するメソッド
    switch(this.event_num){
      case 1://お金が増える
      //適用される金額のtableを作り，そこからランダムに選択する
      var money_table=[100,200,300,500,-100,-200];
      var rand_num=Math.round(Math.random()*5);
      player.money+=money_table[rand_num];
      return money_table[rand_num];
      break;

      case 2://ダイスの目を変更
      //与えられた数字のダイスを変換する
      if(player.dice[before_dice] != 0){
        player.dice[before_dice] -= 1;
        player.dice[after_dice] += 1;
        return true;
      }else{
        return "変えようとしたサイコロはもう持ってません。";
      }
      break;
    }
    return 0;
  }
}
