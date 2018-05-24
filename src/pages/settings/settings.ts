import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams){
  }
  ionViewDidLoad() {
    // for(let i=5; i>1; i--){
    //   let data=[]
    //   for(let j=0; j<i; j++){
    //     data.push("*");
    //   }
    //   console.log(data.join(" "));
    // }
    // let array=[1,2,3,4,5,7,8,10,30,15,19,100];
    // array.forEach((key,value)=>{
    //   console.log(key);
    //   for(let i=1; i<=10; i++){
    //   console.log(key+"*"+i+"="+2*i);
    //   }
    // })
    // 
    // 
    //  let a:any="i m a";
    // let b:any="i m b";
    // let c:any;
    // // c=a;
    // // a=b
    // // b=c;
    // [a,b,c]=[c,a,b]=[b,a,c];
    // console.log(a);
    // console.log(b);
    // 
    // 
    // let a:any="i m a";
    // let b:any="i m ";
    // [a,b]=[b,a];
    // console.log(a);
    // console.log(b);
    // 
    // 
    
   // let a=769;
   // let b=876;
   // a=a+b;
   // b=a-b;
   // a=a-b;
   // console.log(a);
   // console.log(b);
   // finger curl, pen rotate, coin drop
   
    // let fact=4;
    // let answer=1;
    // for(let i=4; i >= 1; i--){
    //   answer=answer*i;
    //   console.log(answer)
    //   console.log(answer)
    // }
   
    
  }
}