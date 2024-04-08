import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BooksService } from '../../shared/services/books/books.service';
import { Cover } from '../../shared/services/cover/cover.service';
import { FakeAuthService } from '../../shared/services/fakeAuth/fake-auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookComponent } from '../../shared/components/book/book.component';
import { BorrowService } from '../../shared/services/borrow/borrow.service';
import { User } from '../../shared/interfaces/user.interface';
import { Book } from '../../shared/interfaces/book.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    BookComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  public bookId!: string | null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: FakeAuthService,
    public booksService: BooksService,
    public borrowService: BorrowService,
    public cover: Cover) { }

  public get userData(): User {
    return this.authService.getUserData() as User;
  }

  public changeSource(event: any) {
    event.target.src = this.cover.getDefaultCoverURL();
  }

  public returnBook(book: Book) {
    if (this.authService.isAuthenticated) {
      const user = this.authService.getUserData() as User;
      this.borrowService.returnBook(user.id as number, book).subscribe();
      location.reload();
    }
  }

  public borrow(book: Book) {
    if (this.authService.isAuthenticated) {
      this.borrowService.borrowBook(this.userData.id as number, book).subscribe();
      location.reload();
    } else {
      this.router.navigate(['login']);
    }
  }


  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('bookId');
    if (this.bookId != null) {
      this.booksService.findById(this.bookId).subscribe();
    }
  }
}
