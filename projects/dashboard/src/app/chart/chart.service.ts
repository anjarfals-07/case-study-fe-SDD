import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  addPost(item: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, item);
  }

  updatePost(item: Post): Observable<Post> {
    const url = `${this.apiUrl}/${item.id}`;
    return this.http.put<Post>(url, item);
  }

  deletePost(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
export interface Post {
  id?: number;
  title: string;
  description: string;
}
