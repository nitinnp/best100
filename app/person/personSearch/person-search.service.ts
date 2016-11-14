import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Person }           from '../person';
@Injectable()
export class PersonSearchService {

    constructor(private http: Http) {}

    search(term: string): Observable<Person[]> {
        return this.http
            .get(`app/personList/?name=${term}`)
            .map((r: Response) => r.json().data as Person[]);
    }
}