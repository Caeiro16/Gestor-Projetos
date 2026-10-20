import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext";
import { Project } from "../models/Project";

export function ProjectForm() {
  const { addProject } = useProjects();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (name.trim().length < 3) {
      setError("O nome do projeto deve ter pelo menos 3 caracteres.");
      return;
    }
    if (description.trim() === "") {
      setError("A descrição não pode estar vazia.");
      return;
    }

    setError("");

    const newProject = new Project(Date.now().toString(), name.trim(), description.trim());
    await addProject(newProject);

    setName("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <h2>Novo Projeto</h2>

      <input
        type="text"
        placeholder="Nome do projeto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <button type="submit">Criar Projeto</button>
    </form>
  );
}