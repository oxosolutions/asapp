import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
	hero=['ram','sham','rama'];
	searchValue = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  addAll(event){
  	this.searchValue=event;
  	this.hero.push(this.searchValue);
  	this.searchValue='';
  	console.log(event);
  	console.log(this.hero);
  	
  }

}
