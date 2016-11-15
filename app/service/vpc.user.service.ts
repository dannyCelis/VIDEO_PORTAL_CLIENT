import { Injectable } from "@angular/core";
import { User } from "../model/vpc.user.model";
/*http*/
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";
/*http*/
import { md5 } from '../extra/md5';

@Injectable()

export class UserService {
    constructor(private _http: Http) { }

    getRestaurantes() {
        return this._http.get("http://localhost:3000/videos?sessionId=58254bab0cce870f60535408").map((res: Response) => res.json());
    }

    getSessionID(objLogin: User) {
        let headers = new Headers({ "Content-Type": "application/json" });
        let rpta = this._http.post("http://localhost:3000/user/auth", { username: objLogin.username, password: md5(objLogin.password) }, { headers: headers }).map((res: Response) => res.json());
        return rpta;
    }

    logOut(_sessionId: string) {
        let headers = new Headers({ "Content-Type": "application/json" });
        let rpta = this._http.get("http://localhost:3000/user/logout?sessionId=" + _sessionId).map((res: Response) => res.json());
        return rpta;
    }
}