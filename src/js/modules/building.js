export default class Building {
  constructor(buying_price){
    this.initialize(buying_price);
  }

  //物件の初期化
  initialize(buying_price){
    this.lease=buying_price/2;//使用料
    this.price=buying_price;//買値
    this.owner=0;//持主,初期値は0
  }
  //所有者の変更処理
  change_own(player_name){
    this.owner=player_name;
  }
  //購入処理
  bought(player){
    player.money-=this.price;
    this.owner=player.index;
    //return player;
  }

  //物件のアップグレード
  upgrade(player){
    this.lease*=5;
    player.money-=this.price;
    //return player;
  }

  //支払い処理
  pay(player){
    player.money-=this.lease;
  }

  //所有者が引数であるか
  //所有者だったらtrue，そうでなければfalseを返す
  research(player_index){
    if(this.owner==player_index){
      return true;
    }else{
      return false;
    }
  }

  //所有者の有無
  //所有者がいればindex値を，そうでなければnullを返す
  owner_search(){
    if(this.owner==0){
      return null;
    }else{
      return this.owner;
    }
  }
}
