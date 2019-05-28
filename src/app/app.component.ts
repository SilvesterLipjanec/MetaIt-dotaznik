import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showComponent = 'start';
  formId: number;

  changeView(view: string) {
    this.showComponent = view;
    console.log('change view to'+view);
  }
  editForm(id: number){
    this.showComponent = 'questionnaire';
    this.formId = id;
  }
 
}
