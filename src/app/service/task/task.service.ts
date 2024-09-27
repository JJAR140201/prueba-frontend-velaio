import axios from 'axios';
import { Injectable } from '@angular/core';
import { Task } from '../../module/task/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8084/tasks'; // URL del backend

  // Obtener todas las tareas
  async getAllTasks(): Promise<Task[]> {
    const response = await axios.get<Task[]>(this.apiUrl);
    return response.data;
  }

  // Crear una nueva tarea
  async createTask(task: Task): Promise<Task> {
    task.createdAt = new Date().toISOString(); // Asignar la fecha de creación automáticamente
    const response = await axios.post<Task>(this.apiUrl, task);
    return response.data;
  }

  // Actualizar tarea
  async updateTask(id: number, task: Task): Promise<Task> {
    task.updatedAt = new Date().toISOString(); // Asigna la fecha de actualización automáticamente
    const response = await axios.put<Task>(`${this.apiUrl}/${id}`, task);
    return response.data;
  }

  // Eliminar tarea
  async deleteTask(id: number): Promise<void> {
    await axios.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Asignar tarea a un usuario
  async assignTaskToUser(taskId: number, userId: number): Promise<void> {
    await axios.post<void>(`${this.apiUrl}/${taskId}/assign/${userId}`);
  }
}
