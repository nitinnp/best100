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
    rakutenlisting:{};
    temp = [];
    page = 1;
    today:any;
    type:any;
    constructor(

        private router:Router,private route: ActivatedRoute,
        private ListingService: ListingService) {
        console.log('Inside constructor..');
        this.today = new Date();
    };


    generateArray(obj){
        if(obj!== undefined) {
            return Object.keys(obj).map((key)=> {

                return obj[key]
            });
        }
    }
    onScroll () {
        //console.log('scrolled!!');

        const start = this.page;
        if(this.page < 5) {
            this.page += 1;
            this.temp = Object.assign([], this.amazonlisting);
            // console.log(this.temp);
            this.getListing();
        }

    }
    ngOnInit(): void {
       // console.log('Inside listing ngonInit');
        this.getListing();


    }
    unescapeHtml(safe) {

        var safe = safe.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
        try{
            var txt = $(safe).text();
            return txt;
        }catch(e){
            return safe;
        }

    }

    onSelect(affiliateType:any): void {
        //console.log(affiliateType);
        this.temp = [];
        this.page = 1;

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
        //console.log('getListing');
        this.route.params.forEach((params: Params) => {
            if(this.type != params['id']){
                this.temp = [];
                this.page = 1;
            }
            this.type = params['id'];

            //console.debug(this.type);
            if(this.type === undefined){
                this.type = "Movies";
            }
            this.ListingService.getListing(this.type,this.page+"").subscribe(
                data => {
                    //console.log(data);
                    if(this.type.startsWith("amz")) {
                        this.ituneslisting= undefined;
                        this.bestbuylisting= undefined;
                        this.amazonlisting = data;
                        this.walmartlisting = undefined;
                        this.rakutenlisting = undefined;

                        //console.log(Object.keys(this.temp).length);
                        if((Object.keys(this.temp).length > 0))
                        {
                            this.amazonlisting = this.temp.concat(this.amazonlisting);
                            //console.log(this.amazonlisting);
                        }


                    }
                    else if(this.type.startsWith("itunes")){
                        this.ituneslisting= data;
                        this.amazonlisting = undefined;
                        this.bestbuylisting= undefined;
                        this.walmartlisting = undefined;
                        this.rakutenlisting = undefined;
                    }
                    else if(this.type.startsWith("walmart")){
                        this.ituneslisting= undefined;
                        this.amazonlisting = undefined;
                        this.bestbuylisting= undefined;
                        this.rakutenlisting = undefined;
                        this.walmartlisting = data;
                    }
                    else if(this.type.startsWith("rakuten")){
                        this.ituneslisting= undefined;
                        this.amazonlisting = undefined;
                        this.bestbuylisting= undefined;
                        this.walmartlisting = undefined;
                        this.rakutenlisting = data;
                    }
                    else{
                        this.bestbuylisting= data;
                        this.ituneslisting= undefined;
                        this.amazonlisting = undefined;
                        this.walmartlisting = undefined;
                        this.rakutenlisting = undefined;
                    }

                }, error =>{console.log("error in service")});

        });

    }
}
