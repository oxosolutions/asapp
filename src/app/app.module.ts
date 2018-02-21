import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AioneServicesProvider } from '../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../providers/aione-helper/aione-helper';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Calendar } from '@ionic-native/calendar';
import { Device } from '@ionic-native/device';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';
import { Nav, Platform ,ToastController} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { SurveyProvider } from '../providers/survey/survey';
import { ActivationPage } from '../pages/activation/activation';
import { Geolocation } from '@ionic-native/geolocation';
import {Http,Headers ,RequestOptions } from '@angular/http';
import {LoginPage} from '../pages/login/login';
import {DashboardPage } from '../pages/dashboard/dashboard';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ActivationPage,
    LoginPage,
    DashboardPage
  ],
  //exports: [AioneServicesProvider],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ActivationPage,
    LoginPage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // HttpModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},   
    AioneServicesProvider,
    AioneHelperProvider,
    SQLite,
    Calendar,
    Device,
    Camera,
    Network,
    SurveyProvider,Geolocation
  ]
})
export class AppModule {}
