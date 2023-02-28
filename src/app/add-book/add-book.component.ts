import { Component } from '@angular/core';
import { AddBookModel } from '../shared/models/AddBookModel';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../shared/services/BookService';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  _newBook:AddBookModel = new AddBookModel("", "", "", "", "");
  _imageFile: File | null = null;

  constructor(private httpClient: HttpClient, private bookService:BookService) { }

  addBook(form: NgForm) {
    this._newBook.title = form.value.title;
    this._newBook.author = form.value.author;
    this._newBook.genre = form.value.genre;
    this._newBook.content = form.value.content;
    
    this.bookService.saveOrUpdateBook(this._newBook).subscribe(result => {
      if (result.id != -1) {
        alert("Book was updated successfully");
        this._newBook = new AddBookModel("", "", "", "", "");
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
    this._newBook.cover = base64result;
  }
}
