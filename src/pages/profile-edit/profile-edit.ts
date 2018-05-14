import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {ProfilePage} from '../../pages/profile/profile';
import {Validators, FormBuilder, FormGroup, NgForm, FormControl} from '@angular/forms';
import {ToastController , LoadingController} from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';

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
              Validators.required,
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
    if(username["name"] == "" || username["email"]==""){
      if(!this.loginUser.valid){
        console.log('not valid');
        this.loginUser;
      }
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
       let form = {};
      form["name"] = name;
      form["email"] = Email;
      form["activation_code"] = localStorage.getItem('activationKey');
      form["user_id"] = localStorage.getItem("userId");
      console.log(form);
      this.http.post("http://master.scolm.com/api/v2/update/profile", form)
        .subscribe(data => {
          console.log(data);
           // this.loginUser.reset();
          let query="update users SET email = ' "+ Email + " ', name = '" + name + "' where id = "+ localStorage.getItem("userId");
          this.servicesProvider.ExecuteRun(query,[]).then((users:any)=>{
            console.log(users);
            this.AioneHelp.presentToast("your profile updated successfully", 500, 'top');
            loader.dismiss();
          })
      },error=>{
        let error1=error.json();
        console.log(error1["message"]);
        this.AioneHelp.presentToast(error1["message"],900,'top');
        loader.dismiss();
      });

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
 
}
