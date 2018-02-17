import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {
 resultSelect:any;
 bulktable=['contact','testimonials','photos']
	colAll=[{'id':'1','name':'sharma'},
          {'id':'2','name':'sharma'},
          {'id':'3','name':'sharma'},
         ];
	// 		];
  colAllkey=['id','name'];
  bulkTablekey=[['contactid','contdesc'],['testimonialsid','testdesc'],['photoid','photo','kjdfjlkd']];

  colAllValues=[['1','<ram/>'],['2<','sita'],['3','sham']];

  ColsSingle={'id':'dfkjd','name':'sharma'};
  colsinlekey=['id','name'];
	values=['3','sharmaji'];  
	query;

  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController) {
 // setTimeout(function(){
 //            console.log(TableCols[1]);
 //          },2000);
         
  }

  //database operations
  ionViewDidLoad(){
  	//this.servicesProvider.PlatfromCheck('Aione');
  	//this.servicesProvider.LoadApi('http://aione.oxosolutions.com/api/android/').then(()=>{});
  	this.servicesProvider.CreateTable('test', this.colsinlekey);
    this.servicesProvider.TableBulk(this.bulktable, this.bulkTablekey);
    this.servicesProvider.CreateTable('testing', this.colsinlekey);
  	// this.servicesProvider.Insert('test', this.colsinlekey, this.values).then((res:any)=>{
   //    console.log(res);})
  	// this.servicesProvider.InsertBulk('testing',this.colAllkey, this.colAllValues).then((result)=>{
   //    //console.log(result);
   //  });


  	// this.servicesProvider.DeleteAll('test').then(()=>{});
    // this.servicesProvider.DeleteWhere('test', 'name', '"sharmaji"').then(()=>{});


  	this.servicesProvider.SelectAll('testing').then((rsult:any)=>{this.resultSelect=rsult.rows;
      console.log(this.resultSelect);
      this.servicesProvider.StringReplaceBulk(this.resultSelect).then(()=>{});
    });
  	this.servicesProvider.SelectWhere('testing','name',"'<ram/>'").then(()=>{});
  	this.servicesProvider.selectAllLimit('testing', 2).then(()=>{});
   	// this.servicesProvider.DropTable('testing');  	
  }
  

}
