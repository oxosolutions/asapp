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
import { SynchronizeSinglePage } from '../../pages/synchronize-single/synchronize-single';
import { CompletedSurveyPage } from '../../pages/completed-survey/completed-survey';
import { IncompletedSurveyPage } from '../../pages/incompleted-survey/incompleted-survey';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { GroupsPage } from '../../pages/groups/groups';
import { LoadingController } from 'ionic-angular';
var SurveyDetailPage = /** @class */ (function () {
    function SurveyDetailPage(loaderCtrl, AioneHelp, toastCtrl, servicesProvider, alertCtrl, navCtrl, navParams) {
        this.loaderCtrl = loaderCtrl;
        this.AioneHelp = AioneHelp;
        this.toastCtrl = toastCtrl;
        this.servicesProvider = servicesProvider;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SurveyDetailPage.prototype.ionViewDidLoad = function () {
        this.loader = this.loaderCtrl.create({
            spinner: 'crescent',
            content: "\n      <div class=\"custom-spinner-container\">\n        <div class=\"custom-spinner-box\">" + 'Refreshing data' + "</div>\n      </div>",
        });
        this.surveyDetail = JSON.parse(localStorage.getItem("currentSurvey"));
        this.loader.dismiss();
        console.log(this.surveyDetail);
    };
    SurveyDetailPage.prototype.showConfirm = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var prompt = _this.alertCtrl.create({
                message: "Enter Your record name",
                inputs: [
                    {
                        placeholder: 'Record name'
                    },
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function (data) {
                        }
                    },
                    {
                        text: 'Save',
                        handler: function (data) {
                            if (data[0] == "") {
                                _this.AioneHelp.presentToast("Pls fill record name", 1000, 'top');
                            }
                            else {
                                console.log(data[0]);
                                localStorage.setItem("InCompleteSurveyName", data[0]);
                                resolve(data[0]);
                            }
                        }
                    }
                ]
            });
            prompt.present();
        });
    };
    SurveyDetailPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Survey is not available',
            duration: 5500,
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    };
    SurveyDetailPage.prototype.groups = function (id, message, totalQuestions) {
        var _this = this;
        this.surveyIncompleteName().then(function () {
            _this.navCtrl.setRoot(GroupsPage, { 'id': id });
        });
    };
    SurveyDetailPage.prototype.completedSurveyPage = function (id, incompleteRecord) {
        if (incompleteRecord > 0) {
            this.navCtrl.setRoot(CompletedSurveyPage, { 'id': id });
        }
        else {
            this.AioneHelp.presentToast("Sorry, there is no survey found", 900, 'top');
        }
    };
    SurveyDetailPage.prototype.incompletedSurveyPage = function (id, incompleteRecord) {
        console.log(incompleteRecord);
        if (incompleteRecord > 0) {
            this.navCtrl.setRoot(IncompletedSurveyPage, { 'id': id });
        }
        else {
            this.AioneHelp.presentToast("Sorry, there is no survey found", 900, 'top');
        }
    };
    SurveyDetailPage.prototype.surveyIncompleteName = function () {
        var _this = this;
        console.log("incomplete name");
        return new Promise(function (resolve, reject) {
            _this.showConfirm().then(function (dd) {
                resolve(dd);
            });
        });
    };
    SurveyDetailPage.prototype.syncronizePage = function () {
        this.navCtrl.setRoot(SynchronizeSinglePage);
    };
    SurveyDetailPage.prototype.incompletePage = function () {
        this.navCtrl.push(CompletedSurveyPage);
    };
    SurveyDetailPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-survey-detail',
            templateUrl: 'survey-detail.html',
        }),
        __metadata("design:paramtypes", [LoadingController, AioneHelperProvider, ToastController, AioneServicesProvider, AlertController, NavController, NavParams])
    ], SurveyDetailPage);
    return SurveyDetailPage;
}());
export { SurveyDetailPage };
//# sourceMappingURL=survey-detail.js.map