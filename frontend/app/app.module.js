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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var app_component_1 = require('./app.component');
var header_component_1 = require('./header.component');
var messagebox_component_1 = require('./messagebox.component');
var modal_login_component_1 = require('./modal-login.component');
<<<<<<< HEAD
var voting_component_1 = require('./voting.component');
var voting_Form_component_1 = require('./voting-Form.component');
=======
var user_service_1 = require("./user.service");
var voting_Form_component_1 = require("./voting-Form.component");
var voting_component_1 = require("./voting.component");
>>>>>>> 964aadb66b426aaf4fd3de576daa0ee046330af4
var question_list_component_1 = require('./question-list.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
<<<<<<< HEAD
=======
                modal_login_component_1.NgbdModalBasic,
>>>>>>> 964aadb66b426aaf4fd3de576daa0ee046330af4
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                messagebox_component_1.MessageBoxComponent,
                modal_login_component_1.NgbdModalBasic,
                voting_component_1.VotingComponent,
                voting_Form_component_1.VotingFormComponent,
                question_list_component_1.QuestionListComponent
            ],
<<<<<<< HEAD
=======
            providers: [user_service_1.UserService],
>>>>>>> 964aadb66b426aaf4fd3de576daa0ee046330af4
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map