import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivationPage } from '../../pages/activation/activation';
import {Validators, FormBuilder, FormGroup,NgForm,FormControl} from '@angular/forms';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { SurveyProvider } from '../../providers/survey/survey';
import { LoadingController } from 'ionic-angular';
import {DashboardPage } from '../../pages/dashboard/dashboard';
import { ToastController } from 'ionic-angular';
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
  constructor(public toastCtrl: ToastController,private loaderCtrl:LoadingController,public nav:NavController, public AioneService:AioneServicesProvider, private formBuilder: FormBuilder,public AioneHelp:AioneHelperProvider,public survey:SurveyProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  Login(loginUser,username,password){
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
     
  	let name:string;
  	this.username=this.loginUser.value.username;
  	this.password=this.loginUser.value.password;
    console.log(this.username);
    	this.AioneService.MultipleSelectWhere("users","email","'"+this.username+"'", "app_password" ,"'"+this.password+"'").then((userDetail:any)=>{
  			this.loader.dismiss();
    		if(userDetail.rows.length >= 1){
          localStorage.setItem("name", userDetail.rows.item(0).name);
          localStorage.setItem("userId", userDetail.rows.item(0).id);
          console.log("user valid");
    			this.navCtrl.setRoot(DashboardPage);
          console.log(this.username);
    			localStorage.setItem("username", this.username);
    		}else{
          console.log("not valid");
          this.loginUser.reset();
    			this.presentToast();
    		}
    	});
    }
  }
  presentToast(){
    let toast = this.toastCtrl.create({
      message: 'Wrong Credentials',
      duration: 2000,
      position:"top",
      showCloseButton:true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
  ionViewWillEnter(){
  	this.loginUser=this.formBuilder.group({
  		username:["",Validators.compose([  
  						Validators.required,	
  			])],
			password:["",Validators.compose([		
			Validators.required,				
  			])],

  	});
  }

}
