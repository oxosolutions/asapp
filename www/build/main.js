webpackJsonp([13],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AboutPage = (function () {
    function AboutPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AboutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutPage');
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/about/about.html"*/'<!--\n  Generated template for the AboutPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n	<ion-navbar>\n		<button ion-button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>About</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	<div></div>\n</ion-content>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/about/about.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_survey_survey__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_aione_helper_aione_helper__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(55);
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
            var tableName = ["questions", "surveys", "groups", "users", "settings", "survey_meta"];
            var dropTable = ["questions", "surveys", "groups", "users", "settings", "survey_meta"];
            _this.AioneService.DropTable(dropTable).then(function (drop) {
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
                                                _this.insersurveyMeta(Apidata).then(function (survey_meta) {
                                                    _this.resultSurvey(Apidata.questions, Apidata.surveys).then(function (resultSurvey) {
                                                        if (resultSurvey != undefined) {
                                                            console.log(resultSurvey);
                                                            _this.loader.dismiss();
                                                            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */]);
                                                            localStorage.setItem("activation", 'Success');
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
            //console.log(surveys);
            surveys.forEach(function (value, key) {
                keyColumns = [];
                surveyresult.push('surveyResult_' + value.id);
                keyColumns.push('serialNo INTEGER PRIMARY KEY AUTOINCREMENT');
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
    ActivationPage.prototype.insersurveyMeta = function (Apidata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ("survey_meta" in Apidata) {
                _this.insertExecute(Apidata.survey_meta).then(function (insertExe) {
                    console.log(insertExe);
                    _this.AioneService.InsertBulk("survey_meta", insertExe.dataColumns, insertExe.insertContent).then(function (surveys) {
                        resolve(surveys);
                    });
                });
            }
        });
    };
    ActivationPage.prototype.insertquestions = function (Apidata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ("questions" in Apidata) {
                console.log(Apidata.questions);
                _this.insertExecuteObject(Apidata.questions).then(function (insertExe) {
                    _this.AioneService.InsertBulk("questions", insertExe.dataColumns, insertExe.insertContent).then(function (questions) {
                        resolve(questions);
                    });
                });
            }
        });
    };
    ActivationPage.prototype.insertExecuteObject = function (result) {
        return new Promise(function (resolve, reject) {
            var insertContent = [];
            var dataColumns;
            console.log(result);
            result.forEach(function (key, value) {
                var dataset = [];
                dataColumns = [];
                Object.keys(key).forEach(function (keyvalue, keydata) {
                    var json;
                    var anotherjson;
                    //console.log(key[keyvalue]);
                    if (typeof key[keyvalue] == "object") {
                        anotherjson = JSON.stringify(key[keyvalue]);
                        json = anotherjson.replace(/"/g, "'");
                    }
                    else {
                        json = key[keyvalue];
                    }
                    dataset.push(json);
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
                        dataset.push('serialNo INTEGER PRIMARY KEY AUTOINCREMENT');
                        Object.keys(key).forEach(function (keyvalue, keydata) {
                            dataset.push(keyvalue + ' TEXT');
                        });
                        resolve(dataset);
                    });
                }
                else {
                    var dataset = [];
                    dataset.push('serialNo INTEGER PRIMARY KEY AUTOINCREMENT');
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
                        console.log(_this.apiresult);
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
            selector: 'page-activation',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/activation/activation.html"*/'<ion-content padding color="headerClassic">\n	<div class="activation-page-content-wrapper" *ngIf="loginForm">\n		<div class="activation-page-content">\n			<div class="app-title">IRIS</div>\n			<div class="app-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>\n		</div>\n		<div class="activation-field-wrapper">\n			<form [formGroup]="loginForm">\n			    <div class="field-wrapper">\n			    	<ion-input type="text" formControlName="name" [(ngModel)]="name" placeholder="Enter Activation Code"></ion-input>\n			    </div>\n			    <div class="button-wrapper">\n			    	<button ion-button class="verify-button"  (click)="activation()">Verify</button>\n			    </div>\n			    <div class="clearfix">\n			    	\n			    </div>\n			</form>	\n		</div>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/activation/activation.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_5__providers_aione_helper_aione_helper__["a" /* AioneHelperProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_aione_helper_aione_helper__["a" /* AioneHelperProvider */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3__providers_survey_survey__["a" /* SurveyProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_survey_survey__["a" /* SurveyProvider */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _m || Object])
    ], ActivationPage);
    return ActivationPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
}());

//# sourceMappingURL=activation.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_dashboard_dashboard__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_aione_helper_aione_helper__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var QuestionPage = (function () {
    function QuestionPage(toastctrl, AioneHelp, alertCtrl, servicesProvider, navCtrl, navParams) {
        this.toastctrl = toastctrl;
        this.AioneHelp = AioneHelp;
        this.alertCtrl = alertCtrl;
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.questions = [];
        this.surveyQuestion = [];
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
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_dashboard_dashboard__["a" /* DashboardPage */]);
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
        var i = 0;
        var Content = [];
        this.questionTitle = localStorage.getItem("ApplicationName");
        this.questionType = localStorage.getItem("questionType");
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
                    //console.log(collection);
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
            if (_this.questions != undefined) {
                if (_this.questionType == "save_survey") {
                    _this.surveyQuestion = _this.questions;
                    console.log(_this.surveyQuestion);
                }
                else if (_this.questionType == "save_section") {
                }
                else if (_this.questionType == "questions") {
                    var i_1 = 0;
                    _this.textData(_this.questions, i_1).then(function () {
                    });
                }
            }
        });
    };
    QuestionPage.prototype.surveyBasedQuestion = function (questions) {
        return new Promise(function (resolve, reject) {
            console.log(questions);
        });
    };
    QuestionPage.prototype.textData = function (questions, i) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(questions[i]);
            _this.OriginalContent = questions[i];
            if (_this.OriginalContent.serialNo == 1) {
                _this.previousButton = false;
            }
            else {
                _this.previousButton = true;
            }
        });
    };
    QuestionPage.prototype.next = function (id) {
        console.log(id);
        var toast = this.toastctrl.create({
            message: 'Your Enquiry is Submitted',
            duration: 4000,
            position: 'top',
        });
        var questionLength;
        questionLength = this.questions.length;
        if (id == questionLength) {
            toast.present();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_dashboard_dashboard__["a" /* DashboardPage */]);
        }
        else {
            console.log(id);
            this.textData(this.questions, id).then(function () {
            });
        }
    };
    QuestionPage.prototype.previous = function (id) {
        console.log(id);
        id = id - 2;
        console.log(id);
        var questionLength;
        questionLength = this.questions.length;
        if (id == questionLength) {
            console.log("there is no data");
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_dashboard_dashboard__["a" /* DashboardPage */]);
        }
        else {
            console.log(id);
            this.textData(this.questions, id).then(function () {
            });
        }
    };
    QuestionPage.prototype.onSubmit = function (formData, id, questionKey, survey_id, questionText, QuestionType) {
        var _this = this;
        console.log(QuestionType);
        var json;
        if (!formData.valid) {
            console.log("not valid");
        }
        else {
            // console.log("valid");
            var formValue = [];
            console.log(formData.value);
            if (QuestionType == "checkbox") {
                console.log(QuestionType);
                json = JSON.stringify(formData.value);
                formValue.push(json);
            }
            else {
                formValue.push(formData.value[questionText]);
            }
            console.log(formValue);
            var tablename = "surveyResult_" + survey_id;
            //this.servicesProvider.SelectWhere(tablename,questionKey,'"'+formValue+'"').then((result:any)=>{
            //console.log(result.rows.length);
            //if(result.rows.length < 1){
            //console.log("empty");
            this.servicesProvider.Insert(tablename, questionKey, formValue).then(function (questionSave) {
                _this.next(id);
                // });
                // }else{
                //console.log("should be updated");
                // }
            });
        }
        formData.reset();
    };
    QuestionPage.prototype.updateCucumber = function () {
        var cucumber;
        console.log('Cucumbers new state:' + cucumber);
    };
    QuestionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-question',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/question/question.html"*/'<ion-header>\n\n  <ion-navbar color="headerClassic">\n  <button ion-button menuToggle>\n  <ion-icon name="menu"></ion-icon>\n  </button>\n     <ion-title><!-- <span *ngIf="questionTitle">{{questionTitle}}</span> -->\n     	Section: Demo Survey\n     </ion-title>\n    \n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n	<div class="card">\n		<span class="question-number">\n			Question 1\n		</span>\n		of 20\n		<div class="question-text">\n			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros magna ?\n		</div>\n		<div class="question-options">\n			\n		</div>\n		\n	</div>\n	<div class="action-buttons">\n		<button ion-button class="previous">Previous</button>\n		<button ion-button color="secondary" class="stop">Stop</button>\n		<button ion-button class="next">Next</button>\n	</div>\n	<!-- survey based-->\n	<ion-list style="display: none">\n		<ion-item *ngFor="let survey of surveyQuestion">\n          	<h1>{{survey?.question_text}}</h1>\n          	<p>{{survey?.question_desc}}</p>\n          	<p>{{survey.serialNo}}</p>\n           	<p>{{survey?.question_type}}</p>\n  		</ion-item>\n	</ion-list>\n\n\n	<!--question based-->\n	<div *ngIf ="OriginalContent" style="display: none">\n		<h1>{{OriginalContent?.question_text}}</h1>\n			<p>{{OriginalContent?.idss}}</p>\n			<p>{{OriginalContent?.question_desc}}</p>\n			\n      	<form #myForm=\'ngForm\' (ngSubmit)="onSubmit(myForm,OriginalContent.serialNo,OriginalContent.question_key,OriginalContent.survey_id,OriginalContent?.question_text,OriginalContent?.question_type)">\n			<div [ngSwitch]="OriginalContent?.question_type">\n\n					<!--text-->\n			    <div *ngSwitchCase="\'text\'">\n				    <ion-item>\n					    <ion-label floating>{{OriginalContent?.question_text}}</ion-label>\n					    <ion-input type="text" [(ngModel)]="name" name="{{OriginalContent?.question_text}}" required></ion-input>\n					  </ion-item>\n			    </div>\n\n			    <!--select-->\n		      	<div *ngSwitchCase="\'select\'">\n		        	<ion-item>\n					    <ion-label>{{OriginalContent?.question_text}}</ion-label>\n					    <ion-select [(ngModel)]="name" name="{{OriginalContent?.question_text}}">\n					    	<ion-option *ngFor = "let opt of OriginalContent?.answers[0]">\n					    	<ion-option value="{{opt?.option_value}}">{{opt?.option_text}}</ion-option>\n					    	</ion-option>\n					      \n					    </ion-select>\n  					</ion-item>\n		      	</div>\n\n		      <!--checkbox-->\n		      <div *ngSwitchCase="\'checkbox\'">\n		      	<ion-list >\n						  <ion-item *ngFor="let check of OriginalContent?.answers[0]">\n							  <ion-label>{{check?.option_text}}</ion-label>\n							  <ion-checkbox  [(ngModel)]="check.selected" name="{{check.option_text}}"\n							   color="red" ></ion-checkbox>\n							</ion-item>\n						</ion-list>\n		      </div>\n\n		      <!--radio button-->\n		      <div *ngSwitchCase="\'radio\'">\n		      	<ion-list radio-group [(ngModel)]="name" name="{{OriginalContent?.question_text}}">\n						  <ion-item *ngFor = "let radio of OriginalContent?.answers[0]">\n						    <ion-label>{{radio?.option_text}}</ion-label>\n						    <ion-radio value="{{radio?.option_text}}"></ion-radio>\n						  </ion-item>\n 						</ion-list>\n		      </div>\n\n		      <!--textarea-->\n		      <div *ngSwitchCase="\'textarea\'">\n		      	<ion-item>\n					    <ion-label floating>{{OriginalContent?.question_text}}</ion-label>\n					    <ion-input type="text" [(ngModel)]="name" name="{{OriginalContent?.question_text}}" required></ion-input>\n					  </ion-item>\n		      </div>\n\n		      <!--datepicker-->\n		      <div *ngSwitchCase="\'datepicker\'">\n		      	\n		      </div>\n\n		      <!--message-->\n		      <div *ngSwitchCase="\'message\'">\n			      <ion-item>\n				      <ion-label floating>{{OriginalContent?.question_text}}</ion-label>\n				      <ion-input type="text" [(ngModel)]="name" name="{{OriginalContent?.question_text}}" required></ion-input>\n			      </ion-item>\n		      </div>\n\n		      <!--number-->\n		      <div *ngSwitchCase="\'number\'">\n		      	<ion-item>\n		      		 <ion-label floating>{{OriginalContent?.question_text}}</ion-label>\n				      <ion-input type="number" [(ngModel)]="name" name="{{OriginalContent?.question_text}}" required></ion-input>\n			      </ion-item>\n		      </div>\n\n		      <!--location picker-->\n				<div *ngSwitchCase="\'location_picker\'">\n\n				</div>\n			</div>\n\n				\n				\n				<button *ngIf="previousButton" ion-button color="secondary" outline (click)="previous(OriginalContent.serialNo)">Previous</button>\n				<button (click)="showConfirm()" ion-button color="danger" outline>Exit</button>\n				<button  ion-button color="dark" outline>\n	          <ion-icon name="add"></ion-icon>Next</button>\n			</form> \n			\n\n	</div>\n</ion-content>'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/question/question.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__providers_aione_helper_aione_helper__["a" /* AioneHelperProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__["a" /* AioneServicesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], QuestionPage);
    return QuestionPage;
}());

