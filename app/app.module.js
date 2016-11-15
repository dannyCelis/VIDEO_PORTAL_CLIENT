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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var vpc_login_component_1 = require('./component/vpc-login.component');
var vpc_nav_component_1 = require('./component/vpc-nav.component');
var vpc_list_component_1 = require('./component/vpc-list.component');
var vpc_detail_component_1 = require('./component/vpc-detail.component');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var routes = [
    { path: '', component: vpc_login_component_1.LoginComponent },
    { path: 'video-list', component: vpc_list_component_1.VideoListComponent },
    { path: 'video-detail/:id', component: vpc_detail_component_1.VideoDetailComponent },
    { path: '**', component: vpc_login_component_1.LoginComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(routes)
            ],
            declarations: [app_component_1.AppComponent, vpc_login_component_1.LoginComponent, vpc_nav_component_1.NavComponent, vpc_list_component_1.VideoListComponent, vpc_detail_component_1.VideoDetailComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map