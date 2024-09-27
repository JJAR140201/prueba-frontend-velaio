import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillComponent } from '../../component/skill/skill.component'; // Importa el componente Skill
import { FormsModule } from '@angular/forms'; // Importa FormsModule si vas a usar formularios

@NgModule({
  declarations: [
    SkillComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SkillComponent
  ]
})
export class SkillModule { }
