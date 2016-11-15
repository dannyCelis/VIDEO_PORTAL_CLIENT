import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VideoService } from "../service/vpc.video.service";
import { Video } from "../model/vpc.video.model";
//import { Location } from '@angular/common';

@Component({
    selector: 'video-detail',
    templateUrl: 'app/view/vpc-detail.html',
    viewProviders: [VideoService]
})

export class VideoDetailComponent implements OnInit {
    public objVideo: Video;
    public lstVideos: Video[];
    private sessionId: string;

    private skip: number;
    private limit: number;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _videoService: VideoService
    ) {
        this.objVideo = new Video();
        this.skip = 0;
        this.limit = 10;
    }

    ngOnInit() {
        console.log('Init VideoDetailComponent');
        let objUser = JSON.parse(localStorage.getItem('objUser'));
        if (objUser != null) {
            this.sessionId = objUser.sessionId;
            this.getVideo();
            this.getVideos(this.sessionId);
            console.log('objUser: ' + objUser.sessionId);
        } else {
            console.log('ERROR');
            this._router.navigate(["/"]);
        }
    }

    getVideo() {
        let _videoId = this._route.snapshot.params['id'];
        console.log('_videoId: ' + _videoId);
        this._videoService.getVideo(this.sessionId, _videoId).subscribe(
            result => {
                this.objVideo = result.data;
                //console.log('data onlyOne: ' + this.objVideo.name);
                this.printRatings(this.objVideo);
                this.avgRating(this.objVideo);
                this.objVideo.status = true;
                //window.location.reload();
                //location.reload();
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    rateVideo(_videoId: string, _rate: number) {
        console.log('videoId: ' + _videoId);
        console.log('sessionId: ' + this.sessionId);
        console.log('rate: ' + _rate);
        this._videoService.rateVideo(this.sessionId, _videoId, _rate).subscribe(
            result => {
                this.objVideo = result.data;
                console.log('data after Rate: ' + this.objVideo.name);
                this.printRatings(this.objVideo);
                this.avgRating(this.objVideo);
                this.objVideo.status = false;
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    getVideos(id: string) {
        console.log('***getVideos***');
        this._videoService.getVideos(id, this.skip, this.limit).subscribe(
            result => {
                this.lstVideos = result.data;
                //this.lstVideos.avgRating = (this.sumaRating(this.lstVideos));
                this.avgRatings(this.lstVideos);
                //console.log('data video: ' + this.lstVideos[0].name);
                //console.log('data video: ' + this.lstVideos[0]._id);
            },
            error => {
                //this.errorMsg = <any>error;
            }
        );

    }

    printRatings(objVideo) {
        //for (let video of objVideo) {
        console.log('Ratings: ' + objVideo.ratings);
        //}
    }

    avgRating(objVideo) {
        let _rating: number;
        //let rating = [];
        //for (let video of lstVideos) {
        _rating = 0;
        //console.log('rating: ' + video.ratings);
        for (let video of objVideo.ratings) {
            //console.log('rating: ' + v);
            _rating += video;
        }
        //console.log('rating por uno: ' + (_rating / video.ratings.length).toFixed(0));
        let avg = (_rating / objVideo.ratings.length).toFixed(0);
        //rating.push(avg);
        //video.avgRating = avg;
        console.log('AVG: ' + avg);
        objVideo.myRating = avg;
        //}
        //console.log('avg array: ' + rating);
        //console.log('raiting: ' + lstVideos[0].ratings);
        //return rating;
    }

    avgRatings(lstVideos) {
        let _rating: number;
        //let rating = [];
        for (let video of lstVideos) {
            _rating = 0;
            //console.log('rating: ' + video.ratings);
            for (let v of video.ratings) {
                //console.log('rating: ' + v);
                _rating += v;
            }
            //console.log('rating por uno: ' + (_rating / video.ratings.length).toFixed(0));
            let avg = (_rating / video.ratings.length).toFixed(0);
            //rating.push(avg);
            video.avgRating = avg;
        }
        //console.log('avg array: ' + rating);
        //console.log('raiting: ' + lstVideos[0].ratings);
        //return rating;
    }

    openVideoDetail(videoId: string) {
        console.log('Init VideoDetailComponent 2');
        let objUser = JSON.parse(localStorage.getItem('objUser'));
        if (objUser != null) {
            this.sessionId = objUser.sessionId;
            this.getVideo2(videoId);
            this.getVideos(this.sessionId);
            console.log('objUser: ' + objUser.sessionId);
        } else {
            console.log('ERROR');
            this._router.navigate(["/"]);
        }
    }

    getVideo2(videoId: string) {
        //let _videoId = this._route.snapshot.params['id'];
        //console.log('_videoId: ' + _videoId);
        this._videoService.getVideo(this.sessionId, videoId).subscribe(
            result => {
                this.objVideo = result.data;
                //console.log('data onlyOne: ' + this.objVideo.name);
                this.printRatings(this.objVideo);
                this.avgRating(this.objVideo);
                this.objVideo.status = true;
                //window.location.reload();
                //location.reload();
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}