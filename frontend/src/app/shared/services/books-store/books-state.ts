import { Book, BooksState } from "../../interfaces/book.interface";

export const DEFAULT_PAGE_SIZE: number = 10;
export const DEFAULT_PAGE_INDEX: number = 0;

export const initialState: BooksState = {
    content: [] as Array<Book>,
    number: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    filter: false
}