import { Component, OnInit } from "@angular/core";
import { VideoService } from "../service/vpc.video.service";
import { Video } from "../model/vpc.video.model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HostListener } from "@angular/core";
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

@Component({
    selector: 'video-list',
    templateUrl: 'app/view/vpc-list.html',
    providers: [VideoService]
})

export class VideoListComponent implements OnInit {
    public errorMsg: string;
    public lstVideos: Array<Video>;
    public sessionId: string;

    private skip: number;
    private limit: number;
    private key: boolean = true;
    constructor(private _videoService: VideoService, private _router: Router, @Inject(DOCUMENT) private document: Document) {
        this.lstVideos = [];
        this.skip = 0;
        this.limit = 10;
    }
    @HostListener("window:scroll", [])
    onWindowScroll() {
        let number = this.document.body.scrollTop;
        if (this.key) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.skip += 10;
                this.ngOnInit();
            }

        }
    }

    ngOnInit() {
        let objUser = JSON.parse(localStorage.getItem('objUser'));
        if (objUser != null) {
            this.sessionId = objUser.sessionId;
            this.getVideos(this.sessionId);
        } else {
            console.log('ERROR');
            this._router.navigate(["/"]);
        }

    }

    getVideos(id: string) {
        let lstVideo = [];
        this._videoService.getVideos(id, this.skip, this.limit).subscribe(
            result => {
                if (this.key) {
                    this.lstVideos.push.apply(this.lstVideos, result.data);
                    this.avgRating(this.lstVideos);
                }
                if (result.data.length == 0) {
                    this.key = false;
                }
            },
            error => {
                this.errorMsg = <any>error;
            }
        );

    }

    avgRating(lstVideos) {
        let _rating: number;
        for (let video of lstVideos) {
            _rating = 0;
            for (let v of video.ratings) {
                _rating += v;
            }
            video.name = this.cutePharagraph(25, video.name);
            video.description = this.cutePharagraph(75, video.description);
            let avg = (_rating / video.ratings.length).toFixed(0);
            video.avgRating = avg;
        }
    }

    cutePharagraph(tamanio: number, paragraph) {
        if (paragraph.length > tamanio) {
            paragraph = paragraph.substring(0, tamanio) + '...';
        }
        return paragraph;
    }
}