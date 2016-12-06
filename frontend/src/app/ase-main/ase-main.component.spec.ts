/* tslint:disable:no-unused-variable */
import {TestBed, async} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AseMainComponent} from './ase-main.component';
import {VoteService} from "../vote.service";
import {UserService} from "../user.service";

describe('Component: AseMain', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        UserService,
        VoteService
      ],
      declarations: [
        AseMainComponent
      ]
    });

    this.fixture = TestBed.createComponent(AseMainComponent);
  });

  it('should create an instance', async(() => {
    let component = this.fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
});