//# sourceMappingURL=question.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompletedSurveyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the CompletedSurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CompletedSurveyPage = (function () {
    function CompletedSurveyPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CompletedSurveyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CompletedSurveyPage');
    };
    CompletedSurveyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-completed-survey',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/completed-survey/completed-survey.html"*/'<!--\n  Generated template for the CompletedSurveyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="headerClassic">\n    <ion-title>completed-survey</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	<div class="custom-card">\n		<div>\n			<div class="percentage-wrapper">\n				<div><span><ion-icon name="md-checkmark"></ion-icon></span></div>\n			</div>\n			<div class="content-wrapper">\n				<div class="item-title">Special Survey</div>\n				<!-- <div class="pause-location">7th question, Section 3</div> -->\n				<div class="start-end-date">\n					<span>\n						<ion-icon name="md-calendar"></ion-icon>\n						Completed : 12-12-2017\n					</span>\n				</div>\n\n			</div>\n			<div class="clear"></div>	\n		</div>\n		<div class="custom-card-footer">\n			<div class="question-incomplete">\n				<ion-icon name="alert"></ion-icon>\n				12 Question Filled\n			</div>\n			\n			<div class="trash-survey">\n				<ion-icon name="md-trash"></ion-icon>\n								\n			</div>\n			<div class="resume-survey">\n				<ion-icon name="md-arrow-dropright-circle"></ion-icon>\n				Synchronize				\n			</div>\n		</div>\n		\n    	\n	</div>\n	<div class="custom-card">\n		<div>\n			<div class="percentage-wrapper">\n				<div><span><ion-icon name="md-checkmark"></ion-icon></span></div>\n			</div>\n			<div class="content-wrapper">\n				<div class="item-title">Special Survey</div>\n				<!-- <div class="pause-location">7th question, Section 3</div> -->\n				<div class="start-end-date">\n					<span>\n						<ion-icon name="md-calendar"></ion-icon>\n						Completed : 12-12-2017\n					</span>\n				</div>\n\n			</div>\n			<div class="clear"></div>	\n		</div>\n		<div class="custom-card-footer">\n			<div class="question-incomplete">\n				<ion-icon name="alert"></ion-icon>\n				12 Question Filled\n			</div>\n			\n			<div class="trash-survey">\n				<ion-icon name="md-trash"></ion-icon>\n								\n			</div>\n			<div class="resume-survey">\n				<ion-icon name="md-arrow-dropright-circle"></ion-icon>\n				Synchronize				\n			</div>\n		</div>\n		\n    	\n	</div>\n	<div class="custom-card">\n		<div>\n			<div class="percentage-wrapper">\n				<div><span><ion-icon name="md-checkmark"></ion-icon></span></div>\n			</div>\n			<div class="content-wrapper">\n				<div class="item-title">Special Survey</div>\n				<!-- <div class="pause-location">7th question, Section 3</div> -->\n				<div class="start-end-date">\n					<span>\n						<ion-icon name="md-calendar"></ion-icon>\n						Completed : 12-12-2017\n					</span>\n					\n				</div>\n\n			</div>\n			<div class="clear"></div>	\n		</div>\n		<div class="custom-card-footer">\n			<div class="question-incomplete">\n				<ion-icon name="alert"></ion-icon>\n				12 Question Filled\n			</div>\n			\n			<div class="trash-survey">\n				<ion-icon name="md-trash"></ion-icon>\n								\n			</div>\n			<div class="resume-survey">\n				<ion-icon name="md-arrow-dropright-circle"></ion-icon>\n				Synchronize				\n			</div>\n		</div>\n		\n    	\n	</div>\n	 \n</ion-content>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/completed-survey/completed-survey.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], CompletedSurveyPage);
    return CompletedSurveyPage;
}());

