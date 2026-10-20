import { Project } from "../models/Project";
import { Task } from "../models/Task";
import { ProjectData, TaskData } from "../models/interfaces";

const API_URL = "http://localhost:3001";

function toProject(data: ProjectData): Project {
  const tasks = (data.tasks || []).map(
    (t: TaskData) => new Task(t.id, t.title, t.description, t.dueDate, t.status)
  );
  return new Project(data.id, data.name, data.description, tasks);
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/projects`);
  const data: ProjectData[] = await response.json();
  return data.map(toProject);
}

export async function createProject(project: Project): Promise<Project> {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  const data: ProjectData = await response.json();
  return toProject(data);
}

export async function updateProject(project: Project): Promise<Project> {
  const response = await fetch(`${API_URL}/projects/${project.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  const data: ProjectData = await response.json();
  return toProject(data);
}

export async function deleteProject(id: string): Promise<void> {
  await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });
}