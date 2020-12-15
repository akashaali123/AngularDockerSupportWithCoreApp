import { ExperienceLevelService } from './../../../Services/ExperienceLevel/experience-level.service';
import { CategoryService } from './../../../Services/Category/category.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { first } from 'rxjs/operators';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})

export class CreateQuestionsComponent implements OnInit {
  questionsForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  formError = false;
  options = 0;
  public Editor = DecoupledEditor;

  public onReady( editor ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
  }

  constructor(private formBuilder: FormBuilder,
              private questionsService: QuestionsService,
              private categoryService: CategoryService,
              private experienceLevelService: ExperienceLevelService,
              private spinner : NgxSpinnerService) {}
  categoryList = [];
  ExperienceLevelList = [];

  ngOnInit() {
    this.spinner.show();
    this.questionsForm = this.formBuilder.group({
      Description: ['', Validators.required],
      Marks: ['', Validators.required],
      CategoryId: ['', Validators.required],
      ExperienceLevelId: ['', Validators.required],
      Time: [0, Validators.required],
      option : new FormArray([])
    });
    this.categoryService.getallCategory()
        .pipe(first())
        .subscribe(
          data => {
            this.spinner.hide();
            this.categoryList =  data.data.categories;
          },
          error => {
            this.spinner.hide();
            this.categoryList = [];
          });
    this.experienceLevelService.getallExperienceLevels()
        .pipe(first())
        .subscribe(
          data => {
            this.spinner.hide();
            this.ExperienceLevelList =  data.data.experiences;
          },
          error => {
            this.spinner.hide();
            this.ExperienceLevelList = [];
          });
  }
  // convenience getter for easy access to form fields
  get f() { return this.questionsForm.controls; }
  get t() { return this.f.option as FormArray; }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;
    if (this.questionsForm.invalid ) {
      this.spinner.hide();
      this.formError = true;
      return;
    }
      // Description, Marks, CategoryId, ExperienceLevelId
    const question  =  {
        Description : this.f.Description.value,
        Marks : this.f.Marks.value,
        Type: 'ASP.NET',
        Time: this.f.Time.value,
        CategoryId : this.f.CategoryId.value,
        ExperienceLevelId : this.f.ExperienceLevelId.value,
      };

    // console.log('CreateQuestionsComponent -> onSubmit -> this.f.option.value', this.f.option.value);
    this.questionsService.createQuestion(question, this.f.option.value)
        .pipe(first())
        .subscribe(
          data => {
            if (data.success && data.status === 200) {
              this.spinner.hide();
              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'Questions has been added successfully';
              this.showErrorStatus =  false;
              this.submitted = false;
              this.options = 0;
              this.clearFormArray(this.t);
              this.questionsForm.reset();
            } else {
              this.spinner.hide();
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Questions has not been added, can be seen in browser console';
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
  }
  getshowSuccessStatus() {
    return this.showSuccessStatus;
  }
  getshowErrorStatus() {
    return this.showErrorStatus;
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }
  onChangeOptions(e) {
    const numberOfOptions = e.target.value || 1;
    if (this.t.length < numberOfOptions) {
        for (let i = this.t.length; i < numberOfOptions; i++) {
            this.t.push(this.formBuilder.group({
              IsCorrect: [false],
              OptionDescription: ['', [Validators.required]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfOptions; i--) {
            this.t.removeAt(i);
        }
    }
  }

}
