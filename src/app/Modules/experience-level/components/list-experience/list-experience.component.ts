import { DataTablesModule } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { ExperienceLevelService } from './../../../../Services/ExperienceLevel/experience-level.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-experience',
  templateUrl: './list-experience.component.html',
  styleUrls: ['./list-experience.component.css']
})
export class ListExperienceComponent implements OnInit, OnDestroy {

  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;

  constructor(private http: HttpClient,
              private experienceLevelService: ExperienceLevelService,
              private spinner:NgxSpinnerService) {
  }
  ExperienceLevelList = [];
  users$: any[] = [];
  dtOptions: DataTables.Settings = {
  };
  dtTrigger: Subject<any> = new Subject();
  ngOnInit() {
    this.spinner.show();
    this.experienceLevelService.getallExperienceLevels()
        .pipe(first())
        .subscribe(
          data => {
            this.spinner.hide();
            this.ExperienceLevelList =  data.data.experiences;
            this.users$ = data;
            this.dtTrigger.next();
          },
          error => {
            this.spinner.hide();
            this.ExperienceLevelList = [];
          });
    this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true
          };

  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onDelete(experiencelevelId){
    this.experienceLevelService.deleteExperienceLevel(experiencelevelId)
        .pipe(first())
        .subscribe(
          data => {
            if(data.data.experience == true){
              console.log("success");

              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'Experience Level has been deleted successfully';
              this.showErrorStatus =  false;

              this.ExperienceLevelList = this.ExperienceLevelList.filter((value) => {
                return value.id !== experiencelevelId;
              });

            } else {
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Experience Level has not been deleted, can be seen in browser console';
              console.log('Error in creating Question');
            }
          },
          error => {
            console.log(error);
          });
  }

}
