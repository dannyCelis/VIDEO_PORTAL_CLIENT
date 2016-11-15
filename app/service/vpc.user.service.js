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
/*http*/
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
/*http*/
var md5_1 = require('../extra/md5');
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
    }
    UserService.prototype.getRestaurantes = function () {
        return this._http.get("http://localhost:3000/videos?sessionId=58254bab0cce870f60535408").map(function (res) { return res.json(); });
    };
    UserService.prototype.getSessionID = function (objLogin) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var rpta = this._http.post("http://localhost:3000/user/auth", { username: objLogin.username, password: md5_1.md5(objLogin.password) }, { headers: headers }).map(function (res) { return res.json(); });
        return rpta;
    };
    UserService.prototype.logOut = function (_sessionId) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var rpta = this._http.get("http://localhost:3000/user/logout?sessionId=" + _sessionId).map(function (res) { return res.json(); });
        return rpta;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=vpc.user.service.js.map