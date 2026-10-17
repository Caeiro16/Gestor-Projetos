import { useMemo } from "react";
import { Project } from "../models/Project";

export interface ProgressInfo {
  total: number;
  done: number;
  percent: number;
}

// Hook que calcula o progresso de um projeto
export function useProjectProgress(project: Project): ProgressInfo {
  return useMemo(() => {
    const total = project.tasks.length;
    const done = project.tasks.filter((t) => t.status === "concluída").length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, percent };
  }, [project.tasks]);
}