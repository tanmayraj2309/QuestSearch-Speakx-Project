import { useContext } from "react";
import { QuestionContext } from "../context/QuestionContext";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import Pagination_Controller from "./Pagination_Controller"; // Import pagination component

const Result = () => {
  const { questions, getQuestionById, error, pagination, searchQuestions } = useContext(QuestionContext);
  const navigate = useNavigate();

  // Function to handle page change
  const pageHandler = (page) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      searchQuestions(null, page);
    }
  };

  // Function to handle navigation based on question type
  const navigateHandler = (type) => {
    const routes = {
      MCQ: "/mcq",
      ANAGRAM: "/anagram",
      READ_ALONG: "/read_along",
      CONTENT_ONLY: "/content_only",
    };
    navigate(routes[type] || "/");
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-green-100 min-h-screen py-12 px-6">
      <Search />
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg border-t-8 border-[#fe913a]">
        <h3 className="text-4xl font-extrabold text-center mb-6">
          <span className="text-[#fe913a]">Similar</span>{' '}
          <span className="text-black">Titles</span>
        </h3>
        <p className="text-xl font-semibold text-center text-gray-700 mb-8">Browse through the available questions</p>

        {error && <p className="text-center text-red-500 text-lg mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {questions && questions.length > 0 ? (
            questions.map((question, index) => {
              // Corrected global indexing for pagination
              const globalIndex = (pagination.page - 1) * pagination.limit + index + 1;

              return (
                <div
                  key={question._id}
                  className="bg-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                  onClick={() => {
                    navigateHandler(question.type);
                    getQuestionById(question._id);
                  }}
                >
                  <p className="text-2xl font-medium text-indigo-900 hover:text-[#fe913a]">
                    <span className="text-xl text-gray-500">{globalIndex}.</span> {question.title}
                  </p>
                  <p className="text-md text-gray-600 mt-4">
                    <span className="font-semibold">Type:</span> {question.type}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No questions found. Try searching for something!
            </p>
          )}
        </div>
      </div>

      {/* Pagination Component */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination_Controller
            handlePageChange={pageHandler}
            page={pagination.page}
            totalPages={pagination.totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default Result;
