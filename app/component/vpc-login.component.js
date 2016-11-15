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
var vpc_user_model_1 = require("../model/vpc.user.model");
var vpc_user_service_1 = require("../service/vpc.user.service");
var router_1 = require('@angular/router');
var LoginComponent = (function () {
    function LoginComponent(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
        this.objLogin = new vpc_user_model_1.User();
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.logIn = function () {
        var _this = this;
        //console.log('logIn');
        //console.log('username: ' + this.objLogin.username);
        this._userService.getSessionID(this.objLogin).subscribe(function (result) {
            _this.sessionId = result.sessionId;
            if (result.status == "success") {
                //localStorage.setItem('sessionId', this.sessionId);
                //console.log('login: ' + JSON.stringify(result));
                localStorage.setItem('objUser', JSON.stringify(result));
                _this._router.navigate(["/video-list"]);
            }
            else {
                _this.msgError = result.error;
                _this.objLogin = new vpc_user_model_1.User();
            }
        }, function (error) {
            _this.msgError = error.error;
            console.log(error);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'video-login',
            templateUrl: 'app/view/vpc-login.html',
            providers: [vpc_user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [vpc_user_service_1.UserService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=vpc-login.component.js.map