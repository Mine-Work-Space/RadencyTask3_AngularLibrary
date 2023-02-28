import { Component, Inject } from '@angular/core';
import { AddBookModel } from '../shared/models/AddBookModel';
import { BookDetailsModel } from '../shared/models/BookDetailsModel';
import { Review } from '../shared/models/Review';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {
  _bookId: number = 0;
  _selectedBookItem: BookDetailsModel = new BookDetailsModel(0, "", "", "", "", 0, "");
  constructor(@Inject(MAT_DIALOG_DATA) data:{selectedBookId:number}, private httpClient: HttpClient) {
    this._bookId = data.selectedBookId;
  }
  ngOnInit() {
    this.httpClient.get("https://localhost:5000/api/books/" + this._bookId)
    .subscribe((result:any)=> { 
      this._selectedBookItem.author = result.author;
      this._selectedBookItem.title = result.title;
      this._selectedBookItem.content = result.content;
      this._selectedBookItem.rating = result.rating;
      this._selectedBookItem.author = result.author;
      this._selectedBookItem.cover = result.cover;
      const _reviews: Review[] = [];
      for(let i = 0; i < result.reviews.length; i++){
        _reviews.push(new Review(result.reviews[i].id, result.reviews[i].message, result.reviews[i].reviewer));
      }
      this._selectedBookItem.reviews = _reviews;
     });
  }
  updateBook(form: NgForm) {
    this._selectedBookItem.id = this._bookId;
    this._selectedBookItem.title = form.value.title;
    this._selectedBookItem.author = form.value.author;
    this._selectedBookItem.genre = form.value.genre;
    this._selectedBookItem.content = form.value.content;

    this.httpClient.post<any>('https://localhost:5000/api/books/save', this._selectedBookItem).subscribe(data => {
      if(data.id != -1) {
        alert("Book saved successfully");
      }
      else {
        alert("Input data is not valid");
      }
    });
  }
}
