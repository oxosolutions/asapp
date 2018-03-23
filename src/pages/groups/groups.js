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
var GroupsPage = /** @class */ (function () {
    function GroupsPage(servicesProvider, navCtrl, navParams) {
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    GroupsPage.prototype.questionid = function (id) {
        console.log(this.surveyType);
        if (this.surveyType == "section") {
            this.navCtrl.push(SectionalQuestionsPage, { 'id': id });
        }
        else {
            this.navCtrl.setRoot(QuestionPage, { 'id': id });
        }
    };
    GroupsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.groupTitle = localStorage.getItem("ApplicationName");
        this.ids = this.navParams.get('id');
        this.surveyType = this.navParams.get('type');
        console.log(this.surveyType);
        console.log(this.ids);
        this.servicesProvider.SelectWhere("groups", "survey_id", this.ids).then(function (result) {
            _this.groupsResult = result.rows;
            //console.log(this.groupsResult);
            // this.servicesProvider.SelectWhere("survey_meta","form_id",this.ids).then((form:any)=>{
            //   for(var keys in form.rows){
            //     if(form.rows[keys].value == "survey"){
            //       localStorage.setItem("questionType", 'save_survey');
            //     }else if(form.rows[keys].value == "section"){
            //       localStorage.setItem("questionType", 'save_section');
            //     }else if(form.rows[keys].value == "question"){
            //       localStorage.setItem("questionType", 'questions');
            //     }
            //     }
            //   })
        });
    };
    GroupsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-groups',
            templateUrl: 'groups.html',
        }),
        __metadata("design:paramtypes", [AioneServicesProvider, NavController, NavParams])
    ], GroupsPage);
    return GroupsPage;
}());
export { GroupsPage };
//# sourceMappingURL=groups.js.map