var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';
import { Device } from '@ionic-native/device';
import { Camera } from '@ionic-native/camera';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';
var AioneHelperProvider = /** @class */ (function () {
    function AioneHelperProvider(alert, network, camera, device, calender) {
        this.alert = alert;
        this.network = network;
        this.camera = camera;
        this.device = device;
        this.calender = calender;
        this.DeviceInfo = {};
        this.message = 'hello';
        console.log('Hello AioneHelperProvider Provider');
    }
    AioneHelperProvider.prototype.deviceInfo = function () {
        this.DeviceInfo['cordova'] = this.device.cordova;
        this.DeviceInfo['model'] = this.device.model;
        this.DeviceInfo['platform'] = this.device.platform;
        this.DeviceInfo['version'] = this.device.version;
        this.DeviceInfo['manufacturer'] = this.device.manufacturer;
        this.DeviceInfo['serial'] = this.device.serial;
        return this.DeviceInfo['model'];
    };
    AioneHelperProvider.prototype.internet = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.network.onConnect().subscribe()) {
                if (_this.network.type === 'none') {
                    _this.showAlert('Disconnected !!', 'No Internet Connection');
                    resolve('not connecton');
                }
                else {
                    //this.showAlert('Connected !!','You have an internet connection');	
                }
                resolve('yes connected');
            }
        });
    };
    AioneHelperProvider.prototype.showAlert = function (hello, message) {
        var alert = this.alert.create({
            title: hello,
            subTitle: message,
            buttons: ['ok']
        });
        alert.present();
    };
    AioneHelperProvider.prototype.wifi = function () {
        if (this.network.onConnect().subscribe()) {
            if (this.network.type === 'wifi') {
                this.showAlert('Wifi connected', 'you got a Wifi Connection');
            }
            else {
                this.showAlert('Disconnected ', 'Wifi Connection has been lost');
            }
        }
    };
    AioneHelperProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AlertController, Network, Camera,
            Device, Calendar])
    ], AioneHelperProvider);
    return AioneHelperProvider;
}());
export { AioneHelperProvider };
//# sourceMappingURL=aione-helper.js.map