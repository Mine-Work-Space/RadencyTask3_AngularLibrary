import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../shared/models/Book';
import { Subscription } from 'rxjs';
import { BookService } from '../shared/services/BookService';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnDestroy {
  repollSubscription: Subscription;
  booksListByTitle:Book[] = [];
  booksListByAuthor:Book[] = [];

  constructor(private httpClient: HttpClient,
    private repollSvc: BookService){
    this.booksListByTitle=[];
    this.booksListByAuthor=[];
  }
  ngOnInit(): void {
    this.repollSvc.getRefresh().subscribe(() => this.getBooksListByAuthor());
    this.getBooksListByTitle(); 
    this.getBooksListByAuthor(); 
  }
  ngOnDestroy(): void {
    this.repollSubscription.unsubscribe();
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
