import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private sessionStorage;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.sessionStorage = document.defaultView?.localStorage;
  }

  /**
   * Save data to session storage.
   * @param key The storage key.
   * @param value The value to save.
   */
  public saveData<T>(key: string, value: T): void {
    try {
      this.sessionStorage?.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving data to session storage:', error);
    }
  }

  /**
   * Retrieve data from session storage.
   * @param key The storage key.
   * @returns The stored value or null if not found.
   */
  public getData<T>(key: string): T | null {
    try {
      const storedValue = this.sessionStorage?.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error('Error retrieving data from session storage:', error);
      return null;
    }
  }

  /**
   * Remove data from session storage.
   * @param key The storage key.
   */
  public removeData(key: string): void {
    try {
      this.sessionStorage?.removeItem(key);
    } catch (error) {
      console.error('Error removing data from session storage:', error);
    }
  }

  /**
   * Clear all data from session storage.
   */
  public clearData(): void {
    try {
      this.sessionStorage?.clear();
    } catch (error) {
      console.error('Error clearing session storage:', error);
    }
  }
}
