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
var LoginPage = /** @class */ (function () {
    function LoginPage(nav, AioneService, formBuilder, AioneHelp, survey, navCtrl, navParams) {
        this.nav = nav;
        this.AioneService = AioneService;
        this.formBuilder = formBuilder;
        this.AioneHelp = AioneHelp;
        this.survey = survey;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LoginPage.prototype.Login = function () {
        // this.username=this.loginUser.value.username;
        // this.password=this.loginUser.value.password;
        //  	console.log(this.username);
        //  	console.log(this.password);
        console.log('login');
        this.AioneService.check('users');
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        this.loginUser = this.formBuilder.group({
            username: ["", Validators.compose([])],
            password: ["", Validators.compose([])],
        });
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController, AioneServicesProvider, FormBuilder, AioneHelperProvider, SurveyProvider, NavController, NavParams])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map