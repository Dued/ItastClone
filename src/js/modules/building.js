var non_own=-1;//ï�������Ƥ��ʤ�
var someone_own=1;//ï����������Ƥ���
var ownership=1;//��ͭ��������
var no_ownership=-1;//��ͭ�����ʤ�

export default class Building {
  //ʪ��ν����
  initialize(lease,buying_price,property,pict_id){
    this.lease=lease;//������
    this.buying_price=buying_price;//����
    this.property=property;//�⻺����
    this.owner=non_own;//����
  }
  //��ͭ�Ԥ��ѹ�����
  change_own(player_name){
    this.owner=player_name;
  }
  //��������
  bought(player_any){
    player.money-=this.buying_price;
    this.owner=player;
    return player_any;
  }

  //ʪ��Υ��åץ��졼��
  upgrade(player_any){
    this.lease=lease*10;
    player.money-=this.buying_price;
    return player_any;
  }

  //��ͭ�Ԥ������Ǥ��뤫
  reserch(player_name){
    if(this.owner==player_name){
      return ownership;
    }else{
      return no_ownership;
    }
  }

  //��ͭ�Ԥ�̵ͭ
  owner_serch(){
    if(this.owner==non_own){
      return non_own;
    }else{
      return someone_own;
    }
  }
}
