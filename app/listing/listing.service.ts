import { Injectable } from '@angular/core';
import {Http, Jsonp, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';





declare var X2JS: any;


@Injectable()
export class ListingService {

  //  private headers = new Headers({'Content-Type': 'application/json'});


    constructor(private http: Http, private jsonp: Jsonp){}

    getListing(type:string,page:string) {
        //console.log('Inside get listing..');
        let params: URLSearchParams = new URLSearchParams();
        let urlPathArry = type.split("-");
        params.set('searchIndex',urlPathArry[1] );
        params.set('page',page);
        if(type.startsWith("itunes")) {
             return this.http.get('/ituneslisting',{
                search: params
            }).map(this.extractData).catch(this.handleError);
        }
        if(type.startsWith("bestbuy")) {
            return this.http.get('/bestbuylisting',{
                search: params
            }).map(this.extractData).catch(this.handleError);
        }
        if(type.startsWith("rakuten")) {
            return this.http.get('/rakutenlisting',{
                search: params
            }).map(this.extractData).catch(this.handleError);
        }
        if(type.startsWith("walmart")) {
            return this.http.get('/walmartlisting',{
                search: params
            }).map(this.extractData).catch(this.handleError);
        }
        else {
           return this.http.get('/amazonlisting',{
                search: params
            }).map(this.extractData).catch(this.handleError);
        }
    }



    extractData(res: Response) {

        let body = res.text();
       // console.debug(body);
        body = JSON.parse(body);
        return body || { };
    }


    getURL(type) {
        let artifactUrl:any;
        artifactUrl = 'https://itunes.apple.com/us/rss/'+type+'/limit=20/json';
        return artifactUrl;
    }

    private handleError (error: Response | any) {
        console.log("Error");
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
       return Observable.throw(errMsg);
    }


}