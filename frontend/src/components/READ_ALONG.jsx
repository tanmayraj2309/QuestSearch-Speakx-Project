import { useContext, useEffect } from 'react';
import { QuestionContext } from '../context/QuestionContext';
import NavBar from './NavBar';

const READ_ALONG = () => {
  const { selectedQuestion } = useContext(QuestionContext);
  const question = selectedQuestion;

  useEffect(() => {
    // Any necessary side effects can go here
  }, [question]);

  if (!question) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <span className="text-gray-500 animate-pulse text-lg font-serif">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex flex-col items-center p-6">
        <div className="max-w-xl w-full p-6 mt-8 border rounded-2xl shadow-xl bg-white">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center font-serif">Read Along</h2>
          <p className="text-lg text-gray-600 leading-relaxed text-center font-sans">{question.title}</p>
        </div>
      </div>
    </div>
  );
};

export default READ_ALONG;
