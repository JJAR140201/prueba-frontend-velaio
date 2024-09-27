import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../../module/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8084/users'; // URL del backend

  constructor() { }

  // Obtener todos los usuarios
  async getAllUsers(): Promise<User[]> {
    const response = await axios.get<User[]>(this.apiUrl);
    return response.data;
  }

  // Obtener usuario por ID
  async getUserById(id: number): Promise<User> {
    const response = await axios.get<User>(`${this.apiUrl}/${id}`);
    return response.data;
  }

  // Crear un nuevo usuario
  async createUser(user: User): Promise<User> {
    const response = await axios.post<User>(this.apiUrl, user);
    return response.data;
  }

  // Actualizar un usuario existente
  async updateUser(id: number, user: User): Promise<User> {
    const response = await axios.put<User>(`${this.apiUrl}/${id}`, user);
    return response.data;
  }

  // Eliminar un usuario
  async deleteUser(id: number): Promise<void> {
    await axios.delete<void>(`${this.apiUrl}/${id}`);
  }
}