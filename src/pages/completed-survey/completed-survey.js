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
/**
 * Generated class for the CompletedSurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CompletedSurveyPage = /** @class */ (function () {
    function CompletedSurveyPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CompletedSurveyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CompletedSurveyPage');
    };
    CompletedSurveyPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-completed-survey',
            templateUrl: 'completed-survey.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], CompletedSurveyPage);
    return CompletedSurveyPage;
}());
export { CompletedSurveyPage };
//# sourceMappingURL=completed-survey.js.map