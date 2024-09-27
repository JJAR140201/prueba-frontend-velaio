import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillComponent } from './component/skill/skill.component';
import { UserComponent } from './component/user/user.component';
import { TaskComponent } from './component/task/task.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';

const routes: Routes = [
  { path: 'skills', component: SkillComponent }, // Ruta Skills
  { path: 'users', component: UserComponent },   // Ruta Users
  { path: 'task', component: TaskComponent },     // Ruta Task
  { path: 'todo-list', component: TodoListComponent }, // Ruta TodoList
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
