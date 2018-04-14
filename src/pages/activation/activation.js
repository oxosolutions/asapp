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
import { Geolocation } from '@ionic-native/geolocation';
import { SurveyProvider } from '../../providers/survey/survey';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { Validators, FormBuilder } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
var ActivationPage = /** @class */ (function () {
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
            var selectBulkTable = [];
            _this.AioneService.SelectAllTable().then(function (slectdrop) {
                Object.keys(slectdrop).forEach(function (dropkey, dropvalue) {
                    selectBulkTable.push(slectdrop[dropkey].name);
                });
                console.log(selectBulkTable);
                var selectBulkTable2 = selectBulkTable.slice(1);
                var droptable2 = selectBulkTable2.slice(1);
                console.log(droptable2);
                _this.AioneService.DropTable(droptable2).then(function (drop) {
                    _this.Api().then(function (Apidata) {
                        var i;
                        _this.table(Apidata, tableName, 0).then(function (result) {
                            _this.AioneService.TableBulk(tableName, _this.TableCols).then(function () {
                                _this.dismissLoader();
                                _this.insertUser(Apidata).then(function (user) {
                                    _this.insertsurveys(Apidata).then(function (surveys) {
                                        _this.insertgroups(Apidata).then(function (groups) {
                                            _this.insertquestions(Apidata).then(function (questions) {
                                                _this.insertsettings(Apidata).then(function (setting) {
                                                    _this.insersurveyMeta(Apidata).then(function (survey_meta) {
                                                        _this.resultSurvey(Apidata.questions, Apidata.surveys).then(function (resultSurvey) {
                                                            if (resultSurvey != undefined) {
                                                                console.log(resultSurvey);
                                                                _this.loader.dismiss();
                                                                _this.nav.setRoot(LoginPage);
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
        });
    };
    ActivationPage.prototype.resultSurvey = function (questions, surveys) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var keyqColumns = [];
            var loopLength = 0;
            var surveyresult = [];
            var listQuestion = [];
            var listQuestion2 = [];
            console.log(surveys);
            surveys.forEach(function (value, key) {
                console.log('surveyResult_' + value.id);
                surveyresult.push('surveyResult_' + value.id);
                var keyColumns = [];
                _this.AioneService.SelectWhere("questions", "survey_id", value.id).then(function (questionData) {
                    keyColumns.push('serialNo INTEGER PRIMARY KEY AUTOINCREMENT');
                    // keyColumns.push('serialNo');
                    var qresult = "";
                    for (var i = 0; i < questionData.rows.length; i++) {
                        qresult = questionData.rows.item(i).question_key + ' TEXT';
                        keyColumns.push(qresult);
                    }
                    keyColumns.push('ip_address', 'survey_startedOn', 'survey_completedOn', 'survey_submittedBy', 'survey_submittedFrom', 'mac_address', 'unique_id', 'device_detail', 'totalQuestions', 'filledQuestions', 'questionIndex', 'last_fieldId', 'last_group_id', 'completed_groups', 'survey_status', 'incomplete_name', 'survey_sync_status', 'record_type');
                    keyqColumns.push(keyColumns);
                    loopLength++;
                    if (loopLength == surveys.length) {
                        console.log(keyqColumns);
                        _this.AioneService.TableBulk(surveyresult, keyqColumns).then(function (keyqColumns) {
                            resolve(keyColumns);
                        });
                    }
                });
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
                var headers = new Headers();
                headers.append('content-type', undefined);
                var formArray = {};
                formArray['activation_key'] = _this.loginForm.value.name;
                _this.http.post(localStorage.getItem("api_url"), formArray, { headers: headers }).subscribe(function (data) {
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
        this.ApplicationName = localStorage.getItem("activation_ApiName");
        this.ApplicationDesc = localStorage.getItem("activationDesc");
        this.loginForm = this.formBuilder.group({
            name: ['', Validators.compose([
                    Validators.required,
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
        IonicPage(),
        Component({
            selector: 'page-activation',
            templateUrl: 'activation.html',
        }),
        __metadata("design:paramtypes", [NavController, LoadingController, Http, AioneServicesProvider, AioneServicesProvider, FormBuilder, AioneServicesProvider, AioneHelperProvider, Geolocation, SurveyProvider, NavController, NavParams])
    ], ActivationPage);
    return ActivationPage;
}());
export { ActivationPage };
//# sourceMappingURL=activation.js.map