import { Injectable } from '@angular/core';
import {Http, Jsonp, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';





declare var X2JS: any;


@Injectable()
export class ListingService {

  //  private headers = new Headers({'Content-Type': 'application/json'});


    constructor(private http: Http, private jsonp: Jsonp){}

    getListing(type:string) {
        console.log('Inside get listing..');
        if(! type.startsWith("amz")) {
            let url = this.getURL(type);
            return this.http.get(this.getURL(type)).map(this.extractData).catch(this.handleError);
        }
        else {
            let params: URLSearchParams = new URLSearchParams();
            let urlPathArry = type.split("-");
            params.set('searchIndex',urlPathArry[1] );
            params.set('keyword',urlPathArry[2] );

            return this.http.get('/amazonlisting',{
                search: params
            }).map(this.extractData).catch(this.handleError);
        }
    }



    extractData(res: Response) {

        let body = res.text();
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