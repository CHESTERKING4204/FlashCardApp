import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewFlashcard = () => {
  const { id } = useParams();
  const [flashcard, setFlashcard] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/question/${id}`)
      .then(response => setFlashcard(response.data))
      .catch(error => console.error('Error fetching flashcard:', error));
  }, [id]);

  if (!flashcard) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className='text-2xl font-bold'>Question:</h1>
      <h2 className="text-lg mb-4">{flashcard.question}</h2>
      <h1 className='text-2xl font-bold'>Answer:</h1>
      <p className="text-lg">{flashcard.answer}</p>
    </div>
  );
};

export default ViewFlashcard;
