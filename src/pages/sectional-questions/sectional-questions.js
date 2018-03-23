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
var SectionalQuestionsPage = /** @class */ (function () {
    function SectionalQuestionsPage(servicesProvider, navCtrl, navParams) {
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SectionalQuestionsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad SectionalQuestionsPage');
        var i = 0;
        var Content = [];
        this.questionTitle = localStorage.getItem("ApplicationName");
        // this.questionType=localStorage.getItem("questionType");
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
            // if(this.questions != undefined){
            //   if(this.questionType == "save_survey"){
            //     this.surveyQuestion=this.questions;
            //     console.log(this.surveyQuestion);    
            //   }else if(this.questionType == "save_section"){
            //   }else if(this.questionType == "questions"){
            //     let i=0;
            //     this.textData(this.questions, i).then(()=>{
            //     });
            //   }    
            // }
        });
    };
    SectionalQuestionsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-sectional-questions',
            templateUrl: 'sectional-questions.html',
        }),
        __metadata("design:paramtypes", [AioneServicesProvider, NavController, NavParams])
    ], SectionalQuestionsPage);
    return SectionalQuestionsPage;
}());
export { SectionalQuestionsPage };
//# sourceMappingURL=sectional-questions.js.map