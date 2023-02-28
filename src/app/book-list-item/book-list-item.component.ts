import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewBookComponent } from '../view-book/view-book.component';
import { Book } from '../shared/models/Book';
import { AddBookModel } from '../shared/models/AddBookModel';
import { BookDetailsModel } from '../shared/models/BookDetailsModel';
import { EditBookComponent } from '../edit-book/edit-book.component';

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
  constructor(public dialog: MatDialog) { }
  openDetailsDialog(): void {
    this.dialog.open(ViewBookComponent, {
      width: '700px',
      // Set to dialog Book id and then by post get another book model with reviews
      data: { selectedBookId: this._bookItem.id }
    });
  }
  openEditDialog() {
    this.dialog.open(EditBookComponent, {
      width: '700px',
      // Set to dialog Book id and then by post get another book model without reviews
      data: { selectedBookId: this._bookItem.id }
    });
  }
}
