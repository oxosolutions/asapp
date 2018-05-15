import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { LoadingController } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {
  deviceInfo:any;
  loader:any;
  constructor(public navCtrl: NavController,public AioneService:AioneServicesProvider, private loaderCtrl:LoadingController, public navParams: NavParams, public AioneHelp:AioneHelperProvider) {
  }
  ionViewDidLoad(){
    this.AioneHelp.updateDeviceInfo().then((result:any)=>{
      this.deviceInfo=result;
      if(this.deviceInfo["cordova"]==null){
        this.browserInfo().then((result1:any)=>{
          this.deviceInfo = result1;
          console.log(this.deviceInfo);
        });
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
      // console.log(collection);
      resolve(collection);
    })
  }
  update(){
    this.AioneService.SelectAll("surveys").then((survey:any)=>{ 
      this.AioneService.mobileListArray(survey).then((result:any)=>{
        console.log(result);
        let data=this.myfunc(result,0);
        console.log(data);
        if(data !== undefined){
          console.log(data);
        }
          // this.userfunction().then(()=>{

          // });
        // });
     
      });
    });
  }
  protected myfunc(result,index){
    this.renameTablename(result[index]["id"]).then((user)=>{
        index = index+1;
        if(result[index] !== undefined){
          this.myfunc(result,index);
        }else{
          this.userfunction().then(()=>{
          })
        }
    })
  }
  userfunction(){
    return new Promise((resolve,reject)=>{
      console.log("user");
    })
  }
  renameTablename(valueId){
    return new Promise((resolve,reject)=>{
      console.log(valueId);
       let query='Select name FROM sqlite_master type="table" AND name= "surveyResult_'+valueId+'"';
       console.log(query);
    });
  }

}
