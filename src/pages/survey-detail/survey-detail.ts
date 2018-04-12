import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SynchronizeSinglePage} from '../../pages/synchronize-single/synchronize-single';
@IonicPage()
@Component({
  selector: 'page-survey-detail',
  templateUrl: 'survey-detail.html',
})
export class SurveyDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyDetailPage');
  }
  syncronizePage(){
  	this.navCtrl.setRoot(SynchronizeSinglePage);
  }

}
