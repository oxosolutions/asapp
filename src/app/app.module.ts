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
import {SectionalQuestionsPage} from '../pages/sectional-questions/sectional-questions';
import {SurveyQuestionsPage} from '../pages/survey-questions/survey-questions';
import { ReactiveFormsModule }          from '@angular/forms';
import {SynchronizeRecordPage} from '../pages/synchronize-record/synchronize-record';
import {SurveyDetailPage} from '../pages/survey-detail/survey-detail';
import {SynchronizeSinglePage} from '../pages/synchronize-single/synchronize-single';
import {ProfilePage} from '../pages/profile/profile';
import {ProfileEditPage} from '../pages/profile-edit/profile-edit';
import {ChangePasswordPage} from '../pages/change-password/change-password';
import {SurveyPopUpPage} from '../pages/survey-pop-up/survey-pop-up';
import {UpdatePage} from '../pages/update/update';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';
import{SettingsPage} from '../pages/settings/settings';


declare var jquery:any;
declare var $ :any;

//plugin
// import { AmazingTimePickerModule } from 'amazing-time-picker'; // http://angularjs.bestjquery.com/example/date-time/
import { NgDatepickerModule } from 'ng2-datepicker';  //https://www.npmjs.com/package/ng2-datepicker
 
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
    IncompletedSurveyPage,
    SectionalQuestionsPage,
    SurveyQuestionsPage,
    SynchronizeRecordPage,
    SurveyDetailPage,
    SynchronizeSinglePage,
    ProfilePage,
    ProfileEditPage,
    ChangePasswordPage,
    SurveyPopUpPage,
    UpdatePage,
    SettingsPage,
  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    // AmazingTimePickerModule,
    NgDatepickerModule
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
    IncompletedSurveyPage,
    SectionalQuestionsPage,
    SurveyQuestionsPage,
    SynchronizeRecordPage,
    SurveyDetailPage,
    SynchronizeSinglePage,
    ProfilePage,
    ProfileEditPage,
    ChangePasswordPage,
    SurveyPopUpPage,
    UpdatePage,
    SettingsPage,
    
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
     ImageResizer,
    Camera,
    Network,
    SurveyProvider
    // Toast
  ]
})
export class AppModule {}
