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
import { GroupsPage } from '../../pages/groups/groups';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AlertController } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as enLocale from 'date-fns/locale/en';
import { LoadingController } from 'ionic-angular';
var QuestionPage = /** @class */ (function () {
    function QuestionPage(loaderCtrl, fb, toastctrl, AioneHelp, alertCtrl, servicesProvider, navCtrl, navParams) {
        this.loaderCtrl = loaderCtrl;
        this.fb = fb;
        this.toastctrl = toastctrl;
        this.AioneHelp = AioneHelp;
        this.alertCtrl = alertCtrl;
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // @ViewChild('myForm') myForm;
        this.parentMessage = "message from parent";
        this.options = {
            locale: enLocale
        };
        this.questions = [];
        this.surveyQuestion = [];
        this.questionCheck = [];
        // indexArray=0;
        this.indexArray = localStorage.getItem("lastquestionIndex");
        this.CompletedGroup = [];
        this.completedGroupIndex = localStorage.getItem('Groupid');
        this.date = new Date();
    }
    QuestionPage.prototype.showConfirm = function (questionKey, survey_id, questionText, QuestionType) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            message: "Are u sure want to quite survey",
            // inputs: [
            //   {
            //     // placeholder: 'survey name'
            //   },
            // ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'yes',
                    handler: function (data) {
                        // if(data[0] == ""){
                        if (localStorage.getItem("record_id") == "null") {
                            _this.navCtrl.setRoot(DashboardPage);
                        }
                        else {
                            _this.totalfilledQuestion().then(function (length) {
                                _this.navCtrl.setRoot(DashboardPage);
                            });
                        }
                        // }else{
                        //     console.log(data[0]);
                        //   this.tablename="surveyResult_"+survey_id;
                        //   let formValue=data[0];
                        //     let query="UPDATE "+ this.tablename + " SET " + "incomplete_name" +"= '" +formValue +"'"+" where serialNo = "+localStorage.getItem('record_id') ;
                        // console.log(query);
                        // this.servicesProvider.ExecuteRun(query,[]).then((questionSave33)=>{
                        // this.navCtrl.setRoot(DashboardPage);
                        //});
                        // }        
                    }
                }
            ]
        });
        prompt.present();
    };
    QuestionPage.prototype.ngAfterViewInit = function () {
        // this.message = this.child.message
    };
    QuestionPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loader = this.loaderCtrl.create({
            spinner: 'crescent',
            content: "\n      <div class=\"custom-spinner-container\">\n        <div class=\"custom-spinner-box\">" + 'Verifying Your Details' + "</div>\n      </div>",
        });
        this.loader.present();
        var i = 0;
        var Content = [];
        this.surveyTotalQuestions = localStorage.getItem("totalQuestion");
        this.questionTitle = localStorage.getItem("ApplicationName");
        this.questionType = localStorage.getItem("questionType");
        this.id = this.navParams.get('id');
        console.log(this.id);
        this.servicesProvider.SelectWhere("questions", "group_id", this.id).then(function (result3) {
            _this.servicesProvider.mobileListArray(result3).then(function (result) {
                console.log(result);
                Content.push(result);
                console.log(Content);
                //code for converting json
                var collection;
                var newcollection;
                var replacedArray = [];
                var newObject = {};
                Content.forEach(function (key, value) {
                    collection = [];
                    Object.keys(key).forEach(function (keyvalue, keydata) {
                        //console.log(keyvalue);
                        ////here
                        newcollection = [];
                        var newcolumn = [];
                        collection = key[keyvalue];
                        newObject[collection.question_text] = "";
                        Object.keys(collection).forEach(function (valuekey, valuedata) {
                            var newData;
                            var replace;
                            try {
                                replace = collection[valuekey].replace(/'/g, '"');
                                newData = JSON.parse(replace);
                            }
                            catch (e) {
                                newData = collection[valuekey];
                            }
                            newcollection.push(newData);
                            newcolumn.push(valuekey);
                        });
                        var replacedData = {};
                        i;
                        for (i = 0; i < newcollection.length; i++) {
                            replacedData[newcolumn[i]] = newcollection[i];
                        }
                        console.log(replacedData);
                        replacedArray.push(replacedData);
                    });
                });
                _this.questions = replacedArray;
                console.log(_this.indexArray);
                _this.QuestionKeyText = _this.questions[_this.indexArray].question_key;
                console.log(newObject);
                //create dynamic 
                var form = new FormGroup({});
                for (var key in newObject) {
                    if (newObject.hasOwnProperty(key)) {
                        var control = new FormControl(newObject[key], Validators.required);
                        form.addControl(key, control);
                    }
                }
                _this.form = form;
                //end 
                //console.log(this.QuestionKeyText);
                localStorage.setItem("totalSectionQuestion", "" + Content[0].length + "");
                _this.surveyTotalQuestions = localStorage.getItem("totalSectionQuestion");
                _this.reviewRecord().then(function (answer) {
                    console.log(answer);
                    _this.loader.dismiss();
                    _this.textData(_this.questions, _this.indexArray, answer).then(function () {
                    });
                });
            });
        });
    };
    QuestionPage.prototype.reviewRecord = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(_this.navParams.get("completed"));
            localStorage.getItem('record_id');
            if (localStorage.getItem('record_id') != "null") {
                console.log('from ');
                _this.tablename = "surveyResult_" + _this.questions[_this.indexArray].survey_id;
                _this.answerGet(_this.indexArray).then(function (answerKey) {
                    resolve(answerKey);
                });
            }
            else {
                resolve("");
            }
        });
    };
    QuestionPage.prototype.textData = function (questions, i, questionKey) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.lastArrayCheck().then(function (result) {
                //console.log(questions[i].survey_id)
                _this.filledQuestion = localStorage.getItem("fillingQuestion");
                // this.next(questions[i].survey_id,questions[i].question_key);
                _this.QuestionKeyText = questionKey;
                //console.log(this.QuestionKeyText);
                var content = [];
                content = questions[i];
                content["prefill"] = _this.QuestionKeyText;
                _this.OriginalContent = content;
                //console.log(this.OriginalContent);
                if (_this.questionCheck.length == 0) {
                    _this.previousButton = false;
                }
                else {
                    _this.previousButton = true;
                }
                _this.NextButton = true;
            });
        });
    };
    QuestionPage.prototype.next = function (surveyid, questionkey) {
        var _this = this;
        //console.log(this.indexArray);
        this.loader = this.loaderCtrl.create({
            spinner: 'crescent',
            content: "\n      <div class=\"custom-spinner-container\">\n        <div class=\"custom-spinner-box\">" + 'Refreshing data' + "</div>\n      </div>",
        });
        this.loader.present();
        this.tablename = "surveyResult_" + surveyid;
        var questionLength = this.questions.length;
        localStorage.getItem('Groupid');
        if (this.questionCheck.length == (questionLength - 1)) {
            this.updateCompleteGroup().then(function () {
                _this.NextButton = false;
                var query = "UPDATE " + _this.tablename + " SET completed_groups = '" + localStorage.getItem('completedGroups') + "',last_fieldId = " + null + " where serialNo = " + localStorage.getItem('record_id');
                //console.log(query);
                _this.servicesProvider.ExecuteRun(query, []).then(function (questionSave33) {
                    _this.questionIndex(_this.indexArray, questionkey).then(function (id) {
                        _this.questionsFilledCheck().then(function (fillled) {
                            _this.questionsFilledCheckInsert().then(function (filledinsert) {
                                _this.loader.dismiss();
                                _this.surveyComplete().then(function () {
                                });
                            });
                        });
                    });
                });
            });
        }
        else {
            this.questionIndex(this.indexArray, questionkey).then(function (id) {
                _this.indexArray++;
                // console.log(this.indexArray);
                _this.answerGet(_this.indexArray).then(function (answerKey) {
                    _this.questionsFilledCheck().then(function (fillled) {
                        //this.questionsFilledCheckInsert().then((filledinsert)=>{
                        _this.loader.dismiss();
                        _this.textData(_this.questions, _this.indexArray, answerKey).then(function () {
                        });
                    });
                    //})
                });
            });
        }
    };
    QuestionPage.prototype.questionsFilledCheckInsert = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = "UPDATE " + _this.tablename + " SET filledQuestions='" + localStorage.getItem("fillingQuestion") + "' where serialNo= " + localStorage.getItem('record_id');
            //console.log(query);
            _this.servicesProvider.ExecuteRun(query, []).then(function (insert) {
                resolve(insert);
            });
        });
    };
    QuestionPage.prototype.questionsFilledCheck = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // if(localStorage.getItem("fillingQuestion") == "null"){
            //   this.filledQuestion=JSON.parse(localStorage.getItem('questionIndex'));
            //   console.log(this.filledQuestion);
            //   this.filledQuestion++;
            //   localStorage.setItem("fillingQuestion",this.filledQuestion.length);
            //   resolve(this.filledQuestion);
            // }else{
            _this.filledQuestion = localStorage.getItem("fillingQuestion");
            _this.filledQuestion++;
            localStorage.setItem("fillingQuestion", _this.filledQuestion);
            resolve(_this.filledQuestion);
            //}
        });
    };
    QuestionPage.prototype.surveyComplete = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = JSON.parse(localStorage.getItem('completedGroups'));
            if (data.length == localStorage.getItem("totalGroup")) {
                var time_1 = new Date();
                console.log("datashborad pls go");
                _this.totalfilledQuestion().then(function (length) {
                    var query = "UPDATE " + _this.tablename + " SET survey_status = 'completed', " + "survey_completedOn='" + time_1 + "'" + " where serialNo = " + localStorage.getItem('record_id');
                    //console.log(query);
                    _this.servicesProvider.ExecuteRun(query, []).then(function (complete) {
                        _this.AioneHelp.presentToast("survey is successfully completed", 3000, 'top');
                        console.log(_this.navParams.get("completed"));
                        if (_this.navParams.get("completed") == "") {
                            _this.navCtrl.setRoot(DashboardPage);
                        }
                        else {
                            _this.navCtrl.setRoot(GroupsPage);
                        }
                    });
                });
            }
            else {
                _this.totalfilledQuestion().then(function (length) {
                    _this.AioneHelp.presentToast("section is successfully completed", 3000, 'top');
                    _this.navCtrl.setRoot(GroupsPage, { 'completedGroup': localStorage.getItem("completedGroups") });
                });
            }
        });
    };
    QuestionPage.prototype.totalfilledQuestion = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var Totallength;
            var Questioncal = [];
            //get qeustionkey from question table
            var query = 'Select question_key from questions where survey_id = ' + localStorage.getItem('Surveyid');
            _this.servicesProvider.ExecuteRun(query, []).then(function (questions) {
                _this.servicesProvider.mobileListArray(questions).then(function (SurveyData) {
                    Totallength = SurveyData.length;
                    SurveyData.forEach(function (index, key) {
                        Questioncal.push(index["question_key"]);
                    });
                    Questioncal = Questioncal.join(",");
                    var filled = [];
                    var loop = 0;
                    //get question length from surveyResutl table
                    var query1 = 'Select ' + Questioncal + ' from ' + _this.tablename + " where serialNo = " + localStorage.getItem('record_id');
                    _this.servicesProvider.ExecuteRun(query1, []).then(function (questions1) {
                        _this.servicesProvider.mobileListArray(questions1).then(function (SurveyData1) {
                            SurveyData1.forEach(function (key, value) {
                                Object.keys(key).forEach(function (keyinnner, valueinner) {
                                    console.log(key[keyinnner]);
                                    if (key[keyinnner] != null) {
                                        filled.push(key[keyinnner]);
                                    }
                                    loop++;
                                    if (Totallength == loop) {
                                        var query_1 = "UPDATE " + _this.tablename + " SET filledQuestions=" + filled.length + " where serialNo = " + localStorage.getItem('record_id');
                                        console.log(query_1);
                                        _this.servicesProvider.ExecuteRun(query_1, []).then(function (complete) {
                                            resolve(complete);
                                        });
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    QuestionPage.prototype.updateCompleteGroup = function () {
        //calculate complted groups
        var _this = this;
        var storedata;
        return new Promise(function (resolve, reject) {
            if (localStorage.getItem('completedGroups') != "null") {
                console.log(localStorage.getItem('completedGroups'));
                console.log(localStorage.getItem('Groupid'));
                if (localStorage.getItem('completedGroups').indexOf("" + localStorage.getItem('Groupid') + "") == -1) {
                    _this.CompletedGroup = JSON.parse(localStorage.getItem('completedGroups'));
                    _this.CompletedGroup.push(localStorage.getItem('Groupid'));
                    localStorage.setItem('completedGroups', JSON.stringify(_this.CompletedGroup));
                    resolve(_this.CompletedGroup);
                }
                else {
                    _this.CompletedGroup = JSON.parse(localStorage.getItem('completedGroups'));
                    resolve(_this.CompletedGroup);
                }
            }
            else {
                console.log('defined');
                _this.CompletedGroup.push(localStorage.getItem('Groupid'));
                console.log(_this.CompletedGroup);
                localStorage.setItem('completedGroups', JSON.stringify(_this.CompletedGroup));
                resolve(_this.CompletedGroup);
            }
        });
    };
    QuestionPage.prototype.questionIndex = function (check, questionkey) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.questionCheck.push(check);
            localStorage.setItem("questionIndex", JSON.stringify(_this.questionCheck));
            var questionFilled = JSON.parse(localStorage.getItem('questionIndex'));
            console.log(questionFilled); //list of array
            var query = "UPDATE " + _this.tablename + " SET questionIndex = '" + localStorage.getItem('questionIndex') + "' where serialNo= " + localStorage.getItem('record_id');
            console.log(query);
            _this.servicesProvider.ExecuteRun(query, []).then(function (insert) {
                resolve(_this.questionCheck);
                // resolve(query);
            });
        });
    };
    QuestionPage.prototype.previous = function () {
        var _this = this;
        this.loader = this.loaderCtrl.create({
            spinner: 'crescent',
            content: "\n      <div class=\"custom-spinner-container\">\n        <div class=\"custom-spinner-box\">" + 'Refreshing data' + "</div>\n      </div>",
        });
        this.loader.present();
        var storedNames;
        storedNames = JSON.parse(localStorage.getItem("questionIndex"));
        this.lastPopId = storedNames.pop();
        var lastindex2 = this.lastPopId - 1;
        this.questionCheck = storedNames;
        localStorage.setItem("questionIndex", JSON.stringify(this.questionCheck));
        localStorage.setItem("lastquestionIndex", "" + lastindex2 + "");
        this.indexArray = this.indexArray - 1;
        this.filledQuestion = localStorage.getItem("fillingQuestion");
        this.filledQuestion = this.filledQuestion - 1;
        localStorage.setItem("fillingQuestion", this.filledQuestion);
        this.questionsFilledCheckInsert().then(function (filledinsert) {
            _this.QuestionKeyText = _this.questions[_this.indexArray].question_key;
            _this.answerGet(_this.indexArray).then(function (answerKey) {
                // console.log(answerKey);
                _this.loader.dismiss();
                _this.textData(_this.questions, _this.indexArray, answerKey).then(function () {
                });
            });
        });
    };
    QuestionPage.prototype.answerGet = function (id) {
        var _this = this;
        // console.log(id);
        return new Promise(function (resolve, reject) {
            console.log(_this.questions[id].question_key);
            var query = 'SELECT ' + _this.questions[id].question_key + " FROM " + _this.tablename + " where serialNo = " + localStorage.getItem('record_id');
            console.log(query);
            _this.servicesProvider.ExecuteRun(query, []).then(function (result) {
                _this.answerValue = result.rows.item(0);
                console.log(_this.answerValue);
                console.log(_this.answerValue[_this.questions[id].question_key]);
                resolve(_this.answerValue[_this.questions[id].question_key]);
            });
        });
    };
    QuestionPage.prototype.lastArrayCheck = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // console.log(this.navParams.get('indexdata'));
            //  
            if (_this.navParams.get('indexdata') != null || _this.navParams.get('InCompleteStatus') != null) {
                // console.log("pearame");
                console.log(_this.questionCheck);
                _this.questionCheck = JSON.parse(localStorage.getItem('questionIndex'));
                console.log(_this.questionCheck);
                resolve(_this.questionCheck);
            }
            else {
                resolve("data");
            }
        });
    };
    QuestionPage.prototype.submitConditionCheck = function (value, questionText) {
        return new Promise(function (resolve, reject) {
            //if different question types
            // console.log(value[questionText]);
            if (value[questionText] != null) {
                localStorage.setItem("lastQuestiontext", questionText);
                if (value[questionText] == "") {
                    resolve(null);
                }
                else {
                    resolve(value[questionText]);
                }
            }
            else {
                //if same types
                if (value[localStorage.getItem("lastQuestiontext")] != null) {
                    var data = value[localStorage.getItem("lastQuestiontext")];
                    resolve(data);
                }
                else {
                    resolve(null);
                }
            }
        });
    };
    QuestionPage.prototype.update = function (text) {
        console.log(text);
    };
    QuestionPage.prototype.checkbox = function (questionKey) {
        return new Promise(function (resolve, reject) {
            // if($("#mycheckbox").is(":checked")) {
            //   console.log("checked");
            // } else {
            //   console.log("not checked");
            // }
            // if($('input:checked').val() != undefined){
            //   $('input').prop('disabled',true);
            //   console.log("yes checked");
            // }else{
            //   console.log("not checked");
            // }
        });
    };
    QuestionPage.prototype.datachanged = function (e) {
        console.log(e);
        console.log(e.checked);
    };
    QuestionPage.prototype.onSubmit = function (form, questionKey, survey_id, questionText, QuestionType, update) {
        // console.log(this.form.value);
        var _this = this;
        this.submitConditionCheck(this.form.value, questionText).then(function (formValidate) {
            console.log(formValidate);
            var i = 0;
            var json;
            var formValue = [];
            if (formValidate == null) {
                console.log("not valid");
                _this.Errors = "it is not valid";
            }
            else {
                var formValue_1 = [];
                //console.log("valid");
                if (QuestionType == "checkbox") {
                    _this.checkbox(questionKey).then(function () {
                    });
                    // json=JSON.stringify(formValidate);
                    // formValue.push(json);
                }
                else {
                    formValue_1.push(formValidate);
                    //console.log(formValue);
                    var questionLength = _this.questions.length;
                    _this.tablename = "surveyResult_" + survey_id;
                    localStorage.setItem("lastquestionIndex", _this.indexArray.toString());
                    var query = "Select " + questionKey + " from " + _this.tablename + " where serialNo = " + _this.recordId;
                    var record_id = void 0;
                    record_id = localStorage.getItem('record_id');
                    localStorage.setItem("lastquestionIndex", _this.indexArray.toString());
                    if (record_id != "null") {
                        //console.log('update');
                        // console.log(formValue);
                        var query_2 = "UPDATE " + _this.tablename + " SET " + questionKey + "= '" + formValue_1 + "', last_fieldId = " + "'" + localStorage.getItem("lastquestionIndex") + "'," + "last_group_id = " + localStorage.getItem('Groupid') + ",filledQuestions=" + localStorage.getItem("fillingQuestion") + " where serialNo = " + localStorage.getItem('record_id');
                        console.log(query_2);
                        _this.servicesProvider.ExecuteRun(query_2, []).then(function (questionSave33) {
                            _this.next(survey_id, questionKey);
                        });
                    }
                    else {
                        var time = new Date();
                        var uniqueKey = localStorage.getItem("Surveyid") + '' + time.getFullYear() + '' + time.getMonth() + 1 + '' + time.getDay() + '' + time.getHours() + '' + time.getMinutes() + time.getSeconds() + '' + time.getMilliseconds() + '' + Math.floor(Math.random() * 10000000);
                        // console.log();
                        formValue_1.push(localStorage.getItem("lastquestionIndex"));
                        formValue_1.push("incomplete");
                        formValue_1.push(localStorage.getItem('Groupid'));
                        formValue_1.push(time);
                        formValue_1.push(localStorage.getItem("totalQuestion"));
                        formValue_1.push(localStorage.getItem("InCompleteSurveyName"));
                        formValue_1.push(localStorage.getItem("fillingQuestion"));
                        formValue_1.push(localStorage.getItem("username"));
                        formValue_1.push("App");
                        formValue_1.push(uniqueKey);
                        _this.servicesProvider.Insert(_this.tablename, [questionKey, "last_fieldId", "survey_status", "last_group_id", "survey_startedOn", "totalQuestions", "incomplete_name", "filledQuestions", "survey_submittedBy", "survey_submittedFrom", "unique_id"], formValue_1).then(function (res) {
                            // console.log(res.insertId);
                            localStorage.setItem('record_id', res.insertId);
                            localStorage.setItem('InCompleteSurveyName', null);
                            _this.next(survey_id, questionKey);
                        });
                    }
                }
            }
            form.reset();
        });
        //} 
    };
    QuestionPage.prototype.insertSubmit = function (tablename, questionKey, formValue) {
        var _this = this;
        return new Promise(function (resolve, rejct) {
            _this.servicesProvider.Insert(tablename, questionKey, formValue).then(function (questionSave33) {
                resolve(questionSave33);
            });
        });
    };
    QuestionPage.prototype.updateCucumber = function () {
        var cucumber;
        console.log('Cucumbers new state:' + cucumber);
    };
    QuestionPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-question',
            templateUrl: 'question.html',
        }),
        __metadata("design:paramtypes", [LoadingController, FormBuilder, ToastController, AioneHelperProvider, AlertController, AioneServicesProvider, NavController, NavParams])
    ], QuestionPage);
    return QuestionPage;
}());
export { QuestionPage };
//# sourceMappingURL=question.js.map