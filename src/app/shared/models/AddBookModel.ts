export class AddBookModel {
    id?: 0;
    title!:string;
    author!:string;
    genre!:string;
    cover!:string;
    content!:string;
    constructor(title:string, author:string, genre:string, cover:string, content:string) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.cover = cover;
        this.content = content;
    }
}