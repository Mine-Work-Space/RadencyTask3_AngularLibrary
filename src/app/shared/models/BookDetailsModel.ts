import {Review} from './Review';

export class BookDetailsModel {
    id!:number;
    title!:string;
    author!:string;
    cover!:string;
    content!:string;
    rating!:number;
    genre!:string;

    reviews:Review[] = [];
    constructor(id:number, title:string, author:string, cover:string, content:string, rating:number, genre:string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.cover = cover;
        this.content = content;
        this.rating = rating;
        this.reviews = [];
        this.genre = genre;
    }
}