import './App.css';
import Userform from './Userform.jsx';
import UserDetails from './UserDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Userform />} />
          <Route path="/details" element={<UserDetails />} />
        </Routes>
      </Router>
      {/* <Userform />
      <UserDetails /> */}
    </div>
  );
}

export default App;
