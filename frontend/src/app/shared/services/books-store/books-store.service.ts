import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ComponentStore,
  OnStoreInit,
  tapResponse
} from "@ngrx/component-store";
import { Observable, map, switchMap, withLatestFrom } from "rxjs";
import { Book, BooksState } from "../../interfaces/book.interface";
import { initialState } from "./books-state";
import { BooksStoreUtils } from "./books-store.utils";

@Injectable({
  providedIn: 'root'
})
export class BooksStoreService extends ComponentStore<BooksState> implements OnStoreInit {

  private readonly increaseCurrentPageIndex = this.updater(
    (state: BooksState, number: number) => ({
      ...state,
      number
    })
  );

  private readonly updateContent = this.updater(
    (state: BooksState, content: Array<Book>) => ({
      ...state,
      content
    })
  );

  private readonly updateFilterState = this.updater(
    (state: BooksState, filter: boolean) => ({
      ...state,
      filter
    })
  );

  public loadPage = this.effect((trigger$: Observable<any>) => {
    return trigger$.pipe(
      withLatestFrom(this.select((currentState) => currentState)),
      map(([action, currentState]) => ({ action, currentState })),
      switchMap(({ action, currentState }) => {
        let newState = { ...currentState };
        if (action.filter !== currentState.filter) {
          newState = { ...initialState, filter: action.filter };
          this.updateFilterState(action.filter);
        }
        return this.utils.loadData(newState).pipe(
          tapResponse(
            (response: any) => {
              this.increaseCurrentPageIndex(newState.number + 1);
              this.updateContent([...newState.content, ...(response?.content || [])]);
            },
            (error: HttpErrorResponse) => console.error(error)
          )
        );
      })
    );
  });

  constructor(private utils: BooksStoreUtils) {
    super(initialState);
  }

  private selectNodes = (state: BooksState) => state.content as Array<Book>;

  public readonly nodes$: Observable<Array<Book>> = this.select(this.selectNodes);

  ngrxOnStoreInit() {
    this.loadPage({ filter: false });
  }
}

