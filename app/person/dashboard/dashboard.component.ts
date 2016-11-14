import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls:['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    personList: Person[] = [];

    constructor(
        private router: Router,
        private personService: PersonService) { }

    ngOnInit(): void {
        this.personService.getPersonList()
            .then(personList => this.personList = personList.slice(1, 5));
    }

    gotoDetail(person: Person): void {
        let link = ['/detail', person.id];
        this.router.navigate(link);

    }
}