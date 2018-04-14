var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { SurveyProvider } from '../../providers/survey/survey';
import { LoadingController } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
var LoginPage = /** @class */ (function () {
    function LoginPage(loaderCtrl, nav, AioneService, formBuilder, AioneHelp, survey, navCtrl, navParams) {
        this.loaderCtrl = loaderCtrl;
        this.nav = nav;
        this.AioneService = AioneService;
        this.formBuilder = formBuilder;
        this.AioneHelp = AioneHelp;
        this.survey = survey;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LoginPage.prototype.Login = function (loginUser, username, password) {
        var _this = this;
        this.loader = this.loaderCtrl.create({
            spinner: 'crescent',
            content: "\n      <div class=\"custom-spinner-container\">\n        <div class=\"custom-spinner-box\">" + 'Verifying Your Details' + "</div>\n      </div>",
        });
        this.loader.present();
        if (this.loginUser.invalid) {
            this.loginUser;
            this.loader.dismiss();
        }
        else {
            var name_1;
            this.username = this.loginUser.value.username;
            this.password = this.loginUser.value.password;
            console.log(this.username);
            // this.user="'"+this.username+"'";
            //  console.log(this.user);
            // this.pass="'"+this.password+"'";
            this.AioneService.MultipleSelectWhere("users", "email", "'" + this.username + "'", "app_password", "'" + this.password + "'").then(function (userDetail) {
                console.log(userDetail);
                /// etho tak sahi h  
                console.log(_this.username);
                _this.loader.dismiss();
                if (userDetail.rows.item.length >= 1) {
                    console.log("user valid");
                    _this.navCtrl.setRoot(DashboardPage);
                    console.log(_this.username);
                    localStorage.setItem("username", _this.username);
                }
                else {
                    console.log("not valid");
                    localStorage.setItem("username", undefined);
                    _this.loginUser.reset();
                    _this.AioneHelp.presentToast("Wrong Credentials", 10000, top);
                }
            });
        }
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        this.loginUser = this.formBuilder.group({
            username: ["", Validators.compose([
                    Validators.required,
                ])],
            password: ["", Validators.compose([
                    Validators.required,
                ])],
        });
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [LoadingController, NavController, AioneServicesProvider, FormBuilder, AioneHelperProvider, SurveyProvider, NavController, NavParams])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map