import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import {SurveyDetailPage} from '../../pages/survey-detail/survey-detail';
import {Validators, FormBuilder, FormGroup, NgForm, FormControl} from '@angular/forms';
import 'rxjs/add/operator/map';
import {Http , Headers, RequestOptions} from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-synchronize-single',
  templateUrl: 'synchronize-single.html',
})
export class SynchronizeSinglePage {
	survey:any;
  synchronize:any;
  EmptySurvey:any;
  loader:any;
  filter = false;
  synchronizeSurvey:FormGroup;
   cucumber: boolean;
  submitAttempt: boolean = false;
  latitude:any;
  longitude:any;
  zoom:any;
  appVersion:any;
  constructor(public http: Http,public fb: FormBuilder,public servicesProvider:AioneServicesProvider,public AioneHelp:AioneHelperProvider,private loaderCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    this.setCurrentPosition();
    this.checkSurvey(); 
  }
  private setCurrentPosition(){
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  ckbCheckAll(event){
    if(event.srcElement.checked == true){ 
      $(".checkBoxClass").each(function(){
        $(this).prop('checked',true); 
      });
    }else{
      $(".checkBoxClass").each(function(){
          $(this).prop('checked',false);
      });
    }
  }
   checkboxValidate(surveylength){
    return new Promise((resolve,reject)=>{
      let tablename11=[];
      let forloop=0;
      $(".checkBoxClass").each(function(){
        if($(this).is(':checked')){
          forloop++;
          let table = $(this).attr("ng-reflect-name");
          tablename11.push(table);   
        }else{
          forloop++;
        }
        if(forloop == surveylength){
          console.log(tablename11);
          resolve(tablename11);
        }
      })
     
    })
  }
  onSubmit(formData){
     this.checkboxValidate(Object.keys(formData.value).length).then((table:any)=>{
    console.log('clicked');
    console.log(formData.value);
      this.loader = this.loaderCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">`+'Refreshing data'+`</div>
      </div>`,
    });
    this.loader.present(); 
    let tablename="surveyResult_"+this.navParams.get('id');
    if((table.length>0)){
      
      console.log('further');
      let formValue = [];
      let json:any;
       let forloop=0;
      // for(let key in formData.value){
         table.forEach((key,value)=>{ console.log(key);
          this.servicesProvider.SelectWhere(tablename,"serialNo",key).then((result:any)=>{
            formValue.push(result.rows.item(0));
             forloop++;
            if(forloop == table.length){
              console.log(formValue);
                this.dataSend(formValue).then(()=>{ this.loader.dismiss();
                 this.checkSurvey().then(()=>{  
                   this.AioneHelp.presentToast('Synchronized data successfully',1200,'top');
                 })
                 
             })
           }
        });
           })
      
      }else{
        console.log("pls check for synchronize");
        this.loader.dismiss();
          this.AioneHelp.showAlert('Error','To Synchronize data, you must check survey')
      }
  });
 
}
  dataSend(formValue){
    return new Promise((resolve,reject)=>{
      let tablename="surveyResult_"+this.navParams.get('id');
       var formData = new FormData;
            formData.append('survey_data',JSON.stringify(formValue));
            formData.append('survey_id',this.navParams.get('id'));
            formData.append('activation_code', '292608');
            formData.append('lat_long',JSON.stringify({lat: this.latitude, long: this.longitude}));
            try{
              this.AioneHelp.deviceInfo().then((info:any)=>{
                formData.append('app_version',info);
              });
            }catch(e){
              formData.append('app_version','Unable to get app version');
            }
            console.log(formData)
            this.http.post("http://iris.scolm.com/api/survey_filled_data", formData)
              .subscribe(data => {
                console.log(data);
                let apiResult:any;
                apiResult=data.json;
                 if(apiResult.status=='error'){
                    console.log('error');
                     this.loader.dismiss();
                }else{
                  let forloop=0;
                  for(let i=0; i< formValue.length ; i++){
                    let query='Update '+ tablename + ' SET survey_sync_status = "synchronized" where serialNo = "'+ formValue[i].serialNo +'"';
                    console.log(query);
                    this.servicesProvider.ExecuteRun(query,[]).then((update:any)=>{
                      forloop++;
                      if(forloop == formValue.length){
                         console.log('update');
                         resolve('update');
                      }
                     
                     })
                  }
                }
                 

              },error=>{
                this.loader.dismiss();
                console.log(error);
              });
    })
    
  }
  // onFilterChange(eve: any,surveyDetail) {
  //  console.log("clicked");
  //   this.filter = !this.filter;
  //   console.log(surveyDetail);
  // }
  synchronizeAll(value){
    this.submitAttempt=true;
    var favorite = [];
    // $.each($("input[name='sport']:checked"), function(){            
    //     favorite.push($(this).val());
    //     console.log(favorite);
    // });
    console.log(value);
  }
  // ionViewWillEnter(){
  //   const form: FormGroup = new FormGroup({});
  //   for(let i=0; i < this.synchronize.length; i++){
  //     let name=this.synchronize[i].incomplete_name;
  //     const control: FormControl = new FormControl(name, Validators.required);
  //       form.addControl(name, control);
  //   }
  //   this.synchronizeSurvey = form;
    
  // }
   backToDetails(){
    this.navCtrl.setRoot(SurveyDetailPage);
  }
  checkSurvey(){
    //console.log(this.navParams.get('id'));
    return new Promise((resolve,reject)=>{
       this.loader = this.loaderCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">`+'Refreshing data'+`</div>
      </div>`,
    });
    this.loader.present(); 
      let tablename="surveyResult_"+this.navParams.get('id');
      let query1="SELECT * FROM "+tablename +" WHERE survey_sync_status IS NULL AND survey_status ='completed'";
      	this.servicesProvider.ExecuteRun(query1,[]).then((result:any)=>{
      	//console.log(result);
        this.servicesProvider.mobileListArray(result).then((resultParse:any)=>{
          this.checkSurveyDetail(resultParse.length).then((sur:any)=>{
          //console.log(resultParse);
          if(resultParse.length>0){
           this.synchronize=resultParse;
           this.loader.dismiss(); 
            console.log(this.synchronize);
          }else{
            this.synchronize=resultParse;
            console.log("no record found"); 
            this.navCtrl.setRoot(SurveyDetailPage);
             this.loader.dismiss(); 
             this.AioneHelp.presentToast("Sorry, there is no completed survey found",15000,'top')
            this.EmptySurvey=null;
          }
        });
        });
      });
    })
  }
  checkSurveyDetail(totalNo){
    return new Promise((resolve,reject)=>{
      let data=JSON.parse(localStorage.getItem("currentSurvey"));
      let query="SELECT count(*) as count FROM surveyResult_"+ this.navParams.get('id') +" WHERE survey_sync_status = 'synchronized' ";
      this.servicesProvider.ExecuteRun(query,[]).then((questions:any)=>{
        let totalsyn=questions.rows.item(0).count;
        data["synchronize"].totalsynchronize=totalsyn;
        console.log(data);
        localStorage.setItem("currentSurvey",JSON.stringify(data));
        resolve("data");
      });
    })
  }


}
