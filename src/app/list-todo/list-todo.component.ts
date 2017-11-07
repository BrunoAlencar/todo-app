import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Todo } from './../models/todo';
import { TodoService } from './../services/todo.service';
@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit {
  todos: Todo[];

  todo;
  editItemFormGroup: FormGroup;

  editBoolean = false;
  editSuccess = false;
  deleteSuccess = false;

  msg = '';

  constructor(
    public formBuilder: FormBuilder,
    public todoService: TodoService
  ) {
    this.todoService.list().subscribe(todos => {
      this.todos = todos;
    });
    setInterval(() => {
      this.todoService.list().subscribe(todos => {
        this.todos = todos;
        // console.log(this.todos);
      });
    }, 5000);
  }

  ngOnInit() {

  }

  finalizeItem() {
    this.todo.state = false;
    this.todoService.update(this.todo).subscribe((data) => {
      this.editSuccess = true;
      this.msg = 'Finalizado com sucesso!';
      setTimeout(() => {
        this.editSuccess = false;
      }, 3000);
    });
  }
  // inicia o formgroup com os valores do item selecionado
  startEdit() {
    this.editItemFormGroup = this.formBuilder.group({
      title: [this.todo.title, [Validators.required]],
      description: [this.todo.description, [Validators.required]]
    });
    this.editBoolean = true;
  }

  // envia os dados e atualiza item
  edit() {
    const todo = this.editItemFormGroup.value;
    this.todo.title = todo.title;
    this.todo.description = todo.description;
    this.todoService.update(this.todo).subscribe((data) => {
      this.editSuccess = true;
      this.msg = 'Atualizado com sucesso!';
      this.todoService.list().subscribe(todos => {
        this.todos = todos;
      });
      // algum tempo para mensagem ficar na tela
      setTimeout(() => {
        this.editSuccess = false;
      }, 3000);
    });
  }

  delete() {
    this.todoService.delete(this.todo).subscribe((data) => {
      this.deleteSuccess = true;
      this.todoService.list().subscribe(todos => {
        this.todos = todos;
      });
      setTimeout(() => {
        this.deleteSuccess = false;
      }, 3000);
    });
  }


}
