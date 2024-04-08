import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BookComponent } from '../../shared/components/book/book.component';
import { BooksStoreService } from '../../shared/services/books-store/books-store.service';
import { FakeAuthService } from '../../shared/services/fakeAuth/fake-auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [
    provideComponentStore(BooksStoreService),
  ],
  imports: [
    RouterModule,
    AsyncPipe,
    InfiniteScrollModule,
    MatChipsModule,
    BookComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private filterParameter = { filter : false };
  public authService = inject(FakeAuthService);
  private booksStore = inject(BooksStoreService);

  public lazyScrollLoading() {
    this.booksStore.loadPage(this.filterParameter);
  }

  public changeSelected($event: MatChipSelectionChange) {
    this.filterParameter = {
      filter: $event.selected
    }
    this.booksStore.loadPage(this.filterParameter);
  }

  public readonly nodes$ = this.booksStore.nodes$;
  public readonly scrollThrottleMs = 500;

}
