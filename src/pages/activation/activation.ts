import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SurveyProvider } from '../../providers/survey/survey';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import {Validators, FormBuilder, FormGroup,NgForm,FormControl} from '@angular/forms';
import {Http,Headers ,RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import {DashboardPage} from '../../pages/dashboard/dashboard';
import {LoginPage} from '../../pages/login/login';
declare var jquery:any;
declare var $ :any;
@IonicPage()
@Component({
  selector: 'page-activation',
  templateUrl: 'activation.html',
})
export class ActivationPage {

  firstnameValidator:any;
  loginForm: FormGroup;
  submitAttempt: boolean = false;
  apiresult:any;
  public query:any;
  public TableCols=[];
  ActivationCode:any;
  public loader:any;
  surveyresult:any;
  ApplicationName:any;
  ApplicationDesc:any;
  
  constructor(public nav:NavController,private loaderCtrl:LoadingController,public http:Http, public AioneService:AioneServicesProvider, public servicepro:AioneServicesProvider,private formBuilder: FormBuilder,public Aioneservices:AioneServicesProvider,public AioneHelp:AioneHelperProvider, public survey:SurveyProvider,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
	this.ionViewWillEnter();
  }
  activation(){
    this.AioneHelp.internet().then((conn)=>{
      this.presentLoading("your form is filling");
      this.CreateSurvey().then(()=>{
      });
    });
  }
  presentLoading(message){
    this.loader = this.loaderCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">`+message+`</div>
      </div>`,
    });
    this.loader.present(); 
  }
  dismissLoader(){
    this.loader.dismiss();
    this.presentLoading("your form is submitting Successfully");
  }
  CreateSurvey(){
    return new Promise ((resolve,reject)=>{
      let tableName=["questions","surveys","groups","users" ,"settings","survey_meta"];
      let dropTable=["questions","surveys","groups","users" ,"settings","survey_meta"];
      let selectBulkTable=[];
      this.AioneService.SelectAllTable().then((slectdrop:any)=>{
        Object.keys(slectdrop).forEach((dropkey,dropvalue)=>{
          selectBulkTable.push(slectdrop[dropkey].name);
        }); 
         console.log(selectBulkTable);
        let selectBulkTable2=selectBulkTable.slice(1);
         console.log(selectBulkTable2);
        let droptable2=selectBulkTable2.slice(1);
        console.log(droptable2);
       this.AioneService.DropTable(droptable2).then((drop)=>{
          this.Api().then((Apidata:any)=>{
            let i
            this.table(Apidata,tableName, 0).then(result => {
              this.AioneService.TableBulk(tableName,this.TableCols).then(()=>{
                this.dismissLoader();
                this.insertUser(Apidata).then((user)=>{///console.log(user)
                  this.insertsurveys(Apidata).then((surveys  )=>{
                    this.insertgroups(Apidata).then((groups)=>{
                      this.insertquestions(Apidata).then((questions)=>{
                        this.insertsettings(Apidata).then((setting)=>{ 
                          this.insersurveyMeta(Apidata).then((survey_meta)=>{
                              this.resultSurvey(Apidata.questions,Apidata.surveys).then(resultSurvey=>{
                                if(resultSurvey != undefined){
                                  console.log(resultSurvey);
                                  this.loader.dismiss();
                                  this.nav.setRoot(LoginPage);
                                  localStorage.setItem("activation", 'Success');
                                }
                              });
                          })
                        })
                      })
                    })
                  })
                })
              })
             });  
            })   
          })    
        });
    }) 
  }
  resultSurvey(questions,surveys){
    return new Promise((resolve,reject)=>{
      let keyqColumns = [];
      let loopLength = 0;
      let surveyresult=[];
      let listQuestion=[];
      let listQuestion2=[];
      console.log(surveys);
      surveys.forEach((value,key)=>{
         console.log('surveyResult_'+value.id);
        surveyresult.push('surveyResult_'+value.id);
        let keyColumns = [];
        this.AioneService.SelectWhere("questions","survey_id",value.id).then((questionData:any)=>{
          keyColumns.push('serialNo INTEGER PRIMARY KEY AUTOINCREMENT') ;
         // keyColumns.push('serialNo');
          let qresult="";
          for(let i=0; i < questionData.rows.length; i++ ){
            qresult=questionData.rows.item(i).question_key+' TEXT';
             keyColumns.push(qresult); 
          }
          keyColumns.push('ip_address', 'survey_startedOn','survey_completedOn','totalGroup','survey_submittedBy','survey_submittedFrom','mac_address','unique_id','device_detail','totalQuestions','filledQuestions','totalFilledQuestion','questionIndex','last_fieldId','last_group_id','completed_groups','survey_status','incomplete_name','survey_sync_status','record_type');
         keyqColumns.push(keyColumns);   
         loopLength++;
        if(loopLength == surveys.length){
           console.log(keyqColumns);
          this.AioneService.TableBulk(surveyresult, keyqColumns).then((keyqColumns:any)=>{
            resolve(keyColumns);
          });
        }
        }) ;   
      });
    });
  }
  insersurveyMeta(Apidata){
    return new Promise ((resolve,reject)=>{
      if("survey_meta" in Apidata){
        this.insertExecute(Apidata.survey_meta).then((insertExe:any)=>{
          console.log(insertExe);
          this.AioneService.InsertBulk("survey_meta", insertExe.dataColumns,insertExe.insertContent).then((surveys)=>{
            resolve(surveys);
          })
        });
      }
    })
  }
  insertquestions(Apidata){
    return new Promise ((resolve,reject)=>{
      if("questions" in Apidata){
       console.log(Apidata.questions);
        this.insertExecuteObject(Apidata.questions).then((insertExe:any)=>{
          this.AioneService.InsertBulk("questions", insertExe.dataColumns,insertExe.insertContent).then((questions)=>{
             resolve(questions);
          })
        });
      }
    })
  }
  insertExecuteObject(result){
    return new Promise((resolve,reject)=>{
      let insertContent=[];
      let dataColumns;
      console.log(result);
      result.forEach(function(key,value){
        let dataset=[];
        dataColumns=[];
        Object.keys(key).forEach(function(keyvalue,keydata){
          let json;
          let anotherjson
          //console.log(key[keyvalue]);
          if(typeof key[keyvalue]=="object"){
            anotherjson=JSON.stringify(key[keyvalue]);
            json=anotherjson.replace(/"/g, "'");
          }else{
            json=key[keyvalue];
          }
          dataset.push(json);
          dataColumns.push(keyvalue);
        });
        insertContent.push(dataset);
      })
      let collection={};
      collection['dataColumns']=dataColumns;
      collection['insertContent']=insertContent;
      resolve(collection);   
    });
  }
  insertsettings(Apidata){
    return new Promise ((resolve,reject)=>{
      if("settings" in Apidata){
        this.insertSingleExecute(Apidata.settings).then((settingExe:any)=>{
          this.AioneService.Insert("settings",settingExe.dataColumns,settingExe.insertContent).then((setting)=>{
            resolve(setting);
          })
        })
      }
    })
  }
  insertgroups(Apidata){
    return new Promise ((resolve,reject)=>{
      if("groups" in Apidata){
        this.insertExecute(Apidata.groups).then((insertExe:any)=>{
          this.AioneService.InsertBulk("groups", insertExe.dataColumns,insertExe.insertContent).then((surveys)=>{
            resolve(surveys);
          })
        });
      }
    })
  }
  insertsurveys(Apidata){
    return new Promise ((resolve,reject)=>{
      if("surveys" in Apidata){
        this.insertExecute(Apidata.surveys).then((insertExe:any)=>{
          this.AioneService.InsertBulk("surveys", insertExe.dataColumns,insertExe.insertContent).then((surveys)=>{
             resolve(surveys);
          })
        });
      }
    });
  }
  insertUser(Apidata){
    return new Promise ((resolve,reject)=>{
      if("users" in Apidata){
        this.insertExecute(Apidata.users).then((insertExe:any)=>{
          this.AioneService.InsertBulk("users",insertExe.dataColumns,insertExe.insertContent).then((users)=>{
             resolve(users);
          })
        });
      }
    })
  }
  insertSingleExecute(result){
    return new Promise((resolve,reject)=>{
      let insertContent=[];
      let dataColumns=[];
      for(let app_key in result){
        dataColumns.push(app_key);
        insertContent.push(result[app_key]);
      }
      let collection={};
      collection['dataColumns']=dataColumns;
      collection['insertContent']=insertContent;
      resolve(collection);  
    })
  }
  insertExecute(result){
    return new Promise((resolve,reject)=>{
      let insertContent=[];
      let dataColumns;
      result.forEach(function(key,value){
        let dataset=[];
        dataColumns=[];
        Object.keys(key).forEach(function(keyvalue,keydata){
          dataset.push(key[keyvalue]);
          dataColumns.push(keyvalue);
        });
        insertContent.push(dataset);
      })
      let collection={};
      collection['dataColumns']=dataColumns;
      collection['insertContent']=insertContent;
      resolve(collection);   
    });
  }
  table(Apidata,tableName, i){
    let promise = new Promise((resolve,reject)=>{
        if(tableName[i] != undefined){
          this.surveyTable(Apidata,tableName[i]).then((dd:any)=>{
            this.TableCols.push(dd);
            i = i+1;
            return resolve(this.table(Apidata,tableName,i));
          });
        }else{
            resolve('Done');
        }
    });
    return promise;
  }
  surveyTable(Apidata,table){
    return new Promise ((resolve,reject)=>{
      if(table in Apidata){
        if((Apidata[table] instanceof Array)){
          Apidata[table].forEach(function(key,value){
            let dataset=[];
            dataset.push('serialNo INTEGER PRIMARY KEY AUTOINCREMENT') ;
            Object.keys(key).forEach(function(keyvalue,keydata){
              dataset.push(keyvalue + ' TEXT');     
            });
            resolve(dataset);
          })
        }else{
          let dataset=[];
          dataset.push('serialNo INTEGER PRIMARY KEY AUTOINCREMENT') ;
          for (let apikey in Apidata[table] ){
            dataset.push(apikey + ' TEXT');
          }
          resolve(dataset);
        }

      }
    })
  }
  table33(Apidata,tableName, i){
    let promise = new Promise((resolve,reject)=>{
        if(tableName[i] != undefined){
          this.surveyTable(Apidata,tableName[i]).then((dd:any)=>{
            this.TableCols.push(dd);
            i = i+1;
            return resolve(this.table(Apidata,tableName,i));
          });
        }else{
            resolve('Done');
        }
    });
    return promise;
  }
  Api(){
    return new Promise ((resolve,reject)=>{
      if(!this.loginForm.valid){
        this.loginForm;
      }else{
        let headers = new Headers();
        headers.append('content-type', undefined);
        let formArray = {};
   
        formArray['activation_key'] = this.loginForm.value.name;
       
        this.http.post(localStorage.getItem("api_url"),formArray,{headers:headers}).subscribe((data:any)=>{
          this.apiresult=data.json();
           console.log(this.loginForm.value.name);
           localStorage.setItem("activationKey",this.loginForm.value.name)
          if(this.apiresult.status=='error'){
            this.loader.dismiss();
            this.loginForm.reset();
            this.AioneHelp.showAlert("Error",this.apiresult.message);
          }else{ 
            console.log(this.apiresult);           
            resolve(this.apiresult);
          }
        },(err)=>{
          console.error(err);
        })
      }
    })
  }
  ionViewWillEnter(){
    this.ApplicationName=localStorage.getItem("activation_ApiName");
    this.ApplicationDesc=localStorage.getItem("activationDesc");
    this.loginForm=this.formBuilder.group({
    name:['', Validators.compose([
          Validators.required,     
      ])],
    });
  }
  location(){
    //this.geolocation.getCurrentPosition().then((resp)=>{
        //console.log(resp.coords.latitude); //console.log(resp.coords.longitude);
        //this.CreateSurvey().then(()=>{
      //  });
      //}).catch((error)=>{ console.log(error);
  }
}
