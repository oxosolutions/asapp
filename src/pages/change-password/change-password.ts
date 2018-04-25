import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, NgForm, FormControl} from '@angular/forms';
import {ToastController , LoadingController} from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  newPassword : FormGroup;
  result:any;
   submitAttempt: boolean = false;
  constructor(public toastctrl:ToastController, public loaderctrl:LoadingController,public http: Http,public fb: FormBuilder,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  
  dismiss(){
  	this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.result=this.navParams.get("reset");
    console.log(this.result);
  
  }
   ionViewWillEnter(){
    this.newPassword=this.fb.group({
      Oldpassword:[ null, Validators.compose([  
              Validators.required ,

        ])],
       newpass:[ null, Validators.compose([  
              Validators.required ,

        ])],
        confirmpassword:[ null, Validators.compose([  
              Validators.required ,

        ])],
       // email:[ null, Validators.compose([  
       //        Validators.required,  
       //        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
       //  ])],

    })
    
  }
  resetPassword(username){
    this.submitAttempt = true;
    console.log(username);
    if(!this.newPassword.valid){
        console.log('not valid');
        this.newPassword;
    }else{
      console.log(this.newPassword.value);
      //this.submit(this.loginUser.value.name,this.loginUser.value.email);    
    }
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
      // form.append('org_id','175');
      form.append('name',name);
      form.append('mobile',Email);
      this.http.post("http://admin.scolm.com/api/send_complaint", form)
      .subscribe(data => {
        console.log(data);
        this.newPassword.reset()
         loader.dismiss();
        toast.present();
        console.log('submitted successfully');
        
      },error=>{
        console.log(error);
      });
      // showalert(data);
      return false;

  }

}
