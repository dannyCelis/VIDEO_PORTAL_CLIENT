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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var vpc_video_service_1 = require("../service/vpc.video.service");
var router_1 = require('@angular/router');
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var VideoListComponent = (function () {
    function VideoListComponent(_videoService, _router, document) {
        this._videoService = _videoService;
        this._router = _router;
        this.document = document;
        this.key = true;
        this.lstVideos = [];
        this.skip = 0;
        this.limit = 10;
    }
    VideoListComponent.prototype.onWindowScroll = function () {
        var number = this.document.body.scrollTop;
        if (this.key) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.skip += 10;
                this.ngOnInit();
            }
        }
    };
    VideoListComponent.prototype.ngOnInit = function () {
        var objUser = JSON.parse(localStorage.getItem('objUser'));
        if (objUser != null) {
            this.sessionId = objUser.sessionId;
            this.getVideos(this.sessionId);
        }
        else {
            console.log('ERROR');
            this._router.navigate(["/"]);
        }
    };
    VideoListComponent.prototype.getVideos = function (id) {
        var _this = this;
        var lstVideo = [];
        this._videoService.getVideos(id, this.skip, this.limit).subscribe(function (result) {
            if (_this.key) {
                _this.lstVideos.push.apply(_this.lstVideos, result.data);
                _this.avgRating(_this.lstVideos);
            }
            if (result.data.length == 0) {
                _this.key = false;
            }
        }, function (error) {
            _this.errorMsg = error;
        });
    };
    VideoListComponent.prototype.avgRating = function (lstVideos) {
        var _rating;
        for (var _i = 0, lstVideos_1 = lstVideos; _i < lstVideos_1.length; _i++) {
            var video = lstVideos_1[_i];
            _rating = 0;
            for (var _a = 0, _b = video.ratings; _a < _b.length; _a++) {
                var v = _b[_a];
                _rating += v;
            }
            video.name = this.cutePharagraph(25, video.name);
            video.description = this.cutePharagraph(75, video.description);
            var avg = (_rating / video.ratings.length).toFixed(0);
            video.avgRating = avg;
        }
    };
    VideoListComponent.prototype.cutePharagraph = function (tamanio, paragraph) {
        if (paragraph.length > tamanio) {
            paragraph = paragraph.substring(0, tamanio) + '...';
        }
        return paragraph;
    };
    __decorate([
        core_2.HostListener("window:scroll", []), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], VideoListComponent.prototype, "onWindowScroll", null);
    VideoListComponent = __decorate([
        core_1.Component({
            selector: 'video-list',
            templateUrl: 'app/view/vpc-list.html',
            providers: [vpc_video_service_1.VideoService]
        }),
        __param(2, core_3.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [vpc_video_service_1.VideoService, router_1.Router, Document])
    ], VideoListComponent);
    return VideoListComponent;
}());
exports.VideoListComponent = VideoListComponent;
//# sourceMappingURL=vpc-list.component.js.map