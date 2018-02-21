import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivationPage } from '../../pages/activation/activation';
import {Validators, FormBuilder, FormGroup,NgForm,FormControl} from '@angular/forms';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { SurveyProvider } from '../../providers/survey/survey';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loginUser : FormGroup;
	username:any;
	password:any;
  constructor(public nav:NavController, public AioneService:AioneServicesProvider, private formBuilder: FormBuilder,public AioneHelp:AioneHelperProvider,public survey:SurveyProvider,public navCtrl: NavController, public navParams: NavParams) {

  }
  Login() {
  	// this.username=this.loginUser.value.username;
  	// this.password=this.loginUser.value.password;
   //  	console.log(this.username);
   //  	console.log(this.password);

    	console.log('login');
    	this.AioneService.check('users');
  }
  ionViewWillEnter(){
  	
  	this.loginUser=this.formBuilder.group({
  		username:["",Validators.compose([  						
  			])],
			password:["",Validators.compose([					
  			])],

  	})
  }

}
