import { useContext, useState } from 'react';
import { QuestionContext } from '../context/QuestionContext';
import NavBar from './NavBar';
import Loader from './Loader';

// Block Component for individual letters
const Block = ({ text, onClick, isSelected }) => {
  return (
    <button
      className={`block ${isSelected ? 'bg-blue-950 text-white' : 'bg-gray-200'} rounded-lg shadow-md`}
      onClick={() => onClick(text)}
      style={{ margin: '5px', padding: '10px', fontSize: '20px', cursor: 'pointer' }}
    >
      {text}
    </button>
  );
};

// AnagramGame Component to handle the game logic for both WORD and SENTENCE
const AnagramGame = ({ blocks, solution, anagramType }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [result, setResult] = useState(''); // State for result message

  const handleLetterClick = (letter) => {
    if (selectedLetters.includes(letter)) {
      // If already selected, unselect it
      setSelectedLetters((prev) => prev.filter((l) => l !== letter));
    } else {
      // Otherwise, add to the selected letters
      setSelectedLetters((prev) => [...prev, letter]);
    }
  };

  const checkAnswer = () => {
    const arrangedWord = selectedLetters.join('');
    let isCorrect = false;

    if (anagramType === 'WORD') {
      isCorrect = arrangedWord === solution;
    } else if (anagramType === 'SENTENCE') {
      const arrangedSentence = selectedLetters.join('').trim();
      isCorrect = arrangedSentence === solution.trim();
    }

    setResult(isCorrect ? 'Correct!' : 'Incorrect! Try again.');
  };

  return (
    <div className="anagram-game-container">
      {/* Options area */}
      <div className="flex flex-wrap gap-2 mb-6">
        {blocks?.map((block, index) =>
          block.showInOption ? (
            <Block
              key={index}
              text={block.text}
              onClick={handleLetterClick}
              isSelected={selectedLetters.includes(block.text)} // Mark selected letters
            />
          ) : null
        )}
      </div>

      {/* Selected letters display */}
      <div className="selected-letters-container mb-6">
        <h4 className="font-bold text-lg mb-2">Selected Letters:</h4>
        <div className="flex flex-wrap gap-2">
          {selectedLetters.map((letter, index) => (
            <div key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md shadow-sm">
              {letter}
            </div>
          ))}
        </div>
      </div>

      {/* Check Answer button */}
      <button
        onClick={checkAnswer}
        className="mt-4 py-2 px-6 bg-blue-950 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Check Answer
      </button>

      {/* Result display */}
      {result && (
        <div
          className={`mt-6 p-4 text-lg font-bold rounded-lg shadow-md ${
            result === 'Correct!' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {result}
        </div>
      )}
    </div>
  );
};

// Main ANAGRAM Component
const Anagram = () => {
  const { selectedQuestion } = useContext(QuestionContext);
  const question = selectedQuestion;

  if (!question) {
    return (
      <div>
        <NavBar />
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      </div>
    );  
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex flex-col items-center p-6">
      <NavBar />
      <div className="max-w-xl w-full p-6 mt-8 border rounded-2xl shadow-xl bg-white">
        <h3 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">{question.title}</h3>
        <AnagramGame
          blocks={question.blocks}
          solution={question.solution}
          anagramType={question.anagramType}
        />
      </div>
    </div>
  );
};

export default Anagram;
