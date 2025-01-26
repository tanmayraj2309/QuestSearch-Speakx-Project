import { useContext, useEffect, useState } from 'react';
import Pagination_Controller from '../components/Pagination_Controller';
import Search from '../components/Search';
import { QuestionContext } from '../context/QuestionContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Read_AlongPage = () => {
    const { getQuestionById } = useContext(QuestionContext);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // Loader state
    const base_url = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true); // Show loader while fetching
            try {
                const response = await fetch(
                    `${base_url}/api/questions?query=&page=${page}&limit=50&type=READ_ALONG`
                );
                const data = await response.json();
                setQuestions(data.questions);
                setTotalPages(data.pagination.totalPages);
            } catch (error) {
                console.error('Error fetching read-along questions:', error);
            } finally {
                setIsLoading(false); // Hide loader once data is fetched
            }
        };

        fetchQuestions();
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-green-100 min-h-screen py-12 px-6">
            <Search />
            <div className="container mx-auto bg-white p-6 rounded-xl shadow-xl">
            <h1 className="text-center text-3xl font-extrabold mb-8">
              <span className="text-[#fe913a]">Read Along</span>{' '}
              <span className="text-black">Questions</span>
            </h1>
            
                {isLoading ? ( // Show loader if data is loading
                    <div className="flex justify-center items-center py-12">
                        <Loader />
                    </div>
                ) : questions.length > 0 ? ( // Show questions if available
                    <ul className="space-y-4">
                        {questions.map((question, index) => (
                            <li
                                key={question._id}
                                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
                            >
                                <h3
                                    className="text-lg font-medium text-gray-800 hover:text-[#fe913a]"
                                    onClick={() => {
                                        getQuestionById(question._id);
                                        navigate('/read_along');
                                    }}
                                >
                                    {(page - 1) * 50 + index + 1}. {question.title}
                                </h3>
                            </li>
                        ))}
                    </ul>
                ) : ( // If no questions available, show a message
                    <p className="text-center text-gray-500 text-lg">No questions available.</p>
                )}

                {!isLoading && totalPages > 1 && ( // Show pagination only when not loading
                    <div className="mt-8">
                        <Pagination_Controller
                            handlePageChange={handlePageChange}
                            page={page}
                            totalPages={totalPages}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Read_AlongPage;