//# sourceMappingURL=completed-survey.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IncompletedSurveyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the IncompletedSurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IncompletedSurveyPage = (function () {
    function IncompletedSurveyPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    IncompletedSurveyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IncompletedSurveyPage');
    };
    IncompletedSurveyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-incompleted-survey',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/incompleted-survey/incompleted-survey.html"*/'<!--\n  Generated template for the IncompletedSurveyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="headerClassic">\n    <ion-title>incompleted-survey</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	<div class="custom-card">\n		<div>\n			<div class="percentage-wrapper">\n				<div><span>12%</span></div>\n			</div>\n			<div class="content-wrapper">\n				<div class="item-title">Special Survey</div>\n				<div class="pause-location">7th question, Section 3</div>\n				<div class="start-end-date">\n					<span>\n						<ion-icon name="md-calendar"></ion-icon>\n						12-12-2017\n					</span>\n					<span>\n						<ion-icon name="md-time"></ion-icon>\n						2 min ago\n					</span>\n				</div>\n\n			</div>\n			<div class="clear"></div>	\n		</div>\n		<div class="custom-card-footer">\n			<div class="question-incomplete">\n				<ion-icon name="alert"></ion-icon>\n				12 Question remaining\n			</div>\n			\n			<div class="trash-survey">\n				<ion-icon name="md-trash"></ion-icon>\n								\n			</div>\n			<div class="resume-survey">\n				<ion-icon name="md-arrow-dropright-circle"></ion-icon>\n				Resume				\n			</div>\n		</div>\n		\n    	\n	</div>\n	<div class="custom-card">\n		<div>\n			<div class="percentage-wrapper">\n				<div><span>12%</span></div>\n			</div>\n			<div class="content-wrapper">\n				<div class="item-title">Special Survey</div>\n				<div class="pause-location">7th question, Section 3</div>\n				<div class="start-end-date">\n					<span>\n						<ion-icon name="md-calendar"></ion-icon>\n						12-12-2017\n					</span>\n					<span>\n						<ion-icon name="md-time"></ion-icon>\n						2 min ago\n					</span>\n				</div>\n\n			</div>\n			<div class="clear"></div>	\n		</div>\n		<div class="custom-card-footer">\n			<div class="question-incomplete">\n				<ion-icon name="alert"></ion-icon>\n				12 Question remaining\n			</div>\n			\n			<div class="trash-survey">\n				<ion-icon name="md-trash"></ion-icon>\n								\n			</div>\n			<div class="resume-survey">\n				<ion-icon name="md-arrow-dropright-circle"></ion-icon>\n				Resume				\n			</div>\n		</div>\n		\n    	\n	</div>\n	<div class="custom-card">\n		<div>\n			<div class="percentage-wrapper">\n				<div><span>12%</span></div>\n			</div>\n			<div class="content-wrapper">\n				<div class="item-title">Special Survey</div>\n				<div class="pause-location">7th question, Section 3</div>\n				<div class="start-end-date">\n					<span>\n						<ion-icon name="md-calendar"></ion-icon>\n						12-12-2017\n					</span>\n					<span>\n						<ion-icon name="md-time"></ion-icon>\n						2 min ago\n					</span>\n				</div>\n\n			</div>\n			<div class="clear"></div>	\n		</div>\n		<div class="custom-card-footer">\n			<div class="question-incomplete">\n				<ion-icon name="alert"></ion-icon>\n				12 Question remaining\n			</div>\n			\n			<div class="trash-survey">\n				<ion-icon name="md-trash"></ion-icon>\n								\n			</div>\n			<div class="resume-survey">\n				<ion-icon name="md-arrow-dropright-circle"></ion-icon>\n				Resume				\n			</div>\n		</div>\n		\n    	\n	</div>\n	 \n</ion-content>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/incompleted-survey/incompleted-survey.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], IncompletedSurveyPage);
    return IncompletedSurveyPage;
}());

//# sourceMappingURL=incompleted-survey.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HelpPage = (function () {
    function HelpPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    HelpPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HelpPage');
    };
    HelpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-help',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/help/help.html"*/'<!--\n  Generated template for the HelpPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n  	<button ion-button menuToggle>\n  		<ion-icon name="menu"></ion-icon>\n  	</button>\n    <ion-title>Help</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/help/help.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], HelpPage);
    return HelpPage;
}());

//# sourceMappingURL=help.js.map

/***/ }),

/***/ 127:
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
webpackEmptyAsyncContext.id = 127;

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		297,
		12
	],
	"../pages/activation/activation.module": [
		298,
		11
	],
	"../pages/completed-survey/completed-survey.module": [
		299,
		10
	],
	"../pages/dashboard/dashboard.module": [
		300,
		9
	],
	"../pages/groups/groups.module": [
		301,
		8
	],
	"../pages/help/help.module": [
		302,
		7
	],
	"../pages/incompleted-survey/incompleted-survey.module": [
		303,
		6
	],
	"../pages/listsurvey/listsurvey.module": [
		304,
		5
	],
	"../pages/login/login.module": [
		305,
		4
	],
	"../pages/question/question.module": [
		306,
		3
	],
	"../pages/record-list/record-list.module": [
		307,
		2
	],
	"../pages/select/select.module": [
		308,
		1
	],
	"../pages/text/text.module": [
		309,
		0
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
webpackAsyncContext.id = 169;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AioneServicesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(172);
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
    AioneServicesProvider.prototype.dbClose = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(_this.db);
            resolve(_this.db);
        });
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
        //console.log(Values);
        return new Promise(function (resolve, reject) {
            var questionMarks = [];
            if (_this.db != undefined) {
                var questionMarks_1 = [];
                for (var j = 0; j < Values.length; j++) {
                    questionMarks_1.push("?");
                }
                _this.query = 'insert into ' + tableName + '(' + Cols + ') VALUES (' + questionMarks_1 + ')';
                console.log(_this.query);
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
                    // console.log(Delres); 
                    resolve(Delres);
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
                //console.log(this.query);
                _this.ExecuteRun(_this.query, []).then(function (SelResult) {
                    resolve(SelResult);
                });
            }
        });
    };
    AioneServicesProvider.prototype.MultipleSelectWhere = function (tableName, ConditionWhere1, ConditionValue1, ConditionValue2, ConditionWhere2) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db != undefined) {
                _this.query = 'Select * from ' + tableName + ' where ' + ConditionWhere1 + ' = ' + ConditionValue1 + ' AND ' + ConditionValue2 + '= ' + ConditionWhere2;
                //console.log(this.query);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
    ], AioneServicesProvider);
    return AioneServicesProvider;
}());

//# sourceMappingURL=aione-services.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SelectPage = (function () {
    function SelectPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SelectPage.prototype.ionViewDidLoad = function () {
    };
    SelectPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-select',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/select/select.html"*/'<ion-content padding>\n<h1>this is select text</h1>\n</ion-content>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/select/select.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], SelectPage);
    return SelectPage;
}());

