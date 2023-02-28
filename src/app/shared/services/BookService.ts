import { AddBookModel } from "../models/AddBookModel";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable, catchError, throwError } from "rxjs";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
   })
export class BookService {
    constructor(private httpClient: HttpClient) {}
    
    saveOrUpdateBook(book: AddBookModel): Observable<AddBookModel> {
        return this.httpClient.post<any>('https://localhost:5000/api/books/save', book).pipe(catchError(this.handleError));
    }
    private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public getRefresh(): Observable<boolean> {
      console.log("getRefresh: " + this.refresh.value);

      return this.refresh.asObservable();
    }
    setRefresh = (value: boolean) => {
      console.log("setRefresh: " + this.refresh.value);
      this.refresh.next(value);
    }
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}