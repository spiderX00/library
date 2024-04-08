import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cover {
  private staticURL = '/assets/cover/';
  private defaultFormat = '.jpg';
  private defaultCoverURL = 'book-default-cover'

  public getCoverURL(isbncode: string): string {
    return `${this.staticURL}${isbncode}${this.defaultFormat}`;
  }

  public getDefaultCoverURL(): string {
    return `${this.staticURL}${this.defaultCoverURL}${this.defaultFormat}`;
  }
}
