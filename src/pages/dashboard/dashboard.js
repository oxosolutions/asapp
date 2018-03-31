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
import { ListsurveyPage } from '../../pages/listsurvey/listsurvey';
import { RecordListPage } from '../../pages/record-list/record-list';
var DashboardPage = /** @class */ (function () {
    function DashboardPage(servicesProvider, navCtrl, navParams) {
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    DashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.servicesProvider.SelectAll("settings").then(function (result) {
            _this.dashboard = result.rows[0];
            console.log(_this.dashboard);
            localStorage.setItem("ApplicationName", _this.dashboard.android_application_title);
        });
    };
    DashboardPage.prototype.recordList = function () {
        this.navCtrl.setRoot(RecordListPage);
    };
    DashboardPage.prototype.listSurvey = function () {
        this.navCtrl.setRoot(ListsurveyPage);
    };
    DashboardPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-dashboard',
            templateUrl: 'dashboard.html',
        }),
        __metadata("design:paramtypes", [AioneServicesProvider, NavController, NavParams])
    ], DashboardPage);
    return DashboardPage;
}());
export { DashboardPage };
//# sourceMappingURL=dashboard.js.map