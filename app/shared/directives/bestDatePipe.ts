import { Pipe,PipeTransform } from '@angular/core';

import {MyDatePipe} from "./myDatePipe";

@Pipe({
    name: "myDate"
})

export class BestDatePipe  extends MyDatePipe implements PipeTransform{
    transform(value: any): string {
        let format = "yyyy-MM-dd";
        return "Best Date";
    }
}


