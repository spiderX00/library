import { Page } from "./page.interface";
import { User } from "./user.interface";

export interface Book {
    id?: number;
    user?: User;
    title: string;
    author: string;
    isbncode: string;
    plot: string;
    dateAdded: Date;
    dateRemoved: Date;
    numberOfReading: number;
    rented: boolean;
}

export interface BooksState extends Page<Book> {
    filter: boolean;
}