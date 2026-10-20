import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { StackPage } from './pages/StackPage';
import { useTheme } from './hooks/useTheme';

function App() {
  useTheme(); // Initialize dark theme globally
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-zinc-800">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience/history" element={<ExperiencePage />} />
          <Route path="/experience" element={<Navigate to="/experience/history" replace />} />
          <Route path="/stack" element={<StackPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
