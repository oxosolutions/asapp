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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GroupsPage } from '../../pages/groups/groups';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { LoadingController } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { SurveyDetailPage } from '../../pages/survey-detail/survey-detail';
var CompletedSurveyPage = /** @class */ (function () {
    function CompletedSurveyPage(viewCtrl, servicesProvider, AioneHelp, loaderCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.servicesProvider = servicesProvider;
        this.AioneHelp = AioneHelp;
        this.loaderCtrl = loaderCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CompletedSurveyPage.prototype.ionViewDidLoad = function () {
        // this.survey=this.navParams.get('result');
        // let data = this.survey.filter((element, index) =>{
        // 		return (element.survey_status == 'completed');
        // });
        // this.complete=data;
        // console.log(this.complete);
        this.checkSurvey();
    };
    CompletedSurveyPage.prototype.backToDetails = function () {
        this.navCtrl.setRoot(SurveyDetailPage);
    };
    CompletedSurveyPage.prototype.checkSurvey = function () {
        var _this = this;
        console.log(this.navParams.get('id'));
        return new Promise(function (resolve, reject) {
            _this.loader = _this.loaderCtrl.create({
                spinner: 'crescent',
                content: "\n      <div class=\"custom-spinner-container\">\n        <div class=\"custom-spinner-box\">" + 'Refreshing data' + "</div>\n      </div>",
            });
            _this.loader.present();
            var tablename = "surveyResult_" + _this.navParams.get('id');
            _this.servicesProvider.SelectWhere(tablename, "survey_status", "'completed'").then(function (result) {
                _this.servicesProvider.mobileListArray(result).then(function (resultParse) {
                    _this.checkSurveyDetail(resultParse.length).then(function (sur) {
                        console.log(resultParse);
                        if (resultParse.length > 0) {
                            _this.complete = resultParse;
                            _this.loader.dismiss();
                            console.log(_this.complete);
                        }
                        else {
                            _this.complete = resultParse;
                            console.log("no record found");
                            _this.navCtrl.setRoot(SurveyDetailPage);
                            _this.loader.dismiss();
                            _this.AioneHelp.presentToast("Sorry, there is no completed survey found", 15000, 'top');
                            _this.EmptySurvey = null;
                        }
                    });
                });
            });
        });
    };
    CompletedSurveyPage.prototype.deleteDetails = function (id) {
        var _this = this;
        console.log(id);
        var query = 'Delete  from surveyResult_' + localStorage.getItem("Surveyid") + " where serialNo=" + id;
        console.log(query);
        this.servicesProvider.ExecuteRun(query, []).then(function (del) {
            _this.checkSurvey();
        });
    };
    CompletedSurveyPage.prototype.resume = function (record) {
        // console.log(record);
        // console.log(record.survey_status);
        // record.filledQuestions++;
        localStorage.setItem("totalQuestion", record.totalQuestions);
        // localStorage.setItem("fillingQuestion", record.filledQuestions);
        localStorage.setItem("completedGroups", record.completed_groups);
        localStorage.setItem("record_id", record.serialNo);
        localStorage.setItem("Groupid", record.last_group_id);
        localStorage.setItem("questionIndex", record.questionIndex);
        // this.groupCompleteCheck(record).then(()=>{
        // console.log(  record.last_fieldId);
        //record.last_fieldId++;
        // console.log(  record.last_fieldId);
        localStorage.setItem("lastquestionIndex", record.last_fieldId);
        this.navCtrl.setRoot(GroupsPage, { 'completed': "surveyCompleted" });
        //})
    };
    CompletedSurveyPage.prototype.groupCompleteCheck = function (record) {
        var _this = this;
        return new Promise(function (resolve, rejeect) {
            if (record.completed_groups != "null") {
                // console.log(  record.last_fieldId);
                // console.log("groupo null");
                if (record.last_fieldId == null) {
                    // console.log("go to groupss");
                    _this.navCtrl.setRoot(GroupsPage);
                }
                else {
                    resolve("data");
                }
            }
            else {
                resolve("data");
            }
        });
    };
    CompletedSurveyPage.prototype.checkSurveyDetail = function (totalNo) {
        return new Promise(function (resolve, reject) {
            var data = JSON.parse(localStorage.getItem("currentSurvey"));
            data["completed"] = totalNo;
            console.log(data);
            localStorage.setItem("currentSurvey", JSON.stringify(data));
            resolve("data");
        });
    };
    CompletedSurveyPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-completed-survey',
            templateUrl: 'completed-survey.html',
        }),
        __metadata("design:paramtypes", [ViewController, AioneServicesProvider, AioneHelperProvider, LoadingController, NavController, NavParams])
    ], CompletedSurveyPage);
    return CompletedSurveyPage;
}());
export { CompletedSurveyPage };
//# sourceMappingURL=completed-survey.js.map