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
import { NavController, NavParams } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { Camera } from '@ionic-native/camera';
var ListPage = /** @class */ (function () {
    function ListPage(camera, AioneHelp, navCtrl, navParams) {
        this.camera = camera;
        this.AioneHelp = AioneHelp;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ListPage.prototype.Device = function () {
        var result123;
        this.result = this.AioneHelp.deviceInfo();
    };
    ListPage.prototype.internetCheck = function () {
        this.AioneHelp.internet();
    };
    ListPage.prototype.wifiCheck = function () {
        this.AioneHelp.wifi();
    };
    ListPage.prototype.camera1 = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
        });
    };
    ListPage = __decorate([
        Component({
            selector: 'page-list',
            templateUrl: 'list.html'
        }),
        __metadata("design:paramtypes", [Camera, AioneHelperProvider, NavController, NavParams])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.js.map