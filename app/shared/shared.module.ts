import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { AwesomePipe }         from './directives/awesome.pipe';
import {HighlightDirective} from "./directives/highlight.directive";
import {DatePipe} from "@angular/common";
import {MyDatePipe} from "./directives/myDatePipe";
import {BestDatePipe} from "./directives/bestDatePipe";

@NgModule({
    imports:      [ CommonModule ],
    declarations: [ AwesomePipe, HighlightDirective, MyDatePipe,BestDatePipe ],
    exports:      [ AwesomePipe, HighlightDirective, MyDatePipe,CommonModule, FormsModule,BestDatePipe ],
    providers: [ DatePipe ]
})
export class SharedModule { }
