import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { LoadingController } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import {Http,Headers ,RequestOptions } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {
  deviceInfo:any;
  loader:any;
  firstnameValidator:any;
  apiresult:any;
  public query:any;
  public TableCols=[];
  ActivationCode:any;
  // public loader:any;
  surveyresult:any;
  ApplicationName:any;
  ApplicationDesc:any;
  constructor(public http:Http,public navCtrl: NavController,public AioneService:AioneServicesProvider, private loaderCtrl:LoadingController, public navParams: NavParams, public AioneHelp:AioneHelperProvider) {
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
    this.presentLoading("Your App is Updating");
    this.AioneService.SelectAll("surveys").then((survey:any)=>{ 
      this.AioneService.mobileListArray(survey).then((result:any)=>{
        console.log(result);
        let data=this.myfunc(result,0);
        // this.userfunction().then(()=>{

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
    this.AioneHelp.presentToast("Your App is Updated Successfully", 900 ,"bottom")
  }
  userfunction(){
    return new Promise((resolve,reject)=>{
      let query='Select name FROM sqlite_master WHERE type="table"';
      console.log(query); let survey=[]; let selectBulkTable=[]
      this.AioneService.ExecuteRun(query,[]).then((res:any)=>{
        this.AioneService.SelectAllTable().then((slectdrop:any)=>{
        Object.keys(slectdrop).forEach((dropkey,dropvalue)=>{
          let json=slectdrop[dropkey].name;
          if(json.match(/surveyResult_/g) || json.match(/sqlite_sequence/g) || json.match(/__WebKitDatabaseInfoTable__/g)){
          }else{
            selectBulkTable.push(json);
          }
        }); 
        console.log(selectBulkTable);
        let tableName=["questions","surveys","groups","users" ,"settings","survey_meta"];
        this.AioneService.DropTable(selectBulkTable).then((drop)=>{
          this.Api().then((Apidata:any)=>{
            let i;
            this.table(Apidata,tableName, 0).then(result => {
              this.AioneService.TableBulk(tableName,this.TableCols).then(()=>{
                //this.dismissLoader();
                this.insertUser(Apidata).then((user)=>{///console.log(user)
                  this.insertsurveys(Apidata).then((surveys  )=>{
                    this.insertgroups(Apidata).then((groups)=>{
                      this.insertquestions(Apidata).then((questions)=>{
                        this.insertsettings(Apidata).then((setting)=>{ 
                          this.insersurveyMeta(Apidata).then((survey_meta)=>{
                            this.resultSurvey(Apidata.questions,Apidata.surveys).then(resultSurvey=>{
                              if(resultSurvey != undefined){
                                console.log(resultSurvey);
                                console.log("yes completed");
                                   this.dismissLoader();
                              }
                            });
                          })
                        })
                      })
                    })
                  })
                })
              });
            })
          });
        })
      });
      })
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
  
  Api(){
    return new Promise ((resolve,reject)=>{
    
        let headers = new Headers();
        headers.append('content-type', undefined);
        let formArray = {};
   
        formArray['activation_key'] = localStorage.getItem("activationKey");
       
        this.http.post(localStorage.getItem("api_url"),formArray,{headers:headers}).subscribe((data:any)=>{
          this.apiresult=data.json();
          if(this.apiresult.status=='error'){
            this.loader.dismiss();
            this.AioneHelp.showAlert("Error",this.apiresult.message);
          }else{ 
            console.log(this.apiresult);           
            resolve(this.apiresult);
          }
        },(err)=>{
          console.error(err);
        })
     
    })
  }
  renameTablename(valueId){
    return new Promise((resolve,reject)=>{
      console.log(valueId);
      let time:any;
      time=new Date();
      let timestamp=time.getFullYear()+'_'+(time.getMonth()+1)+'_'+time.getDay()+'_'+time.getHours()+'_'+time.getMinutes()+'_'+time.getSeconds()+'_'+time.getMilliseconds();
       let query='Select name FROM sqlite_master WHERE type="table" AND name= "surveyResult_'+valueId+'"';
       this.AioneService.ExecuteRun(query,[]).then((res:any)=>{
        if(res.rows.length > 0){
          let rename_table = 'ALTER TABLE surveyResult_'+valueId+' RENAME TO surveyResult_'+valueId+'_'+timestamp+'_backup';
          console.log(rename_table);
          this.AioneService.ExecuteRun(rename_table,[]).then((result:any)=>{
            resolve(result);
          })
        }
      })
    });
  }

}
