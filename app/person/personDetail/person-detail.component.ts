// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Person } from '../person';
import { PersonService } from '../person.service'
import { DialogService }  from '../../dialog.service';

@Component({
    moduleId: module.id,
    selector: 'my-person-detail',
    templateUrl: 'person-detail.component.html',
    styleUrls: ['person-detail.component.css']

})
export class PersonDetailComponent implements OnInit{
    person:Person;
    editName: string;
    constructor(
        private personService: PersonService,
        private route: ActivatedRoute,
        private location: Location,
        public dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.personService.getPerson(id)
                .then(person => this.person = person )
                .then(person => this.editName = person.name);


        });
    };

    goBack(): void {
        this.editName = this.person.name;
        this.location.back();
    }

    save(): void {
        this.personService.update(this.person)
            .then(() => this.goBack());
    }

    canDeactivate(): Promise<boolean> | boolean {
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        console.log(this.editName);
        console.log(this.person.name);
        if (!this.person || this.person.name === this.editName) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return this.dialogService.confirm('Discard changes?');
    }
}