import { Component }        from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { WikipediaService } from './wikipedia.service';
import { Subject }          from 'rxjs/Subject';

@Component({
    selector: 'my-wiki',
    template: `

<div class="dropdown">
<input #term (keyup)="search(term.value)" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"/>

    
    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
      <li *ngFor="let item of items | async"><a href="#">{{item}}</a></li>
    </ul>
    </div>
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
