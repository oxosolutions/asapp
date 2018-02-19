
import { Injectable } from '@angular/core';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import {Http,Headers ,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SurveyProvider {
  apiresult:any;
  public TableCols=[];
  constructor(public http:Http, public AioneService:AioneServicesProvider, public servicepro:AioneServicesProvider) {
    console.log('Hello SurveyProvider Provider');
  }
  CreateSurvey(){
  	return new Promise ((resolve,reject)=>{
  		this.servicepro.PlatformCheck('asapp').then((db)=>{
  			this.Api().then((Apidata:any)=>{
          let i
          let tableName=["questions","surveys","groups","users" ,"settings"];
          this.test(Apidata,tableName, 0).then(result => {
            this.AioneService.TableBulk(tableName,this.TableCols).then(()=>{
              this.insertUser(Apidata).then((user)=>{
                this.insertsurveys(Apidata).then((surveys  )=>{
                  this.insertgroups(Apidata).then((groups)=>{
                    this.insertquestions(Apidata).then((questions)=>{
                      this.insertsettings(Apidata).then((setting)=>{
                        
                      })
                    })
                  })
                })
              })
            })
          });      
        });
  		})
  	})	
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
  insertquestions(Apidata){
    return new Promise ((resolve,reject)=>{
      if("questions" in Apidata){
        this.insertExecute(Apidata.questions).then((insertExe:any)=>{
          this.AioneService.InsertBulk("questions", insertExe.dataColumns,insertExe.insertContent).then((questions)=>{
             resolve(questions);
          })
        });
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
  test(Apidata,tableName, i){
    let promise = new Promise((resolve,reject)=>{
        if(tableName[i] != undefined){
          this.surveyTable(Apidata,tableName[i]).then((dd:any)=>{
            this.TableCols.push(dd);
            i = i+1;
            return resolve(this.test(Apidata,tableName,i));
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
            Object.keys(key).forEach(function(keyvalue,keydata){
              dataset.push(keyvalue + ' TEXT');     
          });
          resolve(dataset);
          })
        }else{
          let dataset=[];
          for (let apikey in Apidata[table] ){
            dataset.push(apikey + ' TEXT');
          }
          resolve(dataset);
        }

      }
    })
  }
  Api(){
    return new Promise ((resolve,reject)=>{
      let headers = new Headers();
      headers.append('content-type', undefined);
      let formArray = {};
      formArray['activation_key'] = 123456;
      this.http.post('http://master.scolm.com/api/survey_api',formArray,{headers:headers}).subscribe((data:any)=>{
        this.apiresult=data.json();
        console.log(this.apiresult);
        resolve(this.apiresult);
      },(err)=>{
        //console.error(err);
      })
    })
  }

}
