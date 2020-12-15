import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  helper = new JwtHelperService();

  constructor(private authenticationService: AuthenticationService,
              private routes: Router,
              private questionService: QuestionsService,
              private spinner:NgxSpinnerService) { }

  ngOnInit() {
  }

  starttest() {
    this.spinner.show();
    const decodedToken = this.helper.decodeToken(JSON.parse(JSON.stringify(this.authenticationService.currentUserValue)));
    this.questionService.startTest(decodedToken.candidateid, decodedToken.number)
    .pipe(first())
        .subscribe(
          data => {
            this.spinner.hide();
            // console.log('data', data);
          },
          error => {
            this.spinner.hide();
              console.log('Error in creating : ', error);
          });
  }

  navigateToTest() {
    this.routes.navigate(['test']);
  }

}
