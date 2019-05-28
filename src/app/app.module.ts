import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { StartComponent } from './start/start.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { SubmissionComponent } from './submission/submission.component';
import { DatatableComponent } from './datatable/datatable.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    QuestionnaireComponent,
    SubmissionComponent,
    DatatableComponent,
  ],
  imports: [
    MatTableModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ ]
})
export class AppModule { }
