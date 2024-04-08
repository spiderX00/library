import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ComponentStore,
  OnStoreInit,
  tapResponse
} from "@ngrx/component-store";
import { Observable, map, of, switchMap, withLatestFrom } from "rxjs";
import { Book, BooksState } from "../../interfaces/book.interface";
import { User } from "../../interfaces/user.interface";
import { BooksService } from "../books/books.service";
import { BorrowService } from "../borrow/borrow.service";
import { SessionStorageService } from "../session-storage/session-storage.service";
import { initialState } from "./books-state";

@Injectable({
  providedIn: 'root'
})
export class BooksStoreService extends ComponentStore<BooksState> implements OnStoreInit {

  private readonly increaseCurrentPageIndex = this.updater(
    (state: BooksState, number: number) => ({
      ...state,
      number
    })
  )

  private readonly updateNodes = this.updater(
    (state: BooksState, content: Array<Book>) => ({
      ...state,
      content
    })
  )

  private readonly updateFilterState = this.updater(
    (state: BooksState, filter: boolean) => ({
      ...state,
      filter
    })
  )

  private readonly resetNodes = this.updater(
    () => ({
      ...initialState
    })
  )

  public loadPage = this.effect((trigger$: Observable<any>) => {
    return trigger$.pipe(
      withLatestFrom(this.select((state) => state)),
      map(([parameters, state]) => { 
        return { parameters, state } 
      }),
      switchMap(({ parameters, state }) => {
        if (parameters.filter !== state.filter) {
          state = initialState;
          state.filter = parameters.filter;
        }
        this.updateFilterState(parameters.filter);
        if (state.filter == true) {
          const user = this.sessionStorage.getData('user') as User;
          if (user?.id) {
            return this.borrowService.getBorrowedBooks(user.id, { pageNumber: state.number, pageSize: state.size }).pipe(
              tapResponse(
                (response: any) => {
                  this.increaseCurrentPageIndex(state.number + 1);
                  this.updateNodes([...state.content, ...response?.content || []]);
                }, (error: HttpErrorResponse) => console.error(error),
              )
            )
          }
          return of([]);
        }
        return this.booksService.findAll({ pageNumber: state.number, pageSize: state.size }).pipe(
          tapResponse(
            (response: any) => {
              this.increaseCurrentPageIndex(state.number + 1);
              this.updateNodes([...state.content, ...response?.content || []]);
            }, (error: HttpErrorResponse) => console.error(error),
          )
        )
      })
    );
  })

  constructor(private readonly booksService: BooksService,
    private readonly borrowService: BorrowService,
    private readonly sessionStorage: SessionStorageService) {
    super(initialState);
  }

  private selectNodes = (state: BooksState) => state.content as Array<Book>;

  public readonly nodes$: Observable<Array<Book>> = this.select(this.selectNodes);

  ngrxOnStoreInit() {
    this.loadPage({ filter: false });
  }
}