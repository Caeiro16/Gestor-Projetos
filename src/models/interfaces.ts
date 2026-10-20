import { TaskStatus } from "./Task";

export interface TaskData {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}
export interface ProjectData {
  id: string;
  name: string;
  description: string;
  tasks: TaskData[];
}