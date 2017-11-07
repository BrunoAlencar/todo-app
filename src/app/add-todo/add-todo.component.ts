import { TodoService } from './../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  addSuccess = false;

  addItemFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public todoService: TodoService,
  ) {
    this.addItemFormGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  add() {
    const item = this.addItemFormGroup.value;
    this.todoService.create(item).subscribe(
      works => {
        console.log(works);
        this.addSuccess = true;
        setTimeout(() => {
          this.addSuccess = false;
        }, 3000);
      });
  }



}
