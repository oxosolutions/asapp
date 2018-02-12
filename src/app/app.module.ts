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
import { HTTP } from '@ionic-native/http';
import { Calendar } from '@ionic-native/calendar';
import { Device } from '@ionic-native/device';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { HttpModule } from '@angular/http';

import { Nav, Platform ,ToastController} from 'ionic-angular';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  //exports: [AioneServicesProvider],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

     //HttpModule, 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},   
    AioneServicesProvider,
    AioneHelperProvider,
    SQLite,
    HTTP,
    Calendar,
    Device,
    Camera
  ]
})
export class AppModule {}
