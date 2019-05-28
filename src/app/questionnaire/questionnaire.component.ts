import {Component, OnInit, SimpleChanges, Output, EventEmitter, Input} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, startWith, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { Hobby } from '../hobby';
import { HobbiesService } from '../hobbies.service';
import { FormHandleService } from '../form-handle.service'
import { FormSubmission } from '../form-submission'

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  hobbies$: Observable<Hobby[]>;
  private searchTerms = new Subject<string>(); 
  value: string;
  questionnaire: boolean = true;
  result: boolean = false;
  submission: FormSubmission;

  @Input() formId: number;
  @Output() viewChanged: EventEmitter<string> = new EventEmitter();

  questionForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    ageCategory: ['Pod 18 let', Validators.required],
    sex: ['man', Validators.required],
    hobby: ['']
  });

  options = [ 
    { name: "Pod 18 let", value: 1 },
    { name: "18 - 27 let", value: 2 },
    { name: "28 - 45 let", value: 3 },
    { name: "Nad 45 let", value: 4 }
  ];

  constructor(private hobbiesService: HobbiesService,
              private fb: FormBuilder,
              private formHandleService: FormHandleService,
              ) { }
  
  search(term: string): void{
    this.searchTerms.next(term);
  }
  getOptionVal(): number{
    let selectedOption = this.questionForm.controls['ageCategory'].value;
    console.log(selectedOption);
    if(!selectedOption) return 0;
    let opt = this.options.find(option => option.name === selectedOption);
    return opt.value;
  }
  ngOnInit() {
    this.hobbies$ = this.searchTerms.pipe(
      debounceTime(300),
      //distinctUntilChanged(),
      switchMap((term: string) => 
        this.hobbiesService.searchHobbies(term, this.getOptionVal() )
      ), 
    );
    if(this.formId){
      this.getSubmission();
    }
  }
  
  fillInput(name: string){
    this.questionForm.controls['hobby'].setValue(name);
  } 
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.questionForm.value);
    if(this.formId){
      this.submission = new FormSubmission();
      this.submission.id = this.formId;
      Object.assign(this.submission, this.questionForm.value);
      this.updateSubmission(this.submission);
    }
    else{
      this.addSubmission();
    }
    this.changeView();
  }
 
  addSubmission(): void {
    this.formHandleService.addSubmission(this.questionForm.value as FormSubmission)
      .subscribe(submission => {
        console.log(submission);
        this.formHandleService.getSubmissions().subscribe(submissions => console.log("this",submissions));
      });
  }
  
  changeView(){
    this.viewChanged.emit('submission');
  }
  
  getSubmission(): void{
    this.formHandleService.getSubmission(this.formId)
    .subscribe(submission => this.fillForm(submission));
  }

  updateSubmission(submission: FormSubmission): void{
    this.formHandleService.updateSubmission(submission)
      .subscribe();
  }

  fillForm(submission: FormSubmission){
    this.questionForm.controls['firstName'].setValue(submission.firstName);
    this.questionForm.controls['lastName'].setValue(submission.lastName);
    this.questionForm.controls['ageCategory'].setValue(submission.ageCategory);
    this.questionForm.controls['sex'].setValue(submission.sex);
    this.questionForm.controls['hobby'].setValue(submission.hobby);
  }
}


