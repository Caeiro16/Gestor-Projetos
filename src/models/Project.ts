import { Task } from "./Task";

export class Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];

  constructor(id: string, name: string, description: string, tasks: Task[] = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.tasks = tasks;
  }
}