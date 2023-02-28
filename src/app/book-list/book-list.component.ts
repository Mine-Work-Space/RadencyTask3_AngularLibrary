import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../shared/models/Book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  booksListByTitle:Book[] = [];
  booksListByAuthor:Book[] = [];

  constructor(private httpClient: HttpClient){
    this.booksListByTitle=[];
    this.booksListByAuthor=[];
  }
  ngOnInit(): void {
    this.getBooksListByTitle(); 
    this.getBooksListByAuthor(); 
  }
  getBooksListByTitle() {
    this.httpClient.get('https://localhost:5000/api/books?order=title')
      .subscribe((result:any)=> { 
        let res = JSON.parse(JSON.stringify(result));
        for (let book of res) {
            this.booksListByTitle.push(new Book(book.id, book.title, book.author, book.rating, book.reviewsNumber, book.cover));
        }
       });
  }
  getBooksListByAuthor() {
    this.httpClient.get('https://localhost:5000/api/books?order=author')
      .subscribe((result:any)=> { 
        let res = JSON.parse(JSON.stringify(result));
        for (let book of res) {
            this.booksListByAuthor.push(new Book(book.id, book.title, book.author, book.rating, book.reviewsNumber, book.cover));
        }
       });
  }
}
