var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SurveyProvider } from '../../providers/survey/survey';
var TextPage = /** @class */ (function () {
    // message: string = "Hola Mundo!"
    function TextPage(surveyProvider, navCtrl, navParams) {
        this.surveyProvider = surveyProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TextPage.prototype.ionViewDidLoad = function () {
        console.log("text");
        console.log(this.childMessage);
    };
    TextPage.prototype.next = function () {
        // console.log(this.data);
        // this.surveyProvider.questionsid(this.data);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextPage.prototype, "childMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextPage.prototype, "childMessageone", void 0);
    TextPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-text',
            templateUrl: 'text.html',
        }),
        __metadata("design:paramtypes", [SurveyProvider, NavController, NavParams])
    ], TextPage);
    return TextPage;
}());
export { TextPage };
//# sourceMappingURL=text.js.map