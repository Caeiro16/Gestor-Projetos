import React from 'react';
import './App.css';
import { ProjectProvider } from './context/ProjectContext';
import { ProjectList } from './components/ProjectList';
import { ProjectForm } from './components/ProjectForm';

function App() {
  return (
    <ProjectProvider>
      <div className="App">
        <h1>Gestor de Projetos</h1>
        <ProjectForm />
        <ProjectList />
      </div>
    </ProjectProvider>
  );
}

export default App;