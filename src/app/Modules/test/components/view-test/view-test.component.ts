import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TestService } from 'src/app/Services/Test/test.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css']
})
export class ViewTestComponent implements OnInit {
  testForm: FormGroup;
  testId = 0;
  resultTest = [];
  role = "";
  constructor(private formBuilder: FormBuilder,
              private testService: TestService,
              private routes: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private spinner : NgxSpinnerService) {}

    ngOnInit() {
      this.spinner.show();
      this.testForm = this.formBuilder.group({
        candidateId: ['', Validators.required],
        candidateName: ['', Validators.required],
        category: ['', Validators.required],
        experienceLevel: ['', Validators.required],
        testDate: ['', Validators.required],
        testStatus: ['', Validators.required],
        totalQuestion: ['', Validators.required],
        attemptedQuestion: ['', Validators.required],
        correctAnswer: ['', Validators.required],
        wrongQuestion: ['', Validators.required],
        skippedQuestion: ['', Validators.required],
        percentage: ['', Validators.required],
        duration : ['', Validators.required],
      });
      this.route.paramMap
      .subscribe(params => {

        // tslint:disable-next-line: no-string-literal
        this.testId = params['params']['id'];


        if (this.authenticationService.currentUserRole === 'verifier') {
          this.role = 'verifier';
          this.testService.viewTestResultByRole(this.testId)
          .pipe(first())
          .subscribe(
            data => {
              this.spinner.hide();
              this.resultTest =  data.data.result;
              if(this.resultTest == null){
                this.spinner.hide();
                this.routes.navigate(['login']);
              }
              this.updateRecords(this.resultTest);
            },
            error => {
              this.spinner.hide();
              this.resultTest = [];
            });
        } else {
          
          this.role = 'admin';

          this.testService.viewTestResult(this.testId)
          .pipe(first())
          .subscribe(
            data => {
              this.spinner.hide();
              this.resultTest =  data.data.result;
              // console.log("ViewTestComponent -> ngOnInit -> data.data.result", data.data.result)
              if(this.resultTest == null){
                this.spinner.hide();
                this.routes.navigate(['login']);
              }
              this.updateRecords(this.resultTest);
            },
            error => {
              this.spinner.hide();
              this.resultTest = [];
            });
        }

      });
  }

    // convenience getter for easy access to form fields
    get f() { return this.testForm.controls; }
    get t() { return this.f.option as FormArray; }


  updateRecords(records) {
    this.testForm.patchValue({
      candidateName: records.candidateName,
      category: records.category,
      experienceLevel: records.experienceLevel,
      testDate: records.testDate,
      testStatus: records.testStatus,
      totalQuestion: records.totalQuestion,
      attemptedQuestion: records.attemptedQuestion,
      correctAnswer: records.correctAnswer,
      wrongQuestion: records.wrongQuestion,
      skippedQuestion: records.skippedQuestion,
      percentage: records.percentage,
      duration : records.duration,
    });
  }
}
