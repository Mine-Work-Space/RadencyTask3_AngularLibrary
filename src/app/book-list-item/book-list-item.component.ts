import { Component, Input } from '@angular/core';
import {Book} from '../shared/models/Book';
@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent {
  _bookItem: Book = new Book(-1, "Default Title", "Default Author", 0, 0, "");
  @Input()
  set setBookItem(bookItem: Book) {
    this._bookItem = bookItem;
  }
}
