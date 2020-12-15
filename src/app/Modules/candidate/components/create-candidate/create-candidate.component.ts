import { ExperienceLevelService } from './../../../../Services/ExperienceLevel/experience-level.service';
import { CategoryService } from './../../../../Services/Category/category.service';
import { CandidateService } from './../../../../Services/Candidate/candidate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import 'src/assets/scripts/main.js';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.css']
})
export class CreateCandidateComponent implements OnInit {
  candidateForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  categoryList = [];
  ExperienceLevelList = [];
  formError = false;

  constructor(private formBuilder: FormBuilder,
              private candidateService: CandidateService,
              private categoryService: CategoryService,
              private experienceLevelService: ExperienceLevelService,
              private spinner :NgxSpinnerService ) {}

  ngOnInit() {
    this.spinner.show();
    this.candidateForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      CurrentCompany: ['', Validators.required],
      CategoryId: ['', Validators.required],
      ExperienceLevelId: ['', Validators.required],
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
  get f() { return this.candidateForm.controls; }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;

        // stop here if form is invalid
    if (this.candidateForm.invalid) {
          this.spinner.hide();
          this.formError = true;
          return;
        }
    this.candidateService.createCandidate(
        this.f.FirstName.value,
        this.f.LastName.value,
        this.f.email.value,
        this.f.CurrentCompany.value,
        this.f.CategoryId.value,
        this.f.ExperienceLevelId.value)
        .pipe(first())
        .subscribe(
          data => {
            this.spinner.hide();
            this.showSuccessStatus =  true;
            this.showSuccessMessage = 'Candidate has been added successfully';
            this.showErrorStatus =  false;
            this.submitted = false;
            this.candidateForm.reset();
          },
          error => {
            this.spinner.hide();
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Candidate has not been added, can be seen in browser console';
          });

  }
  getshowSuccessStatus() {
    return this.showSuccessStatus;
  }
  getshowErrorStatus() {
    return this.showErrorStatus;
  }
  geterror() {
    return this.formError;
  }
}