//# sourceMappingURL=select.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_survey_survey__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TextPage = (function () {
    function TextPage(surveyProvider, navCtrl, navParams) {
        this.surveyProvider = surveyProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TextPage.prototype.ionViewDidLoad = function () {
        // this.data=this.navParams.get("value");
        //console.log(this.data);  
    };
    TextPage.prototype.next = function () {
        // console.log(this.data);
        // this.surveyProvider.questionsid(this.data);
    };
    TextPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-text',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/text/text.html"*/'<ion-content padding>\n  <ion-item>\n				    <ion-label color="primary">Inline Label</ion-label>\n				    <ion-input placeholder="Text Input"></ion-input>\n				  </ion-item>\n</ion-content>\n\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/text/text.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_survey_survey__["a" /* SurveyProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], TextPage);
    return TextPage;
}());

//# sourceMappingURL=text.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(242);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_aione_services_aione_services__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_aione_helper_aione_helper__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_calendar__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_device__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_http__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_survey_survey__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_activation_activation__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_geolocation__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_dashboard_dashboard__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_help_help__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_about_about__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_listsurvey_listsurvey__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_groups_groups__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_question_question__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_record_list_record_list__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_text_text__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_select_select__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_completed_survey_completed_survey__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_incompleted_survey_incompleted_survey__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};































//import { MyDatePickerModule } from 'mydatepicker';
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
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_help_help__["a" /* HelpPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_listsurvey_listsurvey__["a" /* ListsurveyPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_groups_groups__["a" /* GroupsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_question_question__["a" /* QuestionPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_record_list_record_list__["a" /* RecordListPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_text_text__["a" /* TextPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_select_select__["a" /* SelectPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_completed_survey_completed_survey__["a" /* CompletedSurveyPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_incompleted_survey_incompleted_survey__["a" /* IncompletedSurveyPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/activation/activation.module#ActivationPageModule', name: 'ActivationPage', segment: 'activation', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/completed-survey/completed-survey.module#CompletedSurveyPageModule', name: 'CompletedSurveyPage', segment: 'completed-survey', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/groups/groups.module#GroupsPageModule', name: 'GroupsPage', segment: 'groups', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/help/help.module#HelpPageModule', name: 'HelpPage', segment: 'help', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/incompleted-survey/incompleted-survey.module#IncompletedSurveyPageModule', name: 'IncompletedSurveyPage', segment: 'incompleted-survey', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/listsurvey/listsurvey.module#ListsurveyPageModule', name: 'ListsurveyPage', segment: 'listsurvey', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/question/question.module#QuestionPageModule', name: 'QuestionPage', segment: 'question', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/record-list/record-list.module#RecordListPageModule', name: 'RecordListPage', segment: 'record-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/select/select.module#SelectPageModule', name: 'SelectPage', segment: 'select', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/text/text.module#TextPageModule', name: 'TextPage', segment: 'text', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_14__angular_http__["c" /* HttpModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_activation_activation__["a" /* ActivationPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_help_help__["a" /* HelpPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_listsurvey_listsurvey__["a" /* ListsurveyPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_groups_groups__["a" /* GroupsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_question_question__["a" /* QuestionPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_record_list_record_list__["a" /* RecordListPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_text_text__["a" /* TextPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_select_select__["a" /* SelectPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_completed_survey_completed_survey__["a" /* CompletedSurveyPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_incompleted_survey_incompleted_survey__["a" /* IncompletedSurveyPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_aione_services_aione_services__["a" /* AioneServicesProvider */],
                __WEBPACK_IMPORTED_MODULE_9__providers_aione_helper_aione_helper__["a" /* AioneHelperProvider */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_calendar__["a" /* Calendar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_16__providers_survey_survey__["a" /* SurveyProvider */], __WEBPACK_IMPORTED_MODULE_18__ionic_native_geolocation__["a" /* Geolocation */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_activation_activation__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_dashboard_dashboard__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_help_help__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_about_about__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_record_list_record_list__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_listsurvey_listsurvey__ = __webpack_require__(56);
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
    function MyApp(loaderCtrl, app, servicepro, servicesProvider, platform, statusBar, splashScreen) {
        this.loaderCtrl = loaderCtrl;
        this.app = app;
        this.servicepro = servicepro;
        this.servicesProvider = servicesProvider;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.initializeApp();
        this.pages = [
            { title: 'Home', icon: 'ios-home-outline', component: __WEBPACK_IMPORTED_MODULE_7__pages_dashboard_dashboard__["a" /* DashboardPage */] },
            { title: 'Enter Record', icon: 'ios-create-outline', component: __WEBPACK_IMPORTED_MODULE_11__pages_listsurvey_listsurvey__["a" /* ListsurveyPage */] },
            { title: 'Review Record', icon: 'ios-clipboard-outline', component: __WEBPACK_IMPORTED_MODULE_10__pages_record_list_record_list__["a" /* RecordListPage */] },
            { title: 'About', icon: 'ios-easel-outline', component: __WEBPACK_IMPORTED_MODULE_9__pages_about_about__["a" /* AboutPage */] },
            { title: 'Help', icon: 'ios-flag-outline', component: __WEBPACK_IMPORTED_MODULE_8__pages_help_help__["a" /* HelpPage */] },
        ];
        if (localStorage.getItem("activation") != undefined) {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
            if (localStorage.getItem("username") != undefined) {
                this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_dashboard_dashboard__["a" /* DashboardPage */];
            }
            else {
                this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
            }
        }
        else {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_activation_activation__["a" /* ActivationPage */];
        }
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.servicepro.PlatformCheck('asapp').then(function (db) {
            _this.platform.ready().then(function () {
                _this.statusBar.styleDefault();
                _this.splashScreen.hide();
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.presentLoading = function (message) {
        this.loader = this.loaderCtrl.create({
            spinner: 'crescent',
            content: "\n      <div class=\"custom-spinner-container\">\n        <div class=\"custom-spinner-box\">" + message + "</div>\n      </div>",
        });
        this.loader.present();
    };
    MyApp.prototype.dismissLoader = function () {
        this.loader.dismiss();
    };
    MyApp.prototype.logout = function () {
        this.presentLoading("log out");
        localStorage.removeItem("activation");
        localStorage.removeItem("username");
        if (localStorage.getItem("activation") == undefined) {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_activation_activation__["a" /* ActivationPage */];
            this.dismissLoader();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header class="custom-menu-header">\n    <ion-toolbar>\n        <ion-item color="transparent">\n            <ion-avatar item-start>\n                <div class="icon-wrapper">\n                    <ion-icon name="person"></ion-icon>\n                </div>    \n\n            </ion-avatar>\n            <h2>Lorem Ipsum</h2>\n            <p>loremipsum@gmail.com</p>\n        </ion-item>\n        \n     <!--   <button ion-button menuToggle>\n      <ion-icon name="close"></ion-icon>\n    </button> -->\n\n    </ion-toolbar>\n    <div class="custom-menu-title">\n        MAIN MENU\n    </div>\n  </ion-header>\n  <ion-content class="custom-menu-content">\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n         <ion-icon name="{{p.icon}}"></ion-icon>\n         <span class="menu-item-text">{{p.title}}</span>\n        \n      </button>\n      <button menuClose ion-item (click)="logout()">\n        <ion-icon name="ios-log-out-outline"></ion-icon>\n        <span class="menu-item-text">Logout</span>\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/app/app.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_aione_services_aione_services__["a" /* AioneServicesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__ = __webpack_require__(17);
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
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  \n<button ion-button secondary menuToggle>Toggle Menu</button>\n</ion-content>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__["a" /* AioneServicesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_aione_helper_aione_helper__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(88);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_2__providers_aione_helper_aione_helper__["a" /* AioneHelperProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AioneHelperProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_calendar__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_device__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(6);
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

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_listsurvey_listsurvey__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_record_list_record_list__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DashboardPage = (function () {
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
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_record_list_record_list__["a" /* RecordListPage */]);
    };
    DashboardPage.prototype.listSurvey = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_listsurvey_listsurvey__["a" /* ListsurveyPage */]);
    };
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dashboard',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/dashboard/dashboard.html"*/'<!-- <ion-header >\n  <ion-navbar color="headerClassic">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title ><h1 *ngIf="dashboard">{{dashboard.android_application_title}}</h1></ion-title>\n  </ion-navbar>\n</ion-header> -->\n\n\n<ion-content>\n	<!-- <div class="Dashboard-content" *ngIf="dashboard">\n		<p>{{dashboard.android_application_description}}</p>\n		<button ion-button icon-left block (click)="listSurvey()"><ion-icon name="home"></ion-icon>{{dashboard.link_to_start_survey_text}} </button>\n		<button ion-button icon-left block color="secondary" (click)="recordList()"><ion-icon name="home"></ion-icon>{{dashboard.link_to_manage_survey_text}}</button>\n		<button ion-button icon-left block color="dark"><ion-icon name="home"></ion-icon> {{dashboard.link_to_sync_survey_text}}</button>\n		<button ion-button icon-left block color="danger"><ion-icon name="home"></ion-icon>{{dashboard.link_to_update_app_text}}</button>\n	</div> -->\n\n	<div class="dashbaord-wrapper" *ngIf="dashboard">\n\n		<div class="dashbaord-background">\n			<div class="overlay">\n				<div class="dashboard-title">\n					IRIS Application\n				</div>\n				<div class="dashbaord-description">\n					{{dashboard.android_application_description}}\n				</div>\n			</div>\n			<div class="dashboard-stats">\n				<ion-grid>\n					<ion-row>\n    					<ion-col>\n      						<div>\n      							<div class="stat-number" >\n      								12\n      							</div>\n      							<div class="stat-name">\n      								Surveys\n      							</div>\n      						</div>\n    					</ion-col>\n    					<ion-col>\n      						<div>\n      							<div class="stat-number">\n      								104\n      							</div>\n      							<div class="stat-name">\n      								Completed\n      							</div>\n      						</div>\n    					</ion-col>\n    					<ion-col>\n      						<div>\n      							<div class="stat-number">\n      								6\n      							</div>\n      							<div class="stat-name">\n      								In-complete\n      							</div>\n      						</div>\n    					</ion-col>\n    					<ion-col>\n      						<div>\n      							<div class="stat-number">\n      								1\n      							</div>\n      							<div class="stat-name">\n      								Update\n      							</div>\n      						</div>\n    					</ion-col>\n  					</ion-row>\n				</ion-grid>\n			</div>\n			<button ion-button menuToggle class="dashboard-menu-toggle" color="transparent">\n  				<ion-icon name="menu"></ion-icon>\n			</button>\n			\n		</div>\n		<!-- <div class="dashboard-links">\n			<ion-grid>\n				<ion-row>\n					<ion-col col-6 (click)="listSurvey()">\n							<div class="link-wrapper">\n								<div class="link-icons">\n									<ion-icon name="briefcase"></ion-icon>									\n								</div>\n								<div class="link-name">\n									{{dashboard.link_to_start_survey_text}}\n								</div>\n							</div>		\n					</ion-col>\n					<ion-col col-6 (click)="recordList()">\n							<div class="link-wrapper">\n								<div class="link-icons">\n									<ion-icon name="easel"></ion-icon>									\n								</div>\n								<div class="link-name">\n									{{dashboard.link_to_manage_survey_text}}\n								</div>\n							</div>\n					</ion-col>\n					<ion-col col-6 >\n							<div class="link-wrapper">\n								<div class="link-icons">\n									<ion-icon name="list-box"></ion-icon>									\n								</div>\n								<div class="link-name">\n									{{dashboard.link_to_sync_survey_text}}\n								</div>\n							</div>\n					</ion-col>\n					<ion-col col-6 >\n							<div class="link-wrapper">\n								<div class="link-icons">\n									 <ion-icon name="cloud-download"></ion-icon>\n									\n								</div>\n								<div class="link-name">\n									{{dashboard.link_to_update_app_text}}\n								</div>\n							</div>\n					</ion-col>\n				</ion-row>\n			</ion-grid>\n		</div> -->\n		<div class="dashboard-links-second-design">\n			<ion-grid>\n				<ion-row>\n					<ion-col col-6 (click)="listSurvey()">\n							<div class="link-wrapper">\n								<div class="link-icons">\n									<ion-icon name="briefcase"></ion-icon>									\n								</div>\n								<div class="link-name">\n									{{dashboard.link_to_start_survey_text}}\n								</div>\n							</div>		\n					</ion-col>\n					<ion-col col-6 (click)="recordList()">\n							<div class="link-wrapper">\n								<div class="link-icons">\n									<ion-icon name="easel"></ion-icon>									\n								</div>\n								<div class="link-name">\n									{{dashboard.link_to_manage_survey_text}}\n								</div>\n							</div>\n					</ion-col>\n					<ion-col col-8 >\n							<div class="link-wrapper">\n								<div class="link-icons">\n									<ion-icon name="list-box"></ion-icon>									\n								</div>\n								<div class="link-name">\n									{{dashboard.link_to_sync_survey_text}}\n								</div>\n							</div>\n					</ion-col>\n					<ion-col col-4 >\n							<div class="link-wrapper">\n								<div class="link-icons">\n									 <ion-icon name="cloud-download"></ion-icon>\n									\n								</div>\n								<div class="link-name">\n									Update\n								</div>\n							</div>\n\n					</ion-col>\n				</ion-row>\n			</ion-grid>\n		</div>\n	</div>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-title>Footer</ion-title>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/dashboard/dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__["a" /* AioneServicesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SurveyProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_aione_services_aione_services__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(13);
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
    SurveyProvider.prototype.questionsid = function (result) {
        return new Promise(function (resolve) {
            console.log(result);
        });
    };
    SurveyProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1__providers_aione_services_aione_services__["a" /* AioneServicesProvider */], __WEBPACK_IMPORTED_MODULE_1__providers_aione_services_aione_services__["a" /* AioneServicesProvider */]])
    ], SurveyProvider);
    return SurveyProvider;
}());

