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
var ListsurveyPage = /** @class */ (function () {
    function ListsurveyPage(servicesProvider, navCtrl, navParams) {
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.listSurvey = [];
        this.questionLength = [];
    }
    ListsurveyPage.prototype.groups = function (id) {
        this.navCtrl.setRoot(GroupsPage, { 'id': id });
    };
    ListsurveyPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var questionId;
        var questionData;
        this.surveyTitle = localStorage.getItem("ApplicationName");
        this.servicesProvider.SelectAll("surveys").then(function (survey) {
            _this.listSurvey.push(survey.rows);
            _this.data = "SELECT  questions.question_key,surveys.* FROM surveys LEFT JOIN questions ON surveys.id = questions.survey_id";
            _this.servicesProvider.ExecuteRun(_this.data, []).then(function (SelResult) {
                _this.questionLength.push(SelResult.rows);
                // let listdata=[];
                // listdata=this.listSurvey[0];
                // console.log(listdata);
                _this.listSurvey.forEach(function (key, value) {
                    _this.questionLength.forEach(function (keys, values) {
                        Object.keys(key).forEach(function (svalue, skey) {
                            // Object.keys(keys).forEach(function(qvalue,qkey){
                            // 	console.log(keys[qvalue]);		    				
                            // });
                            questionData = key[svalue].id;
                            //console.log(questionData);		    				
                        });
                        var query = 'select COUNT(*)  from questions where survey_id = ' + questionData;
                        _this.servicesProvider.ExecuteRun(_this.data, []).then(function (jj) {
                            //console.log(jj);
                        });
                    });
                });
            });
            //console.log(this.questionLength);
        });
    };
    ListsurveyPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-listsurvey',
            templateUrl: 'listsurvey.html',
        }),
        __metadata("design:paramtypes", [AioneServicesProvider, NavController, NavParams])
    ], ListsurveyPage);
    return ListsurveyPage;
}());
export { ListsurveyPage };
//# sourceMappingURL=listsurvey.js.map