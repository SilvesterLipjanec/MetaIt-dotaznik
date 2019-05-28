import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Hobby } from './hobby';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HobbiesService {
  
  private hobbiesUrl = 'api/hobbies'; //url to web api

  constructor(private http: HttpClient) { }

  /* GET heroes whose name contains search term */
  searchHobbies(term: string, category: number): Observable<Hobby[]> {
   
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    var query = `${this.hobbiesUrl}/?name=^${term}`;
    if(category){
      query += `&category=${category}`;
    }
    console.log(query);
    return this.http.get<Hobby[]>(query).pipe(
      catchError(this.handleError<Hobby[]>('searchHobbies', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


}
