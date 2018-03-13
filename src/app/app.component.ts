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

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any
  pages: Array<{title: string, icon: string, component: any}>;
  loader:any;
  db:any;  
  constructor(private loaderCtrl:LoadingController,public app: App,public servicepro:AioneServicesProvider,public servicesProvider:AioneServicesProvider,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
        this.pages = [
          { title: 'Home',icon: 'ios-home-outline', component: DashboardPage },
          { title: 'Enter Record',icon: 'ios-home-outline', component: ListsurveyPage},
          { title: 'Review Record',icon: 'ios-home-outline', component: RecordListPage },
          { title: 'About',icon: 'ios-home-outline', component: AboutPage },
          { title: 'Help',icon: 'ios-home-outline', component: HelpPage },

    ]; 
    if(localStorage.getItem("activation") != undefined){
      this.rootPage=LoginPage;  
      if(localStorage.getItem("username") != undefined){
        this.rootPage=DashboardPage;   
      }else{
        this.rootPage=LoginPage;   
      }  
    }else{
      this.rootPage=ActivationPage;     
    }
  } 
  initializeApp() {
    this.servicepro.PlatformCheck('asapp').then((db)=>{
    this.platform.ready().then(() => {
         this.statusBar.styleDefault();
         this.splashScreen.hide();
    });
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
    this.presentLoading("log out");
    localStorage.removeItem("activation");
    localStorage.removeItem("username");
    if(localStorage.getItem("activation") == undefined){
      this.rootPage = ActivationPage;  
      this.dismissLoader();                                                 
    }   
  } 
}
