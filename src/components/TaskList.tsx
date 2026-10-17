import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext";
import { Project } from "../models/Project";
import { Task, TaskStatus } from "../models/Task";

interface TaskListProps {
  project: Project;
}

export function TaskList({ project }: TaskListProps) {
  const { addTask, editTask, removeTask } = useProjects();

  // Campos do formulário de nova tarefa
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Estado da edição (editingTaskId = null significa que nenhuma tarefa está em edição)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editDueDate, setEditDueDate] = useState<string>("");
  const [editError, setEditError] = useState<string>("");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    if (title.trim().length < 3) {
      setError("O título da tarefa deve ter pelo menos 3 caracteres.");
      return;
    }
    if (description.trim() === "") {
      setError("A descrição da tarefa não pode estar vazia.");
      return;
    }
    if (dueDate === "") {
      setError("Indica a data de conclusão esperada.");
      return;
    }

    setError("");

    const newTask = new Task(Date.now().toString(), title.trim(), description.trim(), dueDate);
    await addTask(project.id, newTask);

    setTitle("");
    setDescription("");
    setDueDate("");
  }

  async function changeStatus(task: Task, newStatus: TaskStatus) {
    const updated = new Task(task.id, task.title, task.description, task.dueDate, newStatus);
    await editTask(project.id, updated);
  }

  async function handleDelete(task: Task) {
    if (window.confirm(`Apagar a tarefa "${task.title}"?`)) {
      await removeTask(project.id, task.id);
    }
  }

  // Entra em modo de edição e preenche os campos com os valores atuais
  function startEditing(task: Task) {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate);
    setEditError("");
  }

  async function saveEditing(task: Task) {
    if (editTitle.trim().length < 3) {
      setEditError("O título da tarefa deve ter pelo menos 3 caracteres.");
      return;
    }
    if (editDescription.trim() === "") {
      setEditError("A descrição da tarefa não pode estar vazia.");
      return;
    }
    if (editDueDate === "") {
      setEditError("Indica a data de conclusão esperada.");
      return;
    }

    // Mantém o id e o estado da tarefa, só muda título, descrição e data
    const updated = new Task(
      task.id,
      editTitle.trim(),
      editDescription.trim(),
      editDueDate,
      task.status
    );
    await editTask(project.id, updated);
    setEditingTaskId(null);
    setEditError("");
  }

  return (
    <div className="task-section">
      <h3>Tarefas</h3>

      {project.tasks.length === 0 && <p>Este projeto ainda não tem tarefas.</p>}

      {project.tasks.map((task) => {
        const isEditing = editingTaskId === task.id;

        return (
          <div
            key={task.id}
            className={task.status === "concluída" ? "task done" : "task"}
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />
                {editError && <p className="error">{editError}</p>}
                <button onClick={() => saveEditing(task)}>Guardar</button>
                <button onClick={() => setEditingTaskId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <p>Data limite: {task.dueDate}</p>

                <select
                  value={task.status}
                  onChange={(e) => changeStatus(task, e.target.value as TaskStatus)}
                >
                  <option value="pendente">Pendente</option>
                  <option value="em progresso">Em progresso</option>
                  <option value="concluída">Concluída</option>
                </select>

                {task.status !== "concluída" && (
                  <button onClick={() => changeStatus(task, "concluída")}>Concluir</button>
                )}
                <button onClick={() => startEditing(task)}>Editar</button>
                <button onClick={() => handleDelete(task)}>Apagar</button>
              </>
            )}
          </div>
        );
      })}

      <form onSubmit={handleAdd} className="task-form">
        <h4>Nova tarefa</h4>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Adicionar tarefa</button>
      </form>
    </div>
  );
}