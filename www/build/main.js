webpackJsonp([3],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_survey_survey__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_aione_helper_aione_helper__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ActivationPage = (function () {
    function ActivationPage(nav, loaderCtrl, http, AioneService, servicepro, formBuilder, Aioneservices, AioneHelp, geolocation, survey, navCtrl, navParams) {
        this.nav = nav;
        this.loaderCtrl = loaderCtrl;
        this.http = http;
        this.AioneService = AioneService;
        this.servicepro = servicepro;
        this.formBuilder = formBuilder;
        this.Aioneservices = Aioneservices;
        this.AioneHelp = AioneHelp;
        this.geolocation = geolocation;
        this.survey = survey;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.submitAttempt = false;
        this.TableCols = [];
        this.ionViewWillEnter();
    }
    ActivationPage.prototype.activation = function () {
        var _this = this;
        this.AioneHelp.internet().then(function (conn) {
            _this.presentLoading("your form is filling");
            _this.CreateSurvey().then(function () {
            });
        });
    };
    ActivationPage.prototype.presentLoading = function (message) {
        this.loader = this.loaderCtrl.create({
            spinner: 'crescent',
            content: "\n      <div class=\"custom-spinner-container\">\n        <div class=\"custom-spinner-box\">" + message + "</div>\n      </div>",
        });
        this.loader.present();
    };
    ActivationPage.prototype.dismissLoader = function () {
        this.loader.dismiss();
        this.presentLoading("your form is submitting Successfully");
    };
    ActivationPage.prototype.CreateSurvey = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var tableName = ["questions", "surveys", "groups", "users", "settings"];
            var dropTable = ["questions", "surveys", "groups", "users", "settings", "surveyResult_157"];
            _this.servicepro.PlatformCheck('asapp').then(function (db) {
                _this.AioneService.DropTable(dropTable).then(function (drop) {
                    console.log(drop);
                    _this.Api().then(function (Apidata) {
                        var i;
                        _this.table(Apidata, tableName, 0).then(function (result) {
                            _this.AioneService.TableBulk(tableName, _this.TableCols).then(function () {
                                _this.dismissLoader();
                                _this.insertUser(Apidata).then(function (user) {
                                    console.log(user);
                                    _this.insertsurveys(Apidata).then(function (surveys) {
                                        _this.insertgroups(Apidata).then(function (groups) {
                                            _this.insertquestions(Apidata).then(function (questions) {
                                                _this.insertsettings(Apidata).then(function (setting) {
                                                    _this.resultSurvey(Apidata.questions, Apidata.surveys).then(function (resultSurvey) {
                                                        if (resultSurvey != undefined) {
                                                            console.log(resultSurvey);
                                                            _this.loader.dismiss();
                                                            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */]);
                                                            // localStorage.setItem("activation", 'Success');
                                                        }
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    ActivationPage.prototype.resultSurvey = function (questions, surveys) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var keyColumns = [];
            var keyqColumns = [];
            var loopLength = 0;
            var surveyresult = [];
            surveys.forEach(function (value, key) {
                keyColumns = [];
                surveyresult.push('surveyResult_' + value.id);
                questions.forEach(function (qValue, qKey) {
                    qValue;
                    var qresult = qValue.question_key + ' TEXT';
                    keyColumns.push(qresult);
                });
                keyqColumns.push(keyColumns);
                loopLength++;
                if (loopLength == surveys.length) {
                    _this.AioneService.TableBulk(surveyresult, keyqColumns).then(function (keyqColumns) {
                        resolve(keyColumns);
                    });
                }
            });
        });
    };
    ActivationPage.prototype.insertquestions = function (Apidata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ("questions" in Apidata) {
                // console.log(Apidata.questions);
                _this.insertExecute(Apidata.questions).then(function (insertExe) {
                    _this.AioneService.InsertBulk("questions", insertExe.dataColumns, insertExe.insertContent).then(function (questions) {
                        resolve(questions);
                    });
                });
            }
        });
    };
    ActivationPage.prototype.insertsettings = function (Apidata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ("settings" in Apidata) {
                _this.insertSingleExecute(Apidata.settings).then(function (settingExe) {
                    _this.AioneService.Insert("settings", settingExe.dataColumns, settingExe.insertContent).then(function (setting) {
                        resolve(setting);
                    });
                });
            }
        });
    };
    ActivationPage.prototype.insertgroups = function (Apidata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ("groups" in Apidata) {
                _this.insertExecute(Apidata.groups).then(function (insertExe) {
                    _this.AioneService.InsertBulk("groups", insertExe.dataColumns, insertExe.insertContent).then(function (surveys) {
                        resolve(surveys);
                    });
                });
            }
        });
    };
    ActivationPage.prototype.insertsurveys = function (Apidata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ("surveys" in Apidata) {
                _this.insertExecute(Apidata.surveys).then(function (insertExe) {
                    _this.AioneService.InsertBulk("surveys", insertExe.dataColumns, insertExe.insertContent).then(function (surveys) {
                        resolve(surveys);
                    });
                });
            }
        });
    };
    ActivationPage.prototype.insertUser = function (Apidata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ("users" in Apidata) {
                _this.insertExecute(Apidata.users).then(function (insertExe) {
                    _this.AioneService.InsertBulk("users", insertExe.dataColumns, insertExe.insertContent).then(function (users) {
                        resolve(users);
                    });
                });
            }
        });
    };
    ActivationPage.prototype.insertSingleExecute = function (result) {
        return new Promise(function (resolve, reject) {
            var insertContent = [];
            var dataColumns = [];
            for (var app_key in result) {
                dataColumns.push(app_key);
                insertContent.push(result[app_key]);
            }
            var collection = {};
            collection['dataColumns'] = dataColumns;
            collection['insertContent'] = insertContent;
            resolve(collection);
        });
    };
    ActivationPage.prototype.insertExecute = function (result) {
        return new Promise(function (resolve, reject) {
            var insertContent = [];
            var dataColumns;
            result.forEach(function (key, value) {
                var dataset = [];
                dataColumns = [];
                Object.keys(key).forEach(function (keyvalue, keydata) {
                    dataset.push(key[keyvalue]);
                    dataColumns.push(keyvalue);
                });
                insertContent.push(dataset);
            });
            var collection = {};
            collection['dataColumns'] = dataColumns;
            collection['insertContent'] = insertContent;
            resolve(collection);
        });
    };
    ActivationPage.prototype.table = function (Apidata, tableName, i) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (tableName[i] != undefined) {
                _this.surveyTable(Apidata, tableName[i]).then(function (dd) {
                    _this.TableCols.push(dd);
                    i = i + 1;
                    return resolve(_this.table(Apidata, tableName, i));
                });
            }
            else {
                resolve('Done');
            }
        });
        return promise;
    };
    ActivationPage.prototype.surveyTable = function (Apidata, table) {
        return new Promise(function (resolve, reject) {
            if (table in Apidata) {
                if ((Apidata[table] instanceof Array)) {
                    Apidata[table].forEach(function (key, value) {
                        var dataset = [];
                        Object.keys(key).forEach(function (keyvalue, keydata) {
                            dataset.push(keyvalue + ' TEXT');
                        });
                        resolve(dataset);
                    });
                }
                else {
                    var dataset = [];
                    for (var apikey in Apidata[table]) {
                        dataset.push(apikey + ' TEXT');
                    }
                    resolve(dataset);
                }
            }
        });
    };
    ActivationPage.prototype.table33 = function (Apidata, tableName, i) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (tableName[i] != undefined) {
                _this.surveyTable(Apidata, tableName[i]).then(function (dd) {
                    _this.TableCols.push(dd);
                    i = i + 1;
                    return resolve(_this.table(Apidata, tableName, i));
                });
            }
            else {
                resolve('Done');
            }
        });
        return promise;
    };
    ActivationPage.prototype.Api = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.loginForm.valid) {
                console.log('not valid');
                _this.loginForm;
            }
            else {
                var headers = new __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Headers */]();
                headers.append('content-type', undefined);
                var formArray = {};
                formArray['activation_key'] = _this.loginForm.value.name;
                _this.http.post('http://master.scolm.com/api/survey_api', formArray, { headers: headers }).subscribe(function (data) {
                    _this.apiresult = data.json();
                    if (_this.apiresult.status == 'error') {
                        _this.loader.dismiss();
                        _this.loginForm.reset();
                        _this.AioneHelp.showAlert("Error", _this.apiresult.message);
                    }
                    else {
                        resolve(_this.apiresult);
                    }
                }, function (err) {
                    console.error(err);
                });
            }
        });
    };
    ActivationPage.prototype.ionViewWillEnter = function () {
        this.loginForm = this.formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].required,
                ])],
        });
    };
    ActivationPage.prototype.location = function () {
        //this.geolocation.getCurrentPosition().then((resp)=>{
        //console.log(resp.coords.latitude); //console.log(resp.coords.longitude);
        //this.CreateSurvey().then(()=>{
        //  });
        //}).catch((error)=>{ console.log(error);
    };
    ActivationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-activation',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/activation/activation.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Activation</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n<h2>Enter Activation code</h2>\n<div *ngIf="loginForm">\n<form [formGroup]="loginForm">\n	<ion-list>\n	  <ion-item>\n	    <ion-label floating>Enter Acitvation code</ion-label>\n	    <ion-input type="text" formControlName="name" [(ngModel)]="name"></ion-input>\n	  </ion-item>\n	  \n	  <button ion-button *ngIf="loginForm.valid" (click)="activation()">Internet</button> \n	   \n	  \n	</ion-list>\n</form>\n</div>\n	\n</ion-content>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/activation/activation.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_5__providers_aione_helper_aione_helper__["a" /* AioneHelperProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_aione_helper_aione_helper__["a" /* AioneHelperProvider */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3__providers_survey_survey__["a" /* SurveyProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_survey_survey__["a" /* SurveyProvider */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _m || Object])
    ], ActivationPage);
    return ActivationPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
}());

