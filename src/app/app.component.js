var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AioneServicesProvider } from '../providers/aione-services/aione-services';
import { ActivationPage } from '../pages/activation/activation';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoadingController } from 'ionic-angular';
import { HelpPage } from '../pages/help/help';
import { AboutPage } from '../pages/about/about';
import { RecordListPage } from '../pages/record-list/record-list';
import { ListsurveyPage } from '../pages/listsurvey/listsurvey';
var MyApp = /** @class */ (function () {
    function MyApp(loaderCtrl, app, servicepro, servicesProvider, platform, statusBar, splashScreen) {
        this.loaderCtrl = loaderCtrl;
        this.app = app;
        this.servicepro = servicepro;
        this.servicesProvider = servicesProvider;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.initializeApp();
        this.pages = [
            { title: 'Home', icon: 'ios-home-outline', component: DashboardPage },
            { title: 'Enter Record', icon: 'ios-create-outline', component: ListsurveyPage },
            { title: 'Review Record', icon: 'ios-clipboard-outline', component: RecordListPage },
            { title: 'About', icon: 'ios-easel-outline', component: AboutPage },
            { title: 'Help', icon: 'ios-flag-outline', component: HelpPage },
        ];
        if (localStorage.getItem("activation") != undefined) {
            this.rootPage = LoginPage;
            if (localStorage.getItem("username") != undefined) {
                this.rootPage = DashboardPage;
            }
            else {
                this.rootPage = LoginPage;
            }
        }
        else {
            this.rootPage = ActivationPage;
        }
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.servicepro.PlatformCheck('asapp').then(function (db) {
            _this.platform.ready().then(function () {
                _this.statusBar.styleDefault();
                _this.splashScreen.hide();
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.presentLoading = function (message) {
        this.loader = this.loaderCtrl.create({
            spinner: 'crescent',
            content: "\n      <div class=\"custom-spinner-container\">\n        <div class=\"custom-spinner-box\">" + message + "</div>\n      </div>",
        });
        this.loader.present();
    };
    MyApp.prototype.dismissLoader = function () {
        this.loader.dismiss();
    };
    MyApp.prototype.logout = function () {
        this.presentLoading("log out");
        localStorage.removeItem("activation");
        localStorage.removeItem("username");
        if (localStorage.getItem("activation") == undefined) {
            this.rootPage = ActivationPage;
            this.dismissLoader();
        }
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html',
        }),
        __metadata("design:paramtypes", [LoadingController, App, AioneServicesProvider, AioneServicesProvider, Platform, StatusBar, SplashScreen])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map