//# sourceMappingURL=survey.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_aione_services_aione_services__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_aione_helper_aione_helper__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_survey_survey__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_dashboard_dashboard__ = __webpack_require__(43);
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
    function LoginPage(loaderCtrl, nav, AioneService, formBuilder, AioneHelp, survey, navCtrl, navParams) {
        this.loaderCtrl = loaderCtrl;
        this.nav = nav;
        this.AioneService = AioneService;
        this.formBuilder = formBuilder;
        this.AioneHelp = AioneHelp;
        this.survey = survey;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LoginPage.prototype.Login = function () {
        var _this = this;
        this.loader = this.loaderCtrl.create({
            spinner: 'crescent',
            content: "\n      <div class=\"custom-spinner-container\">\n        <div class=\"custom-spinner-box\">" + 'Verifying Your Details' + "</div>\n      </div>",
        });
        this.loader.present();
        if (this.loginUser.invalid) {
            this.loginUser;
            this.loader.dismiss();
        }
        else {
            var name_1;
            this.username = this.loginUser.value.username;
            this.password = this.loginUser.value.password;
            this.user = "'" + this.username + "'";
            this.pass = "'" + this.password + "'";
            this.AioneService.MultipleSelectWhere("users", "email", this.user, "app_password", this.pass).then(function (userDetail) {
                _this.loginUser.reset();
                _this.loader.dismiss();
                if (userDetail.rows.length >= 1) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_dashboard_dashboard__["a" /* DashboardPage */]);
                    localStorage.setItem("username", _this.user);
                }
                else {
                    _this.AioneHelp.showAlert("Error", "Wrong Credentials");
                }
            });
        }
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        this.loginUser = this.formBuilder.group({
            username: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                ])],
            password: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                ])],
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/login/login.html"*/'\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n\n<ion-content padding>\n  <!-- <div *ngIf="loginUser">\n    <form [formGroup]="loginUser">\n    	<ion-list>\n      <ion-item>\n        <ion-label floating>Username</ion-label>\n        <ion-input type="text" formControlName="username" [(ngModel)]="username"></ion-input>\n      </ion-item>\n      <div *ngIf="loginUser.controls.username.invalid && loginUser.controls.username.touched && loginUser.controls.username.dirty " class="alert alert-danger">\n        <p>Username is required</p>\n      </div>\n\n      <ion-item>\n        <ion-label floating>Password</ion-label>\n        <ion-input type="password" formControlName="password" [(ngModel)]="password"></ion-input>\n      </ion-item>\n      <div *ngIf="loginUser.controls.password.invalid && loginUser.controls.password.touched && loginUser.controls.password.dirty" class="alert alert-danger">\n        <p>Password is required</p>\n      </div>\n\n      <button ion-button *ngIf="loginUser.valid" (click)="Login()">Login</button>\n    	</ion-list>	\n    </form>\n  </div> -->\n	\n\n\n    <div *ngIf="loginUser">\n        <form [formGroup]="loginUser">\n            <div class="app-logo">\n                logo area\n            </div>\n            <div class="page-title">\n                Login\n            </div>\n            <div>\n                <ion-input type="text" placeholder="Username" formControlName="username" [(ngModel)]="username"></ion-input>\n                <div *ngIf="loginUser.controls.username.invalid && loginUser.controls.username.touched && loginUser.controls.username.dirty " class="alert alert-danger">\n                    <p>Username is required</p>\n                </div>\n            </div>\n            <div>\n                <ion-input type="password" placeholder="Password" formControlName="password" [(ngModel)]="password"></ion-input>\n            </div>\n            <ion-item class="checkbox-wrapper">\n                <ion-label>Remember me</ion-label>\n                <ion-checkbox color="dark" checked="true">as,dadskj</ion-checkbox>\n            </ion-item>\n            <div class="btn-wrapper">\n                <button ion-button  full (click)="Login()">Submit</button>\n                \n            </div>\n            <div class="btn-wrapper">\n                <button ion-button color="secondary"  full>Cancel</button>\n                \n            </div>\n            <ion-grid class="extra-options">\n                <ion-row>\n                    <ion-col col-sm-6 >\n                        Forgot password\n                    </ion-col>\n                    <ion-col col-sm-6 >\n                        New User?   \n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </form>\n      \n    </div>\n</ion-content>\n\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_aione_services_aione_services__["a" /* AioneServicesProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__providers_aione_helper_aione_helper__["a" /* AioneHelperProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_survey_survey__["a" /* SurveyProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListsurveyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_groups_groups__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ListsurveyPage = (function () {
    function ListsurveyPage(servicesProvider, alertCtrl, navCtrl, navParams) {
        this.servicesProvider = servicesProvider;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.listSurvey = [];
        this.questionLength = [];
    }
    ListsurveyPage.prototype.groups = function (id, message) {
        console.log(id);
        console.log(message);
        //this.showConfirm();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_groups_groups__["a" /* GroupsPage */], { 'id': id });
    };
    ListsurveyPage.prototype.showConfirm = function () {
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
                            //this.navCtrl.setRoot(DashboardPage);
                            console.log(data);
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    ListsurveyPage.prototype.ionViewDidLoad = function () {
        this.surveyTitle = localStorage.getItem("ApplicationName");
        this.EnabledSurvey();
    };
    ListsurveyPage.prototype.EnabledSurvey = function () {
        var _this = this;
        var questionId;
        var questionData;
        var metaSurvey = [];
        var SurveySelect = [];
        return new Promise(function (resolve, reject) {
            var query = 'Select * from survey_meta where key = "enable_survey" AND value = 1';
            _this.servicesProvider.ExecuteRun(query, []).then(function (survey_meta) {
                metaSurvey.push(survey_meta.rows);
                if (survey_meta.rows.length > 0) {
                    var forloop_1 = 0;
                    metaSurvey.forEach(function (value, key) {
                        var content = [];
                        var _loop_1 = function (i) {
                            _this.surveyScheduling(value[i].form_id).then(function (surveySch) {
                                _this.servicesProvider.SelectWhere("surveys", "id", value[i].form_id).then(function (survey) {
                                    _this.responseLimit(value[i].form_id).then(function (responseData) {
                                        _this.surveytimer(value[i].form_id).then(function (timerData) {
                                            // console.log(surveySch);
                                            var rowsData = survey.rows[0];
                                            rowsData["details"] = responseData;
                                            rowsData["timer"] = timerData;
                                            rowsData["scheduling"] = surveySch;
                                            console.log(rowsData);
                                            // console.log(rowsData["details"].responenumber);
                                            content.push(rowsData);
                                        });
                                    });
                                });
                            });
                            if (content != undefined) {
                                SurveySelect.push(content);
                                forloop_1++;
                                if (forloop_1 == survey_meta.rows.length) {
                                    _this.listSurvey = SurveySelect;
                                    console.log(_this.listSurvey);
                                }
                            }
                        };
                        //value.length;
                        for (var i = 0; i < value.length; i++) {
                            _loop_1(i);
                        }
                    });
                }
                else {
                    _this.nullSurvey = "there is no survey";
                    console.log(_this.nullSurvey);
                }
            });
        });
    };
    ListsurveyPage.prototype.customError = function (formId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = 'select * from survey_meta where key="custom_error_messages" AND value=1 AND form_id = ' + formId;
            _this.servicesProvider.ExecuteRun(query, []).then(function (data) {
                if (data.rows.length > 0) {
                    console.log("error exists");
                }
                else {
                    console.log("no error");
                }
            });
        });
    };
    ListsurveyPage.prototype.surveyScheduling = function (formId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var startdate;
            var expiredate;
            var starttime;
            var expiretime;
            var date;
            var time;
            var noSuceduling;
            var survey_scheduling = 'select * from survey_meta where key="survey_scheduling" AND value=1 AND form_id = ' + formId;
            _this.today = new Date();
            //console.log(this.today);
            _this.servicesProvider.ExecuteRun(survey_scheduling, []).then(function (scheduling) {
                if (scheduling.rows.length > 0) {
                    console.log("yes survey schelduling");
                    _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'start_date'", "form_id", formId).then(function (startDate) {
                        _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'expire_date'", "form_id", formId).then(function (expiredate) {
                            _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'survey_start_time'", "form_id", formId).then(function (startTime) {
                                _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'survey_expire_time'", "form_id", formId).then(function (expireTime) {
                                    _this.caseCondtions(startDate.rows[0].value, expiredate.rows[0].value, startTime.rows[0].value, expireTime.rows[0].value).then(function (caseResult) {
                                        _this.caseValidations(startDate.rows[0].value, expiredate.rows[0].value, startTime.rows[0].value, expireTime.rows[0].value, caseResult).then(function (collection) {
                                            // console.log(collection);
                                            resolve(collection);
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                else {
                    noSuceduling = "it has no scheduling";
                    console.log(noSuceduling);
                    var collection1 = {};
                    collection1["surveyResponse"] = "false";
                    collection1["message"] = "survey not available";
                    resolve(collection1);
                }
            });
        });
    };
    ListsurveyPage.prototype.caseValidations = function (startdate, expiredate, starttime, expiretime, ConditionResult) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(ConditionResult);
            var message;
            var surveyResponse;
            //start time when user starts like 14:35:14
            var s = starttime.split(":");
            var StartTime = new Date(_this.today.getFullYear(), _this.today.getMonth(), _this.today.getDate(), parseInt(s[0]), parseInt(s[1]));
            //expire time when user expires
            var e = expiretime.split(':');
            var ExpireTime = new Date(_this.today.getFullYear(), _this.today.getMonth(), _this.today.getDate(), parseInt(e[0]), parseInt(e[1]));
            //console.log(ExpireTime);
            // getting current time
            var dateString3 = _this.today.toString();
            var a = dateString3.split(" ");
            var Currenttime = a[4];
            switch (ConditionResult) {
                case "case A":
                    var dateDataA = new Date(expiredate);
                    if (dateDataA >= _this.today) {
                        message = "survey is visible";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case B":
                    var dateDataB = new Date(startdate);
                    var EDate = new Date(expiredate);
                    console.log(startdate);
                    console.log(expiredate);
                    if (_this.today >= dateDataB && _this.today <= EDate) {
                        message = "survey is visible";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case C":
                    var dateDataC = new Date(startdate);
                    console.log(startdate);
                    if (_this.today >= dateDataC) {
                        message = "survey is visible";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case D":
                    if (_this.today >= StartTime && _this.today <= ExpireTime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case E":
                    if (_this.today >= StartTime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    console.log(message);
                    break;
                case "case F":
                    if (_this.today <= ExpireTime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    console.log(message);
                    break;
                case "case G":
                    var dateDataG = new Date(startdate);
                    var eExpireDate = new Date(expiredate);
                    var sTime = starttime;
                    break;
                case "case H":
                    var finish = "23:59:59";
                    var dateDataH = new Date(startdate);
                    var ExpireDateH = new Date(expiredate);
                    var dt = starttime.split(":");
                    var lastdateExpire = new Date(ExpireDateH.getFullYear(), ExpireDateH.getMonth(), ExpireDateH.getDate() + 1);
                    console.log(lastdateExpire);
                    if (_this.today >= dateDataH && _this.today <= lastdateExpire && Currenttime >= starttime && Currenttime <= finish) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case I":
                    var startStringTime = "00:00:01";
                    var dateDataI = new Date(startdate);
                    var ExpireDateI = new Date(expiredate);
                    console.log(dateDataI);
                    console.log(ExpireDateI);
                    console.log(Currenttime);
                    console.log(expiretime);
                    var lastdateExpireI = new Date(ExpireDateI.getFullYear(), ExpireDateI.getMonth(), ExpireDateI.getDate() + 1);
                    console.log(lastdateExpireI);
                    if (_this.today >= dateDataI && _this.today <= lastdateExpireI && Currenttime >= startStringTime && Currenttime <= expiretime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case J":
                    var dateDataj = new Date(startdate);
                    console.log(dateDataj);
                    console.log(starttime);
                    console.log(expiretime);
                    if (_this.today >= dateDataj && Currenttime >= starttime && Currenttime <= expiretime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case K":
                    var ExpireDateK = new Date(expiredate);
                    var lastdateExpireK = new Date(ExpireDateK.getFullYear(), ExpireDateK.getMonth(), ExpireDateK.getDate() + 1);
                    console.log(lastdateExpireK);
                    console.log(ExpireDateK);
                    console.log(expiretime);
                    console.log(Currenttime);
                    console.log(_this.today);
                    if (_this.today <= lastdateExpireK && Currenttime <= expiretime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case L":
                    var startStringTimeL = "23:59:59";
                    var ExpireDateL = new Date(expiredate);
                    var lastdateExpireL = new Date(ExpireDateL.getFullYear(), ExpireDateL.getMonth(), ExpireDateL.getDate() + 1);
                    console.log(lastdateExpireL);
                    if (_this.today <= lastdateExpireL && Currenttime >= starttime && Currenttime <= startStringTimeL) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
                case "case M":
                    message = "survey is available";
                    surveyResponse = "true";
                    break;
                case "case N":
                    var ExpireDateN = new Date(expiredate);
                    var lastdateExpireN = new Date(ExpireDateN.getFullYear(), ExpireDateN.getMonth(), ExpireDateN.getDate() + 1);
                    console.log(lastdateExpireN);
                    if (_this.today <= lastdateExpireN && Currenttime >= starttime && Currenttime <= expiretime) {
                        message = "survey available";
                        surveyResponse = "true";
                    }
                    else {
                        message = "survey not available";
                        surveyResponse = "false";
                    }
                    break;
            }
            var collection1 = {};
            collection1["surveyResponse"] = surveyResponse;
            collection1["message"] = message;
            resolve(collection1);
        });
    };
    ListsurveyPage.prototype.caseCondtions = function (startdate, expiredate, starttime, expiretime) {
        return new Promise(function (resolve, reject) {
            if (startdate == "" && expiredate != "" && starttime == "" && expiretime == "") {
                console.log(expiredate);
                resolve("case A"); // only have expiredate;
            }
            if (startdate != "" && expiredate != "" && starttime == "" && expiretime == "") {
                resolve("case B"); //have startdate and expiredate
            }
            if (startdate != "" && expiredate == "" && starttime == "" && expiretime == "") {
                resolve("case C"); //have startdate
            }
            if (startdate == "" && expiredate == "" && starttime != "" && expiretime != "") {
                resolve("case D"); //have starttime,expiretime
            }
            if (startdate == "" && expiredate == "" && starttime != "" && expiretime == "") {
                resolve("case E"); //have starttime;
            }
            if (startdate == "" && expiredate == "" && starttime == "" && expiretime != "") {
                resolve("case F"); // have expire time
            }
            if (startdate != "" && expiredate != "" && starttime != "" && expiretime != "") {
                resolve("case G"); //have startdate, expiredate, starttime
            }
            if (startdate != "" && expiredate != "" && starttime != "" && expiretime == "") {
                resolve("case H"); //have startdate,expiredate,starttime
            }
            if (startdate != "" && expiredate != "" && starttime == "" && expiretime != "") {
                resolve("case I"); //startdate,expiredate,expiretime
            }
            if (startdate != "" && expiredate == "" && starttime != "" && expiretime != "") {
                resolve("case J"); //startdate,startime,expiretime
            }
            if (startdate == "" && expiredate != "" && starttime == "" && expiretime != "") {
                resolve("case K"); //expiredate,expiretime
            }
            if (startdate == "" && expiredate != "" && starttime != "" && expiretime == "") {
                resolve("case L"); //have expiredate,starttime	
            }
            if (startdate == "" && expiredate == "" && starttime == "" && expiretime == "") {
                resolve("case M"); //expiredate ,expiretime startdate starttime
            }
            if (startdate == "" && expiredate != "" && starttime != "" && expiretime != "") {
                resolve("case N"); //expiredate ,starttime expiretime
            }
        });
    };
    ListsurveyPage.prototype.responseLimit = function (formId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(formId);
            var responenumber;
            var responsetype;
            var query = 'select * from survey_meta where key="survey_response_limit" AND value=1 AND form_id = ' + formId;
            _this.servicesProvider.ExecuteRun(query, []).then(function (data) {
                if (data.rows.length > 0) {
                    //console.log("response dffdexits");
                    _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'response_limit'", "form_id", formId).then(function (num) {
                        responenumber = num.rows[0].value;
                        _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'response_limit_type'", "form_id", formId).then(function (type) {
                            if (type.rows[0].value == "per_user") {
                                responsetype = type.rows[0].value;
                            }
                            else {
                                responsetype = type.rows[0].value;
                            }
                            var responseResult = _this.sruveyResponseExecution(responenumber, responsetype);
                            resolve(responseResult);
                        });
                    });
                }
                else {
                    // console.log("no limit selected");
                    responenumber = "";
                    responsetype = "";
                    var responseResult = _this.sruveyResponseExecution(responenumber, responsetype);
                    resolve(responseResult);
                }
            });
        });
    };
    ListsurveyPage.prototype.sruveyResponseExecution = function (responenumber, responsetype) {
        var collectionResponse = {};
        collectionResponse["responenumber"] = responenumber;
        collectionResponse["responsetype"] = responsetype;
        //console.log(collectionResponse)
        return collectionResponse;
    };
    ListsurveyPage.prototype.surveytimer = function (formId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var duration;
            console.log(formId);
            var timerType;
            var query = 'select * from survey_meta where key="survey_timer" AND value=1 AND form_id = ' + formId;
            _this.servicesProvider.ExecuteRun(query, []).then(function (data) {
                if (data.rows.length > 0) {
                    console.log("timer extis");
                    _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'survey_duration'", "form_id", formId).then(function (dur) {
                        _this.servicesProvider.MultipleSelectWhere("survey_meta", "key", "'timer_type'", "form_id", formId).then(function (type) {
                            if (type.rows[0].value == "survey_duration") {
                                timerType = type.rows[0].value;
                                duration = dur.rows[0].value;
                            }
                            else {
                                timerType = type.rows[0].value;
                                duration = "";
                            }
                            var timerData = _this.surveytimerExecution(timerType, duration);
                            resolve(timerData);
                        });
                    });
                }
                else {
                    console.log("no timer");
                    timerType = "";
                    duration = "";
                    var timerData = _this.surveytimerExecution(timerType, duration);
                    resolve(timerData);
                }
            });
        });
    };
    ListsurveyPage.prototype.surveytimerExecution = function (timerType, duration) {
        var collectionResponse = {};
        collectionResponse["timerType"] = timerType;
        collectionResponse["timerDuration"] = duration;
        //.console.log(collectionResponse)
        return collectionResponse;
    };
    ListsurveyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-listsurvey',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/listsurvey/listsurvey.html"*/'\n<ion-header>\n\n  <ion-navbar color="headerClassic">\n  	<button ion-button menuToggle>\n  		<ion-icon name="menu"></ion-icon>\n  	</button>\n    <ion-title> <!-- <span *ngIf="surveyTitle">{{surveyTitle}}</span> -->\n        List Of Surveys\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n  \n<ion-content>\n \n<ion-list>\n<div *ngFor="let survey of listSurvey[0]">      ?\n  <ion-item (click)="groups(survey.id)">\n  <p>{{survey["details"].responenumber}} {{survey["details"].responsetype}}</p>\n  <p>Duration is {{survey["timer"].timerDuration}}</p>\n    <ion-thumbnail item-start>\n      <img src="../../assets/imgs/survey.png">\n    </ion-thumbnail>\n    <h2>{{survey.name}}</h2>\n    <p>{{survey.description}}</p>\n\n    <p style="color:#32b93d;">survey will start on 10pm</p>\n    <button ion-button clear item-end style="color: #f7805; font-weight: bold;">0 times filled</button>\n    <button ion-button clear item-end style="color: #fcb549; font-weight: bold;">View</button>\n\n  </ion-item>\n\n</div>\n<div *ngIf="nullSurvey">\n  <p>{{nullSurvey}}</p>\n</div>\n</ion-list> \n\n<!-- <p *ngIf="today">{{today | date: \'medium\'}}</p>\n -->\n<!-- <ion-list>\n  <ion-item>\n    <ion-avatar item-start>\n      <img src="../../assets/imgs/survey.png">\n    </ion-avatar>\n    <h2>Finn</h2>\n    <h3>Don\'t Know What To Do!</h3>\n    <p>I\'ve had a pretty messed up day. If we just...</p>\n  </ion-item>\n</ion-list> -->\n\n    <!-- <ion-item-group *ngFor="let survey of listSurvey[0]">\n        <ion-item (click)="groups(survey.id)">\n           \n            <img src="../../assets/imgs/survey.png">\n            <div class="list-content-wrapper">\n                <div class="item-title">{{survey.name}}</div>\n                <div class="item-description">{{survey.description}}</div>\n                <div class=""></div>\n                <div class="item-time">\n                    30 Mar 2018\n                </div>\n            </div> \n\n\n        </ion-item>\n       \n    </ion-item-group> -->\n    \n   \n</ion-content>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/listsurvey/listsurvey.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__["a" /* AioneServicesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__["a" /* AioneServicesProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _d || Object])
    ], ListsurveyPage);
    return ListsurveyPage;
    var _a, _b, _c, _d;
}());

