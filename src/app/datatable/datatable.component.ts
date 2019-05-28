import { Component, OnInit,AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormSubmission } from '../form-submission';
import { FormHandleService } from '../form-handle.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, AfterViewInit {
 
  submissions: FormSubmission[];
  @Output() editFormEvent: EventEmitter<number> =   new EventEmitter();
  
  constructor(private formHandleService: FormHandleService){}
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.getSubmissions();
  }
  displayedColumns: string[] = ['firstName', 'lastName', 'ageCategory', 'sex', 'hobby', 'id'];

  getSubmissions(){
    this.formHandleService.getSubmissions()
      .subscribe(submissions => { 
        this.submissions = submissions;
        console.log(this.submissions);
    });
  }
  
  editForm(id: number){
    this.editFormEvent.emit(id);
  }
}

