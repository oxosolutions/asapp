import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { LoadingController } from 'ionic-angular';
import {Http , Headers, RequestOptions} from '@angular/http';
import { DashboardPage } from '../../pages/dashboard/dashboard';
declare var jquery:any;
declare var $ :any;

@IonicPage()
@Component({
  selector: 'page-synchronize-record',
  templateUrl: 'synchronize-record.html',
})
export class SynchronizeRecordPage {
	collectionSurvey:any;
	synchronizeData:any=[];
	listSurvey:any;
	 loader:any;
	 latitude:any;
  longitude:any;
  zoom:any;
  appVersion:any;
  constructor(public http: Http,private loaderCtrl:LoadingController,public servicesProvider:AioneServicesProvider,public AioneHelp:AioneHelperProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad(){
     this.loader = this.loaderCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">`+'Refreshing data'+`</div>
      </div>`,
    });
    this.loader.present(); 
  	this.checkSurvey().then((selected:any)=>{
      this.synchronizeData=selected;
      if(this.synchronizeData.length >0){
        this.listSurvey=this.synchronizeData;
        this.loader.dismiss(); 
      }else{
        console.log('no surveys');
        this.loader.dismiss(); 
        this.AioneHelp.presentToast("Sorry, there is no completed survey found",500,'top')
      }
  	})	
  }
  checkSurvey(){
    console.log(this.synchronizeData);
    console.log(this.listSurvey);
  	return new Promise((resolve,reject)=>{
  		let forloop=0;
	    this.servicesProvider.SelectAll("surveys").then((surveyId:any)=>{
	    	this.servicesProvider.mobileListArray(surveyId).then((list:any)=>{ 
	    		list.forEach((key,value)=>{
	    			let tablename='surveyResult_'+key.id;
	    			this.synchronizeStatus(tablename, key).then((collection:any)=>{ console.log(collection);
              this.synchronizeData.push(collection); console.log(this.synchronizeData);
               forloop++;
              if(forloop == list.length){
                console.log(forloop);
                this.synchronizeData=this.synchronizeData.filter((Element,index)=>{
                  return(Element != undefined);
                });
                console.log(this.synchronizeData);
                resolve(this.synchronizeData)
              }
            })
	    		});
	      })
	    })
  	})	
  }
  backToDetails(){
    this.navCtrl.push(DashboardPage);
  }
  synchronizeStatus(tablename,collection){
    return new Promise((resolve,reject)=>{ 
      let query="SELECT count(*) as count FROM "+ tablename +" WHERE survey_sync_status = 'synchronized' ";
      this.servicesProvider.ExecuteRun(query,[]).then((questions:any)=>{
          let totalsyn=questions.rows.item(0).count;
          let query1="SELECT count(*) as count FROM "+ tablename +" WHERE survey_sync_status IS NULL AND survey_status = 'completed' ";
          this.servicesProvider.ExecuteRun(query1,[]).then((questions12:any)=>{
          let data = {};
          collection["synchronize"] = totalsyn;
          collection["unsynchronize"] = questions12.rows.item(0).count;
          collection["tablename"]=tablename;
          if(collection["synchronize"]==0 &&  collection["unsynchronize"]==0){
            resolve();
          }else{
            let query2="SELECT count(*) as count FROM "+ tablename +" WHERE survey_sync_status IS NULL AND survey_status = 'completed' ";
            console.log(query2);
            this.servicesProvider.ExecuteRun(query2,[]).then((questions2:any)=>{ 
              console.log(questions2.rows.item(0).count);
              if(questions2.rows.item(0).count > 0){
                resolve(collection);
              }else{
                resolve();
              }
            })
          }
         }) ;
      }) 
    })
  }
  AddTableName(collection,tablename){
  	return new Promise((resolve,reject)=>{
  		if(collection == undefined){
  			console.log("undefined");
  			resolve(collection);
  		}else{
  			collection["tablename"]=tablename;
        // collection["synchronized"]=2;
        // collection["Unsynchronized"]=2;
	  		//resolve(collection);
        console.log(collection);
       // this.servicesProvider.ExecuteRun(query1,[]).then((questions12:any)=>{
       //    let data = {};
       //    data["totalsynchronize"] = totalsyn;
       //    data["pendingsynchronize"] = questions12.rows.item(0).count;
       //     //resolve(data);
       //  }) //
  		}
  	})
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
          console.log(table);
          tablename11.push(table);   
        }else{
          forloop++;
        }
        if(forloop == surveylength){
          resolve(tablename11);
        }
      })
     
    })
  }
  onSubmit(formData){
    this.checkboxValidate(Object.keys(formData.value).length).then((table:any)=>{
        this.loader = this.loaderCtrl.create({
        spinner: 'crescent',
        content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box">`+'Refreshing data'+`</div>
        </div>`,
      });
      this.loader.present(); 
      if((table.length>0)){
        // let formValue = [];
        let listtable=[];
        let json:any;
        let forloop=0;
        table.forEach((key,value)=>{
          let formValue = [];
          let surveyId=key.split("_").pop();
            this.answerGet(key).then((answer:any)=>{ 
              answer[0]["surveyId"]=surveyId;
              console.log(answer);
             // forloop++;
              formValue.push(answer);
             //  if(forloop == table.length){ 
               console.log(formValue[0]);
              //this.ArrayParse(formValue).then((parsedData:any)=>{ console.log(parsedData)
               this.dataSend(formValue[0],table).then(()=>{ console.log(this.listSurvey);
                 forloop++;
                 this.listSurvey=[];
                 this.synchronizeData=[];
                   if(forloop == table.length){ 
                  this.checkSurvey().then((selected:any)=>{ 
                    console.log("back to submit"); 
                    this.synchronizeData=selected;
                    console.log(this.synchronizeData);  
                    if(this.synchronizeData.length >0){
                      this.listSurvey=this.synchronizeData;
                      this.loader.dismiss(); 
                      // this.listSurvey=null;
                      this.AioneHelp.presentToast(" Synchronized  Survey Data Successfully", 500,'top');
                    }else{
                      this.listSurvey=null;
                      console.log('no surveys');
                      this.loader.dismiss(); 
                      this.AioneHelp.presentToast("Synchronized Surveys Successfully", 500,'top');
                    }
                  })
                }
                //})
               }); 
             // }
            })
          });
      }else{
        console.log("pls check for synchronize");
         this.loader.dismiss();
        this.AioneHelp.showAlert('Error','To Synchronize data, you must check survey')
      }
    })  
  }
  ArrayParse(formValue){
    let parsed=[]
    return new Promise((resolve,reject)=>{ console.log(formValue);
      formValue.forEach((value,key)=>{ console.log(key);
        let forloop=0;
        Object.keys(value).forEach((valuearray,keyarray)=>{
          forloop++;
          parsed.push(value[valuearray]);
          // if((value.length-1)==(key)){
          //   console.log("hii");
            if(forloop==value.length){
              resolve(parsed);
            }
          // }  
        });
      });
    });
  }
  answerGet(tablename){
    return new Promise((resolve,reject)=>{
      let query1="SELECT * FROM "+ tablename +" WHERE survey_sync_status IS NULL AND survey_status = 'completed' ";
      this.servicesProvider.ExecuteRun(query1,[]).then((answer:any)=>{
        this.servicesProvider.mobileListArray(answer).then((list:any)=>{ 
          resolve(list);
          
        });
      });
    });
  }
  dataSend(formValue,listsurvey){
    return new Promise((resolve,reject)=>{ console.log(formValue)
      var formData = new FormData;
      formData.append('survey_data',JSON.stringify(formValue));
      formData.append('survey_id',formValue[0].surveyId);
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
          console.log(apiResult.status);
          if(apiResult.status=='error'){
            console.log('error');
             this.loader.dismiss(); 
          }else{
             let forloop=0;
            for(let i=0; i< formValue.length; i++){
              console.log(i);
              console.log(formValue[i].surveyId);   
              let query='Update surveyResult_'+formValue[i].surveyId + ' SET survey_sync_status = "synchronized"';
              console.log(query);
              this.servicesProvider.ExecuteRun(query,[]).then((update:any)=>{
                forloop++;
                console.log(forloop);
                if(forloop == formValue.length){
                  console.log('update');
                  resolve('update');
                }
              });
            }
          }
        },error=>{
         // this.loader.dismiss();
          console.log(error);
        });
    });
  }
}
