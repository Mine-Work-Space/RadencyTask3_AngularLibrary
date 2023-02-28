import { Component, Inject } from '@angular/core';
import { AddBookModel } from '../shared/models/AddBookModel';
import { BookDetailsModel } from '../shared/models/BookDetailsModel';
import { Review } from '../shared/models/Review';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../shared/services/BookService';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {
  _bookId: number = 0;
  _selectedBookItem: BookDetailsModel = new BookDetailsModel(0, "", "", "", "", 0, "");
  _editBook: AddBookModel = new AddBookModel("", "", "", "", "");
  _imageFile: File | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) data:{selectedBookId:number}, 
    private httpClient: HttpClient,
    private bookService: BookService) {
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
      this._selectedBookItem.genre = result.genre;
      const _reviews: Review[] = [];
      for(let i = 0; i < result.reviews.length; i++){
        _reviews.push(new Review(result.reviews[i].id, result.reviews[i].message, result.reviews[i].reviewer));
      }
      this._selectedBookItem.reviews = _reviews;
      // Potentially changed book
      this._editBook.id = this._bookId;
      this._editBook.author = this._selectedBookItem.author;
      this._editBook.title = this._selectedBookItem.title;
      this._editBook.cover = this._selectedBookItem.cover;
      this._editBook.genre = this._selectedBookItem.genre;
      this._editBook.content = this._selectedBookItem.content;
     });
  }
  updateBook() {
    this.bookService.saveOrUpdateBook(this._editBook).subscribe(result => {
      if (result.id != -1) {
        this.bookService.setRefresh(true);
        alert("Book was updated successfully");
      } 
      else {
        alert("Input data is not valid");
      }
    });
  }
  onFileSelected(e: Event) {
      this._imageFile = (e.target as HTMLInputElement).files![0];
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!this._imageFile.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onloadend = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(this._imageFile);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this._editBook.cover = base64result;
  }
}
