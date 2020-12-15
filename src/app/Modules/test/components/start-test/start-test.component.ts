import { NgxSpinnerService } from 'ngx-spinner';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { CandidateService } from './../../../../Services/Candidate/candidate.service';
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css']
})
export class StartTestComponent implements OnInit {
  startTestForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  helper = new JwtHelperService();
  formError = false;
  showTime = false;


  constructor(private formBuilder: FormBuilder,
              private candidateService: CandidateService,
              private spinner: NgxSpinnerService,
              private authenticationService: AuthenticationService) {}
  candidateList = [];

  ngOnInit() {
    this.spinner.show();
    this.startTestForm = this.formBuilder.group({
      CandidateId: ['', Validators.required],
      numberOfQuestion: ['', Validators.required],
      testTime: [0],
      testType: ['', Validators.required],
    });
    this.candidateService.getallCandidateWithcategory()
        .pipe(first())
        .subscribe(
          data => {
            this.spinner.hide();
            this.candidateList =  data.data.name;
            console.log("StartTestComponent -> ngOnInit -> candidateList", this.candidateList)
          },
          error => {
            this.spinner.hide();
            this.candidateList = [];
          });
  }
  // convenience getter for easy access to form fields
  get f() { return this.startTestForm.controls; }

  onChangeTestType(e) {
    console.log(e);
  }

  onSubmit() {
    this.spinner.show();

    // stop here if form is invalid
    this.submitted = true;

    if (this.startTestForm.invalid) {
      this.formError = true;
      this.spinner.hide();
      return;
    }
    let tempTestNumber = 0;
    if (this.startTestForm.value.testType == false || this.startTestForm.value.testType == 'false') {
      tempTestNumber = 0;
    } else {
      tempTestNumber = this.startTestForm.value.testTime;
    }
    // console.log("StartTestComponent -> onSubmit -> tempTestNumber", tempTestNumber)

      // Description, Marks, CategoryId, ExperienceLevelId
    this.candidateService.createtest(this.startTestForm.value.CandidateId,
      this.startTestForm.value.numberOfQuestion,
      tempTestNumber)
        .pipe(first())
        .subscribe(
          data => {
            if (data.success && data.status === 200) {
              this.spinner.hide();
              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'Candidate Test has been added successfully';
              this.showErrorStatus =  false;
              this.submitted = false;
              this.startTestForm.reset();
              this.authenticationService.logout();
              localStorage.setItem('currentUser', JSON.stringify(data.data.jwttoken));
              const decodedToken = this.helper.decodeToken(data.data.jwttoken);
              if (decodedToken.role === 'SuperAdmin') {
                  localStorage.setItem('role', 'SuperAdmin');
                  this.authenticationService.isAdminSubject.next('SuperAdmin');
                } else if (decodedToken.role === 'admin') {
                  localStorage.setItem('role', 'admin');
                  this.authenticationService.isAdminSubject.next('admin');
                } else if (decodedToken.role === 'candidate') {
                  localStorage.setItem('role', 'candidate');
                  localStorage.setItem('allow', 'true');
                  this.authenticationService.isAdminSubject.next('candidate');
                } else {
                  this.authenticationService.isAdminSubject.next('user');
                  localStorage.setItem('role', 'user');
                }
              this.authenticationService.currentUserSubject.next(data.data);
              window.location.reload();
            } else {
              this.spinner.hide();
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Candidate Test has not been added, can be seen in browser console';
              console.log('Error in creating Question');
            }
          },
          error => {
            this.spinner.hide();
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Questions has not been added, can be seen in browser console';
              console.log('Error in creating : ', error);
          });
    this.spinner.hide();

  }
  getshowSuccessStatus() {
    return this.showSuccessStatus;
  }
  getshowErrorStatus() {
    return this.showErrorStatus;
  }

  onChange(event) {
    if(event == true || event == "true" ){
      this.showTime = true;
    } else {
      this.showTime = false;
    }
    console.log("StartTestComponent -> onChange -> event", event)
  }
  getShowTime() {
    return this.showTime;
  }

  geterror() {
    return this.formError;
  }

}
