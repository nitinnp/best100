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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var Observable_1 = require('rxjs/Observable');
var ListingService = (function () {
    //  private headers = new Headers({'Content-Type': 'application/json'});
    function ListingService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
    }
    ListingService.prototype.getListing = function (type, page) {
        //console.log('Inside get listing..');
        var params = new http_1.URLSearchParams();
        var urlPathArry = type.split("-");
        params.set('searchIndex', urlPathArry[1]);
        params.set('page', page);
        if (type.startsWith("itunes")) {
            return this.http.get('/ituneslisting', {
                search: params
            }).map(this.extractData).catch(this.handleError);
        }
        if (type.startsWith("bestbuy")) {
            return this.http.get('/bestbuylisting', {
                search: params
            }).map(this.extractData).catch(this.handleError);
        }
        if (type.startsWith("rakuten")) {
            return this.http.get('/rakutenlisting', {
                search: params
            }).map(this.extractData).catch(this.handleError);
        }
        if (type.startsWith("walmart")) {
            return this.http.get('/walmartlisting', {
                search: params
            }).map(this.extractData).catch(this.handleError);
        }
        else {
            return this.http.get('/amazonlisting', {
                search: params
            }).map(this.extractData).catch(this.handleError);
        }
    };
    ListingService.prototype.extractData = function (res) {
        var body = res.text();
        // console.debug(body);
        body = JSON.parse(body);
        return body || {};
    };
    ListingService.prototype.getURL = function (type) {
        var artifactUrl;
        artifactUrl = 'https://itunes.apple.com/us/rss/' + type + '/limit=20/json';
        return artifactUrl;
    };
    ListingService.prototype.handleError = function (error) {
        console.log("Error");
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    ListingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp])
    ], ListingService);
    return ListingService;
}());
exports.ListingService = ListingService;
//# sourceMappingURL=listing.service.js.map