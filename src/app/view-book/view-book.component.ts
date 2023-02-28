import { Component, Inject } from '@angular/core';
import { Review } from '../shared/models/Review';
import { BookDetailsModel } from '../shared/models/BookDetailsModel';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent {
  _bookId: number = 0;
  _selectedBookItem: BookDetailsModel = new BookDetailsModel(0, "", "", "", "", 0, "");
  constructor(@Inject(MAT_DIALOG_DATA) data:{selectedBookId:number}, private httpClient: HttpClient) {
    this._bookId = data.selectedBookId;
  }
  ngOnInit() {
    this.httpClient.get("https://localhost:5000/api/books/" + this._bookId)
    .subscribe((result:any)=> { 
      this._selectedBookItem.author = result.author;
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
}
