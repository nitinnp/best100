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
require('./rxjs-extensions');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
// Imports for loading & configuring the in-memory web api
var app_routing_module_1 = require("./app-routing.module");
var person_module_1 = require("./person/person.module");
var app_component_1 = require('./app.component');
var user_service_1 = require("./services/user.service");
var contact_module_1 = require("./contact/contact.module");
var core_module_1 = require("./core/core.module");
var wikipedia_service_1 = require("./wiki/wikipedia.service");
var login_routing_module_1 = require("./login/login-routing.module");
var login_component_1 = require("./login/login.component");
var listing_module_1 = require("./listing/listing.module");
var listing_service_1 = require("./listing/listing.service");
require('./rxjs-extensions');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, http_1.JsonpModule,
                core_module_1.CoreModule.forRoot({ userName: 'Mr John' }),
                app_routing_module_1.AppRoutingModule, login_routing_module_1.LoginRoutingModule, person_module_1.PersonModule, contact_module_1.ContactModule, listing_module_1.ListingModule,
                app_routing_module_1.AppRoutingModule],
            declarations: [app_component_1.AppComponent, login_component_1.LoginComponent],
            providers: [user_service_1.UserService, wikipedia_service_1.WikipediaService, listing_service_1.ListingService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map