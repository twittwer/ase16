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
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.loginSuccess = function (login) {
        if (login == true) {
            this.isLoggedIn = true;
        }
    };
    AppComponent.prototype.logout = function (successLogout) {
        if (successLogout == true) {
            this.isLoggedIn = false;
        }
    };
    AppComponent.prototype.displayVoting = function (showVot) {
        if (showVot == true) {
            this.isShowVoting = true;
        }
        else {
            this.isShowVoting = false;
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <header *ngIf=\"isLoggedIn\" (logout)=\"logout($event)\"></header>\n  <div *ngIf=\"isLoggedIn\">\n    <div [ngClass]=\"{'onLeftSide': isShowVoting}\">\n      <messagebox (displayVoting)=\"displayVoting($event)\" class=\"messagebox-container\"></messagebox>\n    </div>\n    <voting class=\"voting-container\" *ngIf=\"isShowVoting\"></voting>\n  </div>\n  <login  *ngIf=\"!isLoggedIn\" (loginSuccess)=\"loginSuccess($event)\"></login>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map