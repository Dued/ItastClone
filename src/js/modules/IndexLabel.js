/*
  coding:utf-8
*/
import 'enchant.js';

export default class IndexLabel extends enchant.Label {
  constructor(index){
    super();
    this.initialize(index);
  }

  initialize(index){
    super.initialize();
    this.index = index;
  }
}
