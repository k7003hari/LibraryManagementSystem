import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class BookService {
private pathAdd = 'http://localhost:9090/books/addbook';
private pathView = 'http://localhost:9090/books/getall';
private pathUpdate = 'http://localhost:9090/books/update/';
private pathDelete = 'http://localhost:9090/books/delete/';
private pathId = 'http://localhost:9090/books/getById/';
private pathTitle = 'http://localhost:9090/books/search/title/';
private pathAuthor = 'http://localhost:9090/books/search/author/';
private pathGenre = 'http://localhost:9090/books/search/genre/';
 
  constructor(private client: HttpClient) {}
 
  public add(addBook: AddBook): Observable<string> {
return this.client.post(this.pathAdd, addBook, { responseType: 'text' });
  }
 
  public view(): Observable<AllBook[]> {
    return this.client.get<AllBook[]>(this.pathView);
  }
 
  public delete(bookId: string): Observable<void> {
    return this.client.delete<void>(this.pathDelete + bookId);
  }
 
  public getById(bookId: string): Observable<AllBook> {
    return this.client.get<AllBook>(this.pathId + bookId);
  }
 
  public update(bookId: string, book: AddBook): Observable<string> {
    return this.client.put(this.pathUpdate + bookId, book, { responseType: 'text' });
  }
 
  public searchByTitle(title: string): Observable<AllBook[]> {
    return this.client.get<AllBook[]>(this.pathTitle + title);
  }
 
  public searchByAuthor(author: string): Observable<AllBook[]> {
    return this.client.get<AllBook[]>(this.pathAuthor + author);
  }
 
  public searchByGenre(genre: string): Observable<AllBook[]> {
    return this.client.get<AllBook[]>(this.pathGenre + genre);
  }
}
 
export class AddBook {
  constructor(
    public title: string,
    public author: string,
    public genre: string,
    public isbn: string,
    public yearPublished: string,
    public availableCopies: string
  ) {}
}
 
export class AllBook {
  constructor(
    public bookId: string,
    public title: string,
    public author: string,
    public genre: string,
    public isbn: string,
    public yearPublished: string,
    public availableCopies: string
  ) {}
}