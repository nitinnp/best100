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
var person_service_1 = require('./person.service');
var router_1 = require("@angular/router");
var PersonComponent = (function () {
    function PersonComponent(router, personService) {
        this.router = router;
        this.personService = personService;
    }
    PersonComponent.prototype.onSelect = function (person) {
        this.selectedPerson = person;
    };
    PersonComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedPerson.id]);
    };
    PersonComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.personService.create(name)
            .then(function (person) {
            _this.personList.push(person);
            _this.selectedPerson = null;
        });
    };
    PersonComponent.prototype.delete = function (person) {
        var _this = this;
        this.personService
            .delete(person.id)
            .then(function () {
            _this.personList = _this.personList.filter(function (h) { return h !== person; });
            if (_this.selectedPerson === person) {
                _this.selectedPerson = null;
            }
        });
    };
    PersonComponent.prototype.ngOnInit = function () {
        this.getPersonList();
    };
    PersonComponent.prototype.getPersonList = function () {
        var _this = this;
        this.personService.getPersonList().then(function (personList) { return _this.personList = personList; });
    };
    PersonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-person',
            templateUrl: 'person.component.html',
            styleUrls: ['person.component.css'],
            animations: [
                core_1.trigger('personState', [
                    core_1.state('inactive', core_1.style({
                        backgroundColor: '#eee',
                        transform: 'scale(1)'
                    })),
                    core_1.state('active', core_1.style({
                        backgroundColor: '#cfd8dc',
                        transform: 'scale(1.1)'
                    })),
                    core_1.transition('inactive => active', core_1.animate('100ms ease-in')),
                    core_1.transition('active => inactive', core_1.animate('100ms ease-out'))
                ])
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, person_service_1.PersonService])
    ], PersonComponent);
    return PersonComponent;
}());
exports.PersonComponent = PersonComponent;
//# sourceMappingURL=person.component.js.map