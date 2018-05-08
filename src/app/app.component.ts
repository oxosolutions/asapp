import { Component, ViewChild } from '@angular/core';
import { Nav, Platform , App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AioneHelperProvider } from '../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../providers/aione-services/aione-services';
import { ActivationPage } from '../pages/activation/activation';
import {LoginPage} from '../pages/login/login';
import { SurveyProvider } from '../providers/survey/survey';
import {DashboardPage } from '../pages/dashboard/dashboard';
import { LoadingController } from 'ionic-angular';
import {HelpPage} from '../pages/help/help';
import {AboutPage} from '../pages/about/about';
import { RecordListPage }  from '../pages/record-list/record-list';
import { ListsurveyPage } from '../pages/listsurvey/listsurvey';
import { TextPage }  from '../pages/text/text';
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  
  //############ Global variables #####//
  

  Api_Url='http://master.scolm.com/api/survey_api';
  ApiName='IRIS Application';
  ApiDesc='Integrated Road Traffic Injuries Surveillance System - INDIA';



  //############ End of Global variables #####//
  
  @ViewChild(Nav) nav: Nav;
  rootPage: any
  pages: Array<{title: string, icon: string, component: any}>;
  loader:any;
  db:any;  
  username:any;
  userEmail:any;
  constructor(private loaderCtrl:LoadingController,public app: App,public servicepro:AioneServicesProvider,public servicesProvider:AioneServicesProvider,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    platform.registerBackButtonAction(() => {
          platform.exitApp(); 
    });
     this.servicepro.PlatformCheck('asapp').then((db)=>{
    localStorage.setItem("api_url",this.Api_Url);
    localStorage.setItem("activation_ApiName", this.ApiName );
    localStorage.setItem("activationDesc",this.ApiDesc);

        this.pages = [
          { title: 'Home',icon: 'ios-home-outline', component: DashboardPage },
          { title: 'Enter Record',icon: 'ios-create-outline', component: ListsurveyPage},
          // { title: 'Review Record',icon: 'ios-clipboard-outline', component: RecordListPage },
          { title: 'About',icon: 'ios-easel-outline', component: AboutPage },
          { title: 'Help',icon: 'ios-flag-outline', component: HelpPage },

    ]; 
    if(localStorage.getItem("activation") != undefined && localStorage.getItem("activation") != null && localStorage.getItem('activation') != ""){
      console.log(localStorage.getItem("activation"));
      this.rootPage=LoginPage;  
      if(localStorage.getItem("username") != undefined && localStorage.getItem("username") != null && localStorage.getItem('username') != ""){
        console.log(localStorage.getItem("username"));
         this.username=localStorage.getItem("name");
        this.userEmail=localStorage.getItem("username"); 
        this.rootPage=DashboardPage;
          
      }else{
        this.rootPage=LoginPage;   
      }  
    }else{
      this.rootPage=ActivationPage;     
    }
        });   
  } 
  initializeApp() {
   
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
 
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
  presentLoading(message) {
    this.loader = this.loaderCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">`+message+`</div>
      </div>`,
    });
    this.loader.present(); 
  }
  dismissLoader(){
    this.loader.dismiss();
  }
  logout(){
    this.presentLoading("wait, you are signouting");
    localStorage.clear();
    if(localStorage.getItem("activation") == undefined){
      this.rootPage = ActivationPage;  
      this.dismissLoader();                                                 
    }   
  } 
}
