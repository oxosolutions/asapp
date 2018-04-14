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
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { SurveyDetailPage } from '../../pages/survey-detail/survey-detail';
var ListsurveyPage = /** @class */ (function () {
    function ListsurveyPage(AioneHelp, toastCtrl, servicesProvider, alertCtrl, navCtrl, navParams) {
        this.AioneHelp = AioneHelp;
        this.toastCtrl = toastCtrl;
        this.servicesProvider = servicesProvider;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.listSurvey = [];
        this.questionLength = [];
    }
    ListsurveyPage.prototype.toggleClass = function (evnt) {
        console.log(evnt);
        $(evnt.target).parents(".read-more").siblings(".survey-desc").toggleClass('active');
        return false;
    };
    ListsurveyPage.prototype.surveyDetails = function (survey, id, message, totalQuestions) {
        var _this = this;
        localStorage.setItem("Surveyid", id);
        localStorage.setItem("totalQuestion", totalQuestions);
        var surveyMetaType;
        if (message["scheduling"].surveyResponse == "true") {
            this.servicesProvider.SelectWhere("survey_meta", "form_id", id).then(function (form) {
                console.log(form);
                //console.log(form.rows.item);
                var row = {};
                for (var i = 0; i < form.rows.length; i++) {
                    row[i] = form.rows.item(i);
                }
                var SurveyData = row;
                localStorage.setItem("questionType", 'questions');
                console.log(survey);
                localStorage.setItem("currentSurvey", JSON.stringify(survey));
                _this.navCtrl.setRoot(SurveyDetailPage, { "survey": survey });
                for (var keys in SurveyData) {
                    // if(SurveyData[keys].value == "survey"){
                    // 	surveyMetaType=SurveyData[keys].value;
                    //   localStorage.setItem("questionType", 'save_survey');  
                    // }else if(SurveyData[keys].value == "section"){
                    // 	surveyMetaType=SurveyData[keys].value;
                    //   localStorage.setItem("questionType", 'save_section');
                    //   this.navCtrl.setRoot(GroupsPage,{'type' : surveyMetaType,'id': id});
                    // }else if(SurveyData[keys].value == "question"){
                    surveyMetaType = SurveyData[keys].value;
                    // localStorage.setItem("GroupdDesc")
                    //this.navCtrl.setRoot(GroupsPage,{'type' : surveyMetaType,'id': id});
                    //}
                }
            });
        }
        else {
            this.presentToast();
        }
    };
    // groups(id,message,totalQuestions){
    // 	localStorage.setItem("Surveyid", id);
    // 	localStorage.setItem("totalQuestion",totalQuestions);
    // 	let surveyMetaType;
    // 	if(message["scheduling"].surveyResponse == "true"){
    // 		this.servicesProvider.SelectWhere("survey_meta","form_id",id).then((form:any)=>{
    // 		console.log(form);
    // 		//this.surveyIncompleteName().then(()=>{
    // 			//console.log(form.rows.item);
    // 			var row = {};
    //     	for(var i=0; i < form.rows.length; i++) {
    //         	row[i] = form.rows.item(i)
    //     	}
    //      	let SurveyData = row;
    //       for(let keys in SurveyData){
    //          // if(SurveyData[keys].value == "survey"){
    //          // 	surveyMetaType=SurveyData[keys].value;
    //          //   localStorage.setItem("questionType", 'save_survey');  
    //          // }else if(SurveyData[keys].value == "section"){
    //          // 	surveyMetaType=SurveyData[keys].value;
    //          //   localStorage.setItem("questionType", 'save_section');
    //          //   this.navCtrl.setRoot(GroupsPage,{'type' : surveyMetaType,'id': id});
    //          // }else if(SurveyData[keys].value == "question"){
    //          	surveyMetaType=SurveyData[keys].value;
    //            localStorage.setItem("questionType", 'questions');
    //            // localStorage.setItem("GroupdDesc")
    //            console.log(id);
    //            this.navCtrl.setRoot(GroupsPage,{'type' : surveyMetaType,'id': id});
    //          //}
    //       }
    //     });
    //    // });
    // 	}else{
    // 		this.presentToast();
    // 	}
    // 	//this.showConfirm();	 
    // }
    ListsurveyPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Survey is not available',
            duration: 5500,
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    };
    ListsurveyPage.prototype.ionViewDidLoad = function () {
        console.log("ion view load");
        this.surveyTitle = localStorage.getItem("ApplicationName");
        localStorage.setItem('completedGroups', null);
        localStorage.setItem('totalQuestion', null);
        localStorage.setItem('fillingQuestion', null);
        localStorage.setItem('RuningSurvey', null);
        localStorage.setItem('record_id', null);
        localStorage.setItem('GroupNumber', null);
        localStorage.setItem('totalGroup', null);
        localStorage.setItem('currentSurvey', null);
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
                            _this.surveyScheduling(value.item(i).form_id).then(function (surveySch) {
                                _this.servicesProvider.SelectWhere("surveys", "id", value.item(i).form_id).then(function (survey) {
                                    console.log(survey);
                                    _this.responseLimit(value.item(i).form_id).then(function (responseData) {
                                        _this.surveytimer(value.item(i).form_id).then(function (timerData) {
                                            _this.surveyanswer("surveyResult_" + value.item(i).form_id).then(function (surveyFilled) {
                                                _this.totalQuestion(value.item(i).form_id).then(function (question) {
                                                    _this.completedSurvey(value.item(i).form_id).then(function (completed) {
                                                        _this.incompletedSurvey(value.item(i).form_id).then(function (incompleted) {
                                                            var rowsData = survey.rows.item(0);
                                                            rowsData["details"] = responseData;
                                                            rowsData["timer"] = timerData;
                                                            rowsData["scheduling"] = surveySch;
                                                            rowsData["filledSurvey"] = surveyFilled;
                                                            rowsData["questions"] = question;
                                                            rowsData["completed"] = completed;
                                                            rowsData["incompleted"] = incompleted;
                                                            // console.log(rowsData["details"].responenumber);
                                                            content.push(rowsData);
                                                            // console.log(content);
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
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
    ListsurveyPage.prototype.completedSurvey = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = "SELECT count(*) as count FROM surveyResult_" + id + " WHERE survey_status = 'completed' ";
            _this.servicesProvider.ExecuteRun(query, []).then(function (questions) {
                //console.log(questions.rows.item(0).count)
                resolve(questions.rows.item(0).count);
            });
        });
    };
    ListsurveyPage.prototype.incompletedSurvey = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = "SELECT count(*) as count FROM surveyResult_" + id + " WHERE survey_status = 'incomplete' ";
            _this.servicesProvider.ExecuteRun(query, []).then(function (questions) {
                //	console.log(questions.rows.item(0).count)
                resolve(questions.rows.item(0).count);
            });
        });
    };
    ListsurveyPage.prototype.totalQuestion = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = "SELECT count(*) as count FROM questions WHERE survey_id = " + id;
            _this.servicesProvider.ExecuteRun(query, []).then(function (questions) {
                resolve(questions.rows.item(0).count);
            });
        });
    };
    ListsurveyPage.prototype.surveyanswer = function (tablename) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //console.log(tablename);
            _this.servicesProvider.SelectAll(tablename).then(function (filled) {
                //console.log(filled.rows);
                resolve(filled.rows.length);
            });
        });
    };
    ListsurveyPage.prototype.customError = function (formId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = 'select * from survey_meta where key="custom_error_messages" AND value=1 AND form_id = ' + formId;
            _this.servicesProvider.ExecuteRun(query, []).then(function (data) {
                if (data.rows.length > 0) {
                    //console.log("error exists");
                }
                else {
                    //console.log("no error");
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
            //console.log(this.today);
            _this.servicesProvider.ExecuteRun(survey_scheduling, []).then(function (scheduling) {
                if (scheduling.rows.length > 0) {
                    //console.log("yes survey schelduling");
                    _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'start_date'", "form_id", formId).then(function (startDate) {
                        _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'expire_date'", "form_id", formId).then(function (expiredate) {
                            _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'survey_start_time'", "form_id", formId).then(function (startTime) {
                                _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'survey_expire_time'", "form_id", formId).then(function (expireTime) {
                                    _this.caseCondtions(startDate.rows.item(0).value, expiredate.rows.item(0).value, startTime.rows.item(0).value, expireTime.rows.item(0).value).then(function (caseResult) {
                                        _this.caseValidations(startDate.rows.item(0).value, expiredate.rows.item(0).value, startTime.rows.item(0).value, expireTime.rows.item(0).value, caseResult).then(function (collection) {
                                            // console.log(collection);
                                            resolve(collection);
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                else {
                    noSuceduling = "it has no scheduling";
                    //console.log(noSuceduling);
                    var collection1 = {};
                    collection1["surveyResponse"] = "false";
                    collection1["message"] = "survey not available";
                    resolve(collection1);
                }
            });
        });
    };
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
            //console.log(ExpireTime);
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
                    //console.log(message);
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
                    var lastdateExpireI = new Date(ExpireDateI.getFullYear(), ExpireDateI.getMonth(), ExpireDateI.getDate() + 1);
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
                    var startStringTimeL = "23:59:59";
                    var ExpireDateL = new Date(expiredate);
                    var lastdateExpireL = new Date(ExpireDateL.getFullYear(), ExpireDateL.getMonth(), ExpireDateL.getDate() + 1);
                    if (_this.today <= lastdateExpireL && Currenttime >= starttime && Currenttime <= startStringTimeL) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case M":
                    message = "survey is available";
                    surveyResponse = "true";
                    break;
                case "case N":
                    var ExpireDateN = new Date(expiredate);
                    var lastdateExpireN = new Date(ExpireDateN.getFullYear(), ExpireDateN.getMonth(), ExpireDateN.getDate() + 1);
                    console.log(lastdateExpireN);
                    if (_this.today <= lastdateExpireN && Currenttime >= starttime && Currenttime <= expiretime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
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
            if (startdate == "" && expiredate == "" && starttime == "" && expiretime == "") {
                resolve("case M"); //expiredate ,expiretime startdate starttime
            }
            if (startdate == "" && expiredate != "" && starttime != "" && expiretime != "") {
                resolve("case N"); //expiredate ,starttime expiretime
            }
            // starttime,startdate
            //also M case pending
        });
    };
    ListsurveyPage.prototype.responseLimit = function (formId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var responenumber;
            var responsetype;
            var query = 'select * from survey_meta where key="survey_response_limit" AND value=1 AND form_id = ' + formId;
            _this.servicesProvider.ExecuteRun(query, []).then(function (data) {
                if (data.rows.length > 0) {
                    //console.log("response dffdexits");
                    _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'response_limit'", "form_id", formId).then(function (num) {
                        responenumber = num.rows.item(0).value;
                        _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'response_limit_type'", "form_id", formId).then(function (type) {
                            if (type.rows.item(0).value == "per_user") {
                                responsetype = type.rows.item(0).value;
                            }
                            else {
                                responsetype = type.rows.item(0).value;
                            }
                            var responseResult = _this.sruveyResponseExecution(responenumber, responsetype);
                            resolve(responseResult);
                        });
                    });
                }
                else {
                    // console.log("no limit selected");
                    responenumber = "";
                    responsetype = "";
                    var responseResult = _this.sruveyResponseExecution(responenumber, responsetype);
                    resolve(responseResult);
                }
            });
        });
    };
    ListsurveyPage.prototype.sruveyResponseExecution = function (responenumber, responsetype) {
        var collectionResponse = {};
        collectionResponse["responenumber"] = responenumber;
        collectionResponse["responsetype"] = responsetype;
        //console.log(collectionResponse)
        return collectionResponse;
    };
    ListsurveyPage.prototype.surveytimer = function (formId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var duration;
            //console.log(formId);
            var timerType;
            var query = 'select * from survey_meta where key="survey_timer" AND value=1 AND form_id = ' + formId;
            _this.servicesProvider.ExecuteRun(query, []).then(function (data) {
                if (data.rows.length > 0) {
                    //console.log("timer extis");
                    _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'survey_duration'", "form_id", formId).then(function (dur) {
                        _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'timer_type'", "form_id", formId).then(function (type) {
                            if (type.rows.item(0).value == "survey_duration") {
                                timerType = type.rows.item(0).value;
                                duration = dur.rows.item(0).value;
                            }
                            else {
                                timerType = type.rows.item(0).value;
                                duration = "";
                            }
                            var timerData = _this.surveytimerExecution(timerType, duration);
                            resolve(timerData);
                        });
                    });
                }
                else {
                    //console.log("no timer");
                    timerType = "";
                    duration = "";
                    var timerData = _this.surveytimerExecution(timerType, duration);
                    resolve(timerData);
                }
            });
        });
    };
    ListsurveyPage.prototype.surveytimerExecution = function (timerType, duration) {
        var collectionResponse = {};
        collectionResponse["timerType"] = timerType;
        collectionResponse["timerDuration"] = duration;
        //.console.log(collectionResponse)
        return collectionResponse;
    };
    ListsurveyPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-listsurvey',
            templateUrl: 'listsurvey.html',
        }),
        __metadata("design:paramtypes", [AioneHelperProvider, ToastController, AioneServicesProvider, AlertController, NavController, NavParams])
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