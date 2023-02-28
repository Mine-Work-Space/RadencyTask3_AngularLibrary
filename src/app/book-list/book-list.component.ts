import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../shared/models/Book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  booksList:Book[] = [];

  constructor(private httpClient: HttpClient){
    this.booksList=[];
  }
  ngOnInit(): void {
    this.getBooksList(); 
  }
  getBooksList() {
    //let res = JSON.parse(
    this.httpClient.get('https://localhost:5000/api/books?order=title')
      .subscribe((result:any)=> { 

        let res = JSON.parse(JSON.stringify(result));
        for (let book of res) {
            this.booksList.push(new Book(book.id, book.title, book.author, book.rating, book.reviewsNumber));
        }
        
       });
  }
}
