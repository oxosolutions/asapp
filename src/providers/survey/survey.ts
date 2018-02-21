
import { Injectable } from '@angular/core';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import {Http,Headers ,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Validators, FormBuilder, FormGroup,NgForm,FormControl} from '@angular/forms';
@Injectable()
export class SurveyProvider {
  apiresult:any;
  public query:any;
  public TableCols=[];
  ActivationCode:any;
  firstnameValidator:any;
  loginForm: FormGroup;
  submitAttempt: boolean = false;
  constructor(private formBuilder: FormBuilder,public http:Http, public AioneService:AioneServicesProvider, public servicepro:AioneServicesProvider) {
    // this.ionViewWillEnter();
  }
  details(){
    return new Promise ((resolve)=>{
      
      // this.AioneService.SelectAll("users").then((userDetail:any)=>{
      //   console.log('skdjf')
      //   console.log(userDetail);
      // })
 //   console.log('dkejf');
    });
  }
  
}
