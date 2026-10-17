import { TaskStatus } from "./Task";

// Formato de uma tarefa tal como vem da API (JSON simples)
export interface TaskData {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

// Formato de um projeto tal como vem da API (JSON simples)
export interface ProjectData {
  id: string;
  name: string;
  description: string;
  tasks: TaskData[];
}