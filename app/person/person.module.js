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
var person_component_1 = require('./person.component');
var dashboard_component_1 = require("./dashboard/dashboard.component");
var person_detail_component_1 = require("./personDetail/person-detail.component");
var person_service_1 = require("./person.service");
var person_search_component_1 = require("./personSearch/person-search.component");
var shared_module_1 = require("../shared/shared.module");
var core_module_1 = require("../core/core.module");
var person_routing_module_1 = require("./person-routing.module");
var dialog_service_1 = require("../dialog.service");
var PersonModule = (function () {
    function PersonModule() {
    }
    PersonModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, core_module_1.CoreModule, person_routing_module_1.PersonRoutingModule],
            declarations: [
                person_component_1.PersonComponent, dashboard_component_1.DashboardComponent, person_detail_component_1.PersonDetailComponent, person_search_component_1.PersonSearchComponent
            ],
            exports: [person_component_1.PersonComponent],
            providers: [person_service_1.PersonService, dialog_service_1.DialogService]
        }), 
        __metadata('design:paramtypes', [])
    ], PersonModule);
    return PersonModule;
}());
exports.PersonModule = PersonModule;
//# sourceMappingURL=person.module.js.map