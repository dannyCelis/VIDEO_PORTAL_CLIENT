export class Video {
    //public _id: any;
    public name: string;
    public description: string;
    public url: string;
    public ratings: Array<number>;
    public avgRating: Array<number>;
    public myRating: number;
    public status: boolean;

    constructor() {
        this.status = true;
    }
}