// questionCount(){
//this.surveytimer(formId).then((surveyTim)=>{
// 	resolve(surveyTim);
// 	this.responseLimit(formId).then((limit)=>{
// 	});
// })
// 	// this.data="SELECT  questions.question_key,surveys.* FROM surveys LEFT JOIN questions ON surveys.id = questions.survey_id";
// 			// this.servicesProvider.ExecuteRun(this.data,[]).then((SelResult:any)=>{
// 			// 	this.questionLength.push(SelResult.rows);
// 			// 	this.listSurvey.forEach((key,value,)=>{
// 			// 		this.questionLength.forEach((keys,values,)=>{
// 			// 			Object.keys(key).forEach(function(svalue,skey){
// 		 //    			questionData=key[svalue].id;																																																								 
// 		 //    			//console.log(questionData);		    				
// 		 //    			});
// 	  // 			});
// 			// 	});
// 			// });
// }
//# sourceMappingURL=listsurvey.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_question_question__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GroupsPage = (function () {
    function GroupsPage(servicesProvider, navCtrl, navParams) {
        this.servicesProvider = servicesProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    GroupsPage.prototype.questionid = function (id) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_question_question__["a" /* QuestionPage */], { 'id': id });
    };
    GroupsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.groupTitle = localStorage.getItem("ApplicationName");
        this.ids = this.navParams.get('id');
        this.servicesProvider.SelectWhere("groups", "survey_id", this.ids).then(function (result) {
            _this.groupsResult = result.rows;
            //console.log(this.groupsResult);
            _this.servicesProvider.SelectWhere("survey_meta", "form_id", _this.ids).then(function (form) {
                for (var keys in form.rows) {
                    if (form.rows[keys].value == "survey") {
                        localStorage.setItem("questionType", 'save_survey');
                    }
                    else if (form.rows[keys].value == "section") {
                        localStorage.setItem("questionType", 'save_section');
                    }
                    else if (form.rows[keys].value == "question") {
                        localStorage.setItem("questionType", 'questions');
                    }
                }
            });
        });
    };
    GroupsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-groups',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/groups/groups.html"*/'\n\n\n\n<ion-content>\n    <!-- <ion-list class="" >\n        <ion-item *ngFor="let groups of groupsResult" (click)="questionid(groups.id)">\n            <h2>{{groups.survey_id}} | {{groups.title}}</h2>\n            <p>\n               {{groups.description}}\n            </p>\n        </ion-item>        \n                 \n    </ion-list> -->\n    \n    <div class="survey-info">\n        <button ion-button menuToggle color="transparent">\n            <ion-icon name="menu"></ion-icon>\n            \n        </button>   \n        <div class="survey-title">\n            Survey Name\n        </div>\n        <div class="survey-description">\n            this is the description of the survey\n        </div>\n        <ion-list class="section-list" >\n            <div class="list-header">\n                List of sections\n            </div>\n            <div class="list-content">\n                <ion-item *ngFor="let groups of groupsResult" (click)="questionid(groups.id)">\n                    <ion-avatar item-start class="list-icon">\n                      <ion-icon name="ios-photos-outline"></ion-icon>\n                    </ion-avatar>\n                    <h2>{{groups.title}}</h2>\n                    <p>\n                       {{groups.description}}\n\n                    </p>\n                    <!-- <span>0 times filled</span> -->\n\n                    <ion-icon item-end name="ios-arrow-dropright-outline"></ion-icon>\n                </ion-item>        \n                 \n            </div>\n                        \n        </ion-list>\n    </div>\n    \n</ion-content>\n\n\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/groups/groups.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__["a" /* AioneServicesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], GroupsPage);
    return GroupsPage;
}());

//# sourceMappingURL=groups.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecordListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_groups_groups__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_completed_survey_completed_survey__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_incompleted_survey_incompleted_survey__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RecordListPage = (function () {
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
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_groups_groups__["a" /* GroupsPage */]);
        popover.present();
    };
    RecordListPage.prototype.completedSurveyPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_completed_survey_completed_survey__["a" /* CompletedSurveyPage */]);
    };
    RecordListPage.prototype.incompletedSurveyPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_incompleted_survey_incompleted_survey__["a" /* IncompletedSurveyPage */]);
    };
    RecordListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-record-list',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/record-list/record-list.html"*/'  <!--\n  Generated template for the RecordListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n <!--  <ion-navbar color="headerClassic">\n  <button ion-button menuToggle>\n  	<ion-icon name="menu"></ion-icon>\n  </button>\n    <ion-title><span *ngIf="recordTitle">{{recordTitle}}</span></ion-title>\n  </ion-navbar> -->\n\n\n    <ion-toolbar color="headerClassic">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title><span *ngIf="recordTitle">{{recordTitle}}</span></ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only>\n                <ion-icon name="search"></ion-icon>\n            </button>\n        </ion-buttons>\n\n        <ion-buttons end>\n            <button ion-button icon-only>\n                <ion-icon name="more"></ion-icon>\n            </button>\n        </ion-buttons>\n\n    </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n	<!-- <ion-row>\n	  <ion-col>\n      <strong>Title</strong>\n    </ion-col>\n    <ion-col>\n      <strong>Total questions</strong>\n    </ion-col>\n    <ion-col>\n      <strong>Complete rocords</strong>\n    </ion-col>\n    <ion-col>\n      <strong>Imcomplete records</strong>\n    </ion-col>\n  </ion-row>\n\n  <ion-row *ngFor="let record of listSurvey[0]">\n 		<ion-col>\n 		{{record.name}}\n 		</ion-col>\n 		<ion-col>\n 		0\n 		</ion-col>\n 		<ion-col>\n 		0\n 		</ion-col>\n 		<ion-col>\n 		0\n 		</ion-col>\n  </ion-row>\n -->\n    <div>\n        <ion-list class="custom-border" >\n            <ion-item-sliding *ngFor="let record of listSurvey[0]" class="">\n                <ion-item >\n                \n                    <h2>{{record.name}}</h2>\n                    <p>\n                        <ion-icon name="done-all"></ion-icon>\n                        17 Completed | \n                         <ion-icon name="refresh"></ion-icon>\n                         12 Incompleted\n                    </p>\n                    <button ion-button icon-only color="transparent" class="btn-rotate">\n                       <ion-icon name="ios-arrow-dropleft-outline"></ion-icon>\n                    </button>\n                </ion-item>\n            \n\n                <ion-item-options side="right">\n                    <button ion-button color="primary" (click)="completedSurveyPage()">View Completed</button>\n                    <button ion-button color="Secondary" (click)="incompletedSurveyPage()">View Incomplete</button>\n                </ion-item-options>\n  \n            </ion-item-sliding>\n             \n        </ion-list>\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/record-list/record-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__["a" /* AioneServicesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */]])
    ], RecordListPage);
    return RecordListPage;
}());

//# sourceMappingURL=record-list.js.map

/***/ })

},[219]);
//# sourceMappingURL=main.js.map