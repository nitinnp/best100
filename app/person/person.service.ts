import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Person } from './person';



@Injectable()
export class PersonService {
    private personURL = 'app/personList';
    private headers = new Headers({'Content-Type': 'application/json'});


    constructor(private http:Http){}

    getPersonList(): Promise<Person[]> {
        return this.http.get(this.personURL).toPromise()
            .then(response => response.json().data as Person[])
            .catch(this.handleError);
    }

    getPerson(id: number): Promise<Person> {
        return this.getPersonList()
            .then(personList => personList.find(person => person.id === id));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    update(person: Person): Promise<Person> {
        const url = `${this.personURL}/${person.id}`;
        return this.http
            .put(url, JSON.stringify(person), {headers: this.headers})
            .toPromise()
            .then(() => person)
            .catch(this.handleError);
    }

    create(name: string): Promise<Person> {
        return this.http
            .post(this.personURL, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.personURL}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
}