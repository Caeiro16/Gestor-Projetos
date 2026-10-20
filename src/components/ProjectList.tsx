import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext";
import { Project } from "../models/Project";
import { TaskList } from "./TaskList";import { ProjectProgress } from "./ProjectProgress";

export function ProjectList() {
  const { projects, loading, editProject, removeProject } = useProjects();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  if (loading) {
    return <p>A carregar projetos...</p>;
  }

  if (projects.length === 0) {
    return <p>Ainda não existem projetos. Cria o primeiro!</p>;
  }

  function startEditing(project: Project) {
    setEditingId(project.id);
    setEditName(project.name);
    setEditDescription(project.description);
    setError("");
  }

  async function saveEditing(project: Project) {
    if (editName.trim().length < 3) {
      setError("O nome do projeto deve ter pelo menos 3 caracteres.");
      return;
    }
    if (editDescription.trim() === "") {
      setError("A descrição não pode estar vazia.");
      return;
    }

    // Cria um projeto novo com os dados atualizados, mantendo as tarefas
    const updated = new Project(
      project.id,
      editName.trim(),
      editDescription.trim(),
      project.tasks
    );
    await editProject(updated);
    setEditingId(null);
    setError("");
  }

  async function handleDelete(project: Project) {
    
    if (window.confirm(`Apagar o projeto "${project.name}"?`)) {
      await removeProject(project.id);
    }
  }

  return (
    <div>
      {projects.map((project) => {
        const isEditing = editingId === project.id;

        return (
          <div key={project.id} className="project-card">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
                <button onClick={() => saveEditing(project)}>Guardar</button>
                <button onClick={() => setEditingId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <p>
                  <ProjectProgress project={project}/></p>
                <button onClick={() => startEditing(project)}>Editar</button>
                <button onClick={() => handleDelete(project)}>Apagar</button>
                <TaskList project={project} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}