export class AddBookModel {
    id?: number;
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