/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MultiStepForm from './Form';
import TimeOut from '../TimeOut';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<MultiStepForm />} /> */}
          <Route path="/" element={<TimeOut />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
