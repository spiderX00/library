import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Book } from '../../interfaces/book.interface';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../books-store/books-state';

const API_ENDPOINT = 'http://localhost:8080/api/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  /** book */
  private node: Subject<Book> = new Subject<Book>();
  public $node: Observable<Book> = this.node.asObservable();

  constructor(private http: HttpClient) { }

  /*========================================
CRUD Methods for consuming RESTful API
 =========================================*/
  // Http Options
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private apiUrl: string = API_ENDPOINT;

  public findAll({ pageNumber = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE }: { pageNumber?: number, pageSize?: number }) {
    return this.http.get(`${this.apiUrl}/all`, {
      ...this.httpOptions, params: {
        pageNumber, pageSize
      }
    })
  }

  public findById(bookId: string) {
    return this.http.get(`${this.apiUrl}/get-book/${bookId}`, this.httpOptions)
      .pipe(
        tap((response) => {
          this.node.next(response as Book);
        })
      )
  }
}
