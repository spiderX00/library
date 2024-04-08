import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { Book } from "../../interfaces/book.interface";
import { Cover } from "../../services/cover/cover.service";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  @Input({ required: true }) node!: Book;

  public get coverURL(): string {
    return this.cover.getCoverURL(this.node.isbncode);
  }

  constructor(public cover: Cover) { };

  public changeSource(event: any) {
    event.target.src = this.cover.getDefaultCoverURL();
  }



}