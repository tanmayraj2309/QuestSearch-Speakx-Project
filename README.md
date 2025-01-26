


# SpeakX Full Stack Assignment: Comprehensive Project Documentation

The **SpeakX Full Stack Assignment** is a robust, gRPC-based search service designed for efficient handling of a questions database. It employs **Node.js**, **MongoDB**, and **Redis** for backend services, with gRPC for scalable and high-performance communication. This documentation covers the project structure, API endpoints, setup instructions, and additional details to ensure easy understanding and usage.

---

## Project Structure

plaintext
project/

├── proto/

│   └── question.proto # gRPC service definition

├── models/

│   └── question.model.js       # MongoDB schema for questions

├── config/

│   └── db.js                   # MongoDB connection setup

│   └── grpcServer.js           # gRPC server implementation

│   └── redisClient.js          # Redis connection and utilities

├── routes/

│   └── questionRoutes.js       # Express routes for HTTP API

├── server.js                       # Main application entry point  

├── package.json

├── .env                        # Environment variables

└── README.md                   # Project documentation


---

## Features

- **Search Questions**: Query questions by title with advanced filtering by type and pagination.
- **Retrieve Question by ID**: Fetch detailed information about a specific question.
- **Autocomplete Suggestions**: Get dynamic suggestions based on query prefixes.
- **High Performance**: gRPC integration ensures low-latency communication.
- **Caching**: Redis integration for fast and efficient query resolution.
- **Extensibility**: Modular architecture allows easy addition of new features.

---

## API Endpoints

### 1. Search Questions by Query and Type
- **URL**: /api/questions
- **Method**: GET
- **Description**: Fetches a list of questions matching a search query, with support for type-based filtering, pagination, and configurable result limits.
- **Request Parameters**:
  - query (string): Search term to find matching questions (e.g., toy).
  - page (optional, number): Page number for pagination (default: 1).
  - limit (optional, number): Number of results per page (default: 10; maximum: 50).
  - type (optional, string or array): Filter by question types. Can be one or more types (e.g., ['MCQ', 'ANAGRAM'] or MCQ). Defaults to all to include all types.
- **Example Request**:
  
plaintext
  http://localhost:5000/api/questions?query=toy&page=1&limit=50&type=MCQ

- **Response**:
  
json
  {
    "success": true,
    "currentPage": 1,
    "totalPages": 3,
    "totalQuestions": 120,
    "questions": [
      { "_id": "101", "title": "Toy Cars for Kids", "type": "MCQ" },
      { "_id": "102", "title": "History of Toys", "type": "CONTENT_ONLY" },
      { "_id": "103", "title": "Best Toy Robots", "type": "ANAGRAM" }
    ]
  }

- **Error Responses**:
  - 404: No questions found for the given query.
  - 400: Invalid page, limit, or type parameter.
  - 500: Internal server error.

### 2. Retrieve Question by ID
- **URL**: /api/questionsById/:id
- **Method**: GET
- **Description**: Retrieves the details of a single question by its ID.
- **Path Parameters**:
  - id (string): Unique identifier of the question.
- **Response**:
  
json
  {
    "success": true,
    "question": {
      "_id": "123",
      "title": "Math Basics",
      "type": "MCQ",
      "options": [
        { "text": "Option A", "isCorrectAnswer": false },
        { "text": "Option B", "isCorrectAnswer": true }
      ],
      "solution": "Option B is correct."
    }
  }

- **Error Responses**:
  - 404: Question not found.
  - 500: Internal server error.

### 3. Autocomplete Suggestions
- **URL**: /api/autocomplete
- **Method**: GET
- **Description**: Provides autocomplete suggestions based on a query prefix.
- **Request Parameters**:
  - query (string): Prefix string to match question titles.
- **Response**:
  
json
  {
    "success": true,
    "suggestions": ["Math Basics", "Math Geometry", "Math Algebra"]
  }

