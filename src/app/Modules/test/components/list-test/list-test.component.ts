import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { Router } from '@angular/router';
import { TestService } from './../../../../Services/Test/test.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.css']
})
export class ListTestComponent implements OnInit {

  resultList = [];
  users$: any[] = [];

  dtOptions: DataTables.Settings = {
  };
  dtTrigger: Subject<any> = new Subject();

  constructor(private testService: TestService,
              private routes: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (this.authenticationService.currentUserRole === 'verifier') {
      this.testService.getTestResultByRole()
      .pipe(first())
      .subscribe(
        data => {
          this.resultList =  data.data.result;
          // console.log(this.resultList);
          this.users$ = data;
          this.dtTrigger.next();
        },
        error => {
          this.resultList = [];
        });
    } else {
      this.testService.getTestResult()
      .pipe(first())
      .subscribe(
        data => {
          this.resultList =  data.data.result;
          // console.log(this.resultList);
          this.users$ = data;
          this.dtTrigger.next();
        },
        error => {
          this.resultList = [];
        });
    }
  }



}
