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
import { QuestionPage } from '../../pages/question/question';
import { SectionalQuestionsPage } from '../sectional-questions/sectional-questions';
import { AlertController } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
var GroupsPage = /** @class */ (function () {
    //recordId:any;
    function GroupsPage(AioneHelp, alertCtrl, servicesProvider, navCtrl, navParams) {
        this.AioneHelp = AioneHelp;
        this.alertCtrl = alertCtrl;
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    GroupsPage.prototype.questionid = function (id, serialNo) {
        var _this = this;
        localStorage.setItem("Groupid", id);
        this.completedSurvey().then(function (resutlcomplete) {
            //this.sectionCompleteCheck().then((sectionCheck:any)=>{
            console.log(resutlcomplete);
            if (_this.surveyType == "section") {
                _this.navCtrl.push(SectionalQuestionsPage, { 'id': id });
            }
            else {
                localStorage.setItem("lastquestionIndex", "" + 0 + "");
                _this.navCtrl.setRoot(QuestionPage, { 'id': id, 'completed': resutlcomplete, 'InCompleteStatus': _this.navParams.get("InCompleteStatus") });
            }
            //})
        });
    };
    GroupsPage.prototype.completedSurvey = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // checking it is coming from completed review record or bydefault
            if (_this.navParams.get("completed") != null) {
                console.log("review record check");
                localStorage.setItem("fillingQuestion", "" + 1 + "");
                resolve(_this.navParams.get("completed"));
            }
            else {
                console.log("emply only questions");
                localStorage.setItem("fillingQuestion", "" + 1 + "");
                resolve("");
            }
        });
    };
    GroupsPage.prototype.sectionCompleteCheck = function () {
        //checking it is coming from questions after completing section
        return new Promise(function (resolve, reject) {
            if (localStorage.getItem('completedGroups') != "null") {
                console.log("data get from database");
                resolve("");
            }
            else {
                // console.log("first tym survey fill")
                // localStorage.setItem('fillingQuestion',""+1+"");
                resolve("");
            }
        });
    };
    GroupsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.groupTitle = localStorage.getItem("ApplicationName");
        this.ids = localStorage.getItem('Surveyid');
        this.surveyType = localStorage.getItem('questionType');
        this.servicesProvider.SelectWhere("groups", "survey_id", this.ids).then(function (result) {
            //console.log(result.rows.item);
            var rowww = [];
            rowww = result.rows.item(i);
            //console.log(result.rows);
            var row = [];
            for (var i = 0; i < result.rows.length; i++) {
                row[i] = result.rows.item(i);
            }
            var SurveyData = row;
            _this.groupsResult = SurveyData;
            console.log(_this.groupsResult);
            localStorage.setItem("totalGroup", _this.groupsResult.length);
        });
    };
    GroupsPage.prototype.getCSSClasses = function (someValue) {
        if (localStorage.getItem('completedGroups') != null) {
            localStorage.setItem("lastquestionIndex", "" + null + "");
            if (localStorage.getItem('completedGroups').indexOf(someValue) == -1)
                return "ll";
            else
                return "completed";
        }
        else {
            return "dfdf";
        }
    };
    GroupsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-groups',
            templateUrl: 'groups.html',
        }),
        __metadata("design:paramtypes", [AioneHelperProvider, AlertController, AioneServicesProvider, NavController, NavParams])
    ], GroupsPage);
    return GroupsPage;
}());
export { GroupsPage };
//# sourceMappingURL=groups.js.map