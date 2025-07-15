import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import LandingPage from './LandingPage';
import CoursePage from './CoursePage';
import ProblemPage from './ProblemPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/" element={<LandingPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/problem" element={<ProblemPage />} />
      </Routes>
    </div>
  );
}

export default App;
