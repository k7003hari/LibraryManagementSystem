import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  pathAdd="http://localhost:9090/books/addbook"
  pathView="http://localhost:9090/books/getall"

  constructor(private client: HttpClient) { }

  public add(addBook:AddBook):Observable<string>{
    console.log("In Book Service...."+addBook)
    return this.client.post(this.pathAdd,addBook,{responseType: 'text'})
  }

  public view(){
    return this.client.get(this.pathView)
  }

}
export class AddBook{
  title:string
  author:string
  genre:string
  isbn:string
  yearPublished:string
  availableCopies:string

  constructor(title:string,author:string,genre:string,isbn:string,yearPublished:string,availableCopies:string)
  {
  this.title=title
  this.author=author
  this.genre=genre
  this.isbn=isbn
  this.yearPublished=yearPublished
  this.availableCopies=availableCopies
  }
}
export class AllBook {
  bookId: string; 
  title: string;
  author: string;
  genre: string;
  isbn: string;
  yearPublished: string;
  availableCopies: string;

  constructor(
    bookId: string, 
    title: string,
    author: string,
    genre: string,
    isbn: string,
    yearPublished: string,
    availableCopies: string
  ) {
    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.isbn = isbn;
    this.yearPublished = yearPublished;
    this.availableCopies = availableCopies;
  }
}
