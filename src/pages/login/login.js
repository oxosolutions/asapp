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
    LoginPage.prototype.Login = function () {
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
            this.user = "'" + this.username + "'";
            this.pass = "'" + this.password + "'";
            this.AioneService.MultipleSelectWhere("users", "email", this.user, "app_password", this.pass).then(function (userDetail) {
                _this.loginUser.reset();
                _this.loader.dismiss();
                if (userDetail.rows.length >= 1) {
                    _this.navCtrl.setRoot(DashboardPage);
                    localStorage.setItem("username", _this.user);
                }
                else {
                    _this.AioneHelp.showAlert("Error", "Wrong Credentials");
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