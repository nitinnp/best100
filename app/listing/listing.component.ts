import {
    Component, OnInit, AfterViewInit, AfterViewChecked
} from '@angular/core';
import { ListingService } from './listing.service';
import {ActivatedRoute, Router,Params} from "@angular/router";
import {MyDatePipe} from "../shared/directives/myDatePipe";
import {BestDatePipe} from "../shared/directives/bestDatePipe";



@Component({
    moduleId: module.id,
    selector: 'listing',
    templateUrl: './listing.html',//,,
//    styleUrls: ['Artifact.component.css'],
    providers: [
        { provide: MyDatePipe, useClass: BestDatePipe }
    ]
})
export class ListingComponent implements OnInit,AfterViewInit,AfterViewChecked{
    amazonlisting:{};
    ituneslisting:{};
    bestbuylisting:{};
    walmartlisting:{};
    today:any;
    type:any;
    constructor(
        private router:Router,private route: ActivatedRoute,
        private ListingService: ListingService) {

        this.today = new Date();
    };


    generateArray(obj){
        if(obj!== undefined) {
            return Object.keys(obj).map((key)=> {
                return obj[key]
            });
        }
    }

    ngOnInit(): void {
        this.getListing();

    }
    onSelect(affiliateType:any): void {
        console.debug(affiliateType);
        if(this.type.indexOf("-") > 0) {
            let pathArry = this.type.split("-");
            this.type = pathArry[1];
        }
        this.router.navigate(['/listing/'+affiliateType+'-'+this.type]);

    }
    ngAfterViewInit () {

    }
    ngAfterViewChecked () {

    }

    getListing(): void {

        this.route.params.forEach((params: Params) => {
            this.type = params['id'];

            console.debug(this.type);
            if(this.type === undefined){
                this.type = "Movies";
            }
            this.ListingService.getListing(this.type).subscribe(
                data => {
                    console.log(data);
                    if(this.type.startsWith("amz")) {
                        this.ituneslisting= undefined;
                        this.bestbuylisting= undefined;
                        this.amazonlisting = data;
                        this.walmartlisting = undefined;

                    }
                    else if(this.type.startsWith("itunes")){
                        this.ituneslisting= data;
                        this.amazonlisting = undefined;
                        this.bestbuylisting= undefined;
                        this.walmartlisting = undefined;
                    }
                    else if(this.type.startsWith("walmart")){
                        this.ituneslisting= undefined;
                        this.amazonlisting = undefined;
                        this.bestbuylisting= undefined;
                        this.walmartlisting = data;
                    }
                    else{
                        this.bestbuylisting= data;
                        this.ituneslisting= undefined;
                        this.amazonlisting = undefined;
                        this.walmartlisting = undefined;
                    }

                }, error =>{console.log("error in service")});

        });

    }
}
