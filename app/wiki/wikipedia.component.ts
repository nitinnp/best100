import { Component }        from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { WikipediaService } from './wikipedia.service';
import { Subject }          from 'rxjs/Subject';

@Component({
    selector: 'my-wiki',
    template: `
    <h1>Wiki</h1>
    <p><i>Fetches after each keystroke</i></p>
    <input #term (keyup)="search(term.value)"/>
    <ul>
      <li *ngFor="let item of items | async">{{item}}</li>
    </ul>
  `,
    providers: [WikipediaService]
})
export class WikiComponent {

    constructor (private wikipediaService: WikipediaService) { }

    private searchTermStream = new Subject<string>();

    search(term: string) { this.searchTermStream.next(term); }

    items: Observable<string[]> = this.searchTermStream
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap((term: string) => this.wikipediaService.search(term));

    ngOnInit()    { console.log(`onInit`); }

    ngOnDestroy() { console.log(`onDestroy`); }


}
