import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {ProfilePage} from '../../pages/profile/profile';
import {Validators, FormBuilder, FormGroup, NgForm, FormControl} from '@angular/forms';
import {ToastController , LoadingController} from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
  loginUser : FormGroup;
  result:any;
   submitAttempt: boolean = false;
  constructor(public AioneHelp:AioneHelperProvider,public servicesProvider : AioneServicesProvider, public toastctrl:ToastController, public loaderctrl:LoadingController,public http: Http,public fb: FormBuilder,public viewCtrl: ViewController
, public navCtrl: NavController, public navParams: NavParams) {
  	
  }

  ionViewDidLoad() {
    this.result=this.navParams.get("userId");
    console.log(this.result);
  }
  ionViewWillEnter(){
    this.loginUser=this.fb.group({
      name:[ null, Validators.compose([  
              Validators.required ,

        ])],
       email:[ null, Validators.compose([  
              Validators.required,  
              Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],

    })
    
  }
  Login(username){
    this.submitAttempt = true;
    console.log(username);
    if(!this.loginUser.valid){
        console.log('not valid');
        this.loginUser;
    }else{
      this.internet().then((wifi:any)=>{
       console.log(this.loginUser.value);
        this.submit(this.loginUser.value.name,this.loginUser.value.email); 
      }); 
    }
  }

  internet(){
    return new Promise((resolve,reject)=>{
      this.AioneHelp.internet().then((connectionCheck:any)=>{
        if(connectionCheck=="connection connected"){
            resolve("condition checked");
          //resolve("connected");
        }
      });
    })
   
  }

  submit(name,Email){
    let loader =this.loaderctrl.create({
      content:'<div class="custom-spinner-container"><div class="custom-spinner-box"></div>Submitting your Enquiry</div>',
    });
      loader.present();
      let toast=this.toastctrl.create({
        message:'Your Enquiry is Submitted',
        duration:4000,
        position:'top',
      });
      let form = new FormData();
      form.append('name',name);
      form.append('Email',Email);
      console.log(form);
      loader.dismiss();
      // this.http.post("http://admin.scolm.com/api/send_complaint", form)
      // .subscribe(data => {
      //   console.log(data);
      //   this.loginUser.reset()
      //    loader.dismiss();
      //   toast.present();
      //   console.log('submitted successfully');
        
      // },error=>{
      //   console.log(error);
      // });
      // 
      // showalert(data);
      return false;

  }
  dismiss() {
    
    this.viewCtrl.dismiss();
  }
 
}
