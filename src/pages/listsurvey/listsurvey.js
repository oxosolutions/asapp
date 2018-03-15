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
                            _this.surveyScheduling(value[i].form_id).then(function (surveySch) {
                                _this.servicesProvider.SelectWhere("surveys", "id", value[i].form_id).then(function (survey) {
                                    console.log(survey.rows[0]);
                                    content.push(survey.rows[0]);
                                });
                            });
                            if (content != undefined) {
                                SurveySelect.push(content);
                                forloop_1++;
                                if (forloop_1 == survey_meta.rows.length) {
                                    _this.listSurvey = SurveySelect;
                                    //console.log(this.listSurvey);
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
            var startdate;
            var expiredate;
            var starttime;
            var expiretime;
            var date;
            var time;
            var noSuceduling;
            var survey_scheduling = 'select * from survey_meta where key="survey_scheduling" AND value=1 AND form_id = ' + formId;
            _this.today = new Date();
            console.log(_this.today);
            _this.servicesProvider.ExecuteRun(survey_scheduling, []).then(function (scheduling) {
                if (scheduling.rows.length > 0) {
                    console.log("yes survey schelduling");
                    _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'start_date'", "form_id", formId).then(function (startDate) {
                        _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'expire_date'", "form_id", formId).then(function (expiredate) {
                            _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'survey_start_time'", "form_id", formId).then(function (startTime) {
                                _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'survey_expire_time'", "form_id", formId).then(function (expireTime) {
                                    _this.caseCondtions(startDate.rows[0].value, expiredate.rows[0].value, startTime.rows[0].value, expireTime.rows[0].value).then(function (caseResult) {
                                        _this.caseValidations(startDate.rows[0].value, expiredate.rows[0].value, startTime.rows[0].value, expireTime.rows[0].value, caseResult).then(function (collection) {
                                            console.log(collection);
                                            console.log(collection.message);
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                else {
                    noSuceduling = "it has no scheduling";
                    console.log(noSuceduling);
                }
            });
        });
    };
    /**
     * [caseValidate description]
     * @param {[type]} startdate  [description]
     * @param {[type]} expiredate [description]
     * @param {[type]} starttime  [description]
     * @param {[type]} expiretime [description]
     *
     */
    ListsurveyPage.prototype.caseValidations = function (startdate, expiredate, starttime, expiretime, ConditionResult) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(ConditionResult);
            var message;
            var surveyResponse;
            //start time when user starts like 14:35:14
            var s = starttime.split(":");
            var StartTime = new Date(_this.today.getFullYear(), _this.today.getMonth(), _this.today.getDate(), parseInt(s[0]), parseInt(s[1]));
            //expire time when user expires
            var e = expiretime.split(':');
            var ExpireTime = new Date(_this.today.getFullYear(), _this.today.getMonth(), _this.today.getDate(), parseInt(e[0]), parseInt(e[1]));
            console.log(ExpireTime);
            // getting current time
            var dateString3 = _this.today.toString();
            var a = dateString3.split(" ");
            var Currenttime = a[4];
            switch (ConditionResult) {
                case "case A":
                    var dateDataA = new Date(expiredate);
                    if (dateDataA >= _this.today) {
                        message = "survey is visible";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case B":
                    var dateDataB = new Date(startdate);
                    var EDate = new Date(expiredate);
                    console.log(startdate);
                    console.log(expiredate);
                    if (_this.today >= dateDataB && _this.today <= EDate) {
                        message = "survey is visible";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case C":
                    var dateDataC = new Date(startdate);
                    console.log(startdate);
                    if (_this.today >= dateDataC) {
                        message = "survey is visible";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case D":
                    if (_this.today >= StartTime && _this.today <= ExpireTime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case E":
                    if (_this.today >= StartTime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    console.log(message);
                    break;
                case "case F":
                    if (_this.today <= ExpireTime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    console.log(message);
                    break;
                case "case G":
                    var dateDataG = new Date(startdate);
                    var eExpireDate = new Date(expiredate);
                    var sTime = starttime;
                    break;
                case "case H":
                    var finish = "23:59:59";
                    var dateDataH = new Date(startdate);
                    var ExpireDateH = new Date(expiredate);
                    var dt = starttime.split(":");
                    var lastdateExpire = new Date(ExpireDateH.getFullYear(), ExpireDateH.getMonth(), ExpireDateH.getDate() + 1);
                    console.log(lastdateExpire);
                    if (_this.today >= dateDataH && _this.today <= lastdateExpire && Currenttime >= starttime && Currenttime <= finish) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case I":
                    var startStringTime = "00:00:01";
                    var dateDataI = new Date(startdate);
                    var ExpireDateI = new Date(expiredate);
                    console.log(dateDataI);
                    console.log(ExpireDateI);
                    console.log(Currenttime);
                    console.log(expiretime);
                    var lastdateExpireI = new Date(ExpireDateI.getFullYear(), ExpireDateI.getMonth(), ExpireDateI.getDate() + 1);
                    console.log(lastdateExpireI);
                    if (_this.today >= dateDataI && _this.today <= lastdateExpireI && Currenttime >= startStringTime && Currenttime <= expiretime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case J":
                    var dateDataj = new Date(startdate);
                    console.log(startdate);
                    console.log(starttime);
                    console.log(expiretime);
                    if (_this.today >= dateDataj && Currenttime >= starttime && Currenttime <= expiretime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case K":
                    var ExpireDateK = new Date(expiredate);
                    var lastdateExpireK = new Date(ExpireDateK.getFullYear(), ExpireDateK.getMonth(), ExpireDateK.getDate() + 1);
                    console.log(lastdateExpireK);
                    console.log(ExpireDateK);
                    console.log(expiretime);
                    console.log(Currenttime);
                    console.log(_this.today);
                    if (_this.today <= lastdateExpireK && Currenttime <= expiretime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case L":
                    var ExpireDateL = new Date(expiredate);
                    var lastdateExpireL = new Date(ExpireDateK.getFullYear(), ExpireDateK.getMonth(), ExpireDateK.getDate() + 1);
                    console.log(lastdateExpireL);
                    if (_this.today <= lastdateExpireL && Currenttime >= starttime && Currenttime <= )
                        break;
            }
            var collection1 = {};
            collection1["surveyResponse"] = surveyResponse;
            collection1["message"] = message;
            resolve(collection1);
        });
    };
    ListsurveyPage.prototype.caseCondtions = function (startdate, expiredate, starttime, expiretime) {
        return new Promise(function (resolve, reject) {
            if (startdate == "" && expiredate != "" && starttime == "" && expiretime == "") {
                console.log(expiredate);
                resolve("case A"); // only have expiredate;
            }
            if (startdate != "" && expiredate != "" && starttime == "" && expiretime == "") {
                resolve("case B"); //have startdate and expiredate
            }
            if (startdate != "" && expiredate == "" && starttime == "" && expiretime == "") {
                resolve("case C"); //have startdate
            }
            if (startdate == "" && expiredate == "" && starttime != "" && expiretime != "") {
                resolve("case D"); //have starttime,expiretime
            }
            if (startdate == "" && expiredate == "" && starttime != "" && expiretime == "") {
                resolve("case E"); //have starttime;
            }
            if (startdate == "" && expiredate == "" && starttime == "" && expiretime != "") {
                resolve("case F"); // have expire time
            }
            if (startdate != "" && expiredate != "" && starttime != "" && expiretime != "") {
                resolve("case G"); //have startdate, expiredate, starttime
            }
            if (startdate != "" && expiredate != "" && starttime != "" && expiretime == "") {
                resolve("case H"); //have startdate,expiredate,starttime
            }
            if (startdate != "" && expiredate != "" && starttime == "" && expiretime != "") {
                resolve("case I"); //startdate,expiredate,expiretime
            }
            if (startdate != "" && expiredate == "" && starttime != "" && expiretime != "") {
                resolve("case J"); //startdate,startime,expiretime
            }
            if (startdate == "" && expiredate != "" && starttime == "" && expiretime != "") {
                resolve("case K"); //expiredate,expiretime
            }
            if (startdate == "" && expiredate != "" && starttime != "" && expiretime == "") {
                resolve("case L"); //have expiredate,starttime	
            }
            // if(startdate == "" && expiredate != "" && starttime == "" && expiretime != "" ){
            // 	resolve ("case M");	 //expiredate ,expiretime
            // }
        });
    };
    ListsurveyPage.prototype.responseLimit = function (formId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(formId);
            var value;
            var json;
            var query = 'select * from survey_meta where key="survey_response_limit" AND value=1 AND form_id = ' + formId;
            _this.servicesProvider.ExecuteRun(query, []).then(function (data) {
                if (data.rows.length > 0) {
                    _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'response_limit'", "form_id", formId).then(function (num) {
                        value = num.rows[0].value;
                        _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'response_limit_type'", "form_id", formId).then(function (type) {
                            if (type.rows[0].value == "per_user") {
                                json = type.rows[0].value;
                            }
                            else {
                                json = type.rows[0].value;
                            }
                            console.log(json);
                            console.log(value);
                        });
                    });
                }
                else {
                    console.log("no limit selected");
                    resolve("no timer");
                }
            });
        });
    };
    ListsurveyPage.prototype.surveytimer = function (formId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var duration;
            console.log(formId);
            var json;
            var query = 'select * from survey_meta where key="survey_timer" AND value=1 AND form_id = ' + formId;
            _this.servicesProvider.ExecuteRun(query, []).then(function (data) {
                if (data.rows.length > 0) {
                    _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'survey_duration'", "form_id", formId).then(function (dur) {
                        _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'timer_type'", "form_id", formId).then(function (type) {
                            if (type.rows[0].value == "survey_duration") {
                                json = type.rows[0].value;
                                duration = dur.rows[0].value;
                            }
                            else {
                                json = type.rows[0].value;
                            }
                            console.log(json);
                            console.log(duration);
                        });
                    });
                }
                else {
                    console.log("no timer");
                    resolve("no timer");
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
//this.surveytimer(formId).then((surveyTim)=>{
// 	resolve(surveyTim);
// 	this.responseLimit(formId).then((limit)=>{
// 	});
// })
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