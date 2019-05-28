import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  
  @Output() viewChanged: EventEmitter<string> =   new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeView(){
    this.viewChanged.emit('questionnaire');
  }
}
