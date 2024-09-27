import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { User } from '../../module/user/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUser: User = { id: 0, firstName: '', lastName: '', age: 0 }; // Initialize selectedUser to avoid null
  userId: number = 0;
  foundUser: User | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  // Obtener todos los usuarios
  async getUsers(): Promise<void> {
    try {
      this.users = await this.userService.getAllUsers();
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }

  // Obtener usuario por ID
  async getUserById(userId: number): Promise<void> {
    try {
      this.foundUser = await this.userService.getUserById(userId);
    } catch (error) {
      console.error('Error fetching user by ID', error);
    }
  }

  // Guardar usuario (crear o actualizar)
  async saveUser(): Promise<void> {
    if (this.selectedUser.age < 18) {
      alert("El usuario debe ser mayor de 18 años para poder crearlo.");
      return; // Detener el proceso si es menor de edad
    }
  
    if (this.selectedUser.id !== 0) {
      // Actualizar usuario existente
      try {
        const updatedUser = await this.userService.updateUser(this.selectedUser.id, this.selectedUser);
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      } catch (error) {
        console.error('Error actualizando el usuario', error);
      }
    } else {
      // Crear nuevo usuario
      try {
        const createdUser = await this.userService.createUser(this.selectedUser);
        this.users.push(createdUser);
      } catch (error) {
        console.error('Error creando el usuario', error);
      }
    }
  
    // Limpiar el formulario
    this.selectedUser = { id: 0, firstName: '', lastName: '', age: 0 };
  }    

  // Seleccionar un usuario para editar
  selectUser(user: User): void {
    this.selectedUser = { ...user };
  }

  // Eliminar un usuario
  async deleteUser(id: number): Promise<void> {
    try {
      await this.userService.deleteUser(id);
      this.users = this.users.filter(u => u.id !== id);
    } catch (error) {
      console.error('Error deleting user', error);
    }
  }
}