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
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { ToastController } from 'ionic-angular';
var QuestionPage = /** @class */ (function () {
    function QuestionPage(toastctrl, AioneHelp, alertCtrl, servicesProvider, navCtrl, navParams) {
        this.toastctrl = toastctrl;
        this.AioneHelp = AioneHelp;
        this.alertCtrl = alertCtrl;
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.questions = [];
        this.surveyQuestion = [];
    }
    QuestionPage.prototype.showConfirm = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            message: "Enter Incomplete Survey Name",
            inputs: [
                {
                    placeholder: 'survey name'
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
                        }
                        else {
                            _this.navCtrl.setRoot(DashboardPage);
                            console.log(data);
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    QuestionPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var i = 0;
        var Content = [];
        this.questionTitle = localStorage.getItem("ApplicationName");
        this.questionType = localStorage.getItem("questionType");
        this.id = this.navParams.get('id');
        this.servicesProvider.SelectWhere("questions", "group_id", this.id).then(function (result) {
            Content.push(result.rows);
            //code for converting json 
            var collection;
            var newcollection;
            var replacedArray = [];
            Content.forEach(function (key, value) {
                collection = [];
                Object.keys(key).forEach(function (keyvalue, keydata) {
                    newcollection = [];
                    var newcolumn = [];
                    collection = key[keyvalue];
                    //console.log(collection);
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
                    replacedArray.push(replacedData);
                });
            });
            _this.questions = replacedArray;
            console.log(_this.questions);
            if (_this.questions != undefined) {
                if (_this.questionType == "save_survey") {
                    _this.surveyQuestion = _this.questions;
                    console.log(_this.surveyQuestion);
                }
                else if (_this.questionType == "save_section") {
                }
                else if (_this.questionType == "questions") {
                    var i_1 = 0;
                    _this.textData(_this.questions, i_1).then(function () {
                    });
                }
            }
        });
    };
    QuestionPage.prototype.surveyBasedQuestion = function (questions) {
        return new Promise(function (resolve, reject) {
            console.log(questions);
        });
    };
    QuestionPage.prototype.textData = function (questions, i) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(questions[i]);
            _this.OriginalContent = questions[i];
            if (_this.OriginalContent.serialNo == 1) {
                _this.previousButton = false;
            }
            else {
                _this.previousButton = true;
            }
        });
    };
    QuestionPage.prototype.next = function (id) {
        console.log(id);
        var toast = this.toastctrl.create({
            message: 'Your Enquiry is Submitted',
            duration: 4000,
            position: 'top',
        });
        var questionLength;
        questionLength = this.questions.length;
        if (id == questionLength) {
            toast.present();
            this.navCtrl.setRoot(DashboardPage);
        }
        else {
            console.log(id);
            this.textData(this.questions, id).then(function () {
            });
        }
    };
    QuestionPage.prototype.previous = function (id) {
        console.log(id);
        id = id - 2;
        console.log(id);
        var questionLength;
        questionLength = this.questions.length;
        if (id == questionLength) {
            console.log("there is no data");
            this.navCtrl.setRoot(DashboardPage);
        }
        else {
            console.log(id);
            this.textData(this.questions, id).then(function () {
            });
        }
    };
    QuestionPage.prototype.onSubmit = function (formData, id, questionKey, survey_id, questionText, QuestionType) {
        var _this = this;
        console.log(QuestionType);
        var json;
        if (!formData.valid) {
            console.log("not valid");
        }
        else {
            // console.log("valid");
            var formValue = [];
            console.log(formData.value);
            if (QuestionType == "checkbox") {
                console.log(QuestionType);
                json = JSON.stringify(formData.value);
                formValue.push(json);
            }
            else {
                formValue.push(formData.value[questionText]);
            }
            console.log(formValue);
            var tablename = "surveyResult_" + survey_id;
            //this.servicesProvider.SelectWhere(tablename,questionKey,'"'+formValue+'"').then((result:any)=>{
            //console.log(result.rows.length);
            //if(result.rows.length < 1){
            //console.log("empty");
            this.servicesProvider.Insert(tablename, questionKey, formValue).then(function (questionSave) {
                _this.next(id);
                // });
                // }else{
                //console.log("should be updated");
                // }
            });
        }
        formData.reset();
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
        __metadata("design:paramtypes", [ToastController, AioneHelperProvider, AlertController, AioneServicesProvider, NavController, NavParams])
    ], QuestionPage);
    return QuestionPage;
}());
export { QuestionPage };
//# sourceMappingURL=question.js.map