import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormSubmission } from '../form-submission';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {

  @Output() editFormEvent: EventEmitter<number> = new EventEmitter();
 
  submissions: FormSubmission[];
  datatableVisible: boolean = false;
  buttonText: string = "Zobrazit odpověde"
  constructor() { }

  ngOnInit() {
  }
  
  changeDtVisibility(){
    if(this.datatableVisible === true){
      this.datatableVisible = false;
      this.buttonText = "Zobrazit odpověde";
      
    }
    else{
      this.datatableVisible = true;
      this.buttonText = "Skrýt odpověde";
    }
  }
  editForm(id: number){
    this.editFormEvent.emit(id);
  }


}
