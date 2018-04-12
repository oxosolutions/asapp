import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivationPage } from '../../pages/activation/activation';
import {Validators, FormBuilder, FormGroup,NgForm,FormControl} from '@angular/forms';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { SurveyProvider } from '../../providers/survey/survey';
import { LoadingController } from 'ionic-angular';
import {DashboardPage } from '../../pages/dashboard/dashboard';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loginUser : FormGroup;
	username:string;
	password:string;
	pass:any
	user:any;
	loader:any;
  constructor(private loaderCtrl:LoadingController,public nav:NavController, public AioneService:AioneServicesProvider, private formBuilder: FormBuilder,public AioneHelp:AioneHelperProvider,public survey:SurveyProvider,public navCtrl: NavController, public navParams: NavParams) {

  }
  Login(loginUser,username,password) {

  	this.loader = this.loaderCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">`+'Verifying Your Details'+`</div>
      </div>`,
    });
    this.loader.present(); 
  	if(this.loginUser.invalid){
  		this.loginUser;
  		this.loader.dismiss();
  	}else{
         console.log(this.loginUser.value);

   
  	let name:string;
 
  	this.username=this.loginUser.value.username;
  	this.password=this.loginUser.value.password;
    console.log(this.username);
 		this.user="'"+this.username+"'";
    console.log(this.user);
 		this.pass="'"+this.password+"'";
    	this.AioneService.MultipleSelectWhere("users","email", this.user, "app_password" ,this.pass).then((userDetail:any)=>{
        console.log(userDetail);
        /// etho tak sahi h  
         console.log(this.user);
  			this.loginUser.reset();
  			this.loader.dismiss();
    		if(userDetail.rows.item.length >= 1){
    			this.navCtrl.setRoot(DashboardPage);
          console.log(this.user);
    			localStorage.setItem("username", this.username);
    		}else{
    			this.AioneHelp.showAlert("Error","Wrong Credentials");
    		}
    	});
    }
  }
  ionViewWillEnter(){
  	this.loginUser=this.formBuilder.group({
  		username:["",Validators.compose([  
  						Validators.required,	
  			])],
			password:["",Validators.compose([		
			Validators.required,				
  			])],

  	})
  	
  }

}
