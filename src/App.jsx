import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MultiStepForm from './Form';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MultiStepForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
