import { ExperienceLevelModule } from './../../experience-level.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienceLevelService } from './../../../../Services/ExperienceLevel/experience-level.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  expId = null;
  currentExpLevel = null;
  formError = false;
  experiencelevelForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private experiencelevelService: ExperienceLevelService,
              private routes: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.experiencelevelForm = this.formBuilder.group({
      Name: ['', Validators.required],
      MinExp: ['', Validators.required],
      MaxExp: ['', Validators.required]
    });

    this.route.paramMap
    .subscribe(params => {

      // tslint:disable-next-line: no-string-literal
      this.expId = params['params']['id'];

      this.experiencelevelService.getExperienceLevelById(this.expId)
      .pipe(first())
          .subscribe(
            data => {
              this.currentExpLevel = data.data.experience;
              // console.log('EditExperienceComponent -> ngOnInit -> this.currentExpLevel', this.currentExpLevel);
              if (this.currentExpLevel == null) {
                this.routes.navigate(['login']);
              }
              // console.log('TCL: EditCandidateComponent -> ngOnInit -> this.currentCandidate', this.currentExpLevel);
              this.updateRecords(this.currentExpLevel.name, this.currentExpLevel.minExp, this.currentExpLevel.maxExp);
            },
            error => {

            });

        });
      }

  // convenience getter for easy access to form fields
  get f() { return this.experiencelevelForm.controls; }


  updateRecords(Expname, min, max) {
    // console.log('EditExperienceComponent -> updateRecords -> Expname, min, max', Expname, min, max);
    this.experiencelevelForm.patchValue({
      Name: Expname,
      MinExp: min,
      MaxExp: max
    });
  }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;

    // stop here if form is invalid
    if (this.experiencelevelForm.invalid) {
      this.formError = true;
      this.spinner.hide();

      return;
    }

    this.experiencelevelService.updateExperienceLevel(this.expId,
      this.experiencelevelForm.value.Name,
      this.experiencelevelForm.value.MinExp,
      this.experiencelevelForm.value.MaxExp)
        .pipe(first())
        .subscribe(
          data => {
            this.showSuccessStatus =  true;
            this.showSuccessMessage = 'Experience Level has been Updated successfully';
            this.showErrorStatus =  false;
          },
          error => {
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Experience Level has not been Updated, can be seen in browser console';
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

}
