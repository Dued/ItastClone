var event_money=1;
var event_dice=2;
var event_get_building=3;
var event_lost_building=4;
var no_event=-1;

class Event{
    constructor(num){
	this.event_num=num
    }
    //イベントの実行
    function event_process(){
	switch(event_num){
	case event_money()://お金が増える
	    more_money(plyer);
	    break;
	case event_dice://ダイスの目を変更
	    change_dice()
	    break;
	case event_get_building://物件を得る
	    get_building()
	    break;
	case event_lost_building://物件を失う
	    lost_building()
	    break;
	}
    }
}

function more_money(player_any){
    var money_table=[100,200,300,500,-100,-200];
    var rand_num==rand_num=Math.floor(Math.random()*5);
    player_any.money+=money_table[rand_num]
    
    return player_any;
    
}

function change_dice(player_any){
    var i;//書き換える後の目
    var j;//書き換える前の目
    for (var k=0;player_any.money[k]==j;k++)
    player_any.dice[i]=i;
    return player_any;
}

function get_building(player_any){
   
}

function lost_building(player_any){
    //所有物件があるなら処理
    if(player_any.structs!=null){
	var rand_num=Math.floor(Math.random()*player_any.structs.length);
	player_any.structs.splice(randnum,1);//所有者無しに変更
    }
    return player_any;
}
