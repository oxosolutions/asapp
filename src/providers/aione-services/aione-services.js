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
// import { HTTP } from '@ionic-native/http';
import { Platform } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
var AioneServicesProvider = /** @class */ (function () {
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
        console.log();
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
            console.log(Col);
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
        Injectable(),
        __metadata("design:paramtypes", [Platform, SQLite])
    ], AioneServicesProvider);
    return AioneServicesProvider;
}());
export { AioneServicesProvider };
//# sourceMappingURL=aione-services.js.map