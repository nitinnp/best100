import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "myDate"
})

export class MyDatePipe implements PipeTransform {

    transform(value: any): string {
        let format = "yyyy-MM-dd";
        return "My Date";
    }
}


