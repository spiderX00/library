import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Book, BooksState } from '../../interfaces/book.interface';
import { Borrow } from '../../interfaces/borrow.interface';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../books-store/books-state';

const API_ENDPOINT = 'http://localhost:8080/api/borrow';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  private node: Subject<BooksState> = new Subject<BooksState>();
  public $node: Observable<BooksState> = this.node.asObservable();

  constructor(private http: HttpClient) { }

  private apiUrl: string = API_ENDPOINT;

  /*========================================
CRUD Methods for consuming RESTful API
=========================================*/
  // Http Options
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public borrowBook(userId: number, book: Book): Observable<Borrow> {
    return this.http.post(`${this.apiUrl}/borrow-book/${userId}`, JSON.stringify({ ...book }), this.httpOptions);
  }

  public returnBook(userId: number, book: Book): Observable<Object> {
    return this.http.post(`${this.apiUrl}/return-book/${userId}`, {...book}, this.httpOptions);
  }

  public getBorrowedBooks(userId: number, { pageNumber = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE }: { pageNumber?: number, pageSize?: number }): Observable<BooksState> {
    return this.http.get<BooksState>(`${this.apiUrl}/borrowed-books/${userId}`, {
      ...this.httpOptions, params: {
        pageNumber, pageSize
      }
    }).pipe(
      tap((response) => {
        this.node.next(response as BooksState);
      })
    )
  }

}
