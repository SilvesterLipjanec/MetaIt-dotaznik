import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { FormSubmission } from './form-submission';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const hobbies = [
      { id: 1, name: 'Počítačové hry', category: 1},
      { id: 2, name: 'Sport', category: 1 },
      { id: 3, name: 'Četba', category: 1 },
      { id: 4, name: 'Procházky', category: 1},
      { id: 5, name: 'Diskotéky', category: 1 },
      { id: 6, name: 'Studium', category: 2},
      { id: 7, name: 'Seriály', category: 2 },
      { id: 8, name: 'Cestování', category: 2 },
      { id: 9, name: 'Řízení auta', category: 2 },
      { id: 10, name: 'Koncerty', category: 2 },
      { id: 11, name: 'Zaměstnání', category: 3 },
      { id: 12, name: 'Cyklistika', category: 3 },
      { id: 13, name: 'Výlety s dětmi', category: 3 },
      { id: 14, name: 'Pivo s přáteli', category: 3 },
      { id: 15, name: 'Venčení psa', category: 3 },
      { id: 16, name: 'Zahradničení', category: 4 },
      { id: 17, name: 'Venčení psa', category: 4 },
      { id: 18, name: 'Pivo s přáteli', category: 4 },
      { id: 19, name: 'Sledování TV', category: 4 },
      { id: 20, name: 'Údržba domu', category: 4 },
    ]; 
    const submissions = [
      { id: 1, firstName: "Vaughn", lastName: "Fernandez", ageCategory: "18 - 27 let", sex: "man", hobby: "Diskotéky"},
      { id: 2, firstName: "Baron ", lastName: "Petty", ageCategory: "28 - 45 let", sex: "man", hobby: "Zaměstnání"},
      { id: 3, firstName: "Saul ", lastName: "Fernandez", ageCategory: "18 - 27 let", sex: "man", hobby: "Studium"},
      { id: 4, firstName: "Faith ", lastName: "Bell", ageCategory: "Pod 18 let", sex: "man", hobby: "Sport"},
      { id: 5, firstName: "Jovany", lastName: "Khan", ageCategory: "Pod 18 let", sex: "man", hobby: "Počítačové hry"},
      { id: 6, firstName: "Giada", lastName: "Hawkins", ageCategory: "Nad 45 let", sex: "man", hobby: "Sledování TV"},
      { id: 7, firstName: "Camryn", lastName: "Wolf", ageCategory: "Nad 45 let", sex: "man", hobby: "Údržba domu"},
    ];
    return {hobbies, submissions};
  }
  genId(submissions: FormSubmission[]): number {
    return submissions.length > 0 ? Math.max(...submissions.map(s => s.id)) + 1 : 1;
  }

}