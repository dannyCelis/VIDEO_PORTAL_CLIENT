import { Component, OnInit } from "@angular/core";
import { User } from "../model/vpc.user.model";
import { UserService } from "../service/vpc.user.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'video-login',
    templateUrl: 'app/view/vpc-login.html',
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    public objLogin: User;
    public msgError: string;
    private sessionId: string;
    constructor(private _userService: UserService, private _router: Router) {
        this.objLogin = new User();
    }

    ngOnInit() {

    }

    logIn() {
        //console.log('logIn');
        //console.log('username: ' + this.objLogin.username);
        this._userService.getSessionID(this.objLogin).subscribe(
            result => {
                this.sessionId = result.sessionId;
                if (result.status == "success") {
                    //localStorage.setItem('sessionId', this.sessionId);
                    //console.log('login: ' + JSON.stringify(result));
                    localStorage.setItem('objUser', JSON.stringify(result));
                    this._router.navigate(["/video-list"]);
                } else {
                    this.msgError = result.error;
                    this.objLogin = new User();
                }
            },
            error => {
                this.msgError = <any>error.error;
                console.log(<any>error);
            }
        );
    }
}