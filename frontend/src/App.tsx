import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { ThemeProvider } from './components/ThemeContext';
import SmoothScroll from './components/SmoothScroll';
// Import the new cursor
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* The cursor lives outside the routes but inside the Router/Theme */}
        <CustomCursor />
        
        <SmoothScroll>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
}

export default App;