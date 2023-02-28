export class Book {
    id!:number;
    title!:string;
    author!:string;
    rating!:number;
    cover!:string;
    reviewsNumber!:number;
    constructor(id: number, title:string, author:string, rating:number, reviewsNumber:number, cover:string) {
        this.title = title;
        this.author = author;
        this.rating = rating;
        this.reviewsNumber = reviewsNumber;
        this.id = id;
        this.cover = cover;
    }
}