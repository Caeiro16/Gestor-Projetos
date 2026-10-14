export type TaskStatus = "pendente" | "em progresso" | "concluída";

export class Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;

  constructor(
    id: string,
    title: string,
    description: string,
    dueDate: string,
    status: TaskStatus = "pendente"
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
  }
}