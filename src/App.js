import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './Home';
import AddFlashcard from './AddFlashcard';
import FlashcardList from './FlashcardList';
import ViewFlashcard from './ViewFlashcard';
import EditFlashcard from './EditFlashcard';
import LoginPage from './Login';
import SignupPage from './SignUp';
import { useAuthContext } from './Hooks/useAuthContext';
import {UserLogOut} from './Hooks/UserLogout';

function App() {
  const {logout} = UserLogOut();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  }

  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-900 p-4 flex items-center justify-between">
        <ul className="flex space-x-4 text-white">
            <li>
              <Link to="/" className="text-xl hover:text-gray-400 hover:font-bold">Home</Link>
            </li>
          {user && (
          <li>
              <Link to="/add" className="text-xl hover:text-gray-300 hover:font-bold">Add Flashcard</Link>
            </li>
          )}
        <li>
              <Link to="/flashcards" className="text-xl hover:text-gray-300 hover:font-bold">Flashcards</Link>
            </li>
          </ul>

        {!user &&(
        <div className="flex items-center space-x-4">
            <Link to="/login" className="text-xl text-white hover:text-gray-400 hover:font-bold">Login</Link>
            <Link to="/signup" className="text-xl text-white hover:text-gray-400 hover:font-bold">Sign Up</Link>
          </div>
          )}
            {user && (
              <div>
            <button onClick={handleClick} className="text-xl text-white  hover:text-red-400 hover:font-bold"><Link to='/'>LogOut</Link></button>
            </div>
            )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddFlashcard />} />
          <Route path="/flashcards" element={<FlashcardList />} />
          <Route path="/flashcards/:id" element={<ViewFlashcard />} />
          <Route path="/edit/:id" element={<EditFlashcard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
