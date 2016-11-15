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
var VideoService = (function () {
    function VideoService(_http) {
        this._http = _http;
    }
    /*getSessionID() {
        //console.log('Antes de http');
        let headers = new Headers({ "Content-Type": "application/json" });
        let rpta = this._http.post("http://localhost:3000/user/auth", { username: 'ali', password: '5f4dcc3b5aa765d61d8327deb882cf99' }, { headers: headers }).map((res: Response) => res.json());
        //console.log('rpta: '+rpta.subscribe);
        return rpta;
    }*/
    VideoService.prototype.getVideos = function (_id, _skip, _limit) {
        //console.log('Antes de http');
        //return this._http.get("http://localhost/apiRest/restaurantes-api.php/restaurantes").map((res: Response) => res.json());
        var rpta = this._http.get("http://localhost:3000/videos?sessionId=" + _id + "&skip=" + _skip + "&limit=" + _limit).map(function (res) { return res.json(); });
        /*rpta.subscribe(
            result => {
                console.log('data video: ' + result['name']);
            },
            error => {
                console.log(<any>error);
            }
        );*/
        return rpta;
    };
    VideoService.prototype.getVideo = function (_sessionId, videoId) {
        //console.log('Antes de http');
        //return this._http.get("http://localhost/apiRest/restaurantes-api.php/restaurantes").map((res: Response) => res.json());
        var rpta = this._http.get("http://localhost:3000/video?sessionId=" + _sessionId + "&videoId=" + videoId).map(function (res) { return res.json(); });
        /*rpta.subscribe(
            result => {
                console.log('data video: ' + result['name']);
            },
            error => {
                console.log(<any>error);
            }
        );*/
        return rpta;
    };
    VideoService.prototype.rateVideo = function (_sessionId, _videoId, _rate) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var rpta = this._http.post("http://localhost:3000/video/ratings?sessionId=" + _sessionId, { videoId: _videoId, rating: _rate }, { headers: headers }).map(function (res) { return res.json(); });
        return rpta;
    };
    VideoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], VideoService);
    return VideoService;
}());
exports.VideoService = VideoService;
//# sourceMappingURL=vpc.video.service.js.map