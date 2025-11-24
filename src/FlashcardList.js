import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      {loading ? (
        <div className="text-center">
          <div className="loader"></div>
          <p className="text-xl mt-4">Loading flashcards...</p>
        </div>
      ) : flashcards.length === 0 ? (
        <div className="text-center mt-20">
          <h1 className="text-3xl font-bold pb-64 animate-bounce-color">
            OOPS!! No Flash Card Added Yet!!
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div
            className={`relative w-96 h-64 bg-white rounded-lg shadow-xl cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-2xl ${flipped ? 'rotate-y-180' : ''
              }`}
            onClick={handleFlip}
          >
            <div
              className={`absolute inset-0 w-full h-full flex items-center justify-center backface-hidden p-4 ${flipped ? 'opacity-0' : 'opacity-100'
                }`}
            >
              <p className="text-xl font-semibold text-gray-800">{flashcards[currentIndex].question}</p>
            </div>
            <div
              className={`absolute inset-0 w-full h-full flex items-center justify-center backface-hidden p-4 ${flipped ? 'opacity-100 rotate-y-180' : 'opacity-0'
                }`}
            >
              <p className="text-xl font-semibold text-gray-800">{flashcards[currentIndex].answer}</p>
            </div>
          </div>

          <div className="mt-8 space-x-4">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardList;
