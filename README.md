

SpeakX Full Stack Assignment: Comprehensive Project Documentation

The SpeakX Full Stack Assignment is a high-performance, scalable web application designed for managing and querying a question database. Leveraging Node.js, MongoDB, and Redis for the backend, and React for the frontend, it provides a seamless and efficient user experience. The integration of gRPC ensures low-latency communication, while Redis caching enhances performance.

Key Features
Search Functionality:

Search questions by title with advanced filtering by type (e.g., MCQ, Anagram, Content-Only) and support for pagination.

Provides paginated results to ensure optimal navigation for large datasets.

Detailed Question View:

Retrieve detailed information about specific questions, including options (for MCQs) or blocks (for Anagrams).
Offers interactive features like arranging anagrams and submitting answers.
Autocomplete Suggestions:

Real-time suggestions while typing in the search bar, powered by query prefix matching.
Includes debouncing to minimize API requests and ensure smooth performance.
Caching with Redis:

Frequently accessed data like search results and question details are cached to improve response times.
Redis ensures reduced database load, with cache expiration for data freshness.
Responsive Design:

The frontend, styled with Tailwind CSS, ensures an optimized user experience across desktop and mobile devices.
Interactive Anagram Game:

Allows users to rearrange shuffled text blocks to form correct answers.
Provides immediate feedback on correctness.
Error Handling:

Displays meaningful error messages for scenarios like invalid inputs, no results, or server issues.
Extensibility:

Modular architecture facilitates the easy addition of new features, such as authentication or advanced filtering.
API Endpoints
1. Search Questions
URL: /api/questions
Method: GET
Parameters:
query: Search term.
page (optional): Page number (default: 1).
limit (optional): Results per page (default: 10, max: 50).
type (optional): Filter by question types (e.g., MCQ, ANAGRAM).
Response:
json
Copy
Edit




{
  "success": true,
  "currentPage": 1,
  "totalPages": 3,
  "questions": [
    { "_id": "101", "title": "Toy Cars", "type": "MCQ" },
    { "_id": "102", "title": "History of Toys", "type": "CONTENT_ONLY" }
  ]
}


3. Retrieve Question by ID
URL: /api/questionsById/:id
Method: GET
Parameters:
id: Unique question identifier.
Response:
json
Copy
Edit



{
  "success": true,
  "question": {
    "_id": "123",
    "title": "Math Basics",
    "type": "MCQ",
    "options": [
      { "text": "Option A", "isCorrectAnswer": false },
      { "text": "Option B", "isCorrectAnswer": true }
    ]
  }
}





5. Autocomplete Suggestions
URL: /api/autocomplete
Method: GET
Parameters:
query: Prefix for matching question titles.
Response:
json
Copy
Edit



{
  "success": true,
  "suggestions": ["Math Basics", "Math Geometry"]
}


Setup Instructions
Prerequisites
Node.js (16+), MongoDB, Redis, Postman.
Steps:
Clone the Repository:
bash
Copy
Edit

git clone https://github.com/your-username/SpeakX.git

cd SpeakX/backend

Install Dependencies:
bash
Copy
Edit

npm install
Configure Environment Variables: Create a .env file:
plaintext

Copy
Edit
MONGO_URI=mongodb://localhost:27017/speakx
GRPC_SERVER_PORT=50051
PORT=5000
REDIS_URL=redis://localhost:6379
Start the Application:
bash
Copy
Edit
node server/index.js


Technologies Used


Frontend:
React: Dynamic UI components and state management.
Tailwind CSS: Utility-first CSS for responsive, modern designs.
Context API: Manage global states like questions and search results.
Backend:
Node.js and Express.js: Robust backend and RESTful APIs.
MongoDB: NoSQL database for storing questions.
Redis: In-memory caching to enhance performance.
gRPC: High-performance protocol for efficient communication.
Utilities:
Mongoose: MongoDB schema management.
Debouncing: Optimized API calls for real-time suggestions.
CORS: Secure backend-to-frontend communication.