//# sourceMappingURL=activation.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_aione_services_aione_services__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_aione_helper_aione_helper__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_survey_survey__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(nav, AioneService, formBuilder, AioneHelp, survey, navCtrl, navParams) {
        this.nav = nav;
        this.AioneService = AioneService;
        this.formBuilder = formBuilder;
        this.AioneHelp = AioneHelp;
        this.survey = survey;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LoginPage.prototype.Login = function () {
        this.username = this.loginUser.value.username;
        this.password = this.loginUser.value.password;
        this.AioneService.SelectWhere("users", "email", "'radha@gmail.com'").then(function (userDetail) {
            console.log(userDetail.rows);
        });
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        this.loginUser = this.formBuilder.group({
            username: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([])],
            password: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([])],
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/login/login.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div *ngIf="loginUser">\n    <form [formGroup]="loginUser">\n    	<ion-list>\n      <ion-item>\n        <ion-label floating>Username</ion-label>\n        <ion-input type="text" formControlName="username" [(ngModel)]="username"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Password</ion-label>\n        <ion-input type="password" formControlName="password" [(ngModel)]="password"></ion-input>\n      </ion-item>\n\n      <button ion-button (click)="Login()">Login</button>\n    	</ion-list>	\n    </form>\n  </div>\n	\n</ion-content>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_aione_services_aione_services__["a" /* AioneServicesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_aione_services_aione_services__["a" /* AioneServicesProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__providers_aione_helper_aione_helper__["a" /* AioneHelperProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_aione_helper_aione_helper__["a" /* AioneHelperProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__providers_survey_survey__["a" /* SurveyProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_survey_survey__["a" /* SurveyProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _g || Object])
    ], LoginPage);
    return LoginPage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 118;

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/activation/activation.module": [
		286,
		2
	],
	"../pages/dashboard/dashboard.module": [
		287,
		0
	],
	"../pages/login/login.module": [
		288,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 160;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(servicesProvider, navCtrl) {
        // setTimeout(function(){
        //            console.log(TableCols[1]);
        //          },2000);
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
        this.bulktable = ['contact', 'testimonials', 'photos'];
        this.colAll = [{ 'id': '1', 'name': 'sharma' },
            { 'id': '2', 'name': 'sharma' },
            { 'id': '3', 'name': 'sharma' },
        ];
        // 		];
        this.colAllkey = ['id', 'name'];
        this.bulkTablekey = [['contactid', 'contdesc'], ['testimonialsid', 'testdesc'], ['photoid', 'photo', 'kjdfjlkd']];
        this.colAllValues = [['1', '<ram/>'], ['2<', 'sita'], ['3', 'sham']];
        this.ColsSingle = { 'id': 'dfkjd', 'name': 'sharma' };
        this.colsinlekey = ['id', 'name'];
        this.values = ['3', 'sharmaji'];
    }
    //database operations
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //this.servicesProvider.PlatfromCheck('Aione');
        //this.servicesProvider.LoadApi('http://aione.oxosolutions.com/api/android/').then(()=>{});
        this.servicesProvider.CreateTable('test', this.colsinlekey);
        this.servicesProvider.TableBulk(this.bulktable, this.bulkTablekey);
        this.servicesProvider.CreateTable('testing', this.colsinlekey);
        // this.servicesProvider.Insert('test', this.colsinlekey, this.values).then((res:any)=>{
        //    console.log(res);})
        // this.servicesProvider.InsertBulk('testing',this.colAllkey, this.colAllValues).then((result)=>{
        //    //console.log(result);
        //  });
        // this.servicesProvider.DeleteAll('test').then(()=>{});
        // this.servicesProvider.DeleteWhere('test', 'name', '"sharmaji"').then(()=>{});
        this.servicesProvider.SelectAll('testing').then(function (rsult) {
            _this.resultSelect = rsult.rows;
            console.log(_this.resultSelect);
            _this.servicesProvider.StringReplaceBulk(_this.resultSelect).then(function () { });
        });
        this.servicesProvider.SelectWhere('testing', 'name', "'<ram/>'").then(function () { });
        this.servicesProvider.selectAllLimit('testing', 2).then(function () { });
        // this.servicesProvider.DropTable('testing');  	
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  \n<button ion-button secondary menuToggle>Toggle Menu</button>\n</ion-content>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__["a" /* AioneServicesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_aione_helper_aione_helper__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ListPage = (function () {
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <button ion-button (click)="Device()">Default</button>\n \n  <span>{{result}}</span>\n  <ion-card-content>\n    Latest Picture:\n   \n    <img [src]="(base64Image)" *ngIf="base64Image" />\n  </ion-card-content>\n  <button ion-button (click)="camera1()">Camera</button>\n  <button ion-button (click)="internetCheck()">Internet</button> \n  <button ion-button (click)="wifiCheck()">Wifi</button>'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_2__providers_aione_helper_aione_helper__["a" /* AioneHelperProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(234);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_aione_services_aione_services__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_aione_helper_aione_helper__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_calendar__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_device__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_survey_survey__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_activation_activation__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_geolocation__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_login_login__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_activation_activation__["a" /* ActivationPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */]
            ],
            //exports: [AioneServicesProvider],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/activation/activation.module#ActivationPageModule', name: 'ActivationPage', segment: 'activation', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_14__angular_http__["c" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_activation_activation__["a" /* ActivationPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                // HttpModule,
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_aione_services_aione_services__["a" /* AioneServicesProvider */],
                __WEBPACK_IMPORTED_MODULE_9__providers_aione_helper_aione_helper__["a" /* AioneHelperProvider */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_calendar__["a" /* Calendar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_16__providers_survey_survey__["a" /* SurveyProvider */], __WEBPACK_IMPORTED_MODULE_18__ionic_native_geolocation__["a" /* Geolocation */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_aione_services_aione_services__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_activation_activation__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(servicesProvider, platform, statusBar, splashScreen) {
        this.servicesProvider = servicesProvider;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.initializeApp();
        this.pages = [
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] },
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] }
        ];
        var storgae = localStorage.getItem("activation");
        console.log(storgae);
        // if(localStorage.getItem("activation") != undefined){
        //   this.rootPage=LoginPage;     
        // }else{
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_activation_activation__["a" /* ActivationPage */];
        // }
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n       <button ion-button menuToggle>\n      <ion-icon name="close"></ion-icon>\n    </button>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/app/app.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__providers_aione_services_aione_services__["a" /* AioneServicesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AioneServicesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { HTTP } from '@ionic-native/http';


var AioneServicesProvider = (function () {
    function AioneServicesProvider(platform, sqlite) {
        this.platform = platform;
        this.sqlite = sqlite;
        this.slugs = [];
        this.AppkitProducts = [];
        console.log('Hello AioneServicesProvider Provider');
    }
    AioneServicesProvider.prototype.check = function (tableName) {
        // if(this.db!= undefined){
        this.query = 'Select * from ' + tableName;
        console.log(this.query);
        this.ExecuteRun(this.query, []).then(function (selectresult) {
            console.log(selectresult);
            console.log('check');
            //resolve(selectresult);
        });
        // }
    };
    AioneServicesProvider.prototype.PlatformCheck = function (databaseName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('cordova')) {
                _this.sqlite.create({ name: databaseName, location: 'default' }).then(function (data) {
                    _this.db = data;
                    //console.log(this.db);
                    resolve(_this.db);
                });
            }
            else {
                _this.db = window.openDatabase(databaseName, '1', 'my', 1024 * 1024 * 100);
                //console.log(this.db); 
                resolve(_this.db);
            }
        });
    };
    AioneServicesProvider.prototype.ExecuteRun = function (query, DataValue) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.query != undefined && _this.db != undefined) {
                if (_this.platform.is('cordova')) {
                    _this.db.executeSql(query, DataValue, function (executeResult) {
                        resolve(executeResult);
                    }, function (error) {
                        console.log(error);
                    });
                }
                else {
                    _this.db.transaction(function (tx) {
                        tx.executeSql(query, DataValue, function (tx, executeResult) {
                            resolve(executeResult);
                        }, function (error) {
                            console.log(_this.query);
                            console.log(error);
                        });
                    });
                }
            }
        });
    };
    AioneServicesProvider.prototype.CreateTable = function (TableName, Col) {
        if (this.db != undefined) {
            this.query = "CREATE TABLE IF NOT EXISTS " + TableName + ' (' + Col + ')';
            console.log(this.query);
            this.ExecuteRun(this.query, []).then(function (res) {
                console.log(res);
            });
        }
    };
    AioneServicesProvider.prototype.TableBulk = function (TableName, Col) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // console.log(Col);
            if (_this.db != undefined) {
                for (var i = 0; i < TableName.length; i++) {
                    _this.query = "CREATE TABLE IF NOT EXISTS " + TableName[i] + ' (' + Col[i] + ')';
                    //console.log(this.query);
                    _this.ExecuteRun(_this.query, []).then(function (res) {
                    });
                }
            }
            resolve("yes");
        });
    };
    AioneServicesProvider.prototype.Insert = function (tableName, Cols, Values) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var questionMarks = [];
            if (_this.db != undefined) {
                var questionMarks_1 = [];
                for (var j = 0; j < Values.length; j++) {
                    questionMarks_1.push("?");
                }
                _this.query = 'insert into ' + tableName + '(' + Cols + ') VALUES (' + questionMarks_1 + ')';
                //console.log(this.query);
                _this.ExecuteRun(_this.query, Values).then(function (insertRes) {
                    resolve(insertRes);
                });
            }
        });
    };
    AioneServicesProvider.prototype.InsertBulk = function (tableName, Cols, Values) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db != undefined) {
                var CollectedData = [];
                for (var i = 0; i < Values.length; i++) {
                    var ValuesArray = [];
                    for (var j = 0; j < Values[i].length; j++) {
                        ValuesArray.push('"' + Values[i][j] + '"');
                    }
                    CollectedData.push("(" + ValuesArray.join(',') + ")");
                } //console.log(CollectedData)
                _this.query = 'INSERT INTO ' + tableName + ' ( ' + Cols.join(',') + ' ) VALUES ' + CollectedData.join(',');
                //console.log(this.query);
                _this.ExecuteRun(_this.query, []).then(function (Bulkres) { resolve(Bulkres); });
            }
        });
    };
    AioneServicesProvider.prototype.DeleteAll = function (tableName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db != undefined) {
                _this.query = 'Delete  from ' + tableName;
                console.log(_this.query);
                _this.ExecuteRun(_this.query, []).then(function (Delresult) {
                    console.log(Delresult);
                });
            }
        });
    };
    AioneServicesProvider.prototype.DeleteWhere = function (tableName, Where, Value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db != undefined) {
                _this.query = 'Delete  from ' + tableName + ' where ' + Where + ' = ' + Value;
                console.log(_this.query);
                _this.ExecuteRun(_this.query, []).then(function (Delres) {
                    console.log(Delres);
                });
            }
        });
    };
    AioneServicesProvider.prototype.SelectAll = function (tableName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db != undefined) {
                _this.query = 'Select * from ' + tableName;
                _this.ExecuteRun(_this.query, []).then(function (selectresult) {
                    resolve(selectresult);
                });
            }
        });
    };
    AioneServicesProvider.prototype.SelectWhere = function (tableName, Where, Value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db != undefined) {
                _this.query = 'Select * from ' + tableName + ' where ' + Where + ' = ' + Value;
                console.log(_this.query);
                _this.ExecuteRun(_this.query, []).then(function (SelResult) {
                    resolve(SelResult);
                });
            }
        });
    };
    AioneServicesProvider.prototype.selectAllLimit = function (tableName, limit) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db != undefined) {
                _this.query = 'Select * From ' + tableName + ' LIMIT ' + limit;
                console.log(_this.query);
                _this.ExecuteRun(_this.query, []).then(function (selLimitResult) {
                    console.log(selLimitResult);
                });
            }
        });
    };
    AioneServicesProvider.prototype.DropTable = function (tableName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db != undefined) {
                //console.log(Col);		
                for (var i = 0; i < tableName.length; i++) {
                    _this.query = 'DROP Table IF  EXISTS ' + tableName[i];
                    console.log(_this.query);
                    _this.ExecuteRun(_this.query, []).then(function (res) {
                        resolve(res);
                    });
                }
            }
        });
    };
    AioneServicesProvider.prototype.SelectUnion = function (tableName1, tableName2) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.query = 'SELECT * FROM ' + tableName1 + ' UNION SELECT * FROM ' + tableName2;
            console.log(_this.query);
        });
    };
    AioneServicesProvider.prototype.StringReplaceBulk = function (result) {
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < result.length; i++) {
                //result[i]=result.item(i);
                var replace = [];
                for (var key in result[i]) {
                    //console.log(result[i][key]);
                    if (typeof (key) != 'string') {
                        console.log('id');
                    }
                    else {
                        result[i][key] = result[i][key].replace(/&lt;/g, "<")
                            .replace(/&gt;/g, ">")
                            .replace(/&quot;/g, '"')
                            .replace(/&#039;/g, "'");
                    }
                    replace.push(result[i][key]);
                } //console.log(replace);
            }
        });
    };
    AioneServicesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]) === "function" && _b || Object])
    ], AioneServicesProvider);
    return AioneServicesProvider;
    var _a, _b;
}());

//# sourceMappingURL=aione-services.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AioneHelperProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_calendar__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_device__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(18);
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






var AioneHelperProvider = (function () {
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_calendar__["a" /* Calendar */]])
    ], AioneHelperProvider);
    return AioneHelperProvider;
}());

//# sourceMappingURL=aione-helper.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SurveyProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_aione_services_aione_services__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SurveyProvider = (function () {
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1__providers_aione_services_aione_services__["a" /* AioneServicesProvider */], __WEBPACK_IMPORTED_MODULE_1__providers_aione_services_aione_services__["a" /* AioneServicesProvider */]])
    ], SurveyProvider);
    return SurveyProvider;
}());

//# sourceMappingURL=survey.js.map

/***/ })

},[211]);
//# sourceMappingURL=main.js.map