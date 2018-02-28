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
var QuestionPage = /** @class */ (function () {
    function QuestionPage(alertCtrl, servicesProvider, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.questions = [];
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
        var single;
        var i = 0;
        this.questionTitle = localStorage.getItem("ApplicationName");
        this.id = this.navParams.get('id');
        this.servicesProvider.SelectWhere("questions", "group_id", this.id).then(function (result) {
            _this.questions.push(result.rows);
            // for(let i=0; i< this.questions.length; i++){
            //   console.log(this.questions[i]);
            // }
            _this.questions.forEach(function (value, key) {
                //   let i;
                //   // this.textData(value,0).then(()=>{
                //   // })
            });
        });
    };
    QuestionPage.prototype.textData = function (result, i) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (result[i] != undefined) {
                console.log(result[i]);
                _this.questionsResult(result[i]).then(function () {
                    i = i + 1;
                    return resolve(_this.textData(result, i));
                });
            }
            else {
                console.log("else data");
            }
        });
        return promise;
    };
    QuestionPage.prototype.questionsResult = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.OriginalContent = data;
        });
    };
    QuestionPage.prototype.next = function () {
        console.log("next");
    };
    QuestionPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-question',
            templateUrl: 'question.html',
        }),
        __metadata("design:paramtypes", [AlertController, AioneServicesProvider, NavController, NavParams])
    ], QuestionPage);
    return QuestionPage;
}());
export { QuestionPage };
//# sourceMappingURL=question.js.map