import { Injectable } from "@angular/core";
import { Video } from "../model/vpc.video.model";
/*http*/
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";
/*http*/

@Injectable()

export class VideoService {
    public sessionID: string;
    constructor(private _http: Http) { }

    /*getSessionID() {
        //console.log('Antes de http');
        let headers = new Headers({ "Content-Type": "application/json" });
        let rpta = this._http.post("http://localhost:3000/user/auth", { username: 'ali', password: '5f4dcc3b5aa765d61d8327deb882cf99' }, { headers: headers }).map((res: Response) => res.json());
        //console.log('rpta: '+rpta.subscribe);
        return rpta;
    }*/

    getVideos(_id: string, _skip: number, _limit: number) {
        //console.log('Antes de http');
        //return this._http.get("http://localhost/apiRest/restaurantes-api.php/restaurantes").map((res: Response) => res.json());
        let rpta = this._http.get("http://localhost:3000/videos?sessionId=" + _id + "&skip=" + _skip + "&limit=" + _limit).map((res: Response) => res.json());
        /*rpta.subscribe(
            result => {
                console.log('data video: ' + result['name']);
            },
            error => {
                console.log(<any>error);
            }
        );*/
        return rpta;
    }

    getVideo(_sessionId: string, videoId: string) {
        //console.log('Antes de http');
        //return this._http.get("http://localhost/apiRest/restaurantes-api.php/restaurantes").map((res: Response) => res.json());
        let rpta = this._http.get("http://localhost:3000/video?sessionId=" + _sessionId + "&videoId=" + videoId).map((res: Response) => res.json());
        /*rpta.subscribe(
            result => {
                console.log('data video: ' + result['name']);
            },
            error => {
                console.log(<any>error);
            }
        );*/
        return rpta;
    }

    rateVideo(_sessionId: string, _videoId: string, _rate: number) {
        let headers = new Headers({ "Content-Type": "application/json" });
        let rpta = this._http.post("http://localhost:3000/video/ratings?sessionId=" + _sessionId, { videoId: _videoId, rating: _rate }, { headers: headers }).map((res: Response) => res.json());
        return rpta;
    }
}