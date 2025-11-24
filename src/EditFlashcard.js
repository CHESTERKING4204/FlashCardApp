import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditFlashcard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/question/${id}`)
      .then(response => {
        setQuestion(response.data.question);
        setAnswer(response.data.answer);
      })
      .catch(error => console.error('Error fetching flashcard:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:5000/question/${id}`, { question, answer })
      .then(response => {
        console.log('Flashcard updated:', response.data);
        navigate(`/`);
      })
      .catch(error => console.error('Error updating flashcard:', error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Edit Flashcard</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="mb-10">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Question:
          </label>
          <input 
            type="text" 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
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
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Update Flashcard
        </button>
      </form>
    </div>
  );
};

export default EditFlashcard;
