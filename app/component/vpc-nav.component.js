"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var vpc_user_service_1 = require("../service/vpc.user.service");
var router_1 = require('@angular/router');
var NavComponent = (function () {
    function NavComponent(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
        //this.objLogin = new User();
    }
    NavComponent.prototype.logOut = function () {
        var _this = this;
        var objUser = JSON.parse(localStorage.getItem('objUser'));
        var sessionId = objUser.sessionId;
        this._userService.logOut(sessionId).subscribe(function (result) {
            console.log('logOut status: ' + result.status);
            if (result.status == "success") {
                localStorage.removeItem('objUser');
                _this._router.navigate(["/"]);
            } /* else {
                this.msgError = result.error;
                this.objLogin = new User();
            }*/
        }, function (error) {
            //this.msgError = <any>error.error;
            console.log(error);
        });
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'video-nav',
            templateUrl: 'app/view/vpc-nav.html',
            providers: [vpc_user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [vpc_user_service_1.UserService, router_1.Router])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
//# sourceMappingURL=vpc-nav.component.js.map