- **Error Responses**:
  - 404: No suggestions found.
  - 500: Internal server error.

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a cloud instance like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Redis](https://redis.io/) (for caching autocomplete and search results)
- [Postman](https://www.postman.com/downloads/) (for testing the API)

### Steps to Set Up the Project

#### 1. Clone the Repository
bash
git clone https://github.com/your-username/SpeakX.git
cd SpeakX/backend


#### 2. Install Dependencies
bash
npm install


#### 3. Environment Variables
Create a .env file in the root directory and configure the following:
plaintext
MONGO_URI=mongodb://localhost:27017/speakx
GRPC_SERVER_HOST=127.0.0.1
GRPC_SERVER_PORT=50051
PORT=5000
REDIS_URL=redis://localhost:6379


#### 4. Start the Application
Start both the gRPC and HTTP servers:
bash
node server/index.js

The gRPC server will run on port 50051, and the HTTP server will be accessible on port 5000.

---

## Technologies Used

- **Node.js**: Backend server.
- **Express.js**: HTTP request handling.
- **MongoDB**: Database for persistent storage.
- **Redis**: In-memory data store for caching.
- **gRPC**: High-performance communication protocol.
- **Mongoose**: MongoDB ODM for schema management.
- **dotenv**: For managing environment variables.

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a feature branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.

---



### **Technologies Used:**

1. **Frontend:**
   - **React**: A JavaScript library for building dynamic user interfaces. React is used to manage the app's interactive behavior (e.g., rendering the question list, showing question details, and handling state changes).
   - **Tailwind CSS**: A utility-first CSS framework used to design responsive, clean interfaces quickly. It uses utility classes to avoid writing custom CSS.
   - **React Context API**: A state management tool to manage global states, such as the current set of questions, the selected question, and loading states.
   - **React Hooks**: Used for managing component-level state and lifecycle events (e.g., useState, useEffect).

2. **Backend:**
   - **Node.js**: A JavaScript runtime environment used to build the backend API and handle HTTP requests.
   - **Express.js**: A web framework for Node.js used for defining routes, handling API requests, and managing middleware.
   - **MongoDB**: A NoSQL database used to store questions, including their title, type (MCQ, Anagram, etc.), options, solutions, and associated metadata.
   - **Mongoose**: An Object Document Mapper (ODM) library for MongoDB in Node.js, providing an easy-to-use interface for interacting with the database by defining schemas and models.
   - **gRPC (optional)**: A high-performance RPC framework, used if you scale the backend to microservices.

3. **API & Data Management:**
   - **RESTful APIs**: APIs are built with Express.js to handle search, fetching question details, suggestions, and pagination.
   - **Pagination**: The backend supports pagination to manage large datasets and prevent overwhelming the user with excessive data at once.
   - **CORS**: Cross-Origin Resource Sharing is configured to allow secure access to the backend from the frontend, especially when the frontend and backend are hosted on different domains.

4. **Real-time Suggestions:**
   - **Debouncing**: When the user types in the search bar, a delay is added before sending the request to fetch suggestions. This reduces the number of API calls, improving performance.
   - **Backend Filtering**: The backend applies filters, such as search query matching, to return only relevant suggestions, ensuring users get accurate and relevant results.

5. **Caching with Redis:**
   - **Redis**: A fast, in-memory key-value data store used for caching frequently accessed data. Redis reduces the load on the MongoDB database and improves the performance of search and question retrieval.
   - **Caching Mechanism**: When a search query is made or question details are requested, Redis is checked first. If the data is found, it is returned directly from Redis. If not, the data is fetched from MongoDB, then cached in Redis for future use.
   - **Cache Expiry**: Cached data is given an expiry time to ensure freshness, so the system doesn’t serve outdated results.

---

### **Summary:**

QuestSearch is a web application that allows users to search and interact with a variety of questions, including MCQs, Anagrams, and content-only questions. The frontend is built using **React** and styled with **Tailwind CSS** for responsive design. The backend is powered by **Node.js** and **Express.js**, with **MongoDB** used for storing question data. The addition of **Redis** for caching enhances performance by reducing the load on the database and speeding up data retrieval. The system supports pagination, real-time search suggestions, and filtering to enhance the user experience. Interactive features like the anagram game and detailed question views keep users engaged.

This system is scalable and can be extended to include features like user authentication, advanced filtering, and other interactive question types.
make one read me for the both read me 
ChatGPT said:
ChatGPT
Here’s a combined README for both the SpeakX Full Stack Assignment and the QuestSearch project:

QuestSearch Full Stack Assignment: Comprehensive Project Documentation
The QuestSearch Full Stack Assignment is a scalable, high-performance web application for querying and interacting with a diverse set of questions. Built with Node.js, MongoDB, Redis, and gRPC, the backend provides a fast and responsive experience for managing and retrieving question data. The frontend leverages React and Tailwind CSS for building a modern, interactive UI. This documentation provides an overview of the project, its structure, features, setup instructions, and usage.

Project Structure
plaintext
Copy
Edit
project/
├── proto/
│   └── question.proto           # gRPC service definition
├── models/
│   └── question.model.js        # MongoDB schema for questions
├── config/
│   └── db.js                    # MongoDB connection setup
│   └── grpcServer.js            # gRPC server implementation
│   └── redisClient.js           # Redis connection and utilities
├── routes/
│   └── questionRoutes.js        # Express routes for HTTP API
├── server.js                    # Main application entry point             
├── package.json
├── .env                         # Environment variables
└── README.md                    # Project documentation
Features
Search Questions: Query questions by title, with advanced filtering by type and pagination.
Retrieve Question by ID: Fetch detailed information about specific questions.
Autocomplete Suggestions: Fetch dynamic suggestions based on user input prefixes.
High Performance: gRPC ensures low-latency communication for scalable results.
Caching: Redis integration to store frequently requested data, improving response times.
Extensibility: Modular codebase allowing easy feature expansion.
API Endpoints
1. Search Questions by Query and Type
URL: /api/questions
Method: GET
Description: Fetches a list of questions based on a search query, supporting filtering, pagination, and configurable result limits.
Request Parameters:
query (string): The search term (e.g., toy).
page (optional, number): Page number for pagination (default: 1).
limit (optional, number): Number of results per page (default: 10, max: 50).
type (optional, string/array): Filter by question types (MCQ, ANAGRAM, etc.).
Example Request:
plaintext
Copy
Edit
http://localhost:5000/api/questions?query=toy&page=1&limit=50&type=MCQ
Response:
json
Copy
Edit
{
  "success": true,
  "currentPage": 1,
  "totalPages": 3,
  "totalQuestions": 120,
  "questions": [
    { "_id": "101", "title": "Toy Cars for Kids", "type": "MCQ" },
    { "_id": "102", "title": "History of Toys", "type": "CONTENT_ONLY" },
    { "_id": "103", "title": "Best Toy Robots", "type": "ANAGRAM" }
  ]
}
2. Retrieve Question by ID
URL: /api/questionsById/:id
Method: GET
Description: Fetch details for a specific question using its ID.
Path Parameters:
id: The unique identifier for the question.
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
    ],
    "solution": "Option B is correct."
  }
}
3. Autocomplete Suggestions
URL: /api/autocomplete
Method: GET
Description: Provides autocomplete suggestions based on the query prefix.
Request Parameters:
query (string): Prefix string for suggestions.
Response:
json
Copy
Edit
{
  "success": true,
  "suggestions": ["Math Basics", "Math Geometry", "Math Algebra"]
}



