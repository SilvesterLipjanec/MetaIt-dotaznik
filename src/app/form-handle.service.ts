import { Injectable } from '@angular/core';
import { FormSubmission } from './form-submission';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormHandleService {

  submissionUrl = 'api/submissions';
  constructor(private http: HttpClient) { }
  getSubmissions(): Observable<FormSubmission[]> {
    return this.http.get<FormSubmission[]>(this.submissionUrl)
      .pipe(
        tap(_ => console.log('fetched submissions')),
        catchError(this.handleError<FormSubmission[]>('getSubmissions', []))
      );
  }
  
  getSubmission(id: number): Observable<FormSubmission> {
    const url = `${this.submissionUrl}/${id}`;
    return this.http.get<FormSubmission>(url).pipe(
      tap(_ => console.log(`fetched submission id=${id}`)),
      catchError(this.handleError<FormSubmission>(`getSubmission id=${id}`))
    );
  }
  
  addSubmission (formSubmission: FormSubmission): Observable<FormSubmission> {
    return this.http.post<FormSubmission>(this.submissionUrl, formSubmission, httpOptions).pipe(
      tap((newSubmission: FormSubmission) => console.log(`submited w/ id=${newSubmission.id}`)),
      catchError(this.handleError<FormSubmission>('addSubmission'))
    );
  }

  updateSubmission (formSubmission: FormSubmission): Observable<any> {
    return this.http.put(this.submissionUrl, formSubmission, httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${formSubmission.id}`)),
      catchError(this.handleError<any>('updateSubmission'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
