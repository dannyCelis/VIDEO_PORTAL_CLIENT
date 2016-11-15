import { Component } from "@angular/core";
import { UserService } from "../service/vpc.user.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'video-nav',
    templateUrl: 'app/view/vpc-nav.html',
    providers: [UserService]
})

export class NavComponent {
    constructor(private _userService: UserService, private _router: Router) {
        //this.objLogin = new User();
    }
    logOut() {
        let objUser = JSON.parse(localStorage.getItem('objUser'));
        let sessionId = objUser.sessionId;

        this._userService.logOut(sessionId).subscribe(
            result => {
                console.log('logOut status: ' + result.status);
                if (result.status == "success") {
                    localStorage.removeItem('objUser');
                    this._router.navigate(["/"]);
                }/* else {
                    this.msgError = result.error;
                    this.objLogin = new User();
                }*/
            },
            error => {
                //this.msgError = <any>error.error;
                console.log(<any>error);
            }
        );
    }
}