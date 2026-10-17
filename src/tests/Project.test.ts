import { Project } from "../models/Project";
import { Task } from "../models/Task";

describe("Project", () => {
  test("cria um projeto sem tarefas por omissão", () => {
    const project = new Project("1", "Website", "Site da loja");

    expect(project.name).toBe("Website");
    expect(project.tasks).toEqual([]);
  });

  test("contém a lista de tarefas que lhe é passada (composição)", () => {
    const task1 = new Task("1", "Tarefa A", "Descrição A", "2026-10-20");
    const task2 = new Task("2", "Tarefa B", "Descrição B", "2026-10-21");
    const project = new Project("1", "Website", "Site da loja", [task1, task2]);

    expect(project.tasks).toHaveLength(2);
    expect(project.tasks[0].title).toBe("Tarefa A");
  });
});