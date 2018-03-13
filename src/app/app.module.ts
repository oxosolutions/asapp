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
import { Http,Headers ,RequestOptions } from '@angular/http';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { HelpPage} from '../pages/help/help';
import { AboutPage } from '../pages/about/about';
import { ListsurveyPage } from '../pages/listsurvey/listsurvey';
import { GroupsPage } from '../pages/groups/groups';
import { QuestionPage } from '../pages/question/question';
import { RecordListPage }  from '../pages/record-list/record-list';
import { TextPage }  from '../pages/text/text';
import { SelectPage } from '../pages/select/select';
import { CompletedSurveyPage } from '../pages/completed-survey/completed-survey';
import { IncompletedSurveyPage } from '../pages/incompleted-survey/incompleted-survey';
//import { MyDatePickerModule } from 'mydatepicker';

 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ActivationPage,
    LoginPage,
    DashboardPage,
    HelpPage,
    AboutPage,
    ListsurveyPage,
    GroupsPage,
    QuestionPage,
    RecordListPage,
    TextPage,
    SelectPage,
    CompletedSurveyPage,
    IncompletedSurveyPage
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    //MyDatePickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ActivationPage,
    LoginPage,
    DashboardPage,
    HelpPage,
    AboutPage,
    ListsurveyPage,
    GroupsPage,
    QuestionPage,
    RecordListPage,
    TextPage,
    SelectPage,
     CompletedSurveyPage,
    IncompletedSurveyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},   
    AioneServicesProvider,
    AioneHelperProvider,
    SQLite,
    Calendar,
    Device,
    Camera,
    Network,
    SurveyProvider,Geolocation,
    // Toast
  ]
})
export class AppModule {}
