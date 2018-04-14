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
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { GroupsPage } from '../../pages/groups/groups';
import { PopoverController } from 'ionic-angular';
import { CompletedSurveyPage } from '../../pages/completed-survey/completed-survey';
import { IncompletedSurveyPage } from '../../pages/incompleted-survey/incompleted-survey';
var RecordListPage = /** @class */ (function () {
    function RecordListPage(servicesProvider, navCtrl, navParams, popoverCtrl) {
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.listSurvey = [];
        this.test = 'false';
    }
    RecordListPage.prototype.ionViewDidLoad = function () {
        this.recordTitle = localStorage.getItem("ApplicationName");
        this.EnabledSurvey();
    };
    RecordListPage.prototype.EnabledSurvey = function () {
        var _this = this;
        var questionId;
        var questionData;
        var metaSurvey = [];
        var SurveySelect = [];
        return new Promise(function (resolve, reject) {
            var query = 'Select * from survey_meta where key = "enable_survey" AND value = 1';
            _this.servicesProvider.ExecuteRun(query, []).then(function (survey_meta) {
                metaSurvey.push(survey_meta.rows);
                if (survey_meta.rows.length > 0) {
                    var forloop_1 = 0;
                    metaSurvey.forEach(function (value, key) {
                        var content = [];
                        var _loop_1 = function (i) {
                            _this.servicesProvider.SelectWhere("surveys", "id", value.item(i).form_id).then(function (survey) {
                                _this.totalQuestion(value.item(i).form_id).then(function (question) {
                                    var rowsData = survey.rows.item(0);
                                    rowsData["questions"] = question;
                                    content.push(rowsData);
                                });
                            });
                            if (content != undefined) {
                                SurveySelect.push(content);
                                forloop_1++;
                                if (forloop_1 == survey_meta.rows.item.length) {
                                    _this.listSurvey = SurveySelect;
                                    console.log(_this.listSurvey);
                                }
                            }
                        };
                        //value.length;
                        for (var i = 0; i < value.length; i++) {
                            _loop_1(i);
                        }
                    });
                }
                else {
                    _this.nullSurvey = "there is no survey";
                    console.log(_this.nullSurvey);
                }
            });
        });
    };
    RecordListPage.prototype.totalQuestion = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.servicesProvider.SelectWhere("questions", "survey_id", id).then(function (questions) {
                _this.servicesProvider.mobileListArray(questions).then(function (SurveyData) {
                    resolve(SurveyData.length);
                });
            });
        });
    };
    RecordListPage.prototype.presentPopover = function () {
        var popover = this.popoverCtrl.create(GroupsPage);
        popover.present();
    };
    RecordListPage.prototype.checkSurvey = function (id) {
        var _this = this;
        console.log(id);
        return new Promise(function (resolve, reject) {
            var tablename = "surveyResult_" + id;
            _this.servicesProvider.SelectAll(tablename).then(function (result) {
                _this.servicesProvider.mobileListArray(result).then(function (resultParse) {
                    if (resultParse.length > 0) {
                        resolve(resultParse);
                    }
                    else {
                        console.log("no record found");
                        _this.EmptySurvey = null;
                    }
                });
            });
        });
    };
    RecordListPage.prototype.completedSurveyPage = function (id) {
        var _this = this;
        this.checkSurvey(id).then(function (result) {
            // result.forEach((key,value,)=>{
            _this.navCtrl.push(CompletedSurveyPage, { 'result': result });
            // })
        });
    };
    RecordListPage.prototype.incompletedSurveyPage = function (id) {
        var _this = this;
        this.checkSurvey(id).then(function (result) {
            _this.navCtrl.push(IncompletedSurveyPage, { 'result': result });
        });
    };
    RecordListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-record-list',
            templateUrl: 'record-list.html',
        }),
        __metadata("design:paramtypes", [AioneServicesProvider, NavController, NavParams, PopoverController])
    ], RecordListPage);
    return RecordListPage;
}());
export { RecordListPage };
//# sourceMappingURL=record-list.js.map