import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, NgForm, FormControl} from '@angular/forms';
import {ToastController , LoadingController} from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';

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
  constructor(public AioneHelp:AioneHelperProvider,public toastctrl:ToastController, public loaderctrl:LoadingController,public http: Http,public fb: FormBuilder,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
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
    }) 
  }
  resetPassword(username){
    this.submitAttempt = true;
    // console.log(username);
    if(!this.newPassword.valid){
        console.log('not valid');
        this.newPassword;
    }else{
      this.internet().then((wifi:any)=>{
      console.log(this.newPassword.value);
         this.submit(this.newPassword.value.Oldpassword, this.newPassword.value.newpass, this.newPassword.value.confirmpassword);    
      });
     
    }
  }
  internet(){
    return new Promise((resolve,reject)=>{
      this.AioneHelp.internet().then((connectionCheck:any)=>{
        if(connectionCheck=="connection connected"){
          resolve("connected");
        }else{
          this.AioneHelp.showAlert('Disconnected ','To reset password, we need a internet connection');
        }
      });
    })
   
  }

  submit(Oldpassword,newpass,confirmpassword,){
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
      form.append('Oldpassword',Oldpassword);
      form.append('newpass',newpass);
      form.append('confirmpassword',confirmpassword);
      console.log(form);
      loader.dismiss();
      // this.http.post("http://admin.scolm.com/api/send_complaint", form)
      // .subscribe(data => {
      //   console.log(data);
      //   this.newPassword.reset()
      //    loader.dismiss();
      //   toast.present();
      //   console.log('submitted successfully');
        
      // },error=>{
      //   console.log(error);
      // });
      // 
      // 
      // showalert(data);
      return false;

  }

}
