import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { ThemeProvider } from './components/ThemeContext';
import SmoothScroll from './components/SmoothScroll'; 

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* Wrap Routes with SmoothScroll so it applies to all pages */}
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