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
import { NavController } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
var HomePage = /** @class */ (function () {
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
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [AioneServicesProvider, NavController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map