import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, NgForm, FormControl} from '@angular/forms';
import {ToastController , LoadingController} from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';

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
           this.servicesProvider.MultipleSelectWhere("users","app_password","'"+Oldpassword+"'","email","'"+localStorage.getItem("username")+"'").then((old:any)=>{
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
 
      let form = new FormData();
      form.append('old_password',Oldpassword);
      form.append('new_password',newpass);
     
       form.append('activation_code',localStorage.getItem('activationKey'));
      form.append("user_id",localStorage.getItem("userId"));
      console.log(form);
      this.http.post("http://master.scolm.com/api/v2/update/password", form)
      .subscribe(data => {
        let error1=data.json();
        console.log(error1);
        if(error1["status"]=="error"){
           this.AioneHelp.presentToast(error1["message"], 700, 'top');
            loader.dismiss();
        }else{ console.log( newpass);
            let query="update users SET app_password = ' "+  newpass + "' where id = "+ localStorage.getItem("userId");
            console.log(query);
            this.servicesProvider.ExecuteRun(query,[]).then((users:any)=>{
              console.log(users);
              this.AioneHelp.presentToast("Password Updated Successfully", 700, 'top');
              this.newPassword.reset()
              loader.dismiss();
            });
        }
      },error=>{
        let error1=error.json();
        console.log(error1["message"]);
        this.AioneHelp.presentToast(error1["message"],900,'top');
      });
      
      // showalert(data);
      return false;

  }

}
