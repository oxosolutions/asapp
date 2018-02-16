
import { Injectable } from '@angular/core';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import {Http,Headers ,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SurveyProvider {
  constructor(public http:Http , public servicepro:AioneServicesProvider) {
    console.log('Hello SurveyProvider Provider');
  }
  CreateSurvey(){
  	return new Promise ((resolve,reject)=>{
  		this.servicepro.PlatformCheck('asapp').then((db)=>{
  			console.log(db);
  			this.api();
  		})
  	})	
  }
  api(){
    console.log('database ionview did load');
    let headers = new Headers();
  	headers.append('content-type', undefined);
    let formArray = {};
    formArray['activation_key'] = 123456;
    this.http.post('http://master.scolm.com/api/survey_api',formArray,{headers:headers}).subscribe((data:any)=>{
    	console.log(data.json());
    },(err)=>{
      console.error(err);
    })
  }

}
