import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { LoadingController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {
  deviceInfo:any;
  loader:any;
  constructor(public navCtrl: NavController, private loaderCtrl:LoadingController, public navParams: NavParams, public AioneHelp:AioneHelperProvider) {
  }
  ionViewDidLoad(){
    this.AioneHelp.updateDeviceInfo().then((result:any)=>{
    	this.deviceInfo=result;
    	console.log(this.deviceInfo);
    	if(this.deviceInfo["cordova"]==null){
    		this.browserInfo().then((result1:any)=>{
    			this.deviceInfo = result1;
    			console.log(this.deviceInfo);
    		})
    	}
    });
   
  }
  browserInfo(){
  	return new Promise((resolve,reject)=>{
  	let collection={}
      collection["model"]="Redmi ";
      collection["platform"]="Android";
      collection["cordova"]="7.0.0";
      collection["manufacturer"]="Xiaomi";
      collection["serial"]="bdcca8100903";
      console.log(collection);
      resolve(collection);
  	})
  }
  update(){
  	this.loader = this.loaderCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">`+'Refreshing data'+`</div>
      </div>`,
    });
    this.loader.present(); 
    	var elem = this;
    setTimeout(function(){
    	elem.loader.dismiss();
    	 elem.AioneHelp.presentToast(" no updates",800,'top')
    },300);
  }

}
