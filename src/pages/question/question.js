var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AlertController } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { TextPage } from '../../pages/text/text';
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
        this.parentMessage = "message from parent";
        this.questions = [];
        this.surveyQuestion = [];
        this.questionCheck = [];
        this.indexArray = 0;
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
    QuestionPage.prototype.ngAfterViewInit = function () {
        // this.message = this.child.message
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
                    console.log(keyvalue);
                    newcollection = [];
                    var newcolumn = [];
                    collection = key[keyvalue];
                    // console.log(collection);
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
            _this.textData(_this.questions, _this.indexArray).then(function () {
            });
        });
    };
    QuestionPage.prototype.textData = function (questions, i) {
        var _this = this;
        console.log(i);
        return new Promise(function (resolve, reject) {
            //console.log(questions[i]);
            _this.OriginalContent = questions[i];
            if (_this.questionCheck.length == 0) {
                _this.previousButton = false;
            }
            else {
                _this.previousButton = true;
            }
        });
    };
    QuestionPage.prototype.next = function (id, tablename, questionKey, formValue) {
        var local = [];
        // console.log(this.questions);
        //  console.log(id);
        console.log(this.questions[id]);
        this.questionCheck.push(this.questions[id]);
        localStorage.setItem("local", JSON.stringify(this.questionCheck));
        var storedNames = JSON.parse(localStorage.getItem("local"));
        console.log(storedNames);
        this.indexArray++;
        this.textData(this.questions, this.indexArray).then(function () {
        });
        // console.log(questionKey);
        console.log(this.questions[id].question_key);
        // this.servicesProvider.SelectWhere(tablename,questionKey,"'"+formValue + "'").then((ans:any)=>{
        //   let localArray=[];
        //   localArray.push(ans.rows[0]);
        //   console.log(localArray);
        //   id++;
        // }) 
    };
    // previous(id){
    //   console.log(id);
    //   id=id-2;
    //   console.log(id);
    //   let questionLength;
    //   questionLength=this.questions.length;
    //   if(id==questionLength){
    //     console.log("there is no data");
    //     this.navCtrl.setRoot(DashboardPage);
    //   }else{
    //     console.log(id);
    //     this.textData(this.questions,id).then(()=>{
    //     });   
    //   }
    // }
    // 
    QuestionPage.prototype.onSubmit = function (formData, id, questionKey, survey_id, questionText, QuestionType) {
        var _this = this;
        console.log(questionKey);
        var i = 0;
        var json;
        if (!formData.valid) {
            console.log("not valid");
            this.Errors = "it is not valid";
        }
        else {
            var formValue_1 = [];
            //console.log(formData.value);
            if (QuestionType == "checkbox") {
                console.log(QuestionType);
                json = JSON.stringify(formData.value);
                formValue_1.push(json);
            }
            else {
                formValue_1.push(formData.value[questionText]);
            }
            console.log(this.indexArray);
            var tablename_1 = "surveyResult_" + survey_id;
            var query = "Select " + questionKey + " from " + tablename_1;
            this.servicesProvider.ExecuteRun(query, []).then(function (result) {
                if (result.rows.length < 1) {
                    console.log("empty");
                    _this.insertSubmit(tablename_1, questionKey, formValue_1).then(function (questionSave) {
                        _this.next(_this.indexArray, tablename_1, questionKey, formValue_1);
                    });
                }
                else {
                    console.log("update");
                    var query_1 = "UPDATE " + tablename_1 + " SET " + questionKey + "= '" + formValue_1 + "'";
                    _this.servicesProvider.ExecuteRun(query_1, []).then(function (questionSave33) {
                        _this.next(_this.indexArray, tablename_1, questionKey, formValue_1);
                    });
                }
            });
        }
        formData.reset();
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
    __decorate([
        ViewChild(TextPage),
        __metadata("design:type", Object)
    ], QuestionPage.prototype, "child", void 0);
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