export class Review {
    id?:number;
    message?:string;
    reviewer?:string;
    constructor(id:number, message:string, reviewer:string) {
        this.id = id;
        this.message = message;
        this.reviewer = reviewer;
    }
}