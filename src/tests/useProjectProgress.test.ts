import { renderHook } from "@testing-library/react";
import { useProjectProgress } from "../hooks/useProjectProgress";
import { Project } from "../models/Project";
import { Task } from "../models/Task";

describe("useProjectProgress", () => {
  test("devolve 0% quando o projeto não tem tarefas", () => {
    const project = new Project("1", "Vazio", "Sem tarefas");

    const { result } = renderHook(() => useProjectProgress(project));

    expect(result.current).toEqual({ total: 0, done: 0, percent: 0 });
  });

  test("calcula o progresso com tarefas concluídas e pendentes", () => {
    const tasks = [
      new Task("1", "Tarefa A", "Descrição", "2026-10-20", "concluída"),
      new Task("2", "Tarefa B", "Descrição", "2026-10-21", "pendente"),
    ];
    const project = new Project("1", "Website", "Site", tasks);

    const { result } = renderHook(() => useProjectProgress(project));

    expect(result.current.total).toBe(2);
    expect(result.current.done).toBe(1);
    expect(result.current.percent).toBe(50);
  });

  test("devolve 100% quando todas as tarefas estão concluídas", () => {
    const tasks = [
      new Task("1", "Tarefa A", "Descrição", "2026-10-20", "concluída"),
      new Task("2", "Tarefa B", "Descrição", "2026-10-21", "concluída"),
    ];
    const project = new Project("1", "Website", "Site", tasks);

    const { result } = renderHook(() => useProjectProgress(project));

    expect(result.current.percent).toBe(100);
  });
});