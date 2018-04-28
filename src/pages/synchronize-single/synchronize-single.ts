import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import {SurveyDetailPage} from '../../pages/survey-detail/survey-detail';
import {Validators, FormBuilder, FormGroup, NgForm, FormControl} from '@angular/forms';
import 'rxjs/add/operator/map';

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
  constructor(public fb: FormBuilder,public servicesProvider:AioneServicesProvider,public AioneHelp:AioneHelperProvider,private loaderCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    this.checkSurvey(); 
  }
  // onFilterChange(eve: any,surveyDetail) {
  //  console.log("clicked");
  //   this.filter = !this.filter;
  //   console.log(surveyDetail);
  // }
  synchronizeAll(value){
    this.submitAttempt=true;
    var favorite = [];
    $.each($("input[name='sport']:checked"), function(){            
        favorite.push($(this).val());
        console.log(favorite);
    });
    console.log(value);
  }
  ionViewWillEnter(){

    const form: FormGroup = new FormGroup({});
    for(let i=0; i < this.synchronize.length; i++){
      let name=this.synchronize[i].incomplete_name;
      const control: FormControl = new FormControl(name, Validators.required);
        form.addControl(name, control);
    }
    this.synchronizeSurvey = form;
    
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
          //this.checkSurveyDetail(resultParse.length).then((sur:any)=>{
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
       // });
      });
    })
  }
  checkSurveyDetail(totalNo){
    return new Promise((resolve,reject)=>{
      let data=JSON.parse(localStorage.getItem("currentSurvey"));
      data["completed"]=totalNo;
      console.log(data);
      localStorage.setItem("currentSurvey",JSON.stringify(data));
      resolve("data");

    })
  }


}
