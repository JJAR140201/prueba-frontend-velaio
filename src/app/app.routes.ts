import { Routes } from '@angular/router';
import { SkillComponent } from './component/skill/skill.component';
import { UserComponent } from './component/user/user.component';
import { TaskComponent } from './component/task/task.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';

export const routes: Routes = [
  { path: 'skills', component: SkillComponent },
  {path: 'user', component: UserComponent},
  {path: 'task', component: TaskComponent},
  {path: 'todo-list', component: TodoListComponent},
  { path: '', redirectTo: '/skills', pathMatch: 'full' } // Redirige a la ruta de habilidades
];
