webpackJsonp([0],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AioneServicesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_http__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AioneServicesProvider = (function () {
    function AioneServicesProvider(http, platform, sqlite) {
        this.http = http;
        this.platform = platform;
        this.sqlite = sqlite;
        this.slugs = [];
        this.AppkitProducts = [];
        console.log('Hello AioneServicesProvider Provider');
    }
    AioneServicesProvider.prototype.PlatfromCheck = function (databaseName) {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.sqlite.create({ name: databaseName, location: 'default' }).then(function (data) {
                _this.db = data;
                console.log(_this.db);
            });
        }
        else {
            this.db = window.openDatabase(databaseName, '1', 'my', 1024 * 1024 * 100);
            console.log(this.db);
        }
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
        if (this.db != undefined) {
            console.log(TableName);
            for (var i = 0; i < TableName.length; i++) {
                this.query = "CREATE TABLE IF NOT EXISTS " + TableName[i] + ' (' + Col[i] + ')';
                console.log(this.query);
                this.ExecuteRun(this.query, []).then(function (res) {
                    console.log(res);
                });
            }
        }
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
                console.log(_this.query);
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
        if (this.db != undefined) {
            this.query = 'DROP Table ' + tableName;
            console.log(this.query);
            this.ExecuteRun(this.query, []).then(function (DropResult) {
                //console.log(DropResult);
            });
        }
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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ionic_native_http__["a" /* HTTP */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ionic_native_http__["a" /* HTTP */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */]) === "function" && _c || Object])
    ], AioneServicesProvider);
    return AioneServicesProvider;
    var _a, _b, _c;
}());

//# sourceMappingURL=aione-services.js.map

/***/ }),

/***/ 111:
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
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 152:
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
webpackEmptyAsyncContext.id = 152;

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';

var HomePage = (function () {
    function HomePage(servicesProvider, navCtrl) {
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
        this.servicesProvider.PlatfromCheck('Aione');
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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__["a" /* AioneServicesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_aione_services_aione_services__["a" /* AioneServicesProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _b || Object])
    ], HomePage);
    return HomePage;
    var _a, _b;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
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
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(223);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_aione_services_aione_services__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_sqlite__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_http__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









//import { AioneHelperProvider } from '../providers/aione-helper/aione-helper';


var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */]
            ],
            //exports: [AioneServicesProvider],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_aione_services_aione_services__["a" /* AioneServicesProvider */],
                // AioneHelperProvider,
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_http__["a" /* HTTP */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_aione_services_aione_services__ = __webpack_require__(100);
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] }
        ];
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/oxosolutions/Desktop/asapp/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n       <button ion-button menuToggle>\n      <ion-icon name="close"></ion-icon>\n    </button>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/oxosolutions/Desktop/asapp/src/app/app.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_6__providers_aione_services_aione_services__["a" /* AioneServicesProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__providers_aione_services_aione_services__["a" /* AioneServicesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[199]);
//# sourceMappingURL=main.js.map