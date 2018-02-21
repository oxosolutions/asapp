var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { SQLite } from '@ionic-native/sqlite';
import { Calendar } from '@ionic-native/calendar';
import { Device } from '@ionic-native/device';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';
import { Network } from '@ionic-native/network';
import { SurveyProvider } from '../providers/survey/survey';
import { ActivationPage } from '../pages/activation/activation';
import { Geolocation } from '@ionic-native/geolocation';
import { LoginPage } from '../pages/login/login';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                ListPage,
                ActivationPage,
                LoginPage
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
                LoginPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                // HttpModule,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                AioneServicesProvider,
                AioneHelperProvider,
                SQLite,
                Calendar,
                Device,
                Camera,
                Network,
                SurveyProvider, Geolocation
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map