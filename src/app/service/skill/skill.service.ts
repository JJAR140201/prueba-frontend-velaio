import { Injectable } from '@angular/core';
import axios from 'axios';
import { Skill } from '../../module/skill/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl = 'http://localhost:8084/skills'; // URL de la API backend

  constructor() {}

  // Obtener todas las habilidades
  async getAllSkills(): Promise<Skill[]> {
    try {
      const response = await axios.get<Skill[]>(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  }

  // Crear una nueva habilidad, incluyendo userId
  async createSkill(skill: Skill): Promise<Skill> {
    try {
      const response = await axios.post<Skill>(this.apiUrl, skill);
      return response.data;
    } catch (error) {
      console.error('Error creating skill:', error);
      throw error;
    }
  }

  // Actualizar una habilidad
  async updateSkill(id: number, skill: Skill): Promise<Skill> {
    try {
      const response = await axios.put<Skill>(`${this.apiUrl}/${id}`, skill);
      return response.data;
    } catch (error) {
      console.error('Error updating skill:', error);
      throw error;
    }
  }

  // Eliminar una habilidad
  async deleteSkill(id: number): Promise<void> {
    try {
      await axios.delete(`${this.apiUrl}/${id}`);
    } catch (error) {
      console.error('Error deleting skill:', error);
      throw error;
    }
  }

  // Obtener una habilidad por ID
  async getSkillById(id: number): Promise<Skill> {
    try {
      const response = await axios.get<Skill>(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching skill by ID:', error);
      throw error;
    }
  }
}