var non_own=-1;//誰も所持していない
var someone_own=1;//誰かが所持している
var ownership=1;//所有権がある
var no_ownership=-1;//所有権がない

export default class Building {
  //物件の初期化
  initialize(lease,buying_price,property,pict_id){
    this.lease=lease;//使用料
    this.buying_price=buying_price;//買値
    this.property=property;//財産価値
    this.owner=non_own;//持主
  }
  //所有者の変更処理
  change_own(player_name){
    this.owner=player_name;
  }
  //購入処理
  bought(player_any){
    player.money-=this.buying_price;
    this.owner=player;
    return player_any;
  }

  //物件のアップグレード
  upgrade(player_any){
    this.lease=lease*10;
    player.money-=this.buying_price;
    return player_any;
  }

  //所有者が引数であるか
  reserch(player_name){
    if(this.owner==player_name){
      return ownership;
    }else{
      return no_ownership;
    }
  }

  //所有者の有無
  owner_serch(){
    if(this.owner==non_own){
      return non_own;
    }else{
      return someone_own;
    }
  }
}
