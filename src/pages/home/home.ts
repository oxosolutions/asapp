import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
//import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {
	colAll=[{'id':'df','name':'sharma'},
          {'id':'df','name':'sharma'},
          {'id':'df','name':'sharma'},
         ];
	// 		];
  colAllkey=[['id','df'],['id','df'],['id','df']];
  colAllValues=[['3','ram'],['4','sita'],['5','sham']];

  ColsSingle={'id':'dfkjd','name':'sharma'};
  colsinlekey=['id','name'];
	values=['dfkjd','sharmaji'];
	query;

  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController) {

  }

  //database operations
  ionViewDidLoad(){
  	this.servicesProvider.PlatfromCheck('Aione');
  	// this.servicesProvider.LoadApi('dkjfkdjfkdfkdf');
  	this.servicesProvider.CreateTable('test', this.colsinlekey);
    this.servicesProvider.CreateTable('testing', this.colsinlekey);
  	this.servicesProvider.Insert('test', this.colsinlekey, this.values);
  	this.servicesProvider.InsertBulk('testing',this.colAllkey, this.colAllValues);
  	// this.servicesProvider.Update('home')
  	// this.servicesProvider.DeleteAll('home');
  	// this.servicesProvider.DeleteWhere('home',2);
  	// this.servicesProvider.SelectAll('home');
  	// this.servicesProvider.SelectWhere('home',1);
  	// this.servicesProvider.selectAllLimit('home',4)
  	//this.servicesProvider.DropTable('testing');
  	// this.servicesProvider.StringReplace('result');
  }
  

}
