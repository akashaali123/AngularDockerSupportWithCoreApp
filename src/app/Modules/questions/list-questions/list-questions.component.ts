import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { ExperienceLevelService } from './../../../Services/ExperienceLevel/experience-level.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  QuestionsList = [];
  users$: any[] = [];
  role = null;

  constructor(private questionsService: QuestionsService,
              private authenticationService: AuthenticationService,
              private spinner : NgxSpinnerService) {}

  dtOptions: DataTables.Settings = {
  };
  dtTrigger: Subject<any> = new Subject();


  ngOnInit() {
    this.spinner.show();
    if (this.authenticationService.currentUserRole === 'contributor') {
      this.questionsService.getallQuestionsUsingContributor()
          .pipe(first())
          .subscribe(
            data => {
              this.spinner.hide();
              this.QuestionsList =  data.data.questions;
              this.users$ = data;
              this.dtTrigger.next();
            },
            error => {
             this.spinner.hide();
              this.QuestionsList = [];
            });
            this.spinner.hide();
            this.role = 'contributor';

    } else {
      this.role = 'admin';
      this.questionsService.getallQuestions()
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();
          this.QuestionsList =  data.data.questions;
          this.users$ = data;
          this.dtTrigger.next();
        },
        error => {
          this.spinner.hide();
          this.QuestionsList = [];
        });

    }
    this.spinner.hide();
  }
  delete(questionId) {
    this.spinner.show();
    this.questionsService.deleteQuestion(questionId)
        .pipe(first())
        .subscribe(
          data => {
            
            if (data.data.question === true) {
              this.spinner.hide();
              console.log('Data Deleted');
              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'Questions has been deleted successfully';
              this.showErrorStatus =  false;

              this.QuestionsList = this.QuestionsList.filter((value) => {
                this.spinner.hide();
                return value.questionId !== questionId;
              });
            } else {
              this.spinner.hide();
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Questions has not been deleted, can be seen in browser console';
              console.log('Error in creating Question');
            }
          },
          error => {
            this.spinner.hide();
            console.log(error);
          });
          this.spinner.hide();
  }

}
