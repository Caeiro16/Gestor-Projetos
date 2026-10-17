import { Task } from "../models/Task";

describe("Task", () => {
  test("cria uma tarefa com os dados indicados", () => {
    const task = new Task("1", "Fazer layout", "Desenhar páginas", "2026-10-20", "em progresso");

    expect(task.id).toBe("1");
    expect(task.title).toBe("Fazer layout");
    expect(task.description).toBe("Desenhar páginas");
    expect(task.dueDate).toBe("2026-10-20");
    expect(task.status).toBe("em progresso");
  });

  test("o estado por omissão é pendente", () => {
    const task = new Task("2", "Outra tarefa", "Descrição", "2026-10-21");

    expect(task.status).toBe("pendente");
  });
});