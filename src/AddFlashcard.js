import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const AddFlashcard = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/question', { question, answer })
      .then(response => {
        console.log('Flashcard added:', response.data);
        setQuestion('');
        setAnswer('');
        navigate('/')
      })
      .catch(error => console.error('Error adding flashcard:', error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-8">Add a New Flashcard</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Question:
          </label>
          <input 
            type="text" 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter your question"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Answer:
          </label>
          <input 
            type="text" 
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)} 
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter the answer"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add Flashcard
        </button>
      </form>
    </div>
  );
};

export default AddFlashcard;
