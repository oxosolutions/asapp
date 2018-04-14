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
import { QuestionPage } from '../../pages/question/question';
import { GroupsPage } from '../../pages/groups/groups';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { LoadingController } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { SurveyDetailPage } from '../../pages/survey-detail/survey-detail';
var IncompletedSurveyPage = /** @class */ (function () {
    function IncompletedSurveyPage(viewCtrl, AioneHelp, loaderCtrl, navCtrl, servicesProvider, navParams) {
        this.viewCtrl = viewCtrl;
        this.AioneHelp = AioneHelp;
        this.loaderCtrl = loaderCtrl;
        this.navCtrl = navCtrl;
        this.servicesProvider = servicesProvider;
        this.navParams = navParams;
    }
    IncompletedSurveyPage.prototype.ionViewDidLoad = function () {
        console.log(this.navParams.get('id'));
        //this.survey=this.navParams.get('result');
        // let data = this.survey.filter((element, index) =>{
        // 	return (element.survey_status == 'incomplete');
        // });
        this.checkSurvey();
    };
    IncompletedSurveyPage.prototype.backToDetails = function () {
        this.navCtrl.setRoot(SurveyDetailPage);
    };
    IncompletedSurveyPage.prototype.checkSurvey = function () {
        var _this = this;
        console.log(this.navParams.get('id'));
        return new Promise(function (resolve, reject) {
            _this.loader = _this.loaderCtrl.create({
                spinner: 'crescent',
                content: "\n      <div class=\"custom-spinner-container\">\n        <div class=\"custom-spinner-box\">" + 'Refreshing data' + "</div>\n      </div>",
            });
            _this.loader.present();
            var tablename = "surveyResult_" + _this.navParams.get('id');
            _this.servicesProvider.SelectWhere(tablename, "survey_status", "'incomplete'").then(function (result) {
                _this.servicesProvider.mobileListArray(result).then(function (resultParse) {
                    _this.checkSurveyDetail(resultParse.length).then(function (sur) {
                        console.log(resultParse.length);
                        if (resultParse.length > 0) {
                            _this.incomplete = resultParse;
                            _this.loader.dismiss();
                            console.log(_this.incomplete);
                        }
                        else {
                            _this.incomplete = resultParse;
                            console.log("no record found");
                            _this.navCtrl.setRoot(SurveyDetailPage);
                            _this.loader.dismiss();
                            _this.AioneHelp.presentToast("Sorry, there is no incompleted survey found", 10000, 'top');
                            _this.EmptySurvey = null;
                        }
                    });
                });
            });
        });
    };
    IncompletedSurveyPage.prototype.resume = function (record) {
        var _this = this;
        console.log(record);
        console.log(record.survey_status);
        localStorage.setItem("totalQuestion", record.totalQuestions);
        localStorage.setItem("completedGroups", record.completed_groups);
        localStorage.setItem("record_id", record.serialNo);
        localStorage.setItem("Groupid", record.last_group_id);
        localStorage.setItem("questionIndex", record.questionIndex);
        this.groupCompleteCheck(record).then(function () {
            // console.log(  record.last_fieldId);
            record.last_fieldId++;
            record.filledQuestions++;
            // console.log(  record.last_fieldId);
            localStorage.setItem("fillingQuestion", record.filledQuestions);
            localStorage.setItem("lastquestionIndex", record.last_fieldId.toString());
            _this.navCtrl.setRoot(QuestionPage, { 'id': record.last_group_id, 'InCompleteStatus': "incompleteSurvey" });
        });
    };
    IncompletedSurveyPage.prototype.groupCompleteCheck = function (record) {
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
    IncompletedSurveyPage.prototype.deleteDetails = function (id) {
        var _this = this;
        console.log(id);
        var query = 'Delete  from surveyResult_' + localStorage.getItem("Surveyid") + " where serialNo=" + id;
        console.log(query);
        this.servicesProvider.ExecuteRun(query, []).then(function (del) {
            _this.checkSurvey();
        });
    };
    IncompletedSurveyPage.prototype.checkSurveyDetail = function (totalNo) {
        return new Promise(function (resolve, reject) {
            console.log(totalNo);
            console.log(totalNo);
            var data = JSON.parse(localStorage.getItem("currentSurvey"));
            console.log(data["incompleted"]);
            data["incompleted"] = totalNo;
            console.log(data);
            localStorage.setItem("currentSurvey", JSON.stringify(data));
            resolve("data");
        });
    };
    IncompletedSurveyPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-incompleted-survey',
            templateUrl: 'incompleted-survey.html',
        }),
        __metadata("design:paramtypes", [ViewController, AioneHelperProvider, LoadingController, NavController, AioneServicesProvider, NavParams])
    ], IncompletedSurveyPage);
    return IncompletedSurveyPage;
}());
export { IncompletedSurveyPage };
//# sourceMappingURL=incompleted-survey.js.map