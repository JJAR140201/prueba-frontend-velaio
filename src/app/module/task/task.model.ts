export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
    todoList: number;
    createdAt: string;
    updatedAt: string;
    skillIds: number[];
  }