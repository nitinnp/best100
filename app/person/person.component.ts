import { Component,OnInit,Input,trigger, state, style, transition,
    animate } from '@angular/core';
import { Person } from './person';
import { PersonService } from './person.service';
import {Router} from "@angular/router";




@Component({
    moduleId: module.id,
    selector: 'my-person',
    templateUrl: 'person.component.html',
    styleUrls: ['person.component.css'],
    animations: [
        trigger('personState', [
            state('inactive', style({
                backgroundColor: '#eee',
                transform: 'scale(1)'
            })),
            state('active',   style({
                backgroundColor: '#cfd8dc',
                transform: 'scale(1.1)'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ])
    ]
})
export class PersonComponent implements OnInit{
    personList: Person[];
    selectedPerson: Person;

    constructor(
        private router:Router,
        private personService: PersonService) { }

    onSelect(person: Person): void {
        this.selectedPerson = person;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedPerson.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.personService.create(name)
            .then(person => {
                this.personList.push(person);
                this.selectedPerson = null;
            });
    }

    delete(person: Person): void {
        this.personService
            .delete(person.id)
            .then(() => {
                this.personList= this.personList.filter(h => h !== person);
                if (this.selectedPerson === person) { this.selectedPerson = null; }
            });
    }

    ngOnInit(): void {
        this.getPersonList();
    }

    getPersonList(): void {
        this.personService.getPersonList().then(personList => this.personList = personList);

    }
}
