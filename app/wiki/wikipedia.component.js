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
var wikipedia_service_1 = require('./wikipedia.service');
var Subject_1 = require('rxjs/Subject');
var WikiComponent = (function () {
    function WikiComponent(wikipediaService) {
        var _this = this;
        this.wikipediaService = wikipediaService;
        this.searchTermStream = new Subject_1.Subject();
        this.items = this.searchTermStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return _this.wikipediaService.search(term); });
    }
    WikiComponent.prototype.search = function (term) { this.searchTermStream.next(term); };
    WikiComponent.prototype.ngOnInit = function () { console.log("onInit"); };
    WikiComponent.prototype.ngOnDestroy = function () { console.log("onDestroy"); };
    WikiComponent = __decorate([
        core_1.Component({
            selector: 'my-wiki',
            template: "\n\n<div class=\"dropdown\">\n<input #term (keyup)=\"search(term.value)\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\"/>\n\n    \n    <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">\n      <li *ngFor=\"let item of items | async\"><a href=\"#\">{{item}}</a></li>\n    </ul>\n    </div>\n  ",
            providers: [wikipedia_service_1.WikipediaService]
        }), 
        __metadata('design:paramtypes', [wikipedia_service_1.WikipediaService])
    ], WikiComponent);
    return WikiComponent;
}());
exports.WikiComponent = WikiComponent;
//# sourceMappingURL=wikipedia.component.js.map