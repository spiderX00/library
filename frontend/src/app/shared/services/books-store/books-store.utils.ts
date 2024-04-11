import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Book, BooksState } from "../../interfaces/book.interface";
import { Page } from "../../interfaces/page.interface";
import { BooksService } from "../books/books.service";
import { BorrowService } from "../borrow/borrow.service";
import { FakeAuthService } from "../fakeAuth/fake-auth.service";

@Injectable({
    providedIn: 'root'
})
export class BooksStoreUtils {
    constructor(
        private readonly booksService: BooksService,
        private readonly borrowService: BorrowService,
        private readonly authService: FakeAuthService
    ) { }

    // Get user data using optional chaining
    private get userData() {
        return this.authService.getUserData();
    }

    /**
     * Load books based on the state.
     * @param state The current state of books.
     * @returns A list of books.
     */
    public loadData(state: BooksState): Observable<Page<Book>> {
        // Extract common parameters
        const commonParams = { pageNumber: state.number, pageSize: state.size };

        if (state.filter) {
            if (this.userData?.id) {
                // Load borrowed books
                return this.borrowService.getBorrowedBooks(this.userData.id, commonParams);
            }
        } else {
            // Load all books
            return this.booksService.findAll(commonParams);
        }
        return of();
    }
}
