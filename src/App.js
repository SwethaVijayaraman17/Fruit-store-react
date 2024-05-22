import './App.css';
import { projectList } from './ProjectJson';
import { useState } from 'react';
import ProjectList from './ProjectList';

function App() {
  const [projectJson, setProjectjson] = useState(projectList);
  return (
    <div className="App">
      <h1>Project Management</h1>
      <ProjectList projectJson={projectJson} setProjectjson={setProjectjson} />
    </div>
  );
}

export default App;