Setup Instructions
  Prerequisites:
  • Node.js (version 16 or higher)
  • MongoDB
  • Redis
  • Postman (for API testing)


Steps to Set Up the Project
  1. Clone the Repository
    • git clone https://github.com/your-username/QuestSearch.git
    • cd QuestSearch/backend
  2. Install Dependencies
    • npm install

3. Configure Environment Variables
   Create a .env file and set the following variables:
   MONGO_URI=mongodb://localhost:27017/questsearch
   GRPC_SERVER_HOST=127.0.0.1
   GRPC_SERVER_PORT=50051
   PORT=5000
   REDIS_URL=redis://localhost:6379

4. Start the Application
   • Run the application:  node server.js


  
Here’s a combined README for both the SpeakX Full Stack Assignment and the QuestSearch project:

QuestSearch Full Stack Assignment: Comprehensive Project Documentation
The QuestSearch Full Stack Assignment is a scalable, high-performance web application for querying and interacting with a diverse set of questions. Built with Node.js, MongoDB, Redis, and gRPC, the backend provides a fast and responsive experience for managing and retrieving question data. The frontend leverages React and Tailwind CSS for building a modern, interactive UI. This documentation provides an overview of the project, its structure, features, setup instructions, and usage.

Project Structure
plaintext
Copy
Edit
project/
├── proto/
│   └── question.proto           # gRPC service definition
├── models/
│   └── question.model.js        # MongoDB schema for questions
├── config/
│   └── db.js                    # MongoDB connection setup
│   └── grpcServer.js            # gRPC server implementation
│   └── redisClient.js           # Redis connection and utilities
├── routes/
│   └── questionRoutes.js        # Express routes for HTTP API
├── server.js                    # Main application entry point             
├── package.json
├── .env                         # Environment variables
└── README.md                    # Project documentation
Features
Search Questions: Query questions by title, with advanced filtering by type and pagination.
Retrieve Question by ID: Fetch detailed information about specific questions.
Autocomplete Suggestions: Fetch dynamic suggestions based on user input prefixes.
High Performance: gRPC ensures low-latency communication for scalable results.
Caching: Redis integration to store frequently requested data, improving response times.
Extensibility: Modular codebase allowing easy feature expansion.
API Endpoints
1. Search Questions by Query and Type
URL: /api/questions
Method: GET
Description: Fetches a list of questions based on a search query, supporting filtering, pagination, and configurable result limits.
Request Parameters:
query (string): The search term (e.g., toy).
page (optional, number): Page number for pagination (default: 1).
limit (optional, number): Number of results per page (default: 10, max: 50).
type (optional, string/array): Filter by question types (MCQ, ANAGRAM, etc.).
Example Request:
plaintext
Copy
Edit
http://localhost:5000/api/questions?query=toy&page=1&limit=50&type=MCQ
Response:
json
Copy
Edit
{
  "success": true,
  "currentPage": 1,
  "totalPages": 3,
  "totalQuestions": 120,
  "questions": [
    { "_id": "101", "title": "Toy Cars for Kids", "type": "MCQ" },
    { "_id": "102", "title": "History of Toys", "type": "CONTENT_ONLY" },
    { "_id": "103", "title": "Best Toy Robots", "type": "ANAGRAM" }
  ]
}
2. Retrieve Question by ID
URL: /api/questionsById/:id
Method: GET
Description: Fetch details for a specific question using its ID.
Path Parameters:
id: The unique identifier for the question.
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
    ],
    "solution": "Option B is correct."
  }
}
3. Autocomplete Suggestions
URL: /api/autocomplete
Method: GET
Description: Provides autocomplete suggestions based on the query prefix.
Request Parameters:
query (string): Prefix string for suggestions.
Response:
json
Copy
Edit
{
  "success": true,
  "suggestions": ["Math Basics", "Math Geometry", "Math Algebra"]
}
Setup Instructions
Prerequisites
Node.js (version 16 or higher)
MongoDB
Redis
Postman (for API testing)
Steps to Set Up the Project
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/QuestSearch.git
cd QuestSearch/backend
2. Install Dependencies
bash
Copy
Edit
npm install
3. Configure Environment Variables
Create a .env file and set the following variables:

   plaintext
Copy
Edit
MONGO_URI=mongodb://localhost:27017/questsearch
GRPC_SERVER_HOST=127.0.0.1
GRPC_SERVER_PORT=50051
PORT=5000
REDIS_URL=redis://localhost:6379
4. Start the Application
Run the application: node server.js


Technologies Used
 Frontend
 • React: JavaScript library for building dynamic UIs.
 • Tailwind CSS: Utility-first CSS framework for responsive design.
 • React Context API: State management for global state sharing.
 • React Hooks: Functional components and lifecycle management.
 Backend
 • Node.js: JavaScript runtime for building the server.
 • Express.js: Web framework for routing and HTTP handling.
 • MongoDB: NoSQL database for storing questions.
 • Redis: In-memory cache to improve response times.
 • gRPC: High-performance communication protocol (optional for scalability).
 API & Data Management
 • REST APIs: For handling search, question retrieval, and autocomplete.
 • Pagination: To efficiently manage large datasets.
 • CORS: Configured for secure API access across different domains.
 Caching with Redis
 • Redis: An in-memory key-value store used for caching frequently accessed data.
 • Cache Expiry: Cached data expires periodically to ensure data freshness.
 • Redis Integration: Reduces database queries by serving cached data for frequent requests.
 User Interaction
 • Anagram Game: Users can solve anagrams by rearranging blocks of text.
 • Real-time Suggestions: Fetch suggestions as the user types in the search box.
 Contributing
 • Fork the repository.
 • Create a feature branch (git checkout -b feature/your-feature).
 • Commit your changes (git commit -m 'Add new feature').
 • Push the branch (git push origin feature/your-feature).
 • Submit a pull request.



