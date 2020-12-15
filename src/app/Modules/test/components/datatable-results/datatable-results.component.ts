import { CategoryService } from './../../../../Services/Category/category.service';
import { ExperienceLevelService } from './../../../../Services/ExperienceLevel/experience-level.service';
import { UserService } from 'src/app/Services/Users/user.service';
import { Router } from '@angular/router';
import { TestService } from 'src/app/Services/Test/test.service';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-datatable-results',
  templateUrl: './datatable-results.component.html',
  styleUrls: ['./datatable-results.component.css']
})
export class DatatableResultsComponent implements OnInit {

  resultList = [];
  users$: any[] = [];
  cols = [];
  mycatList = [];
  userEmail = [];
  expList = [];
  role = '';
  categoryList = [];
  experienceLevelList = [];
  constructor(private testService: TestService,
              private routes: Router,
              private experienceLevelService: ExperienceLevelService,
              private categoryService: CategoryService,
              private userService: UserService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {



    this.experienceLevelService.getallExperienceLevels()
      .pipe(first())
      .subscribe(
        data => {
          this.experienceLevelList =  data.data.experiences;
          this.expList.push({ label: 'All Experience', value: null });

          console.log('DatatableQuestionsComponent -> ngOnInit -> this.experienceLevelList', this.experienceLevelList);
          this.experienceLevelList.map(x => {
            this.expList.push({ label: x.name, value: x.name });
          });

          this.categoryService.getallCategory()
          .pipe(first())
          .subscribe(
            data => {
              // tslint:disable-next-line: no-string-literal
              this.categoryList =  data.data['categories'];
              this.mycatList.push({ label: 'All categories', value: null });
              this.categoryList.map(x => {
                this.mycatList.push({ label: x.name, value: x.name });
              });
            },
            error => {
              this.mycatList = [];
            });


          if (this.authenticationService.currentUserRole === 'verifier') {
            this.role = 'verifier';
            this.cols = [
              { field: 'candidateName', header: 'Candidate Name', width: '25%'},
              { field: 'experienceLevel', header: 'Experience Level' , width: '25%'},
              { field: 'testStatus', header: 'Test Status' , width: '25%'},
              { field: 'testDate', header: 'Test Date' , width: '25%'}
            ];


            this.testService.getTestResultByRole()
            .pipe(first())
            .subscribe(
              data => {
                this.resultList =  data.data.result;
                console.log('DatatableResultsComponent -> ngOnInit -> this.resultList', this.resultList);

              },
              error => {
                this.resultList = [];
              });
          } else {
            this.role = 'admin';
            this.cols = [
              { field: 'candidateName', header: 'Candidate Name' , width: '30%'},
              { field: 'category', header: 'Category' , width: '35%'},
              { field: 'experienceLevel', header: 'Experience Level' , width: '25%'},
              { field: 'testStatus', header: 'Test Status' , width: '25%'},
              { field: 'testDate', header: 'Test Date' , width: '25%'},
            ];


            this.testService.getTestResult()
            .pipe(first())
            .subscribe(
            data => {

              this.resultList =  data.data.result;
              console.log('DatatableResultsComponent -> ngOnInit -> this.resultList', this.resultList);
            },
            error => {
              this.resultList = [];
            });
          }
  });

  }
}

