import axios from 'axios';
import { Injectable } from '@angular/core';
import { TodoList } from '../../module/todo-list/todo-list.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private apiUrl = 'http://localhost:8084/todolists';

  // Obtener todas las listas de tareas
  async getAllTodoLists(): Promise<TodoList[]> {
    const response = await axios.get<TodoList[]>(this.apiUrl);
    return response.data;
  }

  // Obtener lista de tareas por ID
  async getTodoListById(id: number): Promise<TodoList> {
    const response = await axios.get<TodoList>(`${this.apiUrl}/${id}`);
    return response.data;
  }

  // Crear una nueva lista de tareas
  async createTodoList(todoList: TodoList): Promise<TodoList> {
    const response = await axios.post<TodoList>(this.apiUrl, todoList);
    return response.data;
  }

  // Actualizar lista de tareas
  async updateTodoList(id: number, todoList: TodoList): Promise<TodoList> {
    const response = await axios.put<TodoList>(`${this.apiUrl}/${id}`, todoList);
    return response.data;
  }

  // Eliminar lista de tareas
  async deleteTodoList(id: number): Promise<void> {
    await axios.delete<void>(`${this.apiUrl}/${id}`);
  }
}