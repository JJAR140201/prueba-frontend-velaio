import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../service/skill/skill.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Skill } from '../../module/skill/skill.model';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  skills: Skill[] = [];
  selectedSkill: Skill | null = null;
  skillName: string = ''; // Campo para crear habilidad
  skillId: number = 0; // Campo para buscar por ID
  foundSkill: Skill | null = null; // Resultado de búsqueda

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.getSkills();
  }

  // Obtener todas las habilidades
  async getSkills(): Promise<void> {
    try {
      this.skills = await this.skillService.getAllSkills();
    } catch (error) {
      console.error('Error fetching skills', error);
    }
  }

  // Crear una nueva habilidad
  async createSkill(skillName: string): Promise<void> {
    try {
      const newSkill: Skill = { id: 0, name: skillName, userId: 1 }; // Asegúrate de enviar userId
      const createdSkill = await this.skillService.createSkill(newSkill);
      this.skills.push(createdSkill);
      this.skillName = ''; // Limpiar el campo después de crear la habilidad
    } catch (error) {
      console.error('Error creating skill', error);
    }
  }

  // Actualizar una habilidad existente
  async updateSkill(skill: Skill): Promise<void> {
    if (this.selectedSkill) {
      try {
        const updatedSkill = await this.skillService.updateSkill(this.selectedSkill.id, skill);
        const index = this.skills.findIndex(s => s.id === updatedSkill.id);
        if (index !== -1) {
          this.skills[index] = updatedSkill;
        }
        this.selectedSkill = null; // Limpiar selección después de actualizar
      } catch (error) {
        console.error('Error updating skill', error);
      }
    }
  }

  // Eliminar una habilidad
  async deleteSkill(id: number): Promise<void> {
    try {
      await this.skillService.deleteSkill(id);
      this.skills = this.skills.filter(s => s.id !== id);
    } catch (error) {
      console.error('Error deleting skill', error);
    }
  }

  // Obtener una habilidad por ID
  async getSkillById(skillId: number): Promise<void> {
    try {
      this.foundSkill = await this.skillService.getSkillById(skillId);
    } catch (error) {
      console.error('Error fetching skill by ID', error);
    }
  }
}
