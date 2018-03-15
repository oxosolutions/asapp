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
import { PopoverController } from 'ionic-angular';
import { CompletedSurveyPage } from '../../pages/completed-survey/completed-survey';
import { IncompletedSurveyPage } from '../../pages/incompleted-survey/incompleted-survey';
var RecordListPage = /** @class */ (function () {
    function RecordListPage(servicesProvider, navCtrl, navParams, popoverCtrl) {
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.listSurvey = [];
        this.test = 'false';
    }
    RecordListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.recordTitle = localStorage.getItem("ApplicationName");
        this.servicesProvider.SelectAll("surveys").then(function (survey) {
            _this.listSurvey.push(survey.rows);
            console.log(_this.listSurvey);
        });
    };
    RecordListPage.prototype.presentPopover = function () {
        var popover = this.popoverCtrl.create(GroupsPage);
        popover.present();
    };
    RecordListPage.prototype.completedSurveyPage = function () {
        this.navCtrl.push(CompletedSurveyPage);
    };
    RecordListPage.prototype.incompletedSurveyPage = function () {
        this.navCtrl.push(IncompletedSurveyPage);
    };
    RecordListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-record-list',
            templateUrl: 'record-list.html',
        }),
        __metadata("design:paramtypes", [AioneServicesProvider, NavController, NavParams, PopoverController])
    ], RecordListPage);
    return RecordListPage;
}());
export { RecordListPage };
//# sourceMappingURL=record-list.js.map