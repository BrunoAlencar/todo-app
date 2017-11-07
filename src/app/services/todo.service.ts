import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Todo } from '../models/todo';
@Injectable()
export class TodoService {

  // url = 'http://localhost:3000/api/todos';
  url = 'https://ifal-app.herokuapp.com/api/todos';
  todos: Todo[];

  constructor(
    public http: Http
  ) {

  }


  create(todo: Todo): Observable<any> {
    return this.http.post(this.url, todo)
      .map(data => {
        console.log('oks');
        return data.json();
      });
  }

  list(): Observable<any> {
    return this.http.get(this.url).map(data => {
      return data.json();
    });
  }

  update(todo: Todo): Observable<any> {
    return this.http.put(this.url + '/' + todo._id, todo).map(data => {
      return data.json();
    });
  }

  delete(todo: Todo): Observable<any> {
    return this.http.delete(this.url + '/' + todo._id).map(data => {
      return data.json();
    });
  }
}
