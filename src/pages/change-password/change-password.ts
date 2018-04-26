import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, NgForm, FormControl} from '@angular/forms';
import {ToastController , LoadingController} from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';

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
  constructor(public AioneHelp:AioneHelperProvider,public servicesProvider : AioneServicesProvider,public toastctrl:ToastController, public loaderctrl:LoadingController,public http: Http,public fb: FormBuilder,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  
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
    if(!this.newPassword.valid){
        console.log('not valid');
        this.newPassword;
    }else{
      this.internet(this.newPassword.value.Oldpassword, this.newPassword.value.newpass, this.newPassword.value.confirmpassword).then((wifi:any)=>{
      console.log(this.newPassword.value);
         this.submit(this.newPassword.value.Oldpassword, this.newPassword.value.newpass, this.newPassword.value.confirmpassword);    
      }); 
    }
  }
  internet(Oldpassword,newpass,confirmpassword){
    return new Promise((resolve,reject)=>{
      this.AioneHelp.internet().then((connectionCheck:any)=>{
        if(connectionCheck=="connection connected"){
           this.servicesProvider.SelectWhere("users","app_password","'"+Oldpassword+"'").then((old:any)=>{
              console.log(old.rows);
              console.log(old.rows.length);
              console.log(old.rows.item.length);

              //here is problm with item for mobiles
              
              if(old.rows.length > 0){
                if(newpass === confirmpassword){
                  resolve("condition checked");
                }else{
                 this.AioneHelp.showAlert("Wrong !!", "Entered New and Confirm password does't match");
                }
              }else{
                console.log("wrong old password");
                this.AioneHelp.showAlert("Wrong !!", "You Entered a wrong password");
              }
           })
          //resolve("connected");
        }
      });
    })
   
  }

  submit(Oldpassword,newpass,confirmpassword){
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
      form.append('Oldpassword',Oldpassword);
      form.append('newpass',newpass);
      form.append('confirmpassword',confirmpassword);
      console.log(form);
      loader.dismiss();
      // this.http.post("http://admin.scolm.com/api/", form)
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
