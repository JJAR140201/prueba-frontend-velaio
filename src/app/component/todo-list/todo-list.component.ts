import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../../service/todo-list/todo-list.service';
import { UserService } from '../../service/user/user.service';
import { TodoList } from '../../module/todo-list/todo-list.model';
import { User } from '../../module/user/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoLists: TodoList[] = [];
  users: User[] = []; // Lista de usuarios
  selectedTodoList: TodoList = { id: 0, name: '', description: '', userId: 0 };

  constructor(private todoListService: TodoListService, private userService: UserService) {}

  ngOnInit(): void {
    this.getTodoLists();
    this.getUsers(); // Obtener los usuarios para el select
  }

  // Obtener todas las listas de tareas
  async getTodoLists(): Promise<void> {
    this.todoLists = await this.todoListService.getAllTodoLists();
  }

  // Obtener todos los usuarios
  async getUsers(): Promise<void> {
    this.users = await this.userService.getAllUsers();
  }

  // Crear o actualizar una lista de tareas
  async saveTodoList(): Promise<void> {
    if (this.selectedTodoList.id) {
      await this.todoListService.updateTodoList(this.selectedTodoList.id, this.selectedTodoList);
    } else {
      await this.todoListService.createTodoList(this.selectedTodoList);
    }
    this.selectedTodoList = { id: 0, name: '', description: '', userId: 0 };
    this.getTodoLists(); // Refrescar la lista
  }

  // Eliminar lista de tareas
  async deleteTodoList(id: number): Promise<void> {
    await this.todoListService.deleteTodoList(id);
    this.getTodoLists();
  }
}