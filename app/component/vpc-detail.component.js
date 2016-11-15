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
var router_1 = require('@angular/router');
var vpc_video_service_1 = require("../service/vpc.video.service");
var vpc_video_model_1 = require("../model/vpc.video.model");
//import { Location } from '@angular/common';
var VideoDetailComponent = (function () {
    function VideoDetailComponent(_route, _router, _videoService) {
        this._route = _route;
        this._router = _router;
        this._videoService = _videoService;
        this.objVideo = new vpc_video_model_1.Video();
        this.skip = 0;
        this.limit = 10;
    }
    VideoDetailComponent.prototype.ngOnInit = function () {
        console.log('Init VideoDetailComponent');
        var objUser = JSON.parse(localStorage.getItem('objUser'));
        if (objUser != null) {
            this.sessionId = objUser.sessionId;
            this.getVideo();
            this.getVideos(this.sessionId);
            console.log('objUser: ' + objUser.sessionId);
        }
        else {
            console.log('ERROR');
            this._router.navigate(["/"]);
        }
    };
    VideoDetailComponent.prototype.getVideo = function () {
        var _this = this;
        var _videoId = this._route.snapshot.params['id'];
        console.log('_videoId: ' + _videoId);
        this._videoService.getVideo(this.sessionId, _videoId).subscribe(function (result) {
            _this.objVideo = result.data;
            //console.log('data onlyOne: ' + this.objVideo.name);
            _this.printRatings(_this.objVideo);
            _this.avgRating(_this.objVideo);
            _this.objVideo.status = true;
            //window.location.reload();
            //location.reload();
        }, function (error) {
            console.log(error);
        });
    };
    VideoDetailComponent.prototype.rateVideo = function (_videoId, _rate) {
        var _this = this;
        console.log('videoId: ' + _videoId);
        console.log('sessionId: ' + this.sessionId);
        console.log('rate: ' + _rate);
        this._videoService.rateVideo(this.sessionId, _videoId, _rate).subscribe(function (result) {
            _this.objVideo = result.data;
            console.log('data after Rate: ' + _this.objVideo.name);
            _this.printRatings(_this.objVideo);
            _this.avgRating(_this.objVideo);
            _this.objVideo.status = false;
        }, function (error) {
            console.log(error);
        });
    };
    VideoDetailComponent.prototype.getVideos = function (id) {
        var _this = this;
        console.log('***getVideos***');
        this._videoService.getVideos(id, this.skip, this.limit).subscribe(function (result) {
            _this.lstVideos = result.data;
            //this.lstVideos.avgRating = (this.sumaRating(this.lstVideos));
            _this.avgRatings(_this.lstVideos);
            //console.log('data video: ' + this.lstVideos[0].name);
            //console.log('data video: ' + this.lstVideos[0]._id);
        }, function (error) {
            //this.errorMsg = <any>error;
        });
    };
    VideoDetailComponent.prototype.printRatings = function (objVideo) {
        //for (let video of objVideo) {
        console.log('Ratings: ' + objVideo.ratings);
        //}
    };
    VideoDetailComponent.prototype.avgRating = function (objVideo) {
        var _rating;
        //let rating = [];
        //for (let video of lstVideos) {
        _rating = 0;
        //console.log('rating: ' + video.ratings);
        for (var _i = 0, _a = objVideo.ratings; _i < _a.length; _i++) {
            var video = _a[_i];
            //console.log('rating: ' + v);
            _rating += video;
        }
        //console.log('rating por uno: ' + (_rating / video.ratings.length).toFixed(0));
        var avg = (_rating / objVideo.ratings.length).toFixed(0);
        //rating.push(avg);
        //video.avgRating = avg;
        console.log('AVG: ' + avg);
        objVideo.myRating = avg;
        //}
        //console.log('avg array: ' + rating);
        //console.log('raiting: ' + lstVideos[0].ratings);
        //return rating;
    };
    VideoDetailComponent.prototype.avgRatings = function (lstVideos) {
        var _rating;
        //let rating = [];
        for (var _i = 0, lstVideos_1 = lstVideos; _i < lstVideos_1.length; _i++) {
            var video = lstVideos_1[_i];
            _rating = 0;
            //console.log('rating: ' + video.ratings);
            for (var _a = 0, _b = video.ratings; _a < _b.length; _a++) {
                var v = _b[_a];
                //console.log('rating: ' + v);
                _rating += v;
            }
            //console.log('rating por uno: ' + (_rating / video.ratings.length).toFixed(0));
            var avg = (_rating / video.ratings.length).toFixed(0);
            //rating.push(avg);
            video.avgRating = avg;
        }
        //console.log('avg array: ' + rating);
        //console.log('raiting: ' + lstVideos[0].ratings);
        //return rating;
    };
    VideoDetailComponent.prototype.openVideoDetail = function (videoId) {
        console.log('Init VideoDetailComponent 2');
        var objUser = JSON.parse(localStorage.getItem('objUser'));
        if (objUser != null) {
            this.sessionId = objUser.sessionId;
            this.getVideo2(videoId);
            this.getVideos(this.sessionId);
            console.log('objUser: ' + objUser.sessionId);
        }
        else {
            console.log('ERROR');
            this._router.navigate(["/"]);
        }
    };
    VideoDetailComponent.prototype.getVideo2 = function (videoId) {
        var _this = this;
        //let _videoId = this._route.snapshot.params['id'];
        //console.log('_videoId: ' + _videoId);
        this._videoService.getVideo(this.sessionId, videoId).subscribe(function (result) {
            _this.objVideo = result.data;
            //console.log('data onlyOne: ' + this.objVideo.name);
            _this.printRatings(_this.objVideo);
            _this.avgRating(_this.objVideo);
            _this.objVideo.status = true;
            //window.location.reload();
            //location.reload();
        }, function (error) {
            console.log(error);
        });
    };
    VideoDetailComponent = __decorate([
        core_1.Component({
            selector: 'video-detail',
            templateUrl: 'app/view/vpc-detail.html',
            viewProviders: [vpc_video_service_1.VideoService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, vpc_video_service_1.VideoService])
    ], VideoDetailComponent);
    return VideoDetailComponent;
}());
exports.VideoDetailComponent = VideoDetailComponent;
//# sourceMappingURL=vpc-detail.component.js.map