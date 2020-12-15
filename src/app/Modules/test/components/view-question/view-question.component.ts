import { ActivatedRoute } from '@angular/router';
import { ExperienceLevelService } from './../../../../Services/ExperienceLevel/experience-level.service';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {
  AllQuestionForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  formError = false;
  options = 0;
  viewQuestions = [];
  testId = "";

  constructor(private formBuilder: FormBuilder,
              private spinner : NgxSpinnerService,
              private route: ActivatedRoute,
              private questionsService: QuestionsService) {}

  ngOnInit() {
    this.spinner.show();
    this.AllQuestionForm = this.formBuilder.group({
      Description: ['', Validators.required],
      correctoption : new FormArray([]),
      alloption : new FormArray([])
    });

    this.route.paramMap
    .subscribe(params => {

      // tslint:disable-next-line: no-string-literal
      this.testId = params['params']['id'];

      this.questionsService.getAllResultQuestions(this.testId)
      .pipe(first())
      .subscribe(
        data => {
          this.viewQuestions = data.data.result;
          console.log('ViewQuestionComponent -> ngOnInit -> this.viewQuestions', this.viewQuestions);
          this.spinner.hide();
        },
        error => {
        console.log('ViewQuestionComponent -> ngOnInit -> error', error);
        this.viewQuestions = [];
        this.spinner.hide();
        });
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.AllQuestionForm.controls; }
  get t() { return this.f.correctoption as FormArray; }
  get u() { return this.f.alloption as FormArray; }

  cleanText(strInputCode){
    return strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
  }
}
