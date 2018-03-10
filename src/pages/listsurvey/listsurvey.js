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
        this.surveyTitle = localStorage.getItem("ApplicationName");
        this.EnabledSurvey();
    };
    ListsurveyPage.prototype.EnabledSurvey = function () {
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
                            var formId = value[i].form_id;
                            console.log(formId);
                            _this.surveyScheduling(formId).then(function () {
                                _this.servicesProvider.SelectWhere("surveys", "id", formId).then(function (survey) {
                                    //console.log(survey.rows[0]);
                                    content.push(survey.rows[0]);
                                });
                            });
                            if (content != undefined) {
                                SurveySelect.push(content);
                                forloop_1++;
                                if (forloop_1 == survey_meta.rows.length) {
                                    _this.listSurvey = SurveySelect;
                                    console.log(_this.listSurvey);
                                    //console.log(this.listSurvey[0]);
                                }
                            }
                        };
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
    ListsurveyPage.prototype.surveyScheduling = function (formId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var timerquery = '';
            var survey_scheduling = 'select * from survey_meta where key="survey_scheduling" AND value=1 AND form_id = ' + formId;
            var survey_timer = 'select * from survey_meta where key= "survey_timer" AND value=1 AND form_id = ' + formId;
            var survey_limit = 'select * from survey_meta where key="survey_response_limit" AND value=1 AND form_id = ' + formId;
            _this.servicesProvider.ExecuteRun(survey_scheduling, []).then(function (scheduling) {
                if (scheduling.rows.length > 0) {
                    console.log("yes survey schelduling");
                    console.log(scheduling.rows);
                    _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'start_date'", "form_id", formId).then(function (startDate) {
                        _this.StartDate = startDate.rows[0].value;
                        _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'expire_date'", "form_id", formId).then(function (expire) {
                            _this.ExpireDate = expire.rows[0].value;
                            _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'survey_start_time'", "form_id", formId).then(function (startTime) {
                                _this.StartTime = startTime.rows[0].value;
                                _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'survey_expire_time'", "form_id", formId).then(function (expireTime) {
                                    _this.ExpireTime = expireTime.rows[0].value;
                                    console.log(_this.StartDate);
                                    console.log(_this.ExpireDate);
                                    console.log(_this.StartTime);
                                    console.log(_this.ExpireTime);
                                    if (_this.StartDate != "" && _this.ExpireDate == "" && _this.StartTime == "" && _this.ExpireTime == "") {
                                        console.log(_this.StartDate);
                                    }
                                    if (_this.StartDate == "" && _this.ExpireDate != "" && _this.StartTime == "" && _this.ExpireTime == "") {
                                        console.log(_this.ExpireDate);
                                    }
                                    if (_this.StartDate == "" && _this.ExpireDate == "" && _this.StartTime != "" && _this.ExpireTime == "") {
                                        console.log(_this.StartTime);
                                    }
                                    if (_this.StartDate != "" && _this.ExpireDate == "" && _this.StartTime == "" && _this.ExpireTime != "") {
                                        console.log(_this.ExpireTime);
                                    }
                                    if (_this.StartDate != "" && _this.ExpireDate != "" && _this.StartTime == "" && _this.ExpireTime == "") {
                                        console.log("today's date");
                                    }
                                    if (_this.StartDate == "" && _this.ExpireDate == "" && _this.StartTime != "" && _this.ExpireTime != "") {
                                        console.log("got time");
                                    }
                                    if (_this.StartDate == "" && _this.ExpireDate == "" && _this.StartTime == "" && _this.ExpireTime == "") {
                                        console.log("no time");
                                    }
                                    //resolve("data");
                                });
                            });
                        });
                    });
                }
                else {
                    console.log("global available");
                    resolve("global avaliable");
                }
            });
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
// questionCount(){
// 	// this.data="SELECT  questions.question_key,surveys.* FROM surveys LEFT JOIN questions ON surveys.id = questions.survey_id";
// 			// this.servicesProvider.ExecuteRun(this.data,[]).then((SelResult:any)=>{
// 			// 	this.questionLength.push(SelResult.rows);
// 			// 	this.listSurvey.forEach((key,value,)=>{
// 			// 		this.questionLength.forEach((keys,values,)=>{
// 			// 			Object.keys(key).forEach(function(svalue,skey){
// 		 //    			questionData=key[svalue].id;																																																								 
// 		 //    			//console.log(questionData);		    				
// 		 //    			});
// 	  // 			});
// 			// 	});
// 			// });
// }
//# sourceMappingURL=listsurvey.js.map