import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AioneHelperProvider } from '../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../providers/aione-services/aione-services';
import { ActivationPage } from '../pages/activation/activation';
import {LoginPage} from '../pages/login/login';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
   rootPage: any
  pages: Array<{title: string, component: any}>;

  constructor(public servicesProvider:AioneServicesProvider,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
      this.initializeApp();
      this.pages = [
        { title: 'List', component: ListPage },
        { title: 'Home', component: HomePage }       
      ]; 
      let storgae=localStorage.getItem("activation");
      console.log(storgae);
      // if(localStorage.getItem("activation") != undefined){
      //   this.rootPage=LoginPage;     
      // }else{
        this.rootPage=LoginPage;     
     // }
     
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

  //database operations
 
}
