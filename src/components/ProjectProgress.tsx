import React from "react";
import { Project } from "../models/Project";
import { useProjectProgress } from "../hooks/useProjectProgress";

export function ProjectProgress({ project }: { project: Project }) {
  const { total, done, percent } = useProjectProgress(project);

  return (
    <div>
      <p>
        Progresso: {done} / {total} tarefas concluídas ({percent}%)
      </p>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}