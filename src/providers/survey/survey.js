var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormBuilder } from '@angular/forms';
var SurveyProvider = /** @class */ (function () {
    function SurveyProvider(formBuilder, http, AioneService, servicepro) {
        this.formBuilder = formBuilder;
        this.http = http;
        this.AioneService = AioneService;
        this.servicepro = servicepro;
        this.TableCols = [];
        this.submitAttempt = false;
        // this.ionViewWillEnter();
    }
    SurveyProvider.prototype.details = function () {
        return new Promise(function (resolve) {
            // this.AioneService.SelectAll("users").then((userDetail:any)=>{
            //   console.log('skdjf')
            //   console.log(userDetail);
            // })
            //   console.log('dkejf');
        });
    };
    SurveyProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [FormBuilder, Http, AioneServicesProvider, AioneServicesProvider])
    ], SurveyProvider);
    return SurveyProvider;
}());
export { SurveyProvider };
//# sourceMappingURL=survey.js.map