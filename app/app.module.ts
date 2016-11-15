import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { LoginComponent } from './component/vpc-login.component';
import { NavComponent } from './component/vpc-nav.component';
import { VideoListComponent } from './component/vpc-list.component';
import { VideoDetailComponent } from './component/vpc-detail.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'video-list', component: VideoListComponent },
    { path: 'video-detail/:id', component: VideoDetailComponent },
    { path: '**', component: LoginComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [AppComponent, LoginComponent, NavComponent, VideoListComponent, VideoDetailComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }