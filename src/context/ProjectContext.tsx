import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Project } from "../models/Project";
import { Task } from "../models/Task";
import { fetchProjects, createProject, updateProject, deleteProject } from "../services/api";

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  addProject: (project: Project) => Promise<void>;
  editProject: (project: Project) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  addTask: (projectId: string, task: Task) => Promise<void>;
  editTask: (projectId: string, task: Task) => Promise<void>;
  removeTask: (projectId: string, taskId: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  async function addProject(project: Project) {
    const created = await createProject(project);
    setProjects(prev => [...prev, created]);
  }

  async function editProject(project: Project) {
    const updated = await updateProject(project);
    setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  }

  async function removeProject(id: string) {
    await deleteProject(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  }

  // Cria uma cópia do projeto com a lista de tarefas nova e guarda na API
  async function saveTasks(projectId: string, newTasks: Task[]) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const updated = new Project(project.id, project.name, project.description, newTasks);
    await editProject(updated);
  }

  async function addTask(projectId: string, task: Task) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    await saveTasks(projectId, [...project.tasks, task]);
  }

  async function editTask(projectId: string, task: Task) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    await saveTasks(projectId, project.tasks.map(t => (t.id === task.id ? task : t)));
  }

  async function removeTask(projectId: string, taskId: string) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    await saveTasks(projectId, project.tasks.filter(t => t.id !== taskId));
  }

  return (
    <ProjectContext.Provider
      value={{ projects, loading, addProject, editProject, removeProject, addTask, editTask, removeTask }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects deve ser usado dentro de um ProjectProvider");
  }
  return context;
}