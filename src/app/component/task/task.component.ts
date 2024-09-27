import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task/task.service';
import { UserService } from '../../service/user/user.service';
import { TodoListService } from '../../service/todo-list/todo-list.service';
import { TodoList } from '../../module/todo-list/todo-list.model';
import { Task } from '../../module/task/task.model';
import { User } from '../../module/user/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  users: User[] = [];
  todoList: TodoList[] = [];
  selectedTask: Task = { id: 0, title: '', description: '', dueDate: '', completed: false, todoList: 0, createdAt: '', updatedAt: '', skillIds: [] };
  selectedUserId: number = 0;

  constructor(private taskService: TaskService,
    private userService: UserService,
    private todoListService: TodoListService ) {}

  ngOnInit(): void {
    this.getTasks();
    this.getUsers();
    this.getTodoLists();
  }

  // Obtener todas las tareas
  async getTasks(): Promise<void> {
    this.tasks = await this.taskService.getAllTasks();
  }

  // Obtener todos los usuarios
  async getUsers(): Promise<void> {
    this.users = await this.userService.getAllUsers();
  }

  // Obtener todas las listas de tareas
  async getTodoLists(): Promise<void> {
    this.todoList = await this.todoListService.getAllTodoLists();
  }

  // Crear o actualizar una tarea
  async saveTask(): Promise<void> {
    this.selectedTask.dueDate = new Date().toISOString(); // Asigna la fecha actual automáticamente

    if (this.selectedTask.id) {
      await this.taskService.updateTask(this.selectedTask.id, this.selectedTask);
    } else {
      const createdTask = await this.taskService.createTask(this.selectedTask);
      this.assignTaskToUser(createdTask.id, this.selectedUserId);
    }

    this.selectedTask = { id: 0, title: '', description: '', dueDate: '', completed: false, todoList: 0, createdAt: '', updatedAt: '', skillIds: [] };
    this.getTasks(); // Refrescar la lista
  }

  // Eliminar tarea
  async deleteTask(id: number): Promise<void> {
    await this.taskService.deleteTask(id);
    this.getTasks();
  }

  // Asignar tarea a un usuario
  async assignTaskToUser(taskId: number, userId: number): Promise<void> {
    await this.taskService.assignTaskToUser(taskId, userId);
  }

  selectTask(task: Task): void {
    this.selectedTask = { ...task }; // Clona la tarea seleccionada
    this.selectedUserId = task.todoList; // Aquí asignamos un id de lista de usuario
  }
}
