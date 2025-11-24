import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthContext } from './Hooks/useAuthContext';

const Home = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuthContext();

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = () => {
    setLoading(true); 
    axios.get('http://localhost:5000/question')
      .then(response => {
        setFlashcards(response.data);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching flashcards:', error);
        setLoading(false); 
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/question/${id}`)
      .then(() => {
        setFlashcards(flashcards.filter(flashcard => flashcard._id !== id));
        console.log('Flashcard deleted');
      })
      .catch(error => console.error('Error deleting flashcard:', error));
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex flex-col">
      {loading ? (
        <div className="flex items-center justify-center flex-grow">
          <div className="loader"></div> 
          <p className="text-xl text-center mt-4">Fetching flashcards...</p>
        </div>
      ) : flashcards.length > 0 ? (
        <div>
          <h1 className="text-3xl font-bold text-center mb-8">All Flashcards</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.map((flashcard) => (
              <li key={flashcard._id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow relative">
                <div className="flex flex-col justify-between h-full">
                  <p className="text-lg font-semibold mb-4">{flashcard.question}</p>
                  <div className="flex justify-between mt-auto">
                    {user && (
                      <>
                        <Link to={`/edit/${flashcard._id}`} className="text-blue-500 hover:text-blue-700">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(flashcard._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    <Link to={`/flashcards/${flashcard._id}`} className="text-green-500 hover:text-green-700">
                      View
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-grow">
          <h1 className="text-3xl font-bold text-center pb-64">
            OOPS!! No Flash Card Added Yet!!
          </h1>
        </div>
      )}
    </div>
  );
};

export default Home;
