"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var listing_service_1 = require('./listing.service');
var router_1 = require("@angular/router");
var myDatePipe_1 = require("../shared/directives/myDatePipe");
var bestDatePipe_1 = require("../shared/directives/bestDatePipe");
var ListingComponent = (function () {
    function ListingComponent(router, route, ListingService) {
        this.router = router;
        this.route = route;
        this.ListingService = ListingService;
        this.today = new Date();
    }
    ;
    ListingComponent.prototype.generateArray = function (obj) {
        if (obj !== undefined) {
            return Object.keys(obj).map(function (key) {
                return obj[key];
            });
        }
    };
    ListingComponent.prototype.ngOnInit = function () {
        this.getListing();
    };
    ListingComponent.prototype.onSelect = function (affiliateType) {
        console.debug(affiliateType);
        if (this.type.indexOf("-") > 0) {
            var pathArry = this.type.split("-");
            this.type = pathArry[1];
        }
        this.router.navigate(['/listing/' + affiliateType + '-' + this.type]);
    };
    ListingComponent.prototype.ngAfterViewInit = function () {
    };
    ListingComponent.prototype.ngAfterViewChecked = function () {
    };
    ListingComponent.prototype.getListing = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.type = params['id'];
            console.debug(_this.type);
            if (_this.type === undefined) {
                _this.type = "topfreeapplications";
            }
            _this.ListingService.getListing(_this.type).subscribe(function (data) {
                console.log(data);
                if (_this.type.startsWith("amz")) {
                    _this.ituneslisting = undefined;
                    _this.amazonlisting = data;
                }
                else {
                    _this.ituneslisting = data;
                    _this.amazonlisting = undefined;
                }
            }, function (error) { console.log("error in service"); });
        });
    };
    ListingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'listing',
            templateUrl: './listing.html',
            //    styleUrls: ['Artifact.component.css'],
            providers: [
                { provide: myDatePipe_1.MyDatePipe, useClass: bestDatePipe_1.BestDatePipe }
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, listing_service_1.ListingService])
    ], ListingComponent);
    return ListingComponent;
}());
exports.ListingComponent = ListingComponent;
//# sourceMappingURL=listing.component.js.map