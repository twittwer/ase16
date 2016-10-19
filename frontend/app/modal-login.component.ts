// import {Component} from '@angular/core';


//
// @Component({
//     moduleId: module.id,
//     selector: 'login',
//     styleUrls: ['modal-login.component.css'],
//     templateUrl: './modal-login.component.html'
// })
// export class ModalLoginComponent {
// }

import {Component} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'login',
    moduleId: module.id,
    styleUrls: ['modal-login.component.css'],
    templateUrl: './modal-component.html'
})
export class NgbdModalBasic {
    closeResult: string;

    constructor(private modalService: NgbModal) {}

